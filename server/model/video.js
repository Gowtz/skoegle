import mongoose from "mongoose";

const videoScheme = new mongoose.Schema({
  fileName: {
    type: String,
    require: true,
  },
  startTime: {
    type: Date,
  },
  endTime: {
    type: Date,
  },
});

videoScheme.pre("save", async function(next) {
  const time = this.fileName.replace('video/','').replace('.mp4','' ).split('-');
  
  const startDate = parseInt(time[0].substring(0, 2), 10);
  const startMonth = parseInt(time[0].substring(2, 4), 10) - 1;
  const startYear = parseInt(time[0].substring(4, 8), 10);
  const startHour = parseInt(time[0].substring(8, 10), 10);
  const startMinute = parseInt(time[0].substring(10, 12), 10);
  const startSeconds = parseInt(time[0].substring(12, 14), 10);

  const endDate = parseInt(time[1].substring(0, 2), 10);
  const endMonth = parseInt(time[1].substring(2, 4), 10) - 1;
  const endYear = parseInt(time[1].substring(4, 8), 10);
  const endHour = parseInt(time[1].substring(8, 10), 10);
  const endMinute = parseInt(time[1].substring(10, 12), 10);
  const endSeconds = parseInt(time[1].substring(12, 14), 10);

  this.startTime = new Date(
    startYear,
    startMonth,
    startDate,
    startHour,
    startMinute,
    startSeconds,
  );
  this.endTime = new Date(
    endYear,
    endMonth,
    endDate,
    endHour,
    endMinute,
    endSeconds,
  );
  next();
});

const Video = mongoose.model("video", videoScheme);
export default Video;
