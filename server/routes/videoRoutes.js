import { Router } from "express";
import { uploadVIDEO } from "../middleware/multer.js";
import { uploadVideo } from "../controller/videoController.js";

const router = Router();

// Upload a Video
// Note: file size should be under 100MB
router.post("/upload", uploadVIDEO, uploadVideo);

export default router;
