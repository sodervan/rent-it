import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, Spinner } from "@material-tailwind/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const FurnishingState = () => {
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [initialTags, setInitialTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [searchParams] = useSearchParams();
  const encodedItemId = searchParams.get("itemId");

  const decodeId = (encodedId) => {
    return encodedId ? atob(encodedId) : null; // Decode the Base64 string
  };
  const itemId = encodedItemId ? decodeId(encodedItemId) : null;

  const fetchSelectedFeatures = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/v1/agents/listings/${itemId}/featureTags`,
        { withCredentials: true },
      );
      const data = response?.data.payload.featuresTags || [];
      const fetchedTagIds = data.map((item) => item.id);
      setInitialTags(fetchedTagIds);
      setSelectedTags(fetchedTagIds);
    } catch (error) {
      console.error("Error fetching features:", error);
      toast.error("Failed to fetch features details");
    }
  };

  const getFeaturesTags = async (page = 1) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${apiUrl}/api/v1/agents/listings-attributes/featuresTags?page=${page}`,
        { withCredentials: true },
      );
      setTags(response.data?.payload?.data || []);
    } catch (error) {
      toast.error("Failed to fetch tags. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceed = () => {
    if (hasChanges()) {
      postBasicFeatures();
    } else {
      // Skip API call if no changes and go directly to next step
      const nextUrl = `/agent/addlisting/8${encodedItemId ? "?itemId=" + encodedItemId : ""}`;
      navigate(nextUrl);
    }
  };

  const postBasicFeatures = async () => {
    const storedDetails = JSON.parse(
      localStorage.getItem("basicDetails") || "{}",
    );
    setLoading(true);

    // Calculate only new tags that weren't initially selected
    const newlySelectedTags = selectedTags.filter(
      (tagId) => !initialTags.includes(tagId),
    );

    // Calculate removed tags that were initially selected
    const removedTags = initialTags.filter(
      (tagId) => !selectedTags.includes(tagId),
    );

    try {
      const baseUrl = `${apiUrl}/api/v1/agents/listings/`;
      const listingId = encodedItemId ? itemId : storedDetails.listingId || "";
      const response = await axios.post(
        `${baseUrl}${listingId}/featureTags`,
        {
          featureTagsIds: newlySelectedTags,
          removedFeatureTagsIds: removedTags,
        },
        { withCredentials: true },
      );

      if (response.data.status === "success") {
        toast.success("Features saved successfully!");
        setTimeout(
          () =>
            navigate(
              `/agent/addlisting/8${encodedItemId ? "?itemId=" + encodedItemId : ""}`,
            ),
          500,
        );
      } else {
        toast.error("Failed to save features. Please try again.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while saving features.",
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleTagSelection = (tagId) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId],
    );
  };

  // Check if there are any changes compared to initial state
  const hasChanges = () => {
    return getNewlySelectedCount() > 0 || getRemovedCount() > 0;
  };

  // Get the count of newly added tags
  const getNewlySelectedCount = () => {
    return selectedTags.filter((tag) => !initialTags.includes(tag)).length;
  };

  // Get the count of removed tags
  const getRemovedCount = () => {
    return initialTags.filter((tag) => !selectedTags.includes(tag)).length;
  };

  useEffect(() => {
    getFeaturesTags(currentPage);
    if (encodedItemId) {
      fetchSelectedFeatures();
    }
  }, [currentPage, encodedItemId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-50 p-6 rounded-lg shadow-md"
    >
      <h1 className="text-2xl font-semibold text-gray-800">Add New Listing</h1>
      <p className="text-gray-600 font-medium">Step 7 of 13</p>
      <h2 className="mt-2 text-lg text-gray-800">Add Other Features</h2>
      <div className="w-full my-3 h-[1px] bg-gray-300"></div>

      {hasChanges() && (
        <div className="mb-4 p-3 bg-gray-100 rounded-md">
          <p className="text-sm text-gray-700">
            {getNewlySelectedCount() > 0 && (
              <span className="text-green-600 font-medium">
                {getNewlySelectedCount()} new feature
                {getNewlySelectedCount() !== 1
                  ? "s"
                  : ""} added
              </span>
            )}
            {getNewlySelectedCount() > 0 && getRemovedCount() > 0 && (
              <span className="mx-2">|</span>
            )}
            {getRemovedCount() > 0 && (
              <span className="text-red-600 font-medium">
                {getRemovedCount()} feature{getRemovedCount() !== 1 ? "s" : ""}{" "}
                removed
              </span>
            )}
          </p>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center">
          <Spinner className="h-8 w-8 text-primaryPurple" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {tags.map((tag) => (
            <motion.button
              key={tag.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`rounded-lg shadow-sm px-4 py-2 transition-colors
                ${
                  selectedTags.includes(tag.id)
                    ? "bg-primaryPurple text-white border-primaryPurple"
                    : "bg-white text-gray-700 border-gray-300"
                } hover:bg-primaryPurple hover:text-white`}
              onClick={() => toggleTagSelection(tag.id)}
            >
              <div className="flex items-center gap-2 hover:text-white">
                <i className={`${tag.interfaceIconCode}`}></i>
                <span>{tag.name}</span>
              </div>
            </motion.button>
          ))}
        </div>
      )}
      <div className="flex justify-between mt-5">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="bg-secondaryPurple text-primaryPurple hover:bg-primaryPurple hover:text-white transition"
        >
          Previous
        </Button>
        <Button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="bg-primaryPurple text-white hover:bg-secondaryPurple hover:text-primaryPurple transition"
        >
          Next
        </Button>
      </div>
      <div className="flex justify-between mt-8 gap-4">
        <Button
          className="bg-secondaryPurple text-primaryPurple w-full font-medium"
          onClick={() => {
            navigate(
              `/agent/addlisting/6${encodedItemId ? `?itemId=${encodedItemId}` : ""}`,
            );
          }}
        >
          Previous
        </Button>
        <Button
          disabled={loading}
          onClick={handleProceed}
          className={`${
            loading
              ? "bg-gray-200 text-gray-500"
              : "bg-primaryPurple text-white"
          } w-full flex justify-center items-center`}
        >
          {loading ? <Spinner className="h-4 w-4" /> : "Proceed"}
        </Button>
      </div>
    </motion.div>
  );
};

export default FurnishingState;
