import { Button, Checkbox, Radio } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const ElectricityAndWater = () => {
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
              <p className="text-gray-500 mt-2 font-medium">Step 6 of 15</p>
              <p className="mt-2 text-lg">Electricity and water supply</p>
              <div className="w-full border border-gray-200 mt-3"></div>
            </div>
            <div>
              <div className="border-b border-gray-300 mb-5">
                <p className="text-md">Electricity</p>
                <div>
                  <div>
                    <p className="mt-5 text-gray-600">Payment type</p>
                    <div className="flex gap-3">
                      <Radio label="Prepaid" name="type" />
                      <Radio name="type" label="Postpaid" />
                    </div>
                  </div>

                  <div className="mb-2">
                    <p className="mt-5 text-gray-600">Access type</p>
                    <div className="flex gap-3">
                      <Radio label="Shared" name="access" />
                      <Radio name="access" label="Personal" />
                    </div>
                  </div>
                </div>
              </div>
              {/*WaterSupply*/}
              <div>
                <p className="text-md mb-3">Water Supply</p>
                <div className="mb-4">
                  <Checkbox label="In-House running water" />
                  <Checkbox label="Outdoor water taps" />
                  <Checkbox label="Water from external source" />
                </div>
              </div>
            </div>
            <div className="my-8 flex items-center gap-4">
              <Button
                className="capitalize font-medium bg-secondaryPurple text-primaryPurple w-full text-[15px] font-poppins"
                onClick={() => {
                  navigate("/agent/addlisting/5");
                }}
              >
                Previous
              </Button>
              <Button
                className="capitalize font-medium bg-primaryPurple text-white w-full text-[15px] font-poppins"
                onClick={() => {
                  navigate("/agent/addlisting/7");
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

export default ElectricityAndWater;
