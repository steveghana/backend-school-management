import express from "express";
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middleware/error.js";
import authRouter from "./routes/auth.js";
import privateRouter from "./routes/private.js";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("Api running");
});

// Connecting Routes
app.use("/api/auth", authRouter);
app.use("/api/private", privateRouter);

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Sever running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
