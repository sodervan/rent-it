import { Button } from "@material-tailwind/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Spinner } from "@material-tailwind/react";

const CostBreakdownPreview = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [feesDetails, setFeesDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const encodedItemId = searchParams.get("itemId");
  const apiUrl = import.meta.env.VITE_API_URL;

  const decodeId = (encodedId) => {
    if (!encodedId) return null;
    return atob(encodedId); // Decode the Base64 string
  };

  const itemId = decodeId(encodedItemId);

  // Fetch cost breakdown from API
  const fetchCostBreakdown = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${apiUrl}/api/v1/agents/listings/${itemId}/fees`,
        { withCredentials: true },
      );

      if (response.data.status === "success") {
        const data = response.data.payload;
        // Store in local storage for future use
        localStorage.setItem("feesDetails", JSON.stringify(data));
        setFeesDetails(data);
      } else {
        toast.error("Failed to load cost breakdown data");
      }
    } catch (error) {
      console.error("Error fetching cost breakdown:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch cost breakdown. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Try to get from localStorage first
    const storedFees = localStorage.getItem("feesDetails");

    if (storedFees) {
      setFeesDetails(JSON.parse(storedFees));
      setLoading(false);
    } else if (encodedItemId) {
      // If not in localStorage but we have an ID, fetch from API
      fetchCostBreakdown();
    } else {
      // No data and no ID to fetch with
      setLoading(false);
    }
  }, [encodedItemId]);

  const formatCurrency = (amount) => {
    return "₦ " + Number(amount || 0).toLocaleString();
  };

  const getAgentFee = () => {
    if (feesDetails?.extraFees?.length > 0) {
      return formatCurrency(feesDetails.extraFees[0].amount);
    }
    return "N/A";
  };

  const getCautionFee = () => {
    if (feesDetails?.extraFees?.length > 1) {
      return formatCurrency(feesDetails.extraFees[1].amount);
    }
    return "N/A";
  };

  const handleNavigation = (step) => {
    const queryParam = encodedItemId ? `?itemId=${encodedItemId}` : "";
    navigate(`/agent/addlisting/${step}${queryParam}`);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <Spinner className="h-12 w-12 mx-auto mb-4 text-primaryPurple" />
          <p className="text-gray-600">Loading cost breakdown...</p>
        </div>
      </div>
    );
  }

  // If we have no data and loading is finished
  if (!loading && (!feesDetails || Object.keys(feesDetails).length === 0)) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="border-b border-gray-200 pb-5 mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Add New Listing
          </h1>
          <div className="mt-2 flex items-center">
            <div className="h-1 w-24 bg-primaryPurple rounded"></div>
            <span className="ml-3 text-sm font-medium text-gray-500">
              Step 3 of 13
            </span>
          </div>
        </div>

        <div className="text-center py-10">
          <div className="mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            No Cost Breakdown Available
          </h3>
          <p className="text-gray-500 mb-6">
            Please complete the previous step to generate your cost breakdown.
          </p>
          <Button
            className="px-6 py-2.5 bg-primaryPurple text-white font-medium rounded-lg transition-all hover:bg-primaryPurple/90"
            onClick={() => handleNavigation(2)}
          >
            Go to Cost Breakdown
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="border-b border-gray-200 pb-5 mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Add New Listing
        </h1>
        <div className="mt-2 flex items-center">
          <div className="h-1 w-24 bg-primaryPurple rounded"></div>
          <span className="ml-3 text-sm font-medium text-gray-500">
            Step 3 of 13
          </span>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-medium text-gray-800 mb-2">
          Cost Breakdown Preview
        </h2>
        <p className="text-gray-500 text-sm">
          Review the breakdown of all costs associated with this listing.
        </p>
      </div>

      <div className="border rounded-xl overflow-hidden shadow-sm mb-10">
        <table className="w-full table-fixed">
          <tbody>
            <tr className="bg-gray-50">
              <td className="py-4 px-6 text-sm font-medium text-gray-600">
                Base Rent Fee
              </td>
              <td className="py-4 px-6 text-sm font-medium text-gray-900 text-right">
                {formatCurrency(feesDetails.baseCost)}
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6 text-sm font-medium text-gray-600">
                Rent Fee Deposit
              </td>
              <td className="py-4 px-6 text-sm font-medium text-gray-900 text-right">
                {formatCurrency(feesDetails.RentFeeDeposit)}
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="py-4 px-6 text-sm font-medium text-gray-600">
                Agent Fee
              </td>
              <td className="py-4 px-6 text-sm font-medium text-gray-900 text-right">
                {getAgentFee()}
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6 text-sm font-medium text-gray-600">
                Caution Fee
              </td>
              <td className="py-4 px-6 text-sm font-medium text-gray-900 text-right">
                {getCautionFee()}
              </td>
            </tr>
            <tr className="bg-gray-50 border-t border-gray-200">
              <td className="py-4 px-6 text-sm font-semibold text-gray-800">
                MINIMUM DEPOSIT
              </td>
              <td className="py-4 px-6 text-sm font-semibold text-gray-900 text-right">
                {formatCurrency(feesDetails.totalMinDeposit)}
              </td>
            </tr>
            <tr className="bg-primaryPurple bg-opacity-5">
              <td className="py-5 px-6 text-base font-bold text-gray-800">
                TOTAL COST
              </td>
              <td className="py-5 px-6 text-base font-bold text-primaryPurple text-right">
                {formatCurrency(feesDetails.totalListingCost)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-4 pt-2">
        <Button
          className="px-6 py-2.5 bg-white border border-primaryPurple text-primaryPurple font-medium rounded-lg transition-all hover:bg-gray-50"
          onClick={() => handleNavigation(2)}
        >
          Previous
        </Button>
        <Button
          className="px-6 py-2.5 bg-primaryPurple text-white font-medium rounded-lg transition-all hover:bg-primaryPurple/90 flex-1"
          onClick={() => handleNavigation(4)}
        >
          Proceed to Next Step
        </Button>
      </div>
    </div>
  );
};

export default CostBreakdownPreview;
