import { fileupload } from "../middleware/multer.js";
import Video from "../model/video.js";
export async function getVideoByDateRange(req, res) {
  const a = new Date(2024,11,9); // Start date
  const b = new Date(2024,11,14); // Start date
  console.log(a)

  Video.find({
    startTime: { $gte: a },
    endTime:{$lte:b}
  })
    .then((videos) => {
      console.log("Videos found:", videos);

      res.send(videos);
    })
    .catch((err) => {
      console.error("Error finding videos:", err);
    });
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
