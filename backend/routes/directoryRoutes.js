import express from "express";
import validateIdMiddleware from "../middlewares/validateIdMiddleware.js";
import { ObjectId } from "mongodb";
import { rm } from 'fs/promises'; // for promise-based usage


const router = express.Router();

router.param("parentDirId", validateIdMiddleware);
router.param("id", validateIdMiddleware);

router.get("/:id?", async (req, res, next) => {
  const id = req.params.id || req.user.rootDirId;
  const db = req.db;
  const dirCollection = db.collection("directories");
  const filesCollection = db.collection("files");
  const sharedItemsCollection = db.collection("sharedItems");

  const dirData = await dirCollection.findOne({
    _id: new ObjectId(id),
  });

  if (!dirData) {
    return res.status(404).json({ error: "Directory not found!" });
  }

  // Check if the user has access (owner or shared with them)
  const isOwner = dirData.userId.toString() === req.user._id.toString();
  const sharedEntry = await sharedItemsCollection.findOne({
    itemId: id,
    itemType: "directory",
    sharedWithUserId: req.user._id,
  });

  if (!isOwner && !sharedEntry) {
    return res.status(403).json({ error: "You do not have access to this directory!" });
  }

  try {
    const directories = await dirCollection
      .find({ parentDirId: new ObjectId(id), userId: req.user._id })
      .toArray();
    const files = await filesCollection
      .find({ parentDirId: new ObjectId(id), userId: req.user._id })
      .toArray();

    // Include shared items in the directory
    const sharedFiles = await sharedItemsCollection
      .find({ sharedWithUserId: req.user._id, itemType: "file" })
      .toArray();
    const sharedFileIds = sharedFiles.map((item) => new ObjectId(item.itemId));
    const additionalFiles = await filesCollection
      .find({ _id: { $in: sharedFileIds }, parentDirId: new ObjectId(id) })
      .toArray();

    const sharedDirs = await sharedItemsCollection
      .find({ sharedWithUserId: req.user._id, itemType: "directory" })
      .toArray();
    const sharedDirIds = sharedDirs.map((item) => new ObjectId(item.itemId));
    const additionalDirs = await dirCollection
      .find({ _id: { $in: sharedDirIds }, parentDirId: new ObjectId(id) })
      .toArray();

    return res.status(200).json({
      name: dirData.name,
      directories: [...directories, ...additionalDirs],
      files: [...files, ...additionalFiles],
    });
  } catch (err) {
    err.status = 500;
    next(err);
  }
});

router.post("/:parentDirId?", async (req, res, next) => {
  const parentDirId = req.params.parentDirId || req.user.rootDirId;
  const dirname = req.headers.dirname || "untitled";
  const db = req.db;
  const dirCollection = db.collection("directories");

  const parentDirData = await dirCollection.findOne({
    _id: new ObjectId(parentDirId),
    userId: req.user._id,
  });

  if (!parentDirData) {
    return res.status(404).json({ error: "Parent directory not found!" });
  }

  try {
    await dirCollection.insertOne({
      name: dirname,
      userId: req.user._id,
      parentDirId: new ObjectId(parentDirId),
    });
    return res.status(201).json({ message: "Created" });
  } catch (err) {
    err.status = 500;
    next(err);
  }
});

router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const db = req.db;
  const dirCollection = db.collection("directories");

  const dirData = await dirCollection.findOne({
    _id: new ObjectId(id),
    userId: req.user._id,
  });

  if (!dirData) {
    return res.status(404).json({ error: "Directory not found!" });
  }

  try {
    await dirCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { name: req.body.newDirName } }
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
  const dirCollection = db.collection("directories");
  const filesCollection = db.collection("files");
  const sharedItemsCollection = db.collection("sharedItems");

  const dirData = await dirCollection.findOne({
    _id: new ObjectId(id),
    userId: req.user._id,
  });

  if (!dirData) {
    return res.status(404).json({ error: "Directory not found!" });
  }

  try {
    const subDirs = await dirCollection
      .find({ parentDirId: new ObjectId(id) })
      .toArray();
    const files = await filesCollection
      .find({ parentDirId: new ObjectId(id) })
      .toArray();

    for (const file of files) {
      await rm(`./storage/${file._id}${file.extension}`);
      await filesCollection.deleteOne({ _id: file._id });
      await sharedItemsCollection.deleteMany({ itemId: file._id.toString(), itemType: "file" });
    }

    for (const subDir of subDirs) {
      await dirCollection.deleteOne({ _id: subDir._id });
      await sharedItemsCollection.deleteMany({ itemId: subDir._id.toString(), itemType: "directory" });
    }

    await dirCollection.deleteOne({ _id: dirData._id });
    await sharedItemsCollection.deleteMany({ itemId: id, itemType: "directory" });

    return res.status(200).json({ message: "Directory Deleted Successfully" });
  } catch (err) {
    next(err);
  }
});

// New route to generate a public link for external sharing
router.get("/:id/public-link", async (req, res) => {
  const { id } = req.params;
  const db = req.db;
  const dirCollection = db.collection("directories");
  const dirData = await dirCollection.findOne({
    _id: new ObjectId(id),
    userId: req.user._id,
  });

  if (!dirData) {
    return res.status(404).json({ error: "Directory not found!" });
  }

  const publicLink = `http://localhost:4000/directory/${id}`;
  return res.status(200).json({ publicLink });
});

// New route to share a directory with another user
router.post("/:id/share", async (req, res) => {
  const { id } = req.params;
  const { email, permission } = req.body;
  const db = req.db;
  const dirCollection = db.collection("directories");
  const usersCollection = db.collection("users");
  const sharedItemsCollection = db.collection("sharedItems");

  const dirData = await dirCollection.findOne({
    _id: new ObjectId(id),
    userId: req.user._id,
  });

  if (!dirData) {
    return res.status(404).json({ error: "Directory not found!" });
  }

  const targetUser = await usersCollection.findOne({ email });
  if (!targetUser) {
    return res.status(404).json({ error: "User not found!" });
  }

  await sharedItemsCollection.insertOne({
    itemId: id,
    itemType: "directory",
    ownerId: req.user._id,
    sharedWithUserId: targetUser._id,
    permission,
  });

  return res.status(200).json({ message: "Directory shared successfully" });
});

export default router;