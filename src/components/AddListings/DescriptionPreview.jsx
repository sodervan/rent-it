import { Button } from "@material-tailwind/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Description = () => {
  const navigate = useNavigate();
  const [descriptionDetails, setDescriptionDetails] = useState("");
  const [searchParams] = useSearchParams();
  const encodedItemId = searchParams.get("itemId");

  useEffect(() => {
    setDescriptionDetails(localStorage.getItem("descriptionDetails"));
  }, []);

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
                {descriptionDetails ? (
                  <p>{descriptionDetails}</p>
                ) : (
                  <p>No description available</p>
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
