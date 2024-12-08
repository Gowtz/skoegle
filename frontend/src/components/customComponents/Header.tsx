import { Button } from "../ui/button";

export default function Header({handleVideoUpload, handleUploadView}:any) {
  return (
    <header className="fixed w-full  top-0 bg-white">
      <nav className="flex w-10/12 mx-auto justify-between h-20 items-center ">
        <a href="/">
          <div className="logo text-md lg:text-xl font-semibold hover:scale-105 transition-all duration-100">
            SKOEGLE
          </div>
        </a>
        <div className="flex gap-3">
          <Button variant={"secondary"} onClick={handleVideoUpload}>View</Button>
          <Button onClick={handleUploadView}>Video Upload</Button>
        </div>
      </nav>
    </header>
  );
}
