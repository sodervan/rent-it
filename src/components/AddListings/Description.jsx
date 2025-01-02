import { Button, Spinner, Textarea } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Description = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleDescription = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };

  // POST DESCRIPTION TO THE API
  const postDescription = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const storedDetails = JSON.parse(localStorage.getItem("basicDetails"));

      if (!storedDetails || !storedDetails.listingId) {
        throw new Error("Invalid basicDetails or listingId missing.");
      }
      const data = {
        description: description,
      };

      const response = await fetch(
        `${apiUrl}/api/v1/agents/listings/${storedDetails.listingId}/description?id=${storedDetails.listingId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
        localStorage.setItem("descriptionDetails", description);
        setTimeout(() => {
          navigate("/agent/addlisting/5");
        }, 500);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div>
        <div>
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 px-6">
            <p className="text-xl font-medium">Add New Listing</p>
            <Button className="bg-secondaryPurple text-primaryPurple font-poppins font-medium shadow-none hover:shadow-none hover:bg-primaryPurple hover:text-white duration-300 transition-all">
              Save
            </Button>
          </div>
          <div className="px-6">
            <div className="mb-5">
              <p className="text-gray-500 mt-2 font-medium">Step 4 of 15</p>
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
                  navigate("/agent/addlisting/3");
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
                onClick={() => {
                  postDescription()
                }}
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
