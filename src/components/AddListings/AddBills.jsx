import { Button, Spinner } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import { toast } from "react-toastify"; // For toast notifications
import LoaderTwo from "../Loaders/LoaderTwo.jsx";

const FurnishingState = () => {
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  // GET BILLS TAGS FROM THE API
  const getBillsTags = async (page = 1) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${apiUrl}/api/v1/agents/listings-attributes/billsTags?page=${page}`,
        { withCredentials: true }, // Include cookies in the request
      );

      console.log("Bills Tags Response:", response); // Log the full response

      if (response.data.status === "success") {
        setTags(response.data?.payload?.data || []);
      } else {
        console.error("Failed to fetch tags:", response.data);
        toast.error("Failed to fetch bills tags. Please try again."); // Error toast
      }
    } catch (error) {
      console.error("Error fetching bills tags:", error); // Log the full error object
      console.error("Error Response Data:", error.response?.data); // Log the error response data
      toast.error("An error occurred while fetching bills tags."); // Error toast
    } finally {
      setIsLoading(false);
    }
  };

  // POST BASIC BILLS TO THE API
  const postBasicBills = async () => {
    const storedDetails = JSON.parse(localStorage.getItem("basicDetails")); // Keep localStorage for storedDetails
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/agents/listings/${storedDetails.listingId}/billTags`,
        { billTagsIds: selectedTags },
        { withCredentials: true }, // Include cookies in the request
      );

      console.log("Post Bills Response:", response); // Log the full response

      if (response.data.status === "success") {
        console.log("Success:", response.data);
        toast.success("Bills saved successfully!"); // Success toast
        setTimeout(() => navigate("/agent/addlisting/9"), 500);
      } else {
        console.error("Failed to post BillTags");
        toast.error("Failed to save bills. Please try again."); // Error toast
      }
    } catch (error) {
      console.error("Error posting BillTags:", error); // Log the full error object
      console.error("Error Response Data:", error.response?.data); // Log the error response data
      toast.error(
        error.response?.data?.message ||
          "An error occurred while saving bills.",
      ); // Error toast
    } finally {
      setLoading(false);
    }
  };

  // TOGGLE TAG SELECTION
  const toggleTagSelection = (tagId) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId],
    );
  };

  // FETCH TAGS ON COMPONENT MOUNT AND PAGE CHANGE
  useEffect(() => {
    getBillsTags(currentPage);
  }, [currentPage]);

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
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
          <LoaderTwo />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {tags.map((tag) => (
              <Button
                key={tag.id}
                variant={selectedTags.includes(tag.id) ? "filled" : "outlined"}
                className={`rounded-lg shadow-sm ${
                  selectedTags.includes(tag.id)
                    ? "bg-primaryPurple text-white border border-primaryPurple"
                    : "bg-white text-gray-700 border border-gray-300"
                } hover:bg-primaryPurple hover:text-white transition`}
                onClick={() => toggleTagSelection(tag.id)}
              >
                {tag.name}
              </Button>
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
          onClick={() => navigate("/agent/addlisting/7")}
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
    </div>
  );
};

export default FurnishingState;
