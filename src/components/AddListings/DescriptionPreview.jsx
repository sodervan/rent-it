import { Button } from "@material-tailwind/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Spinner } from "@material-tailwind/react";

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
    <div className="bg-white rounded-xl shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
        <h1 className="text-xl font-semibold text-gray-800">Add New Listing</h1>
      </div>

      <div className="px-6 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-1 bg-primaryPurple rounded-full w-full"></div>
            <p className="text-sm font-medium text-gray-600 whitespace-nowrap">
              Step 5 of 13
            </p>
            <div className="h-1 bg-gray-200 rounded-full w-full"></div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium text-gray-700 mb-4">
            Preview Description
          </h2>
          <div className="w-full">
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 min-h-48">
              {loading ? (
                <div className="flex items-center justify-center h-24">
                  <Spinner className="h-8 w-8 text-primaryPurple" />
                </div>
              ) : descriptionDetails ? (
                <p className="text-gray-700 leading-relaxed">
                  {descriptionDetails}
                </p>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-400 mb-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="text-gray-500 font-medium">
                    No description available
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    Please return to the previous step to add a description
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-10 mb-4 flex items-center gap-4">
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
              className={`${
                loading
                  ? "bg-gray-200 px-4 py-3 text-gray-500 rounded-lg w-full flex justify-center items-center"
                  : "bg-primaryPurple text-white w-full text-[15px] font-poppins flex justify-center items-center"
              }`}
              // disabled={loading}
              onClick={() => {
                navigate(
                  `/agent/addlisting/6${encodedItemId ? `?itemId=${encodedItemId}` : ""}`,
                );
              }}
            >
              {loading ? <Spinner className="h-4 w-4" /> : "Proceed"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
