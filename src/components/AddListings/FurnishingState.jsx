import {Button, Checkbox, Radio, Select, Option} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const FurnishingState = () => {
  const navigate = useNavigate();

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
              <p className="text-gray-500 mt-2 font-medium">Step 7 of 15</p>
              <p className="mt-2 text-lg">Furnishing State</p>
              <div className="w-full border border-gray-200 mt-3"></div>
            </div>
            <div>
              <div className="mb-5">
                <p className="text-md text-gray-600">Furnishing State</p>
                <div className="w-full mt-3">
                  <Select label="Select">
                    <Option>Material Tailwind HTML</Option>
                    <Option>Material Tailwind React</Option>
                    <Option>Material Tailwind Vue</Option>
                    <Option>Material Tailwind Angular</Option>
                    <Option>Material Tailwind Svelte</Option>
                  </Select>
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
