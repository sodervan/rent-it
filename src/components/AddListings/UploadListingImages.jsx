import { Button, Spinner } from "@material-tailwind/react";
import { IconPlus, IconX } from "@tabler/icons-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import SelectComponent from "@/components/AddListings/SelectComponent.jsx";

const UploadListingImages = () => {
  const navigate = useNavigate();
  const [imagesByTag, setImagesByTag] = useState({});
  const [newImages, setNewImages] = useState({}); // Store only new images
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingImages, setFetchingImages] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [searchParams] = useSearchParams();
  const encodedItemId = searchParams.get("itemId");

  const decodeId = (encodedId) => {
    return atob(encodedId);
  };
  const itemId = encodedItemId ? decodeId(encodedItemId) : null;

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

  // FETCH EXISTING IMAGES
  useEffect(() => {
    const fetchExistingImages = async () => {
      const storedDetails = JSON.parse(localStorage.getItem("basicDetails"));
      const listingId = encodedItemId ? itemId : storedDetails?.listingId;
      console.log(listingId);
      if (!listingId) {
        setFetchingImages(false);
        return;
      }

      try {
        const response = await axios.get(
          `${apiUrl}/api/v1/agents/listings/${listingId}/images`,
          { withCredentials: true },
        );
        console.log(response);
        if (response.data.status === "success") {
          const organizedImages = {};
          response.data.payload.forEach((image) => {
            const { tag } = image;
            if (!organizedImages[tag.id]) {
              organizedImages[tag.id] = [];
            }
            organizedImages[tag.id].push({
              id: image.id,
              data: image.imageUrl,
              isExisting: true,
              listingId: image.listingId,
            });
          });
          setImagesByTag(organizedImages);
        }
      } catch (error) {
        toast.error("Failed to fetch existing images.");
      } finally {
        setFetchingImages(false);
      }
    };

    fetchExistingImages();
  }, [encodedItemId, itemId]);

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
        await validateImageResolution(file);
        const reader = new FileReader();
        reader.onload = () => {
          // Add to both imagesByTag for display and newImages for upload
          const newImage = {
            id: Date.now() + Math.random(),
            data: reader.result,
            isExisting: false,
            file: file, // Store the file for later upload
          };

          setImagesByTag((prev) => ({
            ...prev,
            [selectedTag]: [...(prev[selectedTag] || []), newImage],
          }));

          setNewImages((prev) => ({
            ...prev,
            [selectedTag]: [...(prev[selectedTag] || []), newImage],
          }));
        };
        reader.readAsDataURL(file);
      } catch (error) {
        toast.error(error);
      }
    }
  };

  // REMOVE IMAGE
  const removeImage = async (tagId, imageId, isExisting) => {
    const storedDetails = JSON.parse(localStorage.getItem("basicDetails"));
    const listingId = encodedItemId ? itemId : storedDetails?.listingId;

    if (isExisting) {
      try {
        await axios.delete(
          `${apiUrl}/api/v1/agents/listings/${listingId}/image/${imageId}`,
          { withCredentials: true },
        );
        toast.success("Image deleted successfully");
      } catch (error) {
        toast.error("Failed to delete image");
        return;
      }
    }

    // Remove from both states
    setImagesByTag((prev) => ({
      ...prev,
      [tagId]: prev[tagId].filter((image) => image.id !== imageId),
    }));

    setNewImages((prev) => ({
      ...prev,
      [tagId]: (prev[tagId] || []).filter((image) => image.id !== imageId),
    }));
  };

  // UPLOAD IMAGES
  const uploadImages = async () => {
    setLoading(true);
    const storedDetails = JSON.parse(localStorage.getItem("basicDetails"));
    const listingId = encodedItemId ? itemId : storedDetails?.listingId;

    try {
      const uploadPromises = Object.entries(newImages).map(
        async ([tagId, images]) => {
          if (images.length === 0) return;

          const formData = new FormData();
          images.forEach((image, index) => {
            formData.append("images", image.file, `image_${index}.jpg`);
          });

          const response = await axios.post(
            `${apiUrl}/api/v1/agents/listings/${listingId}/image/${tagId}`,
            formData,
            {
              withCredentials: true,
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
          );

          if (response.data.status === "success") {
            toast.success(`Images uploaded successfully!`);
          } else {
            throw new Error(`Failed to upload images for tagId: ${tagId}`);
          }
        },
      );

      await Promise.all(uploadPromises);
      setNewImages({});
      setTimeout(
        () =>
          navigate(
            `/agent/addlisting/10${encodedItemId ? "?itemId=" + encodedItemId : ""}`,
          ),
        500,
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while uploading images.",
      );
    } finally {
      setLoading(false);
    }
  };

  const formattedTags = tags.map((tag) => ({
    value: tag.id,
    label: tag.name,
  }));

  // Rest of your JSX remains the same...
  return (
    <div className="mt-22 px-6">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <p className="text-xl font-medium">Add New Listing</p>
      </div>

      <p className="mt-4 text-lg font-medium">Upload Listing Images</p>
      <p className="mb-2 mt-4 text-md text-gray-700 font-medium">
        ** At least 4 images in total
      </p>
      <p className="text-sm text-gray-500 mb-4">
        Organize images under tags. Drag to rearrange or place cover image on
        top.
      </p>

      {/* Tag Selector */}
      <div className="mb-4">
        <SelectComponent
          options={formattedTags}
          value={selectedTag}
          onChange={(value) => setSelectedTag(value)}
          label="Select Image Tag"
          placeholder="Select a tag"
          disabled={tags.length === 0}
        />
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
            Click to upload{" "}
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
        {fetchingImages ? (
          <div className="flex justify-center">
            <Spinner className="h-8 w-8" />
          </div>
        ) : imagesByTag[selectedTag]?.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {imagesByTag[selectedTag].map((image) => (
              <div
                key={image.id}
                className="relative group border rounded-lg overflow-hidden"
              >
                <img
                  src={image.isExisting ? image.data : image.data}
                  alt="Uploaded"
                  className="w-full h-32 object-cover"
                />
                <button
                  onClick={() =>
                    removeImage(selectedTag, image.id, image.isExisting)
                  }
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
          onClick={() => {
            navigate(
              `/agent/addlisting/8${encodedItemId ? `?itemId=${encodedItemId}` : ""}`,
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
