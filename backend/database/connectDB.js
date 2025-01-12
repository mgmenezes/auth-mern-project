import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    //console.log("MongoDB connecting", process.env.MONGO_URI);
    const connect = await mongoose.connect(process.env.MONGO_URI);
    //console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1); //1 is failure process. 0 code is success
  }
};
