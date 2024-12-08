import { fileupload } from "../middleware/multer.js";
import Video from "../model/video.js";
export async function getAllVideo(req, res) {
Video.find({
  startTime: { $gte: a },
  endTime: { $lte: b }
})
  res.send("Gotcha");
}
export async function getVideoById(req, res) {
  res.json({ msg: "Hellor" });
}

export const uploadVideo = async (req, res) => {
  const file = req["file"];
  const nameing = checkNamingFormat(file.originalname);
  if (!nameing) {
    res.status(501).json({
      error: "File Name should be in DDMMYYYYHHMMSS-DDMMYYYYHHMMSS.mp4 format",
    });
  } else {
    fileupload(file, res, "video");
  }
};

const checkNamingFormat = (fileName) =>
  /^\d{2}\d{2}\d{4}\d{2}\d{2}\d{2}-\d{2}\d{2}\d{4}\d{2}\d{2}\d{2}\.mp4$/.test(
    fileName,
  );
