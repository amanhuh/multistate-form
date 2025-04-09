import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://hail:hail123@cluster0.916e9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectToDB() {
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "multistateform",
      bufferCommands: false,
    }).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;

  if (mongoose.connection.readyState !== 1) {
    throw new Error("Failed to establish MongoDB connection.");
  }

  (global as any).mongoose = cached;
  return cached.conn;
}
