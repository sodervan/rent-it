import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import {
  Button,
  Input,
  Option,
  Select,
  Spinner,
} from "@material-tailwind/react";

const CostBreakdown = () => {
  const navigate = useNavigate();
  const [feesTypes, setFeesTypes] = useState([]);
  const [selectedFeeType, setSelectedFeeType] = useState("");
  const [baseRentFee, setBaseRentFee] = useState("");
  const [agentFee, setAgentFee] = useState("0");
  const [legalFee, setLegalFee] = useState("0");
  const [rentFeeDeposit, setRentFeeDeposit] = useState("");
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Calculate Agent Fee (10% of Base Rent Fee) and Legal Fee (12.5% of Base Rent Fee)
  useEffect(() => {
    if (baseRentFee > 0) {
      const agentFeeValue = baseRentFee * 0.1; // 10% of Base Rent Fee
      const legalFeeValue = baseRentFee * 0.125; // 12.5% of Base Rent Fee
      setAgentFee(agentFeeValue);
      setLegalFee(legalFeeValue);
    } else {
      setAgentFee(0);
      setLegalFee(0);
    }
  }, [baseRentFee]);

  const handleRentFeeDeposit = (e) => {
    setRentFeeDeposit(e.target.value);
  };

  const handleBaseRentFee = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setBaseRentFee(value);
  };

  // SEND FEES DETAILS TO THE API
  const postFeesDetails = async () => {
    setLoading(true);
    try {
      const storedDetails = JSON.parse(localStorage.getItem("basicDetails"));

      if (!storedDetails || !storedDetails.listingId) {
        throw new Error("Invalid basicDetails or listingId missing.");
      }

      // Convert numeric values to strings
      const data = {
        baseCost: String(baseRentFee), // Convert to string
        minBaseCostDeposit: String(rentFeeDeposit), // Convert to string
        fees: [
          {
            feesTypeId: 1,
            amount: String(agentFee), // Convert to string
          },
          {
            feesTypeId: 2,
            amount: String(legalFee), // Convert to string
          },
        ],
      };

      const response = await axios.post(
        `${apiUrl}/api/v1/agents/listings/${storedDetails.listingId}/fees`,
        data,
        { withCredentials: true },
      );

      console.log("API Response:", response); // Log the full response

      if (response.data.status === "success") {
        toast.success("Fees details saved successfully!");
        localStorage.setItem(
          "feesDetails",
          JSON.stringify(response.data.payload),
        );

        setTimeout(() => {
          navigate("/agent/addlisting/3");
        }, 500);
      }
    } catch (error) {
      console.error("API Error:", error); // Log the full error object
      console.error("Error Response Data:", error.response?.data); // Log the error response data
      toast.error(
        error.response?.data?.message ||
          "An error occurred while saving fees details.",
      );
    } finally {
      setLoading(false);
    }
  };

  // GET FEES TYPES FROM THE API
  const getFeesTypes = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/v1/agents/listings-attributes/feesTypes`,
        { withCredentials: true },
      );

      console.log("Fees Types Response:", response); // Log the full response

      if (response.status === 200) {
        setFeesTypes(response.data.payload?.data || []);
      } else {
        console.log("Failed to fetch apartment types");
      }
    } catch (error) {
      console.error("Fees Types Error:", error); // Log the full error object
      console.error("Error Response Data:", error.response?.data); // Log the error response data
      toast.error("Failed to fetch fees types. Please try again.");
    }
  };

  useEffect(() => {
    getFeesTypes();
    console.log(
      "Basic Details from LocalStorage:",
      JSON.parse(localStorage.getItem("basicDetails")),
    );
  }, []);

  return (
    <div className="mt-22">
      <div>
        <div className="flex items-center justify-between border-b border-gray-200 pb-4 px-6">
          <p className="text-xl font-medium">Add New Listing</p>
        </div>
        <div className="px-6">
          <div>
            <p className="text-gray-500 mt-2 font-medium">Step 2 of 13</p>
            <p className="mt-2 text-lg">Cost Breakdown</p>
          </div>
          {/*BASE RENT FEE*/}
          <div className="mt-6">
            <p className="mb-2 text-gray-700">Base Rent Fee</p>
            <Input
              label="NGN"
              className="mb-2"
              type="number"
              value={baseRentFee}
              onChange={handleBaseRentFee}
            />
            <div className="relative w-full mt-2">
              <Select
                label="Select Fee Type"
                value={selectedFeeType}
                onChange={(value) => {
                  setSelectedFeeType(value);
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
            <Input
              label="NGN"
              value={`N ${agentFee.toLocaleString()}`} // Display as formatted string
              disabled // Disable the input field
            />
            <p className="text-gray-700 text-sm">10% of annual rent fee</p>
          </div>

          {/*LEGAL FEE*/}
          <div className="my-3">
            <p className="text-gray-700 mb-2">Legal Fee</p>
            <Input
              label="NGN"
              value={`N ${legalFee.toLocaleString()}`} // Display as formatted string
              disabled // Disable the input field
            />
            <p className="text-gray-700 text-sm">12.5% of annual rent fee</p>
          </div>
          {/*RENT FEE DEPOSIT*/}
          <div className="my-3">
            <p className="text-gray-700 mb-2">Rent Fee Deposit (Optional)</p>
            <Input
              label="NGN"
              type="number"
              value={rentFeeDeposit}
              onChange={handleRentFeeDeposit}
            />
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
