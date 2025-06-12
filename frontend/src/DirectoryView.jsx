import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DirectoryHeader from "./components/DirectoryHeader";
import CreateDirectoryModal from "./components/CreateDirectoryModal";
import RenameModal from "./components/RenameModal";
import DirectoryList from "./components/DirectoryList";
import "./DirectoryView.css";

function DirectoryView() {
  const BASE_URL = "http://localhost:4000";
  const { dirId } = useParams();
  const navigate = useNavigate();

  const [directoryName, setDirectoryName] = useState("My Drive");
  const [directoriesList, setDirectoriesList] = useState([]);
  const [filesList, setFilesList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showCreateDirModal, setShowCreateDirModal] = useState(false);
  const [newDirname, setNewDirname] = useState("New Folder");
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [renameType, setRenameType] = useState(null);
  const [renameId, setRenameId] = useState(null);
  const [renameValue, setRenameValue] = useState("");
  const fileInputRef = useRef(null);
  const [uploadQueue, setUploadQueue] = useState([]);
  const [uploadXhrMap, setUploadXhrMap] = useState({});
  const [progressMap, setProgressMap] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [activeContextMenu, setActiveContextMenu] = useState(null);
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 });
  const [filterType, setFilterType] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false); // New state for share modal
  const [shareType, setShareType] = useState(null); // "file" or "directory"
  const [shareId, setShareId] = useState(null);
  const [shareEmail, setShareEmail] = useState("");
  const [sharePermission, setSharePermission] = useState("view"); // "view" or "edit"

  async function handleFetchErrors(response) {
    if (!response.ok) {
      let errMsg = `Request failed with status ${response.status}`;
      try {
        const data = await response.json();
        if (data.error) errMsg = data.error;
      } catch (_) {}
      throw new Error(errMsg);
    }
    return response;
  }

  async function getDirectoryItems() {
    setErrorMessage("");
    try {
      const response = await fetch(`${BASE_URL}/directory/${dirId || ""}`, {
        credentials: "include",
      });

      if (response.status === 401) {
        navigate("/login");
        return;
      }

      await handleFetchErrors(response);
      const data = await response.json();

      setDirectoryName(dirId ? data.name : "My Drive");
      setDirectoriesList([...data.directories].reverse());
      setFilesList([...data.files].reverse());
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  useEffect(() => {
    getDirectoryItems();
    setActiveContextMenu(null);
  }, [dirId]);

  function getFileIcon(filename) {
    const ext = filename.split(".").pop().toLowerCase();
    switch (ext) {
      case "pdf":
        return "pdf";
      case "png":
      case "jpg":
      case "jpeg":
      case "gif":
        return "image";
      case "mp4":
      case "mov":
      case "avi":
        return "video";
      case "zip":
      case "rar":
      case "tar":
      case "gz":
        return "archive";
      case "js":
      case "jsx":
      case "ts":
      case "tsx":
      case "html":
      case "css":
      case "py":
      case "java":
        return "code";
      default:
        return "alt";
    }
  }

  function handleRowClick(type, id) {
    if (type === "directory") {
      navigate(`/directory/${id}`);
    } else {
      window.location.href = `${BASE_URL}/file/${id}`;
    }
  }

  function handleFileSelect(e) {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length === 0) return;

    const newItems = selectedFiles.map((file) => {
      const tempId = `temp-${Date.now()}-${Math.random()}`;
      return {
        file,
        name: file.name,
        id: tempId,
        isUploading: false,
      };
    });

    setFilesList((prev) => [...newItems, ...prev]);
    newItems.forEach((item) => {
      setProgressMap((prev) => ({ ...prev, [item.id]: 0 }));
    });
    setUploadQueue((prev) => [...prev, ...newItems]);
    e.target.value = "";
    if (!isUploading) {
      setIsUploading(true);
      processUploadQueue([...uploadQueue, ...newItems.reverse()]);
    }
  }

  function processUploadQueue(queue) {
    if (queue.length === 0) {
      setIsUploading(false);
      setUploadQueue([]);
      setTimeout(() => {
        getDirectoryItems();
      }, 1000);
      return;
    }

    const [currentItem, ...restQueue] = queue;
    setFilesList((prev) =>
      prev.map((f) =>
        f.id === currentItem.id ? { ...f, isUploading: true } : f
      )
    );

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${BASE_URL}/file/${dirId || ""}`, true);
    xhr.withCredentials = true;
    xhr.setRequestHeader("filename", currentItem.name);

    xhr.upload.addEventListener("progress", (evt) => {
      if (evt.lengthComputable) {
        const progress = (evt.loaded / evt.total) * 100;
        setProgressMap((prev) => ({ ...prev, [currentItem.id]: progress }));
      }
    });

    xhr.addEventListener("load", () => {
      if (xhr.status === 400 && xhr.responseText.includes("1MB limit")) {
        setShowPopup(true);
        setFilesList((prev) => prev.filter((f) => f.id !== currentItem.id));
        setProgressMap((prev) => {
          const { [currentItem.id]: _, ...rest } = prev;
          return rest;
        });
      } else {
        processUploadQueue(restQueue);
      }
    });

    xhr.addEventListener("error", () => {
      setFilesList((prev) => prev.filter((f) => f.id !== currentItem.id));
      setProgressMap((prev) => {
        const { [currentItem.id]: _, ...rest } = prev;
        return rest;
      });
    });

    setUploadXhrMap((prev) => ({ ...prev, [currentItem.id]: xhr }));
    xhr.send(currentItem.file);
  }

  function handleCancelUpload(tempId) {
    const xhr = uploadXhrMap[tempId];
    if (xhr) {
      xhr.abort();
    }
    setUploadQueue((prev) => prev.filter((item) => item.id !== tempId));
    setFilesList((prev) => prev.filter((f) => f.id !== tempId));
    setProgressMap((prev) => {
      const { [tempId]: _, ...rest } = prev;
      return rest;
    });
    setUploadXhrMap((prev) => {
      const copy = { ...prev };
      delete copy[tempId];
      return copy;
    });
  }

  async function handleDeleteFile(id) {
    setErrorMessage("");
    try {
      const response = await fetch(`${BASE_URL}/file/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      await handleFetchErrors(response);
      getDirectoryItems();
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  async function handleDeleteDirectory(id) {
    setErrorMessage("");
    try {
      const response = await fetch(`${BASE_URL}/directory/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      await handleFetchErrors(response);
      getDirectoryItems();
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  async function handleCreateDirectory(e) {
    e.preventDefault();
    setErrorMessage("");
    try {
      const response = await fetch(`${BASE_URL}/directory/${dirId || ""}`, {
        method: "POST",
        headers: {
          dirname: newDirname,
        },
        credentials: "include",
      });
      await handleFetchErrors(response);
      setNewDirname("New Folder");
      setShowCreateDirModal(false);
      getDirectoryItems();
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  function openRenameModal(type, id, currentName) {
    setRenameType(type);
    setRenameId(id);
    setRenameValue(currentName);
    setShowRenameModal(true);
  }

  async function handleRenameSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    try {
      const url =
        renameType === "file"
          ? `${BASE_URL}/file/${renameId}`
          : `${BASE_URL}/directory/${renameId}`;
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          renameType === "file"
            ? { newFilename: renameValue }
            : { newDirName: renameValue }
        ),
        credentials: "include",
      });
      await handleFetchErrors(response);
      setShowRenameModal(false);
      setRenameValue("");
      setRenameType(null);
      setRenameId(null);
      getDirectoryItems();
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  function handleContextMenu(e, id) {
    e.stopPropagation();
    e.preventDefault();
    const clickX = e.clientX;
    const clickY = e.clientY;

    if (activeContextMenu === id) {
      setActiveContextMenu(null);
    } else {
      setActiveContextMenu(id);
      setContextMenuPos({ x: clickX - 110, y: clickY });
    }
  }

  function openShareModal(type, id) {
    setShareType(type);
    setShareId(id);
    setShowShareModal(true);
  }

  async function handleShareSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    try {
      const url =
        shareType === "file"
          ? `${BASE_URL}/file/${shareId}/share`
          : `${BASE_URL}/directory/${shareId}/share`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: shareEmail,
          permission: sharePermission,
        }),
        credentials: "include",
      });
      await handleFetchErrors(response);
      setShowShareModal(false);
      setShareEmail("");
      setSharePermission("view");
      setShareType(null);
      setShareId(null);
      getDirectoryItems();
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  async function handleShareToFacebook(type, id) {
    try {
      const url =
        type === "file"
          ? `${BASE_URL}/file/${id}/public-link`
          : `${BASE_URL}/directory/${id}/public-link`;
      const response = await fetch(url, { credentials: "include" });
      await handleFetchErrors(response);
      const data = await response.json();
      const publicLink = data.publicLink;

      const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        publicLink
      )}`;
      window.open(facebookShareUrl, "_blank", "width=600,height=400");
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  useEffect(() => {
    function handleDocumentClick() {
      setActiveContextMenu(null);
    }
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  const filteredItems = () => {
    const allItems = [
      ...directoriesList.map((d) => ({ ...d, isDirectory: true })),
      ...filesList.map((f) => ({ ...f, isDirectory: false })),
    ];

    if (!filterType) return allItems;

    if (filterType === "folders") {
      return allItems.filter((item) => item.isDirectory);
    }

    if (filterType === "images") {
      return allItems.filter(
        (item) =>
          !item.isDirectory &&
          ["png", "jpg", "jpeg", "gif"].includes(
            item.name.split(".").pop().toLowerCase()
          )
      );
    }

    if (filterType === "files") {
      return allItems.filter((item) => !item.isDirectory);
    }

    return allItems;
  };

  const combinedItems = filteredItems();

  return (
    <div className="directory-view">
      {errorMessage &&
        errorMessage !==
          "Directory not found or you do not have access to it!" && (
          <div className="error-message">{errorMessage}</div>
        )}

      <DirectoryHeader
        directoryName={directoryName}
        onCreateFolderClick={() => setShowCreateDirModal(true)}
        onUploadFilesClick={() => fileInputRef.current.click()}
        fileInputRef={fileInputRef}
        handleFileSelect={handleFileSelect}
        disabled={
          errorMessage ===
          "Directory not found or you do not have access to it!"
        }
        setFilterType={setFilterType}
      />

      {showCreateDirModal && (
        <CreateDirectoryModal
          newDirname={newDirname}
          setNewDirname={setNewDirname}
          onClose={() => setShowCreateDirModal(false)}
          onCreateDirectory={handleCreateDirectory}
        />
      )}

      {showRenameModal && (
        <RenameModal
          renameType={renameType}
          renameValue={renameValue}
          setRenameValue={setRenameValue}
          onClose={() => setShowRenameModal(false)}
          onRenameSubmit={handleRenameSubmit}
        />
      )}

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>File exceeds total 1MB limit!</p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}

      {showShareModal && (
        <div className="popup">
          <div className="popup-content">
            <h3>Share {shareType === "file" ? "File" : "Folder"}</h3>
            {/* <form
              onSubmit={handleShareSubmit}
              className="flex justify-center items-center gap-x-4"
            >
              <label>
                Email:
                <input
                  type="email"
                  value={shareEmail}
                  onChange={(e) => setShareEmail(e.target.value)}
                  required
                />
              </label>
              <label>
                Permission:
                <select
                  value={sharePermission}
                  onChange={(e) => setSharePermission(e.target.value)}
                >
                  <option value="view">View</option>
                  <option value="edit">Edit</option>
                </select>
              </label>
              <button type="submit">Share</button>
              <button
                type="button"
                onClick={() => {
                  setShowShareModal(false);
                  setShareEmail("");
                  setSharePermission("view");
                }}
              >
                Cancel
              </button>
            </form> */}
            <form
              onSubmit={handleShareSubmit}
              className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto space-y-4"
            >
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700 text-left">
                  Email
                </label>
                <input
                  type="email"
                  value={shareEmail}
                  onChange={(e) => setShareEmail(e.target.value)}
                  required
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter user's email"
                />
              </div>

              {/* <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700 text-left">
                  Permission
                </label>
                <select
                  value={sharePermission}
                  onChange={(e) => setSharePermission(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="view">View</option>
                  <option value="edit">Edit</option>
                </select>
              </div> */}

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Share
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowShareModal(false);
                    setShareEmail("");
                    setSharePermission("view");
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {combinedItems.length === 0 ? (
        errorMessage ===
        "Directory not found or you do not have access to it!" ? (
          <p className="no-data-message">
            Directory not found or you do not have access to it!
          </p>
        ) : (
          <p className="no-data-message">
            {filterType
              ? `No ${filterType} found in this directory.`
              : "This folder is empty. Upload files or create a folder to see some data."}
          </p>
        )
      ) : (
        <DirectoryList
          items={combinedItems}
          handleRowClick={handleRowClick}
          activeContextMenu={activeContextMenu}
          contextMenuPos={contextMenuPos}
          handleContextMenu={handleContextMenu}
          getFileIcon={getFileIcon}
          isUploading={isUploading}
          progressMap={progressMap}
          handleCancelUpload={handleCancelUpload}
          handleDeleteFile={handleDeleteFile}
          handleDeleteDirectory={handleDeleteDirectory}
          openRenameModal={openRenameModal}
          openShareModal={openShareModal}
          handleShareToFacebook={handleShareToFacebook}
          BASE_URL={BASE_URL}
          setActiveContextMenu={setActiveContextMenu}
        />
      )}
    </div>
  );
}

export default DirectoryView;
