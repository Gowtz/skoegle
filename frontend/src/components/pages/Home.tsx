import { useCallback, useState } from "react";
import Header from "../customComponents/Header";
import VideoUpload from "./VideoUpload";
import VideoList from "../customComponents/VideoList";

export default function Home() {
  const [uploadView, setUploadView] = useState<boolean>(false);
  const [videoView, setVideoView] = useState<boolean>(true);
  const handleVideoUpload = useCallback(() => {
    setVideoView(true);
    setUploadView(false);
  }, []);

  const handleUploadView= useCallback(() => {
    setVideoView(false);
    setUploadView(true);
  }, []);
  return (
    <>
      <Header handleUploadView={handleUploadView} handleVideoUpload={handleVideoUpload} />
      {uploadView && <VideoUpload />}
      {videoView && (
        <>
          <VideoList />
        </>
      )}
    </>
  );
}
