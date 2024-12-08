import Home from "./components/pages/Home";
import { Routes, Route } from "react-router";
import VideoPlay from "./components/pages/VideoPlay";

export default function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video/:id" element={<VideoPlay />} />

        </Routes>
    </>
  );
}



