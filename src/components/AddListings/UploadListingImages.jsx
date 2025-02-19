import { Button } from "@material-tailwind/react";
import {
  IconPlus,
  IconX,
  IconCheck,
  IconTrash,
  IconAlertCircle,
} from "@tabler/icons-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import SelectComponent from "@/components/AddListings/SelectComponent.jsx";

const Spinner = () => (
  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
);

const LoadingOverlay = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primaryPurple" />
  </div>
);
const UploadListingImages = () => {
  const navigate = useNavigate();
  const [imagesByTag, setImagesByTag] = useState({});
  const [newImages, setNewImages] = useState({});
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingImages, setFetchingImages] = useState(true);
  const [selectedImages, setSelectedImages] = useState(new Set());
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [deletingImages, setDeletingImages] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;
  const [searchParams] = useSearchParams();
  const encodedItemId = searchParams.get("itemId");

  const decodeId = (encodedId) => {
    return atob(encodedId);
  };
  const itemId = encodedItemId ? decodeId(encodedItemId) : null;

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
  }, [apiUrl]);

  useEffect(() => {
    const fetchExistingImages = async () => {
      const storedDetails = JSON.parse(localStorage.getItem("basicDetails"));
      const listingId = encodedItemId ? itemId : storedDetails?.listingId;

      if (!listingId) {
        setFetchingImages(false);
        return;
      }

      try {
        const response = await axios.get(
          `${apiUrl}/api/v1/agents/listings/${listingId}/images`,
          { withCredentials: true },
        );

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
  }, [encodedItemId, itemId, apiUrl]);

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
          const newImage = {
            id: Date.now() + Math.random(),
            data: reader.result,
            isExisting: false,
            file: file,
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

  const toggleImageSelection = (imageId) => {
    setSelectedImages((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(imageId)) {
        newSet.delete(imageId);
      } else {
        newSet.add(imageId);
      }
      return newSet;
    });
  };

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

    setImagesByTag((prev) => ({
      ...prev,
      [tagId]: prev[tagId].filter((image) => image.id !== imageId),
    }));

    setNewImages((prev) => ({
      ...prev,
      [tagId]: (prev[tagId] || []).filter((image) => image.id !== imageId),
    }));
  };

  const deleteSelectedImages = async () => {
    if (selectedImages.size === 0) {
      toast.warning("Please select images to delete");
      return;
    }

    setDeletingImages(true);

    try {
      const requestBody = {
        imagesIds: Array.from(selectedImages).map((id) => id.toString()),
      };

      const response = await axios.delete(
        `${apiUrl}/api/v1/agents/listings/image`,
        {
          data: requestBody,
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data.status === "success") {
        setImagesByTag((prev) => {
          const newState = { ...prev };
          Object.keys(newState).forEach((tagId) => {
            newState[tagId] = newState[tagId].filter(
              (image) => !selectedImages.has(image.id),
            );
          });
          return newState;
        });

        setSelectedImages(new Set());
        setIsDeleteMode(false);
        toast.success("Selected images deleted successfully");
      } else {
        throw new Error(response.data.message || "Failed to delete images");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete selected images",
      );
    } finally {
      setDeletingImages(false);
    }
  };

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

  return (
    <div className="mt-22 px-6">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <p className="text-xl font-medium">Add New Listing</p>
        {imagesByTag[selectedTag]?.length > 0 && (
          <Button
            variant={isDeleteMode ? "outlined" : "filled"}
            color={isDeleteMode ? "red" : "gray"}
            className="ml-4 flex items-center gap-2"
            onClick={() => {
              setIsDeleteMode(!isDeleteMode);
              setSelectedImages(new Set());
            }}
          >
            <IconTrash size={16} />
            {isDeleteMode ? "Cancel Delete" : "Delete Images"}
          </Button>
        )}
      </div>

      <p className="mt-4 text-lg font-medium">Upload Listing Images</p>

      {/*GUIDELINES*/}
      <div className="my-4 p-4 bg-blue-50 rounded-lg flex items-start gap-3">
        <IconAlertCircle
          className="text-blue-500 flex-shrink-0 mt-1"
          size={20}
        />
        <div className="text-sm text-blue-700">
          <p className="font-medium">Images Upload Guidelines:</p>
          <ul className="list-disc ml-4 mt-1">
            <li>At least 4 images in total</li>
            <li>Maximum file size: 3MB per image</li>
            <li>Supported formats: JPEG, PNG</li>
            <li>
              {" "}
              Organize images under tags. Drag to rearrange or place cover image
              on top.
            </li>
          </ul>
        </div>
      </div>

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

      {fetchingImages ? (
        <LoadingOverlay />
      ) : (
        <>
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

          <div className="mt-6">
            {imagesByTag[selectedTag]?.length ? (
              <>
                {isDeleteMode && (
                  <div className="mb-4 flex justify-between items-center">
                    <p className="text-sm text-gray-600">
                      Selected: {selectedImages.size} images
                    </p>
                    <Button
                      color="red"
                      className="flex items-center gap-2"
                      onClick={deleteSelectedImages}
                      disabled={deletingImages || selectedImages.size === 0}
                    >
                      {deletingImages ? (
                        <Spinner />
                      ) : (
                        <>
                          <IconTrash size={16} />
                          Delete Selected
                        </>
                      )}
                    </Button>
                  </div>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {imagesByTag[selectedTag].map((image) => (
                    <div
                      key={image.id}
                      className={`relative group border rounded-lg overflow-hidden ${
                        isDeleteMode ? "cursor-pointer" : ""
                      } ${
                        selectedImages.has(image.id)
                          ? "ring-2 ring-red-500"
                          : ""
                      }`}
                      onClick={() =>
                        isDeleteMode && toggleImageSelection(image.id)
                      }
                    >
                      <img
                        src={image.data}
                        alt="Uploaded"
                        className="w-full h-32 object-cover"
                      />
                      {isDeleteMode ? (
                        <div className="absolute top-2 right-2">
                          {selectedImages.has(image.id) ? (
                            <IconCheck className="text-red-500" size={20} />
                          ) : (
                            <div className="w-5 h-5 border-2 border-gray-400 rounded" />
                          )}
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(
                              selectedTag,
                              image.id,
                              image.isExisting,
                            );
                          }}
                          className="absolute top-1 right-1 bg-gray-500 opacity-50 hover:opacity-75 text-white rounded-full p-1"
                        >
                          <IconX size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-gray-500 text-center">
                No images uploaded for this tag.
              </p>
            )}
          </div>
        </>
      )}

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
          {loading ? <Spinner /> : "Proceed"}
        </Button>
      </div>
    </div>
  );
};

export default UploadListingImages;
