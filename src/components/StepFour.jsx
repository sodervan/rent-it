import { Input, Spinner, Select, Option } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StepFour = ({ accessToken, step }) => {
  const navigate = useNavigate();
  const [accountNumber, setAccountNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bankCode, setBankCode] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [bank, setBank] = useState("");
  const [allBanks, setAllBanks] = useState([]);
  const [isValidated, setIsValidated] = useState(false);
  // const [accessToken, setAccessToken] = useState("");

  const handleBankChange = (selectedBankName) => {
    const selectedBank = allBanks.find(
      (item) => item.name === selectedBankName,
    );
    if (selectedBank) {
      setBank(selectedBank.name);
      setBankCode(selectedBank.code);
    }
  };

  const updateAccountNumber = (e) => {
    setAccountNumber(e.target.value);
  };

  const handleBankUpload = async (event) => {
    event.preventDefault();
    if (!accountNumber || !bankCode) {
      setMessage("Please fill in all required fields.");
      return;
    }
    try {
      setIsLoading(true);

      const response = await fetch(
        "https://rent-it-api.onrender.com/api/v1/agents/withdrawal-account",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            accountNumber: accountNumber,
            bankCode: bankCode,
          }),
        },
      );

      const result = await response.json();
      setStatus(result.statusCode);

      if (response.ok) {
        setMessage("Details updated successfully!");
        timeOut();
      } else {
        setMessage("Failed to update bank details.");
        failedTimeOut();
      }
    } catch (error) {
      console.error("Error updating bank details:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const timeOut = () => {
    setTimeout(() => {
      setMessage("");
      navigate(`/agent/dashboard`);
    }, 2000);
  };
  const failedTimeOut = () => {
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  const fetchAllBanks = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://rent-it-api.onrender.com/api/v1/payments/banks",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const result = await response.json();

      if (response.ok) {
        console.log(result);
        setAllBanks(result.payload.data);
      } else {
        setMessage(result.message || "Failed to get banks.");
      }
    } catch (error) {
      console.error("Error getting Banks:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch banks when the component mounts
  useEffect(() => {
    fetchAllBanks();
  }, []);

  return (
    <div>
      <div className="mt-20 px-6">
        <div className="flex flex-col gap-4">
          <div className="text-center text-lg font-semibold">
            <p>Agent Registration</p>
          </div>
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

          {allBanks.length > 0 ? (
            <div>
              <div className="relative flex w-full items-center justify-center">
                <Select
                  label="Select Bank"
                  onChange={handleBankChange}
                  value={bank}
                >
                  {allBanks.map((item, index) => (
                    <Option key={index} value={item.name}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Spinner className="h-5 w-5" /> {/* Loading spinner */}
            </div>
          )}

          <div>
            <div className="relative flex w-full">
              <Input
                type="text"
                label="Account Number"
                value={accountNumber}
                onChange={updateAccountNumber}
                disabled={isLoading}
                className="pr-20 focus:ring-0"
                containerProps={{
                  className: "min-w-0",
                }}
              />
              {isLoading && (
                <Spinner
                  size="sm"
                  className="!absolute right-1 top-1 rounded h-5 w-5"
                />
              )}
            </div>
          </div>
          <div>
            <p className="text-gray-500 text-[14px] mb-1">Bank Code</p>
            <div className="relative flex w-full">
              <Input
                type="text"
                value={bankCode}
                disabled
                className="pr-20 focus:ring-0"
                containerProps={{
                  className: "min-w-0",
                }}
              />
              {isLoading && (
                <Spinner
                  size="sm"
                  className="!absolute right-1 top-1 rounded h-5 w-5"
                />
              )}
            </div>
          </div>
          {isValidated === false && (
            <p className="text-[14px] text-gray-500">
              - We would need to verify your details before proceeding
            </p>
          )}
          <div className="flex items-center gap-3 mb-10">
            <button
              className="px-4 py-3 rounded-lg bg-secondaryPurple text-primaryPurple hover:shadow-lg transition-all duration-300"
              onClick={() => {
                navigate("/agent/agentregistration/3");
              }}
            >
              <div className="flex items-center justify-center">Previous</div>
            </button>

            <button
              className={`${
                accountNumber.length === 10 && bankCode && !isLoading && bank
                  ? "bg-primaryPurple px-4 py-3 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                  : "bg-gray-200 px-4 py-3 text-gray-500 rounded-lg"
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
              <div className="flex items-center justify-center">
                {isValidated ? "Proceed" : "Verify"}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepFour;
