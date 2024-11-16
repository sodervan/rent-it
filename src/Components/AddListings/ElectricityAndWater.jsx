import { Button } from "@material-tailwind/react";

const ElectricityAndWater = () => {
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
            
          </div>
        </div>
      </div>
    </>
  );
};

export default ElectricityAndWater;
