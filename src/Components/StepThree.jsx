import { Input, Spinner } from "@material-tailwind/react";
import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation } from "react-icons/hi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StepThree = ({ accessToken, refreshToken, step }) => {
  const navigate = useNavigate();
  const [isOrg, setIsOrg] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const handleFile = (file) => {
    setProfileImage(file); // Store the raw file instead of converting to base64
  };

  // Handle drop event
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFile(file);
  };

  // Trigger file input when div or "Click to upload" is clicked
  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };
  const onOrgChange = (e) => {
    setIsOrg(e.target.value);
  };
  const onLicenseChange = (e) => {
    setLicenseNumber(e.target.value);
  };

  const handleOrgAndLic = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);

      // Create FormData object
      const formData = new FormData();
      formData.append("organization", isOrg);
      formData.append("licenseNumber", licenseNumber);
      formData.append("certification", profileImage); // Append the image file directly

      const response = await fetch(
        "https://rent-it-api.onrender.com/api/v1/agents/certificationAndLicense",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the token in headers
          },
          body: formData, // Use formData as body
        },
      );

      const result = await response.json();
      setStatus(result.statusCode);

      if (response.ok) {
        setMessage("Details updated successfully!");
        timeOut();
      } else {
        setMessage(
          result.message || "Failed to update certification and license.",
        );
        console.log(result);
        failedTimeOut();
      }
    } catch (error) {
      console.error("Error updating certification and license:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const failedTimeOut = () => {
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };
  const timeOut = () => {
    setTimeout(() => {
      setMessage("");
      navigate(`/agent/agentregistration/${parseInt(step) + 1}`);
    }, 2000);
  };
  return (
    <div>
      <div className="mt-20 px-6">
        <div className="flex flex-col gap-4">
          <div className="text-center text-lg font-semibold">
            <p>Agent Registration</p>
          </div>
          <div className="text-[14px]">
            <p className="text-gray-500">Step 4 of 5</p>
          </div>
          <div>
            <p>Certification and License(optional)</p>
          </div>
          <div>
            <p className="text-gray-500 text-[14px]">
              Provide your professional credentials to get fully verified
            </p>
          </div>

          <div>
            <div className="relative flex w-full">
              <Input
                type="text"
                label="Organization/Association"
                value={isOrg}
                onChange={onOrgChange}
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
          <div>
            <div className="relative flex w-full">
              <Input
                type="text"
                label="License Number/Unique ID"
                value={licenseNumber}
                onChange={onLicenseChange}
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
          <div className="mt-3">
            <p className="text-gray-500 text-[14px]">Upload Certification</p>
          </div>

          {/* Drag-and-drop or click-to-upload area */}
          <div
            className="w-full border border-gray-500 rounded-lg px-3 py-4 flex flex-col gap-3 items-center justify-center cursor-pointer"
            onClick={triggerFileInput}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()} // Prevent default to allow drop
          >
            {/* Display the uploaded image or a placeholder */}
            {profileImage ? (
              <img
                src={URL.createObjectURL(profileImage)} // Use URL.createObjectURL to display the file
                alt="Uploaded profile"
                className="w-32 h-32 object-cover rounded-full"
              />
            ) : (
              <img
                src="https://res.cloudinary.com/dmlgns85e/image/upload/v1725362394/Featured_icon_mtrbjd.png"
                alt="Placeholder"
              />
            )}
            <div>
              <p className="text-gray-500 text-center text-[15px]">
                <span className="text-primaryPurple cursor-pointer hover:underline">
                  Click to upload
                </span>{" "}
                or drag and drop PNG, JPG (max. 800x400px)
              </p>
            </div>
          </div>

          {/* Hidden file input */}
          <input
            id="fileInput"
            type="file"
            accept="image/png, image/jpeg"
            className="hidden"
            onChange={(e) => handleFile(e.target.files[0])}
          />
          <div className="flex items-center gap-3 mb-10">
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
              className={`${isOrg.length > 1 && licenseNumber.length > 1 && isLoading === false && profileImage !== "" ? "bg-primaryPurple px-4 py-3 text-white rounded-lg hover:shadow-lg transition-all duration-300" : "bg-gray-200 px-4 py-3 text-gray-500 rounded-lg"}`}
              onClick={handleOrgAndLic}
              disabled={
                isLoading ||
                isOrg.length < 1 ||
                licenseNumber.length < 1 ||
                profileImage === ""
              }
            >
              <div className="flex items-center justify-center">Proceed</div>
            </button>
            <button
              className="px-4 py-3 rounded-lg bg-red-100 text-red-500"
              onClick={handleOrgAndLic}
            >
              <div className="flex items-center justify-center">Skip</div>
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
export default StepThree;
