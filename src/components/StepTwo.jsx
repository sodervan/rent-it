import { Input, Spinner } from "@material-tailwind/react";
import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const StepTwo = ({
  nin,
  onNinChange,
  isLoading,
  handleNin,
  message,
  status,
}) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="mt-20 px-6">
        <div className="flex flex-col gap-4">
          <div className="text-center text-lg font-semibold">
            <p>Agent Registration</p>
          </div>
          <div className="text-[14px]">
            <p className="text-gray-500">Step 3 of 5</p>
          </div>
          <div>
            <p>NIN Verification</p>
          </div>

          <div>
            <div className="relative flex w-full">
              <Input
                type="text"
                label="Enter NIN"
                value={nin}
                onChange={onNinChange}
                disabled={isLoading}
                className="pr-20 focus:ring-0"
                containerProps={{
                  className: "min-w-0",
                }}
              />
              {isLoading && (
                <Spinner
                  size="sm"
                  className="!absolute right-1 top-1 rounded h-4 w-4"
                />
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="px-4 py-3 rounded-lg bg-secondaryPurple text-primaryPurple hover:shadow-lg transition-all duration-300"
              onClick={() => {
                navigate("/agent/agentregistration/2");
                // window.location.reload();
              }}
            >
              <div className="flex items-center justify-center">Previous</div>
            </button>

            <button
              className={`${nin.length === 10 && isLoading === false ? "bg-primaryPurple px-4 py-3 text-white rounded-lg hover:shadow-lg transition-all duration-300" : "bg-gray-200 px-4 py-3 text-gray-500 rounded-lg"}`}
              onClick={handleNin}
              disabled={isLoading || nin.length < 10}
            >
              <div className="flex items-center justify-center">Proceed</div>
            </button>
          </div>

          {/* Display message */}
          {message && (
            <div className="fixed top-2 right-2 z-[3000]">
              <Toast>
                <div
                  className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${status === 201 ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"} dark:bg-green-800 dark:text-green-200`}
                >
                  {status === 201 ? (
                    <HiCheck className="h-5 w-5" />
                  ) : (
                    <HiExclamation className="h-5 w-5" />
                  )}
                </div>
                <div className="ml-3 text-sm font-normal">
                  {status === 201 ? "Successful" : message}
                </div>
                <Toast.Toggle />
              </Toast>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
