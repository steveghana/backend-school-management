import mongoose from "mongoose";
const URL = `mongodb://localhost:27017/LinkedinPost`;
export const connectDB = async () => {
  await mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  });

  console.log("MongoDB Connected");
};
