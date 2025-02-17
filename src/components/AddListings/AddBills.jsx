import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Spinner } from "@material-tailwind/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const FurnishingState = () => {
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [newSelectedTag, setNewSelectedTag] = useState([]);
  const [searchParams] = useSearchParams();
  const encodedItemId = searchParams.get("itemId");

  const decodeId = (encodedId) => {
    return atob(encodedId); // Decode the Base64 string
  };
  const itemId = decodeId(encodedItemId);

  const fetchSelectedBills = async () => {
    const itemId = decodeId(encodedItemId);
    try {
      const response = await axios.get(
        `${apiUrl}/api/v1/agents/listings/${itemId}/billTags`,
        { withCredentials: true },
      );
      if (response?.data.payload) {
        const data = response?.data.payload.billsTags;
        data.forEach((item) => {
          setSelectedTags((prev) => [...new Set([...prev, item.id])]);
        });
      } else {
        setSelectedTags([]);
      }

      console.log(response);
      // Set the fetched data as the default state
    } catch (error) {
      console.error("Error fetching features:", error);
      toast.error("Failed to fetch features details");
    }
  };

  const getBillsTags = async (page = 1) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${apiUrl}/api/v1/agents/listings-attributes/billsTags?page=${page}`,
        { withCredentials: true },
      );
      console.log(response);
      if (response.data.status === "success") {
        setTags(response.data?.payload?.data || []);
      } else {
        toast.error("Failed to fetch bills tags. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching bills tags.");
    } finally {
      setIsLoading(false);
    }
  };

  const postBasicBills = async () => {
    const storedDetails = JSON.parse(localStorage.getItem("basicDetails"));
    const listingId = encodedItemId ? itemId : storedDetails?.listingId;
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/agents/listings/${listingId}/billTags`,
        { billTagsIds: newSelectedTag },
        { withCredentials: true },
      );

      if (response.data.status === "success") {
        toast.success("Bills saved successfully!");
        setTimeout(
          () =>
            navigate(
              `/agent/addlisting/9${encodedItemId ? "?itemId=" + encodedItemId : ""}`,
            ),
          500,
        );
      } else {
        toast.error("Failed to save bills. Please try again.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while saving bills.",
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
    setNewSelectedTag((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId],
    );
  };

  useEffect(() => {
    getBillsTags(currentPage);
    if (encodedItemId) {
      fetchSelectedBills();
    }
  }, [currentPage]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-50 p-6 rounded-lg shadow-md"
    >
      <div className="flex items-center justify-between pb-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          Add New Listing
        </h1>
      </div>
      <div>
        <p className="text-gray-600 font-medium">Step 8 of 13</p>
        <h2 className="mt-2 text-lg text-gray-800">Add Bills</h2>
        <div className="w-full my-3 h-[1px] bg-gray-300"></div>
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
                  {/* Render the icon using the interface_icon_code */}
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
      </div>
      <div className="flex justify-between mt-8 gap-4">
        <Button
          className="bg-secondaryPurple text-primaryPurple w-full font-medium"
          onClick={() => {
            navigate(
              `/agent/addlisting/7${encodedItemId ? `?itemId=${encodedItemId}` : ""}`,
            );
          }}
        >
          Previous
        </Button>
        <Button
          disabled={loading}
          onClick={postBasicBills}
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
