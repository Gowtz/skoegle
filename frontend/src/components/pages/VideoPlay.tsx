import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { BACKEND_URL } from "../../lib/utils";
import Header from "../customComponents/Header";

export default function VideoPlay() {
  const params = useParams();
  const [videoUrl, setVideoUrl] = useState();
  console.log(BACKEND_URL);
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/getvidbyid?id=${params.id}`)
      .then((res) => {
        setVideoUrl(res.data.URL);
        console.log(res.data.URL)
      })
      .catch((res) => console.log(res));
  }, []);

  return (
    <>
      <Header />
      <div className="container lg:w-10/12 mx-auto my-10 max-h-screen flex flex-col justify-center items-center ">
        <h1 className=" mb-10 flex items-center gap-10">
          {" "}
          <span className="text-2xl font-semibold">File Name: </span>
          {params.id}.mp4
        </h1>
        {videoUrl ? (
          <video
            width="full"
            height="full"
            controls
            className="rounded-lg   aspect-video"
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p>Loading video...</p>
        )}
      </div>
    </>
  );
}
