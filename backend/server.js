import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

import ENV_VARIABLES from "./constants.js";

const app = express();
const port = ENV_VARIABLES.PORT;

app.use(express.json());
app.use(
  cors({
    origin: ENV_VARIABLES.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// If error occured while connecting to the server
app.use((req, res, next, err) => {
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    StatusCode: statusCode,
    Message: errorMessage,
  });
});

app.listen(port || 3005, () => {
  console.log(`Server is running on port ${process.env.PORT || 3005}`);
});
