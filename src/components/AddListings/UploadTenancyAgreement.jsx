import { Button, Radio, Spinner } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // For toast notifications
import axios from "axios"; // Import Axios

const UploadTenancyAgreement = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false); // Track agreement to terms
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleFileUpload = (file) => {
    const newFile = {
      file,
      name: file.name,
      preview: URL.createObjectURL(file),
    };
    setFile(newFile);
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleFileInput = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const uploadFile = async () => {
    const storedDetails = JSON.parse(localStorage.getItem("basicDetails"));

    if (!agreeToTerms) {
      toast.error("You must agree to the terms and conditions to proceed."); // Error toast
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();

      // If file exists, append it to formData, otherwise send empty object
      if (file && file.file) {
        formData.append("file", file.file);
      }

      const response = await axios.post(
        `${apiUrl}/api/v1/agents/listings/${storedDetails.listingId}/tenancy-agreement`,
        file ? formData : {}, // Send FormData if file exists, otherwise send empty object
        {
          withCredentials: true, // Include cookies in the request
          headers: {
            "Content-Type": file ? "multipart/form-data" : "application/json",
          },
        },
      );

      console.log("Upload Response:", response); // Log the full response

      if (response.data.status === "success") {
        toast.success("Tenancy agreement uploaded successfully!"); // Success toast
        setFile(null);
        setTimeout(() => {
          navigate("/agent/addlisting/13");
        }, 500);
      } else {
        toast.error("Failed to upload tenancy agreement."); // Error toast
      }
    } catch (error) {
      console.error("Error uploading file:", error); // Log the full error object
      console.error("Error Response Data:", error.response?.data); // Log the error response data
      toast.error(
        error.response?.data?.message ||
          "An error occurred while uploading the file.",
      ); // Error toast
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <div>
        <div className="flex items-center justify-between border-b border-gray-200 pb-4 px-6">
          <p className="text-xl font-medium">Upload Tenancy Agreement</p>
        </div>
        <div className="px-6">
          <div>
            <p className="mt-2 text-lg">Upload Tenancy Agreement</p>
            <p className="text-sm text-gray-500 my-2">
              Please upload a PDF, DOC, or DOCX file of the tenancy agreement or
              property documentation, ensuring it includes all key details.
            </p>
            <div className="mt-6">
              <div
                className="w-full border border-gray-500 rounded-lg px-3 py-4 flex flex-col gap-3 items-center justify-center cursor-pointer"
                onClick={triggerFileInput}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                <img
                  src="https://res.cloudinary.com/dmlgns85e/image/upload/v1725362394/Featured_icon_mtrbjd.png"
                  alt="Placeholder"
                  className="w-16 h-16"
                />
                <div>
                  <p className="text-gray-500 text-center text-[15px]">
                    <span className="text-primaryPurple cursor-pointer hover:underline">
                      Click to upload
                    </span>{" "}
                    or drag and drop PDF, DOC, or DOCX (max. 5MB)
                  </p>
                </div>
              </div>

              <input
                id="fileInput"
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="hidden"
                onChange={handleFileInput}
              />
            </div>

            {file && (
              <div className="relative group w-full h-full mt-6 border border-gray-300 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between p-3">
                  <p className="text-gray-700 font-medium">{file.name}</p>
                  <button
                    className="bg-black/60 text-white text-xs px-2 py-1 rounded-md"
                    onClick={removeFile}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="px-6 my-4">
          <Radio
            label="I agree that the tenancy agreement is valid, accurate and includes all required details."
            checked={agreeToTerms}
            onChange={() => setAgreeToTerms(!agreeToTerms)} // Toggle agreement
          />
          <div className="my-2">
            <ul>
              <li className="text-sm text-gray-500">1) Property Address</li>
              <li className="text-sm text-gray-500">2) Ownership Details</li>
              <li className="text-sm text-gray-500">
                3) Proposed Rental Amount
              </li>
              <li className="text-sm text-gray-500">
                4) Responsibilities of Renters and Landlords
              </li>
              <li className="text-sm text-gray-500">
                5) Signature of Landlord
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between my-8 gap-4 px-6">
          <Button
            className="font-poppins bg-secondaryPurple text-primaryPurple w-full font-medium"
            onClick={() => navigate("/agent/addlisting/11")}
          >
            Previous
          </Button>
          <Button
            className="font-poppins bg-primaryPurple text-white w-full flex justify-center items-center"
            onClick={uploadFile}
            disabled={isUploading || !agreeToTerms} // Disable if not agreed to terms
          >
            {isUploading ? <Spinner className="w-5 h-5" /> : "Proceed"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadTenancyAgreement;
