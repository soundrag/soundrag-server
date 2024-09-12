import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect(process.env.MONGOOSE_URL);
};

export default connectDB;
