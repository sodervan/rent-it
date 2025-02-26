import { Button, Spinner, Checkbox } from "@material-tailwind/react";
import {
  IconPlus,
  IconX,
  IconTrash,
  IconAlertCircle,
} from "@tabler/icons-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UploadListingVideos = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]); // Existing videos
  const [newVideos, setNewVideos] = useState([]); // Pending upload videos
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingVideos, setFetchingVideos] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [searchParams] = useSearchParams();
  const encodedItemId = searchParams.get("itemId");
  const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB in bytes

  const decodeId = (encodedId) => {
    return atob(encodedId);
  };
  const itemId = encodedItemId ? decodeId(encodedItemId) : null;

  // Fetch existing videos
  useEffect(() => {
    fetchExistingVideos();
  }, [encodedItemId, itemId]);

  const fetchExistingVideos = async () => {
    const storedDetails = JSON.parse(localStorage.getItem("basicDetails"));
    const listingId = encodedItemId ? itemId : storedDetails?.listingId;

    if (!listingId) {
      setFetchingVideos(false);
      return;
    }

    try {
      const response = await axios.get(
        `${apiUrl}/api/v1/agents/listings/${listingId}/video`,
        { withCredentials: true },
      );

      if (response.data.status === "success") {
        setVideos(response.data.payload || []);
      }
    } catch (error) {
      toast.error("Failed to fetch videos");
    } finally {
      setFetchingVideos(false);
    }
  };

  // Validate video file
  const validateVideo = (file) => {
    return new Promise((resolve, reject) => {
      if (file.size > MAX_FILE_SIZE) {
        reject(`File ${file.name} is too large. Maximum size is 8MB`);
        return;
      }

      // Create video element to check duration
      const video = document.createElement("video");
      video.preload = "metadata";

      video.onloadedmetadata = function () {
        window.URL.revokeObjectURL(video.src);
        if (video.duration > 180) {
          // 3 minutes max
          reject(
            `Video ${file.name} is too long. Maximum duration is 3 minutes`,
          );
        } else {
          resolve(true);
        }
      };

      video.onerror = () => {
        reject(`Failed to load video ${file.name}`);
      };

      video.src = URL.createObjectURL(file);
    });
  };

  // Handle file selection
  const handleFile = async (files) => {
    const selectedFiles = Array.from(files);

    if (newVideos.length + selectedFiles.length > 5) {
      toast.error("Maximum 5 videos allowed");
      return;
    }

    for (const file of selectedFiles) {
      try {
        await validateVideo(file);
        const videoUrl = URL.createObjectURL(file);

        setNewVideos((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            file,
            videoUrl,
            name: file.name,
            size: (file.size / (1024 * 1024)).toFixed(2), // Size in MB
          },
        ]);
      } catch (error) {
        toast.error(error);
      }
    }
  };

  // Handle select all videos for deletion
  const handleSelectAll = () => {
    if (selectedVideos.length === videos.length) {
      setSelectedVideos([]);
    } else {
      setSelectedVideos(videos.map((video) => video.id));
    }
  };

  // Handle single video selection
  const handleSelectVideo = (videoId) => {
    setSelectedVideos((prev) => {
      if (prev.includes(videoId)) {
        return prev.filter((id) => id !== videoId);
      } else {
        return [...prev, videoId];
      }
    });
  };

  // Remove pending video
  const removePendingVideo = (videoId) => {
    setNewVideos((prev) => prev.filter((video) => video.id !== videoId));
  };

  // Delete selected existing videos
  const deleteSelectedVideos = async () => {
    if (selectedVideos.length === 0) {
      toast.warning("Please select videos to delete");
      return;
    }

    if (
      !window.confirm(
        `Are you sure you want to delete ${selectedVideos.length} videos?`,
      )
    ) {
      return;
    }

    setLoading(true);
    try {
      const response = await axios.delete(
        `${apiUrl}/api/v1/agents/listings/video`,
        {
          data: { videosIds: selectedVideos },
          withCredentials: true,
        },
      );

      if (response.data.status === "success") {
        toast.success("Videos deleted successfully");
        setSelectedVideos([]);
        fetchExistingVideos();
      }
    } catch (error) {
      toast.error("Failed to delete videos");
    } finally {
      setLoading(false);
    }
  };

  // Upload all pending videos
  const uploadVideos = async () => {
    if (newVideos.length === 0) {
      navigate(
        `/agent/addlisting/11${encodedItemId ? "?itemId=" + encodedItemId : ""}`,
      );
      return;
    }

    setLoading(true);
    const storedDetails = JSON.parse(localStorage.getItem("basicDetails"));
    const listingId = encodedItemId ? itemId : storedDetails?.listingId;

    try {
      const uploadPromises = newVideos.map(async (video) => {
        const formData = new FormData();
        formData.append("video", video.file);

        return axios.post(
          `${apiUrl}/api/v1/agents/listings/${listingId}/video`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
      });

      await Promise.all(uploadPromises);
      toast.success("All videos uploaded successfully!");
      setTimeout(() => {
        navigate(
          `/agent/addlisting/11${encodedItemId ? "?itemId=" + encodedItemId : ""}`,
        );
      }, 500);
    } catch (error) {
      toast.error("Failed to upload some videos. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-22 px-6">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <p className="text-xl font-medium">Manage Listing Videos</p>
          <p className="text-sm text-gray-600 mt-1">
            Upload videos of different areas of this apartment
          </p>
        </div>
        {selectedVideos.length > 0 && (
          <Button
            color="red"
            className="flex items-center gap-2"
            onClick={deleteSelectedVideos}
            disabled={loading}
          >
            <IconTrash size={16} />
            Delete Selected ({selectedVideos.length})
          </Button>
        )}
      </div>

      {/* Upload Guidelines */}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg flex items-start gap-3">
        <IconAlertCircle
          className="text-blue-500 flex-shrink-0 mt-1"
          size={20}
        />
        <div className="text-sm text-blue-700">
          <p className="font-medium">Video Upload Guidelines:</p>
          <ul className="list-disc ml-4 mt-1">
            <li>Maximum 2 videos per listing</li>
            <li>Maximum file size: 8MB per video</li>
            <li>Maximum duration: 3 minutes</li>
            <li>Supported formats: MP4, WebM, MOV</li>
          </ul>
        </div>
      </div>

      {/* File Upload */}
      <div
        className="mt-6 w-full border border-gray-500 rounded-lg px-3 py-4 flex flex-col gap-3 items-center justify-center cursor-pointer"
        onClick={() => document.getElementById("videoInput").click()}
        onDrop={(e) => {
          e.preventDefault();
          handleFile(e.dataTransfer.files);
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <IconPlus className="text-4xl text-primaryPurple" />
        <p className="text-gray-500 text-center">
          <span className="text-primaryPurple cursor-pointer hover:underline">
            Click to upload{" "}
          </span>
          or drag and drop video files
        </p>
      </div>
      <input
        id="videoInput"
        type="file"
        accept="video/mp4,video/webm,video/mov"
        multiple
        className="hidden"
        onChange={(e) => handleFile(e.target.files)}
      />

      {/* Pending Videos */}
      {newVideos.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">Pending Uploads</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {newVideos.map((video) => (
              <div
                key={video.id}
                className="relative border rounded-lg overflow-hidden"
              >
                <video
                  src={video.videoUrl}
                  className="w-full h-48 object-cover"
                  controls
                />
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => removePendingVideo(video.id)}
                    className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <IconX size={16} />
                  </button>
                </div>
                <div className="p-2 bg-gray-50">
                  <p className="text-sm truncate">{video.name}</p>
                  <p className="text-xs text-gray-500">{video.size}MB</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Existing Videos */}
      <div className="mt-6">
        {fetchingVideos ? (
          <div className="flex justify-center">
            <Spinner className="h-8 w-8" />
          </div>
        ) : videos.length > 0 ? (
          <div className="border rounded-lg overflow-hidden">
            <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
              <Checkbox
                checked={
                  videos.length > 0 && selectedVideos.length === videos.length
                }
                onChange={handleSelectAll}
                label="Select All Existing Videos"
              />
              <span className="text-sm text-gray-500">
                {videos.length} existing video(s)
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="relative border rounded-lg overflow-hidden"
                >
                  <div className="absolute top-2 left-2 z-10">
                    <Checkbox
                      checked={selectedVideos.includes(video.id)}
                      onChange={() => handleSelectVideo(video.id)}
                    />
                  </div>
                  <video
                    src={video.videoUrl}
                    className="w-full h-48 object-cover"
                    controls
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-4">
            {videos.length === 0 && newVideos.length === 0 ? "No Uploads" : ""}
          </p>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="my-8 flex items-center gap-4">
        <Button
          className="bg-secondaryPurple text-primaryPurple w-full"
          onClick={() => {
            navigate(
              `/agent/addlisting/9${encodedItemId ? `?itemId=${encodedItemId}` : ""}`,
            );
          }}
        >
          Previous
        </Button>
        <Button
          className={`w-full flex justify-center ${
            loading
              ? "bg-gray-200 text-gray-500"
              : "bg-primaryPurple text-white"
          }`}
          onClick={uploadVideos}
          disabled={loading}
        >
          {loading ? (
            <Spinner className="h-4 w-4" />
          ) : (
            `Proceed${newVideos.length > 0 ? ` & Upload (${newVideos.length})` : ""}`
          )}
        </Button>
      </div>
    </div>
  );
};

export default UploadListingVideos;
