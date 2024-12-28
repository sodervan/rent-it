import { Input, Spinner, Select, Option } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const StepFour = ({ accessToken }) => {
  const navigate = useNavigate();
  const [accountNumber, setAccountNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bankCode, setBankCode] = useState("");
  const [bank, setBank] = useState("");
  const [allBanks, setAllBanks] = useState([]);
  const [pagination, setPagination] = useState({ next: null, previous: null });
  const [isFetchingBanks, setIsFetchingBanks] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleBankChange = (selectedBankName) => {
    const selectedBank = allBanks.find(
      (bank) => bank.name === selectedBankName,
    );
    if (selectedBank) {
      setBank(selectedBank.name);
      setBankCode(selectedBank.code);
      toast.info(`Selected ${selectedBank.name}`);
    }
  };

  const updateAccountNumber = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10); // Allow only digits, max length 10
    setAccountNumber(value);
  };

  const handleBankUpload = async (event) => {
    event.preventDefault();

    if (!accountNumber || !bankCode) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (accountNumber.length !== 10) {
      toast.error("Account number must be 10 digits");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `${apiUrl}/api/v1/agents/withdrawal-account`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ accountNumber, bankCode }),
        },
      );

      const result = await response.json();
      console.log(result)
      if (response.ok) {
        toast.success("Bank details updated successfully!");
        setTimeout(() => navigate("/agent/dashboard"), 2000);
      } else {
        toast.error(result.message || "Failed to update bank details");
      }
    } catch (error) {
      console.error("Bank upload error:", error);
      toast.error("An error occurred while updating bank details");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBanks = async (cursor, type) => {
    try {
      setIsFetchingBanks(true);

      let url = `${apiUrl}/api/v1/payments/banks?${type}=${cursor ? cursor : null}`;

      const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const result = await response.json();
      if (response.ok) {
        setAllBanks(result.payload.data || []);
        setPagination({
          next: result.payload.meta.next || null,
          previous: result.payload.meta.previous || null,
        });
        // Reset selected bank if the list updates
        setBank("");
        setBankCode("");
      } else {
        throw new Error(result.message || "Failed to fetch banks");
      }
    } catch (error) {
      console.error("Fetch banks error:", error);
      toast.error("An error occurred while loading banks. Please try again.");
    } finally {
      setIsFetchingBanks(false);
    }
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  const handlePagination = async (direction) => {
    if (direction === "next" && pagination.next) {
      await fetchBanks(pagination.next, "next");
    } else if (direction === "prev" && pagination.previous) {
      await fetchBanks(pagination.previous, "previous");
    }
  };

  return (
    <div className="mt-24 px-6 md:ml-[28%] md:w-[70%] max-w-[800px] sm:px-10">
      <div className="flex flex-col gap-4">
        <div className="text-[14px]">
          <p className="text-gray-500">Step 5 of 5</p>
        </div>
        <div>
          <p>Bank Details</p>
        </div>
        <div>
          <p className="text-gray-500 text-[14px]">
            Enter your bank information to secure payments.
          </p>
        </div>

        <div className="space-y-4">
          {/* Bank Selection */}
          <div className="relative">
            {isFetchingBanks ? (
              <div className="flex justify-center py-4">
                <Spinner className="h-8 w-8" />
              </div>
            ) : (
              <>
                <Select
                  key={allBanks.length} // Forces re-render when bank list changes
                  label="Select Bank"
                  onChange={handleBankChange}
                  value={bank}
                  className="w-full"
                >
                  {allBanks.map((bank, index) => (
                    <Option key={index} value={bank.name}>
                      {bank.name}
                    </Option>
                  ))}
                </Select>

                {/* Pagination Controls */}
                <div className="flex justify-between mt-4 gap-2">
                  <button
                    className={`px-4 py-2 rounded-lg ${
                      pagination.previous
                        ? "bg-secondaryPurple text-primaryPurple hover:bg-secondaryPurpleHover"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    } transition-all duration-200`}
                    onClick={() => handlePagination("prev")}
                    disabled={!pagination.previous || isFetchingBanks}
                  >
                    Previous
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg ${
                      pagination.next
                        ? "bg-primaryPurple text-white hover:bg-primaryPurpleHover"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    } transition-all duration-200`}
                    onClick={() => handlePagination("next")}
                    disabled={!pagination.next || isFetchingBanks}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Account Number Input */}
          <div className="relative">
            <Input
              type="text"
              label="Account Number"
              value={accountNumber}
              onChange={updateAccountNumber}
              disabled={isLoading}
              className="pr-20"
              containerProps={{
                className: "min-w-0",
              }}
            />
          </div>

          {/* Bank Code Display */}
          <div>
            <p className="text-gray-500 text-[14px] mb-1">Bank Code</p>
            <Input
              type="text"
              value={bankCode}
              disabled
              className="pr-20"
              containerProps={{
                className: "min-w-0",
              }}
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-3 mb-10">
          <button
            className="px-4 py-3 rounded-lg bg-secondaryPurple text-primaryPurple hover:shadow-lg transition-all duration-300"
            onClick={() => navigate("/agent/agentregistration/3")}
          >
            Previous
          </button>

          <button
            className={`px-4 py-3 rounded-lg transition-all duration-300 ${
              accountNumber.length === 10 && bankCode && !isLoading && bank
                ? "bg-primaryPurple text-white hover:shadow-lg"
                : "bg-gray-200 text-gray-500"
            }`}
            onClick={handleBankUpload}
            disabled={
              isLoading ||
              !accountNumber ||
              accountNumber.length !== 10 ||
              !bankCode ||
              !bank
            }
          >
            {isLoading ? "Processing..." : "Verify"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepFour;
