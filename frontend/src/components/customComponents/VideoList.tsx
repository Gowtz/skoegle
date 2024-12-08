import { useState } from "react";
import VideoData, { VideoDataType } from "../../sample";
import { DatePickerWithRange } from "../ui/date-picker";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { DateRange } from "react-day-picker";
export default function VideoList() {
  const [data, setData] = useState<VideoDataType[] | null>();
  const [dateValue,setDateValue] = useState<DateRange | undefined>()
  function handleSubmit(e) {
    e.preventDefault()
    alert(JSON.stringify(dateValue))
    
  }
  return (
    <>
      <div className="container lg:w-10/12 mx-auto mt-28">
        <form
          onSubmit={handleSubmit}
          className="mb-16 text-center flex  flex-col items-center justify-center gap-5"
        >
          <Label className="text-xl ">Pick a date</Label>
          <div className="flex gap-5">
            <DatePickerWithRange onChangeDate={setDateValue}/>
            <Button type="submit">Submit</Button>
          </div>
        </form>
        {data && (
          <div className="grid grid-cols-3 gap-5 ">
            {data?.map((ele, index) => (
              <VideoCard key={index} title={ele.title} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function VideoCard({ title }: { title: string }) {
  return (
    <>
      <div className="card flex flex-col min-h-[200px]">
        <div className="img bg-zinc-300 rounded-lg mb-5 w-full h-full"></div>
        <h3>{title}</h3>
      </div>
    </>
  );
}
