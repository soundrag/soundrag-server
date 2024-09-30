import dotenv from "dotenv";

import createError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

import connectDB from "./database/connection.js";

import index from "./routes/index.js";
import auth from "./routes/auth.js";
import studio from "./routes/studio.js";

const app = express();

dotenv.config();
connectDB();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.SOUNDRAG_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

app.use("/", index);
app.use("/auth", auth);
app.use("/studio", studio);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json({ error: "error" });
});

export default app;
