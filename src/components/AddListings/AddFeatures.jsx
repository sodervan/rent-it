import { Button, Select, Option } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const FurnishingState = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState([]);

  const getFeaturesTags = async (event) => {
    event?.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://rent-it-api.onrender.com/api/v1/agents/listings-attributes/featuresTags",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        },
      );
      const result = await response.json();
      setTags(result.payload.data);
      console.log(result);
      if (response.ok) {
        setMessage(response.message);
      } else {
        setMessage(response.message);
      }
    } catch (error) {
      console.log(error);
      setMessage(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setAccessToken(localStorage.getItem("accessToken"));
    getFeaturesTags()
  }, []);

  return (
    <>
      <div className="mt-20">
        <div>
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 px-6">
            <p className="text-xl font-medium">Add New Listing</p>
            <Button className="bg-secondaryPurple text-primaryPurple font-poppins font-medium shadow-none hover:shadow-none hover:bg-primaryPurple hover:text-white duration-300 transition-all">
              Save
            </Button>
          </div>
          <div className="px-6">
            <div className="mb-5">
              <p className="text-gray-500 mt-2 font-medium">Step 8 of 15</p>
              <p className="mt-2 text-lg">Add Other Features</p>
              <div className="w-full border border-gray-200 mt-3"></div>
            </div>
            <div>
              <div className="mb-5">
                {/*tags*/}
                <div>
                  {tags.map((item) => (
                    <div key={item.id}>
                      <Button variant="outlined">{item.name}</Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="my-8 flex items-center gap-4">
              <Button
                className="capitalize font-medium bg-secondaryPurple text-primaryPurple w-full text-[15px] font-poppins"
                onClick={() => {
                  navigate("/agent/addlisting/6");
                }}
              >
                Previous
              </Button>
              <Button
                className="capitalize font-medium bg-primaryPurple text-white w-full text-[15px] font-poppins"
                onClick={() => {
                  navigate("/agent/addlisting/8");
                }}
              >
                Proceed
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FurnishingState;
