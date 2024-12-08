import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import Video from "./routes/videoRoutes.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 8000;
const FRONTEND_URL = process.env.FRONTEND_URL;
const MONGO_URI = process.env.MONGOOSE_URI;
const corsConfig = {
  origin: FRONTEND_URL,
};
const app = express();
app.use(cors(corsConfig));

// middleware's
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/v1/", Video);

// Global catch
app.use(function(err, req, res, next) {
  res.json({ msg: "Error happned" });
});

// Connecting to database and starting the server
mongoose
  .connect(MONGO_URI)
  .then(
    app.listen(PORT, () => {
      console.log(`The server is running on port ${PORT}`);
    }),
  )
  .catch((error) => console.log("Problem with connecting database"));
