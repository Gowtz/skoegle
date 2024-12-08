import { Router } from "express";
import { uploadVIDEO } from "../middleware/multer.js";
import { getVideoByDateRange, uploadVideo } from "../controller/videoController.js";

const router = Router();

// Upload a Video
// Note: file size should be under 100MB
router.post("/upload", uploadVIDEO, uploadVideo);


router.get('/getvideobyrange',getVideoByDateRange)

export default router;
