import mongoose from "mongoose";
const URL = `mongodb://localhost:27017/School_Management`; //This is for local connection
export const connectDB = async () => {
  await mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  });

  console.log("MongoDB Connected");
};
