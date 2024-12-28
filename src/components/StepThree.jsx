import { Input, Spinner } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StepThree = ({ accessToken, step }) => {
  const navigate = useNavigate();
  const [isOrg, setIsOrg] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;

  // Handle file selection
  const handleFile = (file) => {
    setProfileImage(file); // Store the raw file
  };

  // Handle drag-and-drop
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFile(file);
  };

  // Trigger file input when div or "Click to upload" is clicked
  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  // Handle Organization/Association input change
  const onOrgChange = (event) => {
    setIsOrg(event.target.value);
  };

  // Handle License Number/Unique ID input change
  const onLicenseChange = (event) => {
    setLicenseNumber(event.target.value);
  };

  // Form submission handler
  const handleOrgAndLic = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);

      // Create FormData object
      const formData = new FormData();
      formData.append("organization", isOrg);
      formData.append("licenseNumber", licenseNumber);
      formData.append("certification", profileImage);

      // Make API request
      const response = await fetch(
        `${apiUrl}/api/v1/agents/certificationAndLicense`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        },
      );

      const result = await response.json();

      if (response.ok) {
        toast.success("Details updated successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate(`/agent/agentregistration/${parseInt(step) + 1}`);
      } else {
        toast.error(
          result.message || "Failed to update certification and license.",
          { position: "top-right", autoClose: 3000 },
        );
      }
    } catch (error) {
      console.error("Error updating certification and license:", error);
      toast.error("An error occurred. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Skip action
  const skipStep = () => {
    navigate(`/agent/agentregistration/${parseInt(step) + 1}`);
  };

  return (
    <div>
      <div className="mt-24 px-6 md:ml-[28%] md:w-[70%] max-w-[800px] sm:px-10">
        <div className="flex flex-col gap-4">
          <div className="text-[14px]">
            <p className="text-gray-500">Step 4 of 5</p>
          </div>
          <div>
            <p>Certification and License (optional)</p>
          </div>
          <div>
            <p className="text-gray-500 text-[14px]">
              Provide your professional credentials to get fully verified
            </p>
          </div>

          {/* Organization/Association field */}
          <div>
            <div className="relative flex w-full">
              <Input
                type="text"
                label="Organization/Association"
                value={isOrg}
                onChange={onOrgChange}
                disabled={isLoading}
                className="pr-20 focus:ring-0"
                containerProps={{ className: "min-w-0" }}
              />
              {isLoading && (
                <Spinner
                  size="sm"
                  className="!absolute right-1 top-1 rounded h-4 w-4"
                />
              )}
            </div>
          </div>

          {/* License Number/Unique ID field */}
          <div>
            <div className="relative flex w-full">
              <Input
                type="text"
                label="License Number/Unique ID"
                value={licenseNumber}
                onChange={onLicenseChange}
                disabled={isLoading}
                className="pr-20 focus:ring-0"
                containerProps={{ className: "min-w-0" }}
              />
              {isLoading && (
                <Spinner
                  size="sm"
                  className="!absolute right-1 top-1 rounded h-4 w-4"
                />
              )}
            </div>
          </div>

          {/* Upload Certification */}
          <div className="mt-3">
            <p className="text-gray-500 text-[14px]">Upload Certification</p>
          </div>
          <div
            className="w-full border border-gray-500 rounded-lg px-3 py-4 flex flex-col gap-3 items-center justify-center cursor-pointer"
            onClick={triggerFileInput}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {profileImage ? (
              <img
                src={URL.createObjectURL(profileImage)}
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

          {/* Buttons */}
          <div className="flex items-center gap-3 mb-10">
            <button
              className="px-4 py-3 rounded-lg bg-secondaryPurple text-primaryPurple hover:shadow-lg transition-all duration-300"
              onClick={() => navigate("/agent/agentregistration/2")}
            >
              Previous
            </button>

            <button
              className={`${
                !isLoading
                  ? "bg-primaryPurple px-4 py-3 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                  : "bg-gray-200 px-4 py-3 text-gray-500 rounded-lg"
              }`}
              onClick={handleOrgAndLic}
              disabled={isLoading}
            >
              Proceed
            </button>

            {/*<button*/}
            {/*    className="px-4 py-3 rounded-lg bg-red-100 text-red-500"*/}
            {/*    onClick={skipStep}*/}
            {/*>*/}
            {/*  Skip*/}
            {/*</button>*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepThree;
