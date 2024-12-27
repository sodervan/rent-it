import { Button, Option, Select, Spinner } from "@material-tailwind/react";
import {IconPlus, IconX} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const UploadListingImages = () => {
  const navigate = useNavigate();
  const [imagesByTag, setImagesByTag] = useState({}); // Store images grouped by tags
  const [tags, setTags] = useState([]); // Store image tags
  const [selectedTag, setSelectedTag] = useState(null); // Current tag
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch image tags
    const token = localStorage.getItem("accessToken");
    fetch(
      "https://rent-it-api.onrender.com/api/v1/agents/listings-attributes/imageTags",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTags(data.payload.data);
        setSelectedTag(data.payload.data[0]?.id || null);
      })
      .catch((error) => console.error("Failed to fetch tags", error));
  }, []);

  const handleFile = (files) => {
    if (!selectedTag)
      return alert("Please select a tag before uploading images.");

    const selectedFiles = Array.from(files);
    selectedFiles.forEach((file) => {
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
    });
  };

  const removeImage = (tagId, imageId) => {
    setImagesByTag((prev) => ({
      ...prev,
      [tagId]: prev[tagId].filter((image) => image.id !== imageId),
    }));
  };
  // UPLOAD IMAGES
  const uploadImages = () => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    const storedDetails = JSON.parse(localStorage.getItem("basicDetails"));

    // Loop through each tag and its images
    const uploadPromises = Object.entries(imagesByTag).map(
      async ([tagId, images]) => {
        const formData = new FormData();
        images.forEach((image, index) => {
          // Add each image as a file in FormData
          const byteString = atob(image.data.split(",")[1]);
          const mimeString = image.data
            .split(",")[0]
            .split(":")[1]
            .split(";")[0];

          // Create a Blob for the image
          const arrayBuffer = new Uint8Array(byteString.length);
          for (let i = 0; i < byteString.length; i++) {
            arrayBuffer[i] = byteString.charCodeAt(i);
          }
          const blob = new Blob([arrayBuffer], { type: mimeString });

          // Append Blob to FormData
          formData.append("images", blob, `image_${index}.jpg`);
        });

        return fetch(
          `https://rent-it-api.onrender.com/api/v1/agents/listings/${storedDetails.listingId}/image/${tagId}?id=${storedDetails.listingId}?tagId=${tagId}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData, // Send FormData
          },
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Failed to upload images for tagId: ${tagId}`);
            }
            return response.json();
          })
          .then(() => {
            console.log(`Images for tagId: ${tagId} uploaded successfully`);
              setTimeout(() => navigate("/agent/addlisting/10"), 500);
          })
          .catch((error) => {
            console.error(`Error uploading images for tagId: ${tagId}`, error);
            throw error; // Allow catching this later
          });
      },
    );

    Promise.all(uploadPromises)
      .then(() => {
        setImagesByTag({});
      })
      .catch((error) => {
        console.error("Failed to upload images", error);
      })
      .finally(() => setLoading(false));
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
          {loading ? <Spinner className="h-4 w-4" /> : "Upload All"}
        </Button>
      </div>

      <p className="mt-4 text-lg font-medium">Upload Listing Images</p>
      <p className="text-sm text-gray-500 mb-4">
        Organize images under tags. Drag to rearrange or place cover image on
        top.
      </p>

      {/* Tag Selector */}
      <div className="mb-4">
        <Select
          label="Select Image Tag"
          onChange={(value) => {
            setSelectedTag(value);
            console.log(value);
          }} // Directly use the value here
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
        <IconPlus className="text-4xl text-primaryPurple" />
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
                  <IconX size={16} />
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
          {loading ? <Spinner className="h-4 w-4" /> : "Proceed"}
        </Button>
      </div>
    </div>
  );
};

export default UploadListingImages;
