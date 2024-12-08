import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import 'dotenv/config'
import Video from "./routes/videoRoutes.js";

const PORT = process.env.PORT || 8000;
const corsConfig = {
  origin: "http://localhost:5173",
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
app.use(function(err,req,res,next){
  res.json({msg:"Error happned"})
})

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
