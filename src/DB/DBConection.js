import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDb = async () => {
    try {
      const client = await mongoose.connect(process.env.MONGODB_URI);
      console.log("Connected to MongoDB Atlas");
      return client.connection.getClient(); 
    } catch (err) {
      console.error(err);
      throw err;
    }
  };