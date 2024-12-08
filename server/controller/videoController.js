import { fileupload } from "../middleware/multer.js";

export async function getAllVideo(req, res) {
  res.send("Gotcha");
}
export async function getVideoById(req, res) {
  res.json({ msg: "Hellor" });
}

export const uploadVideo = async (req, res) => {
  const file = req["file"];
  console.log(file.originalname);
  const nameing = checkNamingFormat(file.originalname);
  // if (!nameing) {
  //   res.json({
  //     error: "File Name should be in DDMMYYYYHHMMSS-DDMMYYYYHHMMSS.mp4 format",
  //   });
  // } else {
    // fileupload(file, res, "video");
  // }
  res.json({msg:"Gotit"})
};

function checkNamingFormat(file) {
return  /^\d{2}\d{2}\d{4}\d{2}\d{2}\d{2}-\d{2}\d{2}\d{4}\d{2}\d{2}\d{2}\.mp4$/.test(
    file.name,
  );
}
