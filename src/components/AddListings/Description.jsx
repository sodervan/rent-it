import { Button, Spinner, Textarea } from "@material-tailwind/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import { toast } from "react-toastify"; // Optional: For toast notifications

const Description = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [searchParams] = useSearchParams();
  const encodedItemId = searchParams.get("itemId");

  const decodeId = (encodedId) => {
    return atob(encodedId); // Decode the Base64 string
  };
  const itemId = decodeId(encodedItemId);
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const fetchDescription = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/v1/agents/listings/${itemId}/description`,
        { withCredentials: true },
      );
      console.log(response);
      const data = response.data.payload;
      setDescription(data.description); // Set the fetched data as the default state

      // Set the fetched data as the default state
    } catch (error) {
      console.error("Error fetching basic details:", error);
      toast.error("Failed to fetch basic details");
    }
  };
  // POST DESCRIPTION TO THE API
  const postDescription = async () => {
    setLoading(true);
    try {
      const storedDetails = JSON.parse(localStorage.getItem("basicDetails")); // Get data from cookies
      console.log(storedDetails, itemId);
      // if (!storedDetails || !storedDetails.listingId) {
      //   throw new Error("Invalid basicDetails or listingId missing.");
      // }

      const data = {
        description: description,
      };

      const response = await axios.post(
        `${apiUrl}/api/v1/agents/listings/${encodedItemId ? itemId + "/" : storedDetails.listingId + "/"}description`,
        data,
        { withCredentials: true }, // Include cookies in the request
      );

      if (response.data.status === "success") {
        console.log("Success:", response.data);
        localStorage.setItem("descriptionDetails", description); // Store description in cookies (optional)
        toast.success("Description saved successfully!"); // Optional: Show success toast

        setTimeout(() => {
          navigate(
            `/agent/addlisting/5${encodedItemId ? `?itemId=${encodedItemId}` : ""}`,
          );
        }, 500);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while saving the description.",
      ); // Optional: Show error toast
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (encodedItemId) {
      fetchDescription();
    }
  }, []);
  return (
    <>
      <div>
        <div>
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 px-6">
            <p className="text-xl font-medium">Add New Listing</p>
          </div>
          <div className="px-6">
            <div className="mb-5">
              <p className="text-gray-500 mt-2 font-medium">Step 4 of 13</p>
              <p className="mt-2 text-lg">Add Description</p>
            </div>
            <div>
              <p className="text-gray-500 mb-2">Listing Description</p>
              <div className="w-full">
                <Textarea
                  onChange={handleDescription}
                  label="Enter a Description"
                  variant="outlined"
                  className="focus:ring-0"
                  value={description}
                />
              </div>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Max character: 1000</p>
            </div>
            <div className="my-8 flex items-center gap-4">
              <Button
                className="capitalize font-medium bg-secondaryPurple text-primaryPurple w-full text-[15px] font-poppins"
                onClick={() => {
                  navigate(
                    `/agent/addlisting/3${encodedItemId ? `?itemId=${encodedItemId}` : ""}`,
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
                disabled={loading}
                onClick={postDescription}
              >
                {loading ? <Spinner className="h-4 w-4" /> : "Proceed"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Description;
