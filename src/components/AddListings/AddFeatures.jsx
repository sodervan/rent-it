import { Button, Spinner } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoaderTwo from "../Loaders/LoaderTwo.jsx";

const FurnishingState = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || "",
  );
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const getFeaturesTags = async (page = 1) => {
    if (!accessToken) return; // Avoid fetching without a token
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://rent-it-api.onrender.com/api/v1/agents/listings-attributes/featuresTags?page=${page}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        },
      );
      if (response.ok) {
        const result = await response.json();
        setTags(result?.payload?.data || []);
      } else {
        console.error("Failed to fetch tags");
      }
    } catch (error) {
      console.error("Error fetching tags:", error);
    } finally {
      setIsLoading(false);
    }
  };
  // dtyfez7dk0hw0mocmkobchck
  const postBasicFeatures = async () => {
    const storedDetails = JSON.parse(localStorage.getItem("basicDetails"));
    setLoading(true);
    try {
      const response = await fetch(
        `https://rent-it-api.onrender.com/api/v1/agents/listings/${storedDetails.listingId}/featureTags?id=${storedDetails.listingId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            featureTagsIds: selectedTags,
          }),
        },
      );
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setTimeout(() => navigate("/agent/addlisting/8"), 500);
      } else {
        console.error("Failed to post featureTags");
      }
    } catch (error) {
      console.error("Error posting featureTags:", error);
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

  useEffect(() => {
    if (accessToken) getFeaturesTags(currentPage);
  }, [accessToken, currentPage]);

  return (
    <div className="mt-20 bg-gray-50 p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between pb-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          Add New Listing
        </h1>
        <Button className="bg-secondaryPurple text-primaryPurple shadow-md hover:bg-primaryPurple hover:text-white transition duration-300">
          Save
        </Button>
      </div>
      <div>
        <p className="text-gray-600 font-medium">Step 7 of 15</p>
        <h2 className="mt-2 text-lg text-gray-800">Add Other Features</h2>
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
          onClick={() => navigate("/agent/addlisting/6")}
        >
          Previous
        </Button>
        <Button
          disabled={loading}
          onClick={postBasicFeatures}
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
