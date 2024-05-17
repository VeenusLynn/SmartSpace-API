import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";
import homeRoute from "./API/routes/home.js";
import authRoute from "./API/routes/auth.js";
import userRoute from "./API/routes/user.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;
const app = express();
const upload = multer();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.any());

// Routes
app.use("/home", homeRoute);
app.use("/auth", authRoute);
app.use("/user", userRoute);

// Connect to MongoDB
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
