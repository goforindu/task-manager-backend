import mongoose from "mongoose";

export const connectDB = async () => {
  console.log("Mongo URI:", process.env.MONGO_URI);
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Failed");

    process.exit(1);
  }
};
