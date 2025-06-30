/** @format */

import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDb connected succesfully");
  } catch (error) {
    console.log("error connecting to mongodb");
    process.exit(1); //    Node.js uygulamasını manuel olarak kapatır.
  }
};
