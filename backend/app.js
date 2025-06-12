import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import directoryRoutes from "./routes/directoryRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import checkAuth from "./middlewares/authMiddleware.js";
import { connectDB } from "./db.js";
import path from "path"
import dotenv from 'dotenv';
dotenv.config();

try {
  const db = await connectDB();

  const app = express();
  const _dirname=path.resolve()
  app.use(cookieParser());
  app.use(express.json());
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );


  app.use((req, res, next) => {
    req.db = db;
    next();
  });

  app.use("/directory", checkAuth, directoryRoutes);
  app.use("/file", checkAuth, fileRoutes);
  app.use("/user", userRoutes);

  app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).json({ message: "Something went wrong!!" });
  });

  app.use(express.static(path.join(_dirname,"/frontend/dist")))
  app.get("*",(_,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"))
  })

  app.listen(4000, () => {
    console.log(`Server Started`);
  });
} catch (err) {
  console.log("Could not connect to database!");
  console.log(err);
}
