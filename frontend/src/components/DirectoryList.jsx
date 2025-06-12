import { FaDownload, FaTrash, FaEdit, FaShareAlt } from "react-icons/fa";
import ProgressBar from "../ProgreeBar";
// import ProgressBar from "./ProgressBar";
import "../DirectoryList.css";
// import DirectoryItem from "./DirectoryItem";

function DirectoryList({
  items,
  handleRowClick,
  activeContextMenu,
  contextMenuPos,
  handleContextMenu,
  getFileIcon,
  isUploading,
  progressMap,
  handleCancelUpload,
  handleDeleteFile,
  handleDeleteDirectory,
  openRenameModal,
  openShareModal,
  handleShareToFacebook,
  BASE_URL,
  setActiveContextMenu,
}) {
  return (
    <div className="directory-list">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const isTempItem = item._id?.toString().startsWith("temp-");
            const progress = progressMap[item._id] || 0;
            const type = item.isDirectory ? "directory" : "file";
            const icon =
              type === "directory" ? "folder" : getFileIcon(item.name);

            return (
              <tr
                key={item._id}
                onClick={() => !isTempItem && handleRowClick(type, item._id)}
                onContextMenu={(e) =>
                  !isTempItem && handleContextMenu(e, item._id)
                }
              >
                <td>
                  <div className="item-name">
                    <span className={`icon icon-${icon}`} />
                    {item.name}
                  </div>
                </td>
                <td>{type === "directory" ? "Folder" : "File"}</td>
                <td>
                  {isTempItem ? (
                    <>
                      <ProgressBar progress={progress} />
                      {isUploading && (
                        <button
                          className="cancel-upload-btn"
                          onClick={() => handleCancelUpload(item._id)}
                        >
                          Cancel
                        </button>
                      )}
                    </>
                  ) : (
                    <div className="actions">
                      {type === "file" && (
                        <a
                          href={`${BASE_URL}/file/${item._id}?action=download`}
                          className="action-btn"
                          title="Download"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaDownload />
                        </a>
                      )}
                      <button
                        className="action-btn"
                        title="Delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          type === "file"
                            ? handleDeleteFile(item._id)
                            : handleDeleteDirectory(item._id);
                        }}
                      >
                        <FaTrash />
                      </button>
                      <button
                        className="action-btn"
                        title="Rename"
                        onClick={(e) => {
                          e.stopPropagation();
                          openRenameModal(type, item._id, item.name);
                        }}
                      >
                        <FaEdit />
                      </button>
                    </div>
                  )}
                </td>

                {activeContextMenu === item._id && !isTempItem && (
                  <div
                    className="context-menu"
                    style={{ top: contextMenuPos.y, left: contextMenuPos.x }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div
                      className="context-menu-item"
                      onClick={() => {
                        openRenameModal(type, item._id, item.name)
                        setActiveContextMenu(null);
                      }}
                    >
                      Rename
                    </div>
                    <div
                      className="context-menu-item"
                      onClick={() =>
                        type === "file"
                          ? handleDeleteFile(item._id)
                          : handleDeleteDirectory(item._id)
                      }
                    >
                      Delete
                    </div>
                    <div
                      className="context-menu-item"
                      onClick={() => {
                        openShareModal(type, item._id);
                        setActiveContextMenu(null);
                      }}
                    >
                      Share with User
                    </div>
                    <div
                      className="context-menu-item"
                      onClick={() => {
                        handleShareToFacebook(type, item._id);
                        setActiveContextMenu(null);
                      }}
                    >
                      Share to Facebook
                    </div>
                  </div>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DirectoryList;
