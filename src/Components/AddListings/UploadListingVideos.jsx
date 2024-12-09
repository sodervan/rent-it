import { Button, Spinner } from "@material-tailwind/react";
import { useState } from "react";

const UploadListingVideos = () => {
  const [videos, setVideos] = useState([]);

  const handleVideoUpload = (file) => {
    const newVideo = {
      file,
      preview: URL.createObjectURL(file),
    };
    setVideos((prev) => [...prev, newVideo]);
  };

  const removeVideo = (index) => {
    setVideos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFileInput = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleVideoUpload(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("videoInput").click();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      handleVideoUpload(file);
    }
  };

  return (
    <div className="mt-6">
      <div>
        <div className="flex items-center justify-between border-b border-gray-200 pb-4 px-6">
          <p className="text-xl font-medium">Add New Listing Videos</p>
          <Button className="bg-secondaryPurple text-primaryPurple font-poppins font-medium shadow-none hover:shadow-none hover:bg-primaryPurple hover:text-white duration-300 transition-all">
            Save
          </Button>
        </div>
        <div className="px-6">
          <div>
            <p className="text-gray-500 mt-2 font-medium">Step 10 of 15</p>
            <p className="mt-2 text-lg">Upload Listing Videos</p>
            <p className="text-sm text-gray-500 my-2">
              Add high-quality videos to attract potential renters. Drag to
              rearrange and place cover videos to the top.
            </p>
            <div className="mt-6">
              <div
                className="w-full border border-gray-500 rounded-lg px-3 py-4 flex flex-col gap-3 items-center justify-center cursor-pointer"
                onClick={triggerFileInput}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                <img
                  src="https://res.cloudinary.com/dmlgns85e/image/upload/v1725362394/Featured_icon_mtrbjd.png"
                  alt="Placeholder"
                  className="w-16 h-16"
                />
                <div>
                  <p className="text-gray-500 text-center text-[15px]">
                    <span className="text-primaryPurple cursor-pointer hover:underline">
                      Click to upload
                    </span>{" "}
                    or drag and drop MP4, AVI (max. 5MB)
                  </p>
                </div>
              </div>

              {/* Hidden file input */}
              <input
                id="videoInput"
                type="file"
                accept="video/mp4, video/avi"
                className="hidden"
                onChange={handleFileInput}
              />
            </div>

            {/* Display Uploaded Videos */}
            <div className="flex flex-wrap gap-4 mt-6">
              {videos.map((video, index) => (
                <div
                  key={index}
                  className="relative group w-32 h-32 border border-gray-300 rounded-lg overflow-hidden"
                >
                  <video
                    src={video.preview}
                    className="w-full h-full object-cover"
                    controls
                  ></video>

                  {/* Remove button */}
                  <button
                    className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md opacity-100 md:opacity-0 group-hover:opacity-100 transition duration-300"
                    onClick={() => removeVideo(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-8 gap-4 px-6">
          <Button
            className="font-poppins bg-secondaryPurple text-primaryPurple w-full font-medium"
            // Replace with navigation logic
            onClick={() => console.log("Go to Previous Step")}
          >
            Previous
          </Button>
          <Button className="font-poppins bg-primaryPurple text-white w-full flex justify-center items-center">
            Proceed
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadListingVideos;
