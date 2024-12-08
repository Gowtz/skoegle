import { fileupload } from "../middleware/multer.js";
import Video from "../model/video.js";
import AWS from "aws-sdk";
export async function getVideoByDateRange(req, res) {
  const { from, to } = req.body;
  Video.find({
    startTime: { $gte: from },
    endTime: { $lte: to },
  })
    .then((videos) => {

      res.send(videos);
    })
    .catch((err) => {
      console.error("Error finding videos:", err);
    });
}

export async function getVideoById(req, res) {
  const query = req.query;
  const s3 = new AWS.S3();
  const key = `video/${query.id}.mp4`.replaceAll("\"","");
  try {
    const params = {
      Bucket: process.env.BUCKET_ID,
      Key: key,
      Expires: 60 * 5, // 5 minutes
    };
    await s3
      .headObject({
        Bucket: process.env.BUCKET_ID,
        Key: `video/${query.id}.mp4`,
      })
      .promise();
    const url = s3.getSignedUrl("getObject", params);

    res.json({ msg: "Gotcha", URL: url });
  } catch (err) {
    console.log(`S3 Fetch Error \n ${err}`);
    res.status(502).json({ error: `Error File ${err.code}` });
  }
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
