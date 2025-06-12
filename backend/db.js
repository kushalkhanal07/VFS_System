
import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://admin:admin@127.0.0.1:27017/storage?replicaSet=myReplicaSet&authSource=admin");

export async function connectDB() {
  await client.connect();
  const db = client.db();
  console.log("Database connected");

  // Ensure the userUploadSizes collection exists
  await db.createCollection("userUploadSizes", {
    capped: false,
  });

 
  await db.createCollection("sharedItems", {
    capped: false,
  });

  return db;
}

process.on("SIGINT", async () => {
  await client.close();
  console.log("Client Disconnected!");
  process.exit(0);
});