import mongoose from "mongoose";
import { db } from "../confit";

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(db.dbURI);
    console.log("Connected to the Database", connection.connections[0].name);
  } catch (error) {
    console.error("Error Connecting to the Database", error);
  }
};

export default connectDb;
