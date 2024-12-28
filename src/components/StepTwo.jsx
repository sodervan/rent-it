import { Input, Spinner } from "@material-tailwind/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

  // Trigger Toastify notifications based on message and status
  if (message) {
    if (status === 201) {
      toast.success("Successful", { position: "top-right", autoClose: 3000 });
    } else {
      toast.error(message, { position: "top-right", autoClose: 3000 });
    }
  }

  return (
    <div>
      <div className="mt-24 px-6 md:ml-[28%] md:w-[70%] max-w-[800px] sm:px-10">
        <div className="flex flex-col gap-4">
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
                  navigate("/agent/agentregistration/1");
                }}
            >
              <div className="flex items-center justify-center">Previous</div>
            </button>

            <button
                className={`${
                    nin.length === 10 && isLoading === false
                        ? "bg-primaryPurple px-4 py-3 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                        : "bg-gray-200 px-4 py-3 text-gray-500 rounded-lg"
                }`}
                onClick={handleNin}
                disabled={isLoading || nin.length < 10}
            >
              <div className="flex items-center justify-center">Proceed</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
