import multer from "multer";

import AWS from "aws-sdk";

// AWS config
AWS.config.update({
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY,
  region: process.env.REGION, // region of your bucket
});

const s3 = new AWS.S3();

// Mutler Config
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024, // limit file size to 100MB
  },
});

// Mutler middleware
const uploadVIDEO = upload.single("video");

// File Upload to AWS s3
const fileupload = async (file, res, key) => {
  const filename = `${key}/${file.originalname}`;
  const params = {
    Bucket: process.env.BUCKET_ID,
    Key: filename,
    Body: file.buffer,
  };
  try {
    const data = await s3.upload(params).promise();
    res.send({
      msg: "Gotcha",
      ResponseData: data,
    });
  } catch (error) {
    console.log(
      `<============== Error ==============>  \n ${error} \n <============== Error END ==============>`,
    );
    res.send("error");
  }
};

export { uploadVIDEO, fileupload };
