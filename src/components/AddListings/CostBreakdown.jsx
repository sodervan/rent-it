import {
  Button,
  Input,
  Option,
  Select,
  Spinner,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CostBreakdown = () => {
  const navigate = useNavigate();
  const [feesTypes, setFeesTypes] = useState([]);
  const [selectedFeeType, setSelectedFeeType] = useState("");
  const [baseRentFee, setBaseRentFee] = useState(0);
  const [agentFee, setAgentFee] = useState(0);
  const [legalFee, setLegalFee] = useState(0);
  const [rentFeeDeposit, setRentFeeDeposit] = useState(0);
  const [basicDetails, setBasicDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleRentFeeDeposit = (e) => {
    e.preventDefault();
    setRentFeeDeposit(e.target.value);
    console.log(rentFeeDeposit);
  };

  const handleLegalFee = (e) => {
    e.preventDefault();
    setLegalFee(e.target.value);
    console.log(legalFee);
  };

  const handleAgentFee = (e) => {
    e.preventDefault();
    setAgentFee(e.target.value);
    console.log(agentFee);
  };

  const handleBaseRentFee = (e) => {
    e.preventDefault();
    setBaseRentFee(e.target.value);
    console.log(baseRentFee);
  };

  // SEND FEES DETAILS TO THE API
  const postFeesDetails = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const storedDetails = JSON.parse(localStorage.getItem("basicDetails"));

      if (!storedDetails || !storedDetails.listingId) {
        throw new Error("Invalid basicDetails or listingId missing.");
      }
      const data = {
        baseCost: baseRentFee,
        minBaseCostDeposit: rentFeeDeposit,
        fees: [
          {
            feesTypeId: 1,
            amount: agentFee,
          },
          {
            feesTypeId: 2,
            amount: legalFee,
          },
        ],
      };

      const response = await fetch(
        `${apiUrl}/api/v1/agents/listings/${storedDetails.listingId}/fees?id=${storedDetails.listingId}`,
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
        localStorage.setItem("feesDetails", JSON.stringify(result.payload));

        setTimeout(() => {
          navigate("/agent/addlisting/3");
        }, 500);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // GET FEES TYPES FROM THE API
  const getFeesTypes = async (token) => {
    try {
      const response = await fetch(
        `${apiUrl}/api/v1/agents/listings-attributes/feesTypes`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.ok) {
        const result = await response.json();
        setFeesTypes(result.payload?.data || []);
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
          {/*BASE RENT FEE*/}
          <div className="mt-6">
            <p className="mb-2 text-gray-700">Base Rent Fee</p>
            <Input
              label="NGN"
              className="mb-2"
              onChange={(e) => handleBaseRentFee(e)}
            />
            <div className="relative w-full mt-2">
              <Select
                label="Select Fee Type"
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
          {/*AGENT FEE*/}
          <div className="my-3">
            <p className="text-gray-700 mb-2">Agent Fee</p>
            <Input label="NGN" onChange={handleAgentFee} />
            <p className="text-gray-700 text-sm">10% of annual rent fee</p>
          </div>
          {/*LEGAL FEE*/}
          <div className="my-3">
            <p className="text-gray-700 mb-2">Legal Fee</p>
            <Input label="NGN" onChange={handleLegalFee} />
            <p className="text-gray-700 text-sm">12.5% of annual rent fee</p>
          </div>
          {/*RENT FEE DEPOSIT*/}
          <div className="my-3">
            <p className="text-gray-700 mb-2">Rent Fee Deposit(Optional)</p>
            <Input label="NGN" onChange={handleRentFeeDeposit} />
            <p className="text-gray-700 text-sm">
              This is the minimum amount to secure the apartment
            </p>
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
              className={`${
                loading
                  ? "bg-gray-200 px-4 py-3 text-gray-500 rounded-lg w-full flex justify-center items-center"
                  : "bg-primaryPurple text-white w-full text-[15px] font-poppins flex justify-center items-center"
              }`}
              disabled={loading}
              onClick={() => {
                postFeesDetails();
              }}
            >
              {loading ? <Spinner className="h-4 w-4" /> : "Proceed"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostBreakdown;
