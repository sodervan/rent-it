import { Button } from "@material-tailwind/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Description = () => {
  const navigate = useNavigate();
  const [descriptionDetails, setDescriptionDetails] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const encodedItemId = searchParams.get("itemId");
  const apiUrl = import.meta.env.VITE_API_URL;

  const decodeId = (encodedId) => {
    return atob(encodedId);
  };

  useEffect(() => {
    const fetchDescription = async () => {
      // First check localStorage
      const storedDescription = localStorage.getItem("descriptionDetails");

      if (storedDescription) {
        setDescriptionDetails(storedDescription);
        setLoading(false);
        return;
      }

      // If no stored description and we have an itemId, fetch from API
      if (encodedItemId) {
        try {
          const listingId = decodeId(encodedItemId);
          const response = await axios.get(
            `${apiUrl}/api/v1/agents/listings/${listingId}/description`,
            { withCredentials: true },
          );

          if (response.data.status === "success") {
            const description = response.data.payload.description;
            setDescriptionDetails(description);
            // Also store in localStorage for future use
            localStorage.setItem("descriptionDetails", description);
          } else {
            toast.error("Failed to fetch description");
          }
        } catch (error) {
          toast.error(
            error.response?.data?.message || "Error fetching description",
          );
        }
      }
      setLoading(false);
    };

    fetchDescription();
  }, [encodedItemId, apiUrl]);

  return (
    <div>
      <div>
        <div className="flex items-center justify-between border-b border-gray-200 pb-4 px-6">
          <p className="text-xl font-medium">Add New Listing</p>
        </div>
        <div className="px-6">
          <div className="mb-5">
            <p className="text-gray-500 mt-2 font-medium">Step 5 of 13</p>
          </div>
          <div>
            <p className="text-gray-500 mb-2">Preview Description</p>
            <div className="w-full">
              <div className="border border-gray-200 rounded-lg p-4">
                {loading ? (
                  <p className="text-gray-400">Loading description...</p>
                ) : descriptionDetails ? (
                  <p>{descriptionDetails}</p>
                ) : (
                  <p className="text-gray-400">No description available</p>
                )}
              </div>
            </div>
            <div className="my-8 flex items-center gap-4">
              <Button
                className="capitalize font-medium bg-secondaryPurple text-primaryPurple w-full text-[15px] font-poppins"
                onClick={() => {
                  navigate(
                    `/agent/addlisting/4${encodedItemId ? `?itemId=${encodedItemId}` : ""}`,
                  );
                }}
              >
                Previous
              </Button>
              <Button
                className="capitalize font-medium bg-primaryPurple text-white w-full text-[15px] font-poppins"
                onClick={() => {
                  navigate(
                    `/agent/addlisting/6${encodedItemId ? `?itemId=${encodedItemId}` : ""}`,
                  );
                }}
              >
                Proceed
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
