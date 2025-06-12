import express from "express";
import { createWriteStream } from "fs";
// import { rm } from "fs/promises";
import { rm, stat } from "fs/promises";
import path from "path";
import validateIdMiddleware from "../middlewares/validateIdMiddleware.js";
import { ObjectId } from "mongodb";
import { createReadStream } from "fs";
import { SpamFilter } from "./spamFilter.js";
// import SpamFilter from "./spamFilter.js";

const router = express.Router();

router.param("parentDirId", validateIdMiddleware);
router.param("id", validateIdMiddleware);
let spamFilter;

router.use((req, res, next) => {
  spamFilter = new SpamFilter(req.db);
  next();
});

router.post("/:parentDirId?", async (req, res, next) => {
  const db = req.db;
  const dirCollection = db.collection("directories");
  const filesCollection = await db.collection("files");
  const userUploadSizesCollection = db.collection("userUploadSizes");
  const parentDirId = req.params.parentDirId || req.user.rootDirId;
  const parentDirData = await dirCollection.findOne({
    _id: new ObjectId(parentDirId),
    userId: req.user._id,
  });

  if (!parentDirData) {
    return res.status(404).json({ error: "Parent directory not found!" });
  }

  const filename = req.headers.filename || "untitled";
  const extension = path.extname(filename);
  const contentLength = parseInt(req.headers["content-length"], 10);

  const MAX_INDIVIDUAL_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  if (contentLength > MAX_INDIVIDUAL_FILE_SIZE) {
    return res.status(400).json({ error: "File size exceeds 10MB limit!" });
  }

  const TOTAL_UPLOAD_LIMIT = 1024 * 1024; // 1MB
  const userUploadSizeDoc = await userUploadSizesCollection.findOne({
    userId: req.user._id,
  });
  const currentTotalSize = userUploadSizeDoc ? userUploadSizeDoc.totalSize || 0 : 0;

  if (currentTotalSize + contentLength > TOTAL_UPLOAD_LIMIT) {
    return res.status(400).json({ error: "Total file size exceeds 1MB limit!" });
  }

  const insertedFile = await filesCollection.insertOne({
    extension,
    name: filename,
    parentDirId: parentDirData._id,
    userId: req.user._id,
  });
  const fileId = insertedFile.insertedId.toString();

  const fullFileName = `${fileId}${extension}`;

  const writeStream = createWriteStream(`./storage/${fullFileName}`);
  req.pipe(writeStream);

  req.on("end", async () => {
    if (userUploadSizeDoc) {
      await userUploadSizesCollection.updateOne(
        { userId: req.user._id },
        { $inc: { totalSize: contentLength } }
      );
    } else {
      await userUploadSizesCollection.insertOne({
        userId: req.user._id,
        totalSize: contentLength,
      });
    }
    return res.status(201).json({ message: "File Uploaded" });
  });

  req.on("error", async () => {
    await filesCollection.deleteOne({ _id: insertedFile.insertedId });
    return res.status(404).json({ message: "Could not Upload File" });
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const db = req.db;
  const filesCollection = db.collection("files");
  // const sharedItemsCollection = db.collection("sharedItems");
  const fileData = await filesCollection.findOne({
    _id: new ObjectId(id),
  });

  if (!fileData) {
    return res.status(404).json({ error: "File not found!" });
  }

  // Check if the user has access (owner or shared with them)
  const isOwner = fileData.userId.toString() === req.user._id.toString();
  // const sharedEntry = await sharedItemsCollection.findOne({
  //   itemId: id,
  //   itemType: "file",
  //   sharedWithUserId: req.user._id,
  // });

  if (!isOwner && !sharedEntry) {
    return res.status(403).json({ error: "You do not have access to this file!" });
  }

  const filePath = `${process.cwd()}/storage/${id}${fileData.extension}`;

  if (req.query.action === "download") {
    return res.download(filePath, fileData.name);
  }

  return res.sendFile(filePath, (err) => {
    if (!res.headersSent && err) {
      return res.status(404).json({ error: "File not found!" });
    }
  });
});

// New route to generate a public link for external sharing
router.get("/:id/public-link", async (req, res) => {
  const { id } = req.params;
  const db = req.db;
  const filesCollection = db.collection("files");
  const fileData = await filesCollection.findOne({
    _id: new ObjectId(id),
    userId: req.user._id,
  });

  if (!fileData) {
    return res.status(404).json({ error: "File not found!" });
  }

  const publicLink = `http://localhost:4000/file/${id}`;
  return res.status(200).json({ publicLink });
});

router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const db = req.db;
  const filesCollection = db.collection("files");
  const fileData = await filesCollection.findOne({
    _id: new ObjectId(id),
    userId: req.user._id,
  });

  if (!fileData) {
    return res.status(404).json({ error: "File not found!" });
  }

  try {
    await filesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { name: req.body.newFilename } }
    );
    return res.status(200).json({ message: "Renamed" });
  } catch (err) {
    err.status = 500;
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const db = req.db;
  const filesCollection = db.collection("files");
  const userUploadSizesCollection = db.collection("userUploadSizes");
  const sharedItemsCollection = db.collection("sharedItems");
  const fileData = await filesCollection.findOne({
    _id: new ObjectId(id),
    userId: req.user._id,
  });

  if (!fileData) {
    return res.status(404).json({ error: "File not found!" });
  }

  try {
    const filePath = `./storage/${id}${fileData.extension}`;
    const fileSize = (await stat(filePath)).size;
    await rm(filePath);
    await filesCollection.deleteOne({ _id: fileData._id });
    await userUploadSizesCollection.updateOne(
      { userId: req.user._id },
      { $inc: { totalSize: -fileSize } }
    );
    // Remove any sharing records for this file
    await sharedItemsCollection.deleteMany({ itemId: id, itemType: "file" });
    return res.status(200).json({ message: "File Deleted Successfully" });
  } catch (err) {
    console.log(err)
    next(err);
  }
});

// New route to share a file with another user
router.post("/:id/share", async (req, res) => {
  try {
    const { id } = req.params;
    const { email, permission } = req.body; // permission: "view" or "edit"
    const db = req.db;
    const randomId = new ObjectId();
    const filesCollection = db.collection("files");
    const usersCollection = db.collection("users");
    // const sharedItemsCollection = db.collection("sharedItems");



    const targetUser = await usersCollection.findOne({ email });
    if (!targetUser) {
      return res.status(404).json({ error: "User not found!" });
    }
    const filesData = await filesCollection.findOne({
      _id: new ObjectId(id)
    });

    if (!filesData) {
      return res.status(404).json({ error: "File not found" });
    }


    const fileData = await filesCollection.findOne({
      name: filesData.name,
      userId: targetUser._id,
    });

    if (fileData) {
      return res.status(404).json({ error: "File already exists" });
    }

    const isSpam = await spamFilter.isSpam(req.user._id);
    if (isSpam) {
      return res.status(400).json({ error: "Excessive sharing detected, possible spam!" });
    }

    const result = await filesCollection.insertOne({ _id: randomId, extension: filesData.extension, name: filesData.name, parentDirId: targetUser.rootDirId, userId: targetUser._id })
    const readStream = createReadStream(`./storage/${filesData._id.toString()}${filesData.extension}`)
    const writeStream = createWriteStream(`./storage/${randomId.toString()}${filesData.extension}`);
    readStream.pipe(writeStream);



    await spamFilter.logShare(req.user._id);
    return res.status(200).json({ message: "File shared successfully" });
  } catch (err) {
    console.log(err)
    return res.status(401).json({ message: "Something went wrong" })
  }
});

export default router;