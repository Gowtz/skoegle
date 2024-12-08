import mongoose from "mongoose";

const videoScheme = new mongoose.Schema({
  fileName: {
    type: String,
    require: true,
  },
  startTime: {
    type:Date,
  },
  endTime: {
    type:Date,
  },
});

videoScheme.pre("save", async function(next) {
  const time = this.fileName
    .replace("video/", "")
    .replace(".mp4", "")
    .split("-");
  const startDate = time[0].slice(0, 2);
  const startMonth = time[0].slice(2, 4);
  const startYear = time[0].slice(4, 8);
  const startHour = time[0].slice(4, 8);
  const startMinute = time[0].slice(4, 8);
  const startSeconds = time[0].slice(4, 8);

  const endDate = time[1].slice(0, 2);
  const endMonth = time[1].slice(2, 4);
  const endYear = time[1].slice(4, 8);
  const endHour= time[0].slice(4, 8);
  const endMinute = time[0].slice(4, 8);
  const endSeconds = time[0].slice(4, 8);

  this.startTime = new Date(startYear,startMonth,startDate,startHour,startMinute,startSeconds)
  this.endTime = new Date(endYear,endMonth,endDate,endHour,endMinute,endSeconds);
  next();
});

const Video = mongoose.model("video", videoScheme);
export default Video;
