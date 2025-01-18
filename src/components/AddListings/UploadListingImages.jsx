import { Button, Option, Select, Spinner } from "@material-tailwind/react";
import { IconPlus, IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UploadListingImages = () => {
  const navigate = useNavigate();
  const [imagesByTag, setImagesByTag] = useState({});
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  // FETCH IMAGE TAGS
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/v1/agents/listings-attributes/imageTags`,
          { withCredentials: true },
        );

        if (response.data.status === "success") {
          setTags(response.data.payload.data);
          setSelectedTag(response.data.payload.data[0]?.id || null);
        } else {
          toast.error("Failed to fetch image tags. Please try again.");
        }
      } catch (error) {
        toast.error("An error occurred while fetching image tags.");
      }
    };

    fetchTags();
  }, []);

  // VALIDATE IMAGE RESOLUTION
  const validateImageResolution = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const width = img.width;
        const height = img.height;
        if (width >= 800 && height >= 600) {
          resolve(true);
        } else {
          reject(
            `Image resolution (${width}x${height}) is too low. Minimum required: 800x600 pixels.`,
          );
        }
      };
      img.onerror = () => reject("Failed to load image.");
    });
  };

  // HANDLE FILE UPLOAD
  const handleFile = async (files) => {
    if (!selectedTag) {
      toast.error("Please select a tag before uploading images.");
      return;
    }

    const selectedFiles = Array.from(files);
    for (const file of selectedFiles) {
      try {
        await validateImageResolution(file); // Validate image resolution
        const reader = new FileReader();
        reader.onload = () => {
          setImagesByTag((prev) => ({
            ...prev,
            [selectedTag]: [
              ...(prev[selectedTag] || []),
              { id: Date.now() + Math.random(), data: reader.result },
            ],
          }));
        };
        reader.readAsDataURL(file);
      } catch (error) {
        toast.error(error); // Display error message for invalid resolution
      }
    }
  };

  // REMOVE IMAGE
  const removeImage = (tagId, imageId) => {
    setImagesByTag((prev) => ({
      ...prev,
      [tagId]: prev[tagId].filter((image) => image.id !== imageId),
    }));
  };

  // UPLOAD IMAGES
  const uploadImages = async () => {
    setLoading(true);
    const storedDetails = JSON.parse(localStorage.getItem("basicDetails"));

    try {
      const uploadPromises = Object.entries(imagesByTag).map(
        async ([tagId, images]) => {
          const formData = new FormData();
          images.forEach((image, index) => {
            const byteString = atob(image.data.split(",")[1]);
            const mimeString = image.data
              .split(",")[0]
              .split(":")[1]
              .split(";")[0];
            const arrayBuffer = new Uint8Array(byteString.length);
            for (let i = 0; i < byteString.length; i++) {
              arrayBuffer[i] = byteString.charCodeAt(i);
            }
            const blob = new Blob([arrayBuffer], { type: mimeString });
            formData.append("images", blob, `image_${index}.jpg`);
          });

          const response = await axios.post(
            `${apiUrl}/api/v1/agents/listings/${storedDetails.listingId}/image/${tagId}`,
            formData,
            {
              withCredentials: true,
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
          );

          if (response.data.status === "success") {
            toast.success(
              `Images uploaded successfully!`,
            );
          } else {
            throw new Error(`Failed to upload images for tagId: ${tagId}`);
          }
        },
      );

      await Promise.all(uploadPromises);
      setImagesByTag({});
      setTimeout(() => navigate("/agent/addlisting/10"), 500);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while uploading images.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="mt-22 px-6">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <p className="text-xl font-medium">Add New Listing</p>
          <Button
              className="bg-secondaryPurple text-primaryPurple font-medium"
              onClick={uploadImages}
              disabled={loading}
          >
            {loading ? <Spinner className="h-4 w-4"/> : "Upload All"}
          </Button>
        </div>

        <p className="mt-4 text-lg font-medium">Upload Listing Images</p>
        <p className="mt-4 text-lg font-medium">At least 4 images in total</p>
        <p className="text-sm text-gray-500 mb-4">
          Organize images under tags. Drag to rearrange or place cover image on
          top.
        </p>

        {/* Tag Selector */}
        <div className="mb-4">
          <Select
              label="Select Image Tag"
              onChange={(value) => setSelectedTag(value)}
              className="w-full"
          >
            {tags ? (
                tags.map((tag) => (
                    <Option key={tag.id} value={tag.id}>
                      {tag.name}
                    </Option>
                ))
            ) : (
                <p>No tags available</p>
            )}
          </Select>
        </div>

        {/* File Upload */}
        <div
            className="w-full border border-gray-500 rounded-lg px-3 py-4 flex flex-col gap-3 items-center justify-center cursor-pointer"
            onClick={() => document.getElementById("fileInput").click()}
            onDrop={(e) => {
              e.preventDefault();
              handleFile(e.dataTransfer.files);
            }}
            onDragOver={(e) => e.preventDefault()}
        >
          <IconPlus className="text-4xl text-primaryPurple"/>
          <p className="text-gray-500 text-center">
          <span className="text-primaryPurple cursor-pointer hover:underline">
            Click to upload
          </span>
            or drag and drop PNG, JPG (max. 800x400px)
          </p>
        </div>
        <input
            id="fileInput"
            type="file"
            accept="image/png, image/jpeg"
            multiple
            className="hidden"
            onChange={(e) => handleFile(e.target.files)}
        />

        {/* Image Previews */}
        <div className="mt-6">
          {imagesByTag[selectedTag]?.length ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {imagesByTag[selectedTag].map((image) => (
                    <div
                        key={image.id}
                        className="relative group border rounded-lg overflow-hidden"
                    >
                      <img
                          src={image.data}
                          alt="Uploaded"
                          className="w-full h-32 object-cover"
                      />
                      <button
                          onClick={() => removeImage(selectedTag, image.id)}
                          className="absolute top-1 right-1 bg-gray-500 opacity-50 text-white rounded-full p-1"
                      >
                        <IconX size={16}/>
                      </button>
                    </div>
                ))}
              </div>
          ) : (
              <p className="text-gray-500 text-center">
                No images uploaded for this tag.
              </p>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="my-8 flex items-center gap-4">
          <Button
              className="bg-secondaryPurple text-primaryPurple w-full"
              onClick={() => navigate("/agent/addlisting/8")}
          >
            Previous
          </Button>
          <Button
              className={`w-full flex justify-center ${
                  loading
                      ? "bg-gray-200 text-gray-500"
                      : "bg-primaryPurple text-white"
              }`}
              onClick={uploadImages}
              disabled={loading}
          >
            {loading ? <Spinner className="h-4 w-4"/> : "Proceed"}
          </Button>
        </div>
      </div>
  );
};

export default UploadListingImages;
