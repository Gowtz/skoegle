import { fileupload } from "../middleware/multer.js";

export async function getAllVideo(req, res) {
  res.send("Gotcha");
}
export async function getVideoById(req, res) {
  res.json({msg:"Hellor"});
}

export const uploadVideo = async (req, res) => {
  const file = req['file'];
  console.log(file.originalname)
  fileupload(file, res, "video");
};


