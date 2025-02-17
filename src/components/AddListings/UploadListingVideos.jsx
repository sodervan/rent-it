import { Button, Spinner } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const MAX_TOTAL_SIZE_MB = 8;
const MAX_VIDEO_COUNT = 2;

const UploadListingVideos = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]); // New videos to be uploaded
  const [existingVideos, setExistingVideos] = useState([]); // Existing videos
  const [videosToRemove, setVideosToRemove] = useState([]); // Track videos to be removed
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [searchParams] = useSearchParams();
  const encodedItemId = searchParams.get("itemId");

  const decodeId = (encodedId) => {
    return atob(encodedId);
  };
  const itemId = encodedItemId ? decodeId(encodedItemId) : null;

  // Fetch existing videos when component mounts
  useEffect(() => {
    const fetchExistingVideos = async () => {
      const storedDetails = JSON.parse(localStorage.getItem("basicDetails"));
      const listingId = encodedItemId ? itemId : storedDetails?.listingId;

      try {
        const response = await axios.get(
          `${apiUrl}/api/v1/agents/listings/${listingId}/video`,
          { withCredentials: true },
        );
        console.log(response);
        if (
          response.data.status === "success" &&
          response.data.payload?.length > 0
        ) {
          const formattedVideos = response.data.payload.map((video) => ({
            id: video.id,
            url: video.videoUrl,
            createdAt: video.createdAt,
            listingId: video.listingId,
          }));
          setExistingVideos(formattedVideos);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
        toast.error("Failed to load existing videos");
      } finally {
        setIsLoading(false);
      }
    };

    if (itemId) {
      fetchExistingVideos();
    } else {
      setIsLoading(false);
    }
  }, [apiUrl, encodedItemId, itemId]);

  const handleVideoUpload = (file) => {
    const fileSizeMB = file.size / (1024 * 1024);
    const totalSizeMB =
      videos.reduce((acc, video) => acc + video.file.size, 0) / (1024 * 1024) +
      fileSizeMB;

    const totalVideoCount =
      videos.length + existingVideos.length - videosToRemove.length;

    if (totalVideoCount >= MAX_VIDEO_COUNT) {
      toast.error(`You can upload a maximum of ${MAX_VIDEO_COUNT} videos.`);
      return;
    }

    if (totalSizeMB > MAX_TOTAL_SIZE_MB) {
      toast.error(
        `The total size of uploaded videos must not exceed ${MAX_TOTAL_SIZE_MB} MB.`,
      );
      return;
    }

    // Check for duplicate names in both new and existing videos
    const videoName = file.name.toLowerCase();
    const isDuplicate = [...videos, ...existingVideos].some((video) => {
      const existingName = (video.file?.name || video.url).toLowerCase();
      return (
        existingName.includes(videoName) || videoName.includes(existingName)
      );
    });

    if (isDuplicate) {
      toast.error("A video with this name already exists");
      return;
    }

    const newVideo = {
      file,
      preview: URL.createObjectURL(file),
    };

    setVideos((prev) => [...prev, newVideo]);
  };

  const removeNewVideo = (index) => {
    setVideos((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingVideo = (videoId) => {
    setVideosToRemove((prev) => [...prev, videoId]);
    setExistingVideos((prev) => prev.filter((video) => video.id !== videoId));
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
    const storedDetails = JSON.parse(localStorage.getItem("basicDetails"));
    const listingId = encodedItemId ? itemId : storedDetails?.listingId;

    if (videos.length === 0 && existingVideos.length === 0) {
      toast.error("Please upload at least one video before proceeding.");
      return;
    }

    setIsUploading(true);

    try {
      // Then upload new videos if any
      if (videos.length > 0) {
        const formData = new FormData();
        videos.forEach((video) => {
          formData.append("video", video.file);
        });

        const response = await axios.post(
          `${apiUrl}/api/v1/agents/listings/${listingId}/video`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        if (response.data.status === "success") {
          toast.success("Videos updated successfully!");
          setTimeout(
            () =>
              navigate(
                `/agent/addlisting/11${encodedItemId ? "?itemId=" + encodedItemId : ""}`,
              ),
            500,
          );
        }
      } else {
        // If we only removed videos and didn't add new ones
        toast.success("Videos updated successfully!");
        setTimeout(
          () =>
            navigate(
              `/agent/addlisting/11${encodedItemId ? "?itemId=" + encodedItemId : ""}`,
            ),
          500,
        );
      }
    } catch (error) {
      console.error("Error updating videos:", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while updating videos.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner className="w-8 h-8" color="purple" />
      </div>
    );
  }

  return (
    <div>
      <div>
        <div className="flex items-center justify-between border-b border-gray-200 pb-4 px-6">
          <p className="text-xl font-medium">Add New Listing Videos</p>
        </div>
        <div className="px-6">
          <p className="text-gray-500 mt-2 font-medium">Step 10 of 13</p>
          <p className="mt-2 text-lg">Upload Listing Videos</p>
          <p className="text-sm text-gray-500 my-2">
            Add high-quality videos to attract potential renters. Max 2 videos,
            total size 8MB.
          </p>

          {/* Existing Videos Section */}
          {existingVideos.length > 0 && (
            <div className="mt-4">
              <p className="font-medium mb-2">Existing Videos</p>
              <div className="grid grid-cols-1 gap-4">
                {existingVideos.map((video) => (
                  <div
                    key={video.id}
                    className="relative group w-full h-full border border-gray-300 rounded-lg overflow-hidden"
                  >
                    <video
                      src={video.url}
                      className="w-full h-full object-cover"
                      controls
                    />
                    <button
                      className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md opacity-100 md:opacity-0 group-hover:opacity-100 transition duration-300"
                      onClick={() => removeExistingVideo(video.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload New Videos Section */}
          {existingVideos.length + videos.length - videosToRemove.length <
            MAX_VIDEO_COUNT && (
            <>
              <div className="mt-6">
                <div
                  className="w-full border border-gray-500 rounded-lg px-3 py-4 flex flex-col gap-3 items-center justify-center cursor-pointer"
                  onClick={() => document.getElementById("videoInput").click()}
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
                    />
                    <button
                      className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md opacity-100 md:opacity-0 group-hover:opacity-100 transition duration-300"
                      onClick={() => removeNewVideo(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="flex justify-between my-8 gap-4 px-6">
          <Button
            className="font-poppins bg-secondaryPurple text-primaryPurple w-full font-medium"
            onClick={() =>
              navigate(
                `/agent/addlisting/9${encodedItemId ? `?itemId=${encodedItemId}` : ""}`,
              )
            }
          >
            Previous
          </Button>
          <Button
            className="font-poppins bg-primaryPurple text-white w-full flex justify-center items-center"
            onClick={uploadVideos}
            disabled={
              isUploading ||
              (videos.length === 0 && existingVideos.length === 0)
            }
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
