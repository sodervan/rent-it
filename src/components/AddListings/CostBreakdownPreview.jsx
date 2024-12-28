import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const CostBreakdownPreview = () => {
  const navigate = useNavigate();
  const [feesDetails, setFeesDetails] = useState({});

  useEffect(() => {
    setFeesDetails(JSON.parse(localStorage.getItem("feesDetails")));
  }, []);
  return (
    <>
      <div>
        <div>
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 px-6 w-[90%]">
            <p className="text-xl font-medium">Add New Listing</p>
            <Button className="bg-secondaryPurple text-primaryPurple font-poppins font-medium shadow-none hover:shadow-none hover:bg-primaryPurple hover:text-white duration-300 transition-all">
              Save
            </Button>
          </div>
        </div>
        <div className="px-6">
          <div>
            <p className="text-gray-500 mt-2 font-medium">Step 3 of 15</p>
            <p className="mt-2 text-lg">Cost Breakdown Preview</p>
          </div>

          {
            <div className="my-10 border-2 border-gray-300 rounded-lg">
              <div className="p-4 flex items-center justify-between bg-[#F9FAFB] rounded-t-lg border-b border-gray-300">
                <div className="text-gray-500">Base Rent Fee</div>
                <div>{Number(feesDetails.baseCost).toLocaleString()}</div>
              </div>

              <div className="p-4 flex items-center justify-between border-b border-gray-300">
                <div className="text-gray-500">Rent Fee Deposit</div>
                <div>{Number(feesDetails.RentFeeDeposit).toLocaleString()}</div>
              </div>

              <div className="p-4 flex items-center justify-between bg-[#F9FAFB] border-b border-gray-300">
                <div className="text-gray-500">Agent Fee</div>
                <div>
                  {feesDetails.extraFees && feesDetails.extraFees.length > 0
                    ? Number(feesDetails.extraFees[0].amount).toLocaleString()
                    : "No data available"}
                </div>
              </div>

              <div className="p-4 flex items-center justify-between border-b border-gray-300">
                <div className="text-gray-500">Caution Fee</div>
                <div>
                  {" "}
                  {feesDetails.extraFees && feesDetails.extraFees.length > 0
                    ? Number(feesDetails.extraFees[1].amount).toLocaleString()
                    : "No data available"}
                </div>
              </div>

              <div className="p-4 flex items-center justify-between bg-[#F9FAFB] border-b border-gray-300">
                <div className="text-gray-700 font-medium">MINIMUM DEPOSIT</div>
                <div>{Number(feesDetails.totalMinDeposit).toLocaleString()}</div>
              </div>

              <div className="p-4 flex items-center justify-between  rounded-b-lg">
                <div className="text-gray-700 font-medium">TOTAL COST</div>
                <div>{Number(feesDetails.totalListingCost).toLocaleString()}</div>
              </div>
            </div>
          }
          <div className="my-8 flex items-center gap-4">
            <Button
              className="capitalize font-medium text-[20px] bg-secondaryPurple text-primaryPurple w-full text-[15px] font-poppins"
              onClick={() => {
                navigate("/agent/addlisting/2");
              }}
            >
              Previous
            </Button>
            <Button
              className="capitalize font-medium text-[20px] bg-primaryPurple text-white w-full text-[15px] font-poppins"
              onClick={() => {
                navigate("/agent/addlisting/4");
                localStorage.removeItem("feesDetails");
              }}
            >
              Proceed
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CostBreakdownPreview;
