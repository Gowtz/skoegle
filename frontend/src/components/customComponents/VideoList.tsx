import { useState } from "react";
import { VideoDataType } from "../../sample";
import { DatePickerWithRange } from "../ui/date-picker";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { DateRange } from "react-day-picker";
import { BACKEND_URL } from "../../lib/utils";
import axios from "axios";
import { Link } from "react-router";
export default function VideoList() {
  const [data, setData] = useState<VideoDataType[] | null>();
  const [dateValue, setDateValue] = useState<DateRange | undefined>();
  function handleSubmit(e:any) {
    e.preventDefault();
    axios
      .post(`${BACKEND_URL}api/v1/getvideobyrange`, dateValue)
      .then((res) => setData(res.data));
  }
  return (
    <>
      <div className="container lg:w-10/12 mx-auto mt-28">
        {/* Date Picker*/}
        <form
          onSubmit={handleSubmit}
          className="mb-16 text-center flex  flex-col items-center justify-center gap-5"
        >
          <Label className="text-xl ">Pick a date</Label>
          <div className="flex gap-5">
            <DatePickerWithRange onChangeDate={setDateValue} />
            <Button type="submit">Submit</Button>
          </div>
        </form>

        {/* End Date Picker*/}

        {data && (
          <div className=" px-5 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-20">
            {data?.map((ele, index) => <VideoCard key={index} props={ele} />)}
          </div>
        )}
      </div>
    </>
  );
}

function VideoCard({ props }: { props: VideoDataType }) {
  return (
    <>
      <Link to={`/video/${props.fileName.replace('video/','').replace('.mp4','')}`} >

      <div className="card flex flex-col min-h-[200px] border bg-zinc-200 p-3 rounded-md hover:shadow hover:shadow-gray-100 hover:scale-105 transition-all duration-75">
        <div className="img bg-gray-400 rounded-sm mb-5 w-full h-full aspect-video flex justify-center items-center">
          {" "}
          Video
        </div>
        {/*<h3>{props.fileName.replace('video/','').replace('.mp4','')}</h3>*/}
        <div className="cardBody px-2 ">
          <h5 className="flex justify-between items-center">
            From:{" "}
            <span className="text-gray-600 text-xs">
              {new Date(props.startTime).toLocaleString()}
            </span>{" "}
          </h5>
          <h5 className="flex items-center justify-between">
            To:{" "}
            <span className="text-gray-600 text-xs">
              {new Date(props.endTime).toLocaleString()}
            </span>
          </h5>
        </div>
      </div>
      </Link>
    </>
  );
}
