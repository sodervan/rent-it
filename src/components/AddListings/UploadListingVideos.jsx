import { Button, Spinner } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // For toast notifications
import axios from "axios"; // Import Axios

const MAX_TOTAL_SIZE_MB = 8;
const MAX_VIDEO_COUNT = 2;

const UploadListingVideos = ({ listingId }) => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]); // Stores uploaded videos
  const [isUploading, setIsUploading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleVideoUpload = (file) => {
    const fileSizeMB = file.size / (1024 * 1024);
    const totalSizeMB =
      videos.reduce((acc, video) => acc + video.file.size, 0) / (1024 * 1024) +
      fileSizeMB;

    if (videos.length >= MAX_VIDEO_COUNT) {
      toast.error(`You can upload a maximum of ${MAX_VIDEO_COUNT} videos.`);
      return;
    }

    if (totalSizeMB > MAX_TOTAL_SIZE_MB) {
      toast.error(
        `The total size of uploaded videos must not exceed ${MAX_TOTAL_SIZE_MB} MB.`,
      );
      return;
    }

    const newVideo = {
      file,
      preview: URL.createObjectURL(file),
    };

    setVideos([...videos, newVideo]);
  };

  const removeVideo = (index) => {
    setVideos(videos.filter((_, i) => i !== index));
  };

  const handleFileInput = (event) => {
    const file = event.target.files[0];
    if (file) {
      const isValidType = ["video/mp4", "video/avi"].includes(file.type);
      if (!isValidType) {
        toast.error("Only MP4 and AVI formats are supported.");
        return;
      }
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
      const isValidType = ["video/mp4", "video/avi"].includes(file.type);
      if (!isValidType) {
        toast.error("Only MP4 and AVI formats are supported.");
        return;
      }
      handleVideoUpload(file);
    }
  };

  const uploadVideos = async () => {
    const storedDetails = JSON.parse(localStorage.getItem("basicDetails")); // Keep localStorage for storedDetails

    if (videos.length === 0) {
      toast.error("Please upload at least one video before saving.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();

    videos.forEach((video, index) => {
      formData.append(`video`, video.file);
    });

    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/agents/listings/${storedDetails.listingId}/video`,
        formData,
        {
          withCredentials: true, // Include cookies in the request
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log("Upload Response:", response); // Log the full response

      if (response.data.status === "success") {
        toast.success("Videos uploaded successfully!");
        setVideos([]);
        setTimeout(() => {
          navigate("/agent/addlisting/11");
        }, 500);
      } else {
        toast.error(`Upload failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error uploading videos:", error); // Log the full error object
      console.error("Error Response Data:", error.response?.data); // Log the error response data
      toast.error(
        error.response?.data?.message ||
          "An error occurred while uploading videos.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <div>
        <div className="flex items-center justify-between border-b border-gray-200 pb-4 px-6">
          <p className="text-xl font-medium">Add New Listing Videos</p>
          <Button
            className="bg-secondaryPurple text-primaryPurple font-poppins font-medium shadow-none hover:shadow-none hover:bg-primaryPurple hover:text-white duration-300 transition-all"
            onClick={uploadVideos}
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Save"}
          </Button>
        </div>
        <div className="px-6">
          <p className="text-gray-500 mt-2 font-medium">Step 10 of 15</p>
          <p className="mt-2 text-lg">Upload Listing Videos</p>
          <p className="text-sm text-gray-500 my-2">
            Add high-quality videos to attract potential renters. Max 2 videos,
            total size 8MB.
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
              <p className="text-gray-500 text-center text-[15px]">
                <span className="text-primaryPurple cursor-pointer hover:underline">
                  Click to upload
                </span>{" "}
                or drag and drop MP4, AVI (max. 8MB total).
              </p>
            </div>

            <input
              id="videoInput"
              type="file"
              accept="video/mp4, video/avi"
              className="hidden"
              onChange={handleFileInput}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4">
            {videos.map((video, index) => (
              <div
                key={index}
                className="relative group w-full h-full border border-gray-300 rounded-lg overflow-hidden"
              >
                <video
                  src={video.preview}
                  className="w-full h-full object-cover"
                  controls
                ></video>
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
        <div className="flex justify-between my-8 gap-4 px-6">
          <Button
            className="font-poppins bg-secondaryPurple text-primaryPurple w-full font-medium"
            onClick={() => navigate("/agent/addlisting/9")}
          >
            Previous
          </Button>
          <Button
            className="font-poppins bg-primaryPurple text-white w-full flex justify-center items-center"
            onClick={uploadVideos}
            disabled={isUploading}
          >
            {isUploading ? (
              <Spinner className="w-4 h-4" color="black" />
            ) : (
              "Proceed"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadListingVideos;
