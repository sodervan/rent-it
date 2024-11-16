import { Button, Textarea } from "@material-tailwind/react";
import {useNavigate} from "react-router-dom";
const Description = () => {
  const navigate = useNavigate()
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
              <p className="text-gray-500 mt-2 font-medium">Step 4 of 15</p>
              <p className="mt-2 text-lg">Add Description</p>
            </div>
            <div>
              <p className="text-gray-500 mb-2">Listing Description</p>
              <div className="w-full">
                <Textarea
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
                className="capitalize font-medium bg-primaryPurple text-white w-full text-[15px] font-poppins"
                onClick={() => {
                  navigate("/agent/addlisting/5");
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

export default Description;
