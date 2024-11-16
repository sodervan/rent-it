import { Button, Input, Option, Select } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CostBreakdown = () => {
  const navigate = useNavigate();
  const [feesTypes, setFeesTypes] = useState([]);
  const [selectedFeeType, setSelectedFeeType] = useState("");


  const getFeesTypes = async (token) => {
    try {
      const response = await fetch(
        "https://rent-it-api.onrender.com/api/v1/agents/listings-attributes/feesTypes",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.ok) {
        const result = await response.json();
        setFeesTypes(result.payload?.data || []);
        console.log(result);
      } else {
        console.log("Failed to fetch apartment types");
      }
    } catch (error) {
      console.log("Error fetching apartment types:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      getFeesTypes(token);
      // getStates(token);
    }
  }, []);

  return (
    <div className="mt-22">
      <div>
        <div className="flex items-center justify-between border-b border-gray-200 pb-4 px-6">
          <p className="text-xl font-medium">Add New Listing</p>
          <Button className="bg-secondaryPurple text-primaryPurple font-poppins font-medium shadow-none hover:shadow-none hover:bg-primaryPurple hover:text-white duration-300 transition-all">
            Save
          </Button>
        </div>
        <div className="px-6">
          <div>
            <p className="text-gray-500 mt-2 font-medium">Step 2 of 15</p>
            <p className="mt-2 text-lg">Cost Breakdown</p>
          </div>
          <div className="mt-6">
            <p className="mb-2 text-gray-700">Base Rent Fee</p>
            <Input
                label="NGN"
                className="mb-2"
                // onChange={handleDescriptionChange}
            />
            <div className="relative w-full mt-2">
              <Select
                  value={selectedFeeType}
                  onChange={(value) => {
                    setSelectedFeeType(value);
                    console.log(selectedFeeType);
                  }}
              >
                <Option>per annum</Option>
                <Option>weekly</Option>
              </Select>
            </div>
          </div>
          <div className="my-3">
            <p className="text-gray-700 mb-2">
              Agent Fee
            </p>
            <Input label="NGN"/>
            <p className="text-gray-700 text-sm">10% of annual rent fee</p>
          </div>
          <div className="my-3">
            <p className="text-gray-700 mb-2">
              Legal Fee
            </p>
            <Input label="NGN"/>
            <p className="text-gray-700 text-sm">12.5% of annual rent fee</p>
          </div>
          <div className="my-3">
            <p className="text-gray-700 mb-2">
              Rent Fee Deposit(Optional)
            </p>
            <Input label="NGN"/>
            <p className="text-gray-700 text-sm">This is the minimum amount to secure the apartment</p>
          </div>
          <div className="my-8 flex items-center gap-4">
            <Button
                className="capitalize font-medium text-[20px] bg-secondaryPurple text-primaryPurple w-full text-[15px] font-poppins"
                onClick={() => {
                  navigate("/agent/addlisting/1");
                }}
            >
              Previous
            </Button>
            <Button
                className="capitalize font-medium text-[20px] bg-primaryPurple text-white w-full text-[15px] font-poppins"
                onClick={() => {
                  navigate("/agent/addlisting/3");
                }}
            >
              Proceed
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostBreakdown;
