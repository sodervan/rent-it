import {Button, Radio, Spinner} from "@material-tailwind/react";
import { useState } from "react";
import {useNavigate} from "react-router-dom";

const UploadTenancyAgreement = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleFileUpload = (file) => {
    const newFile = {
      file,
      name: file.name,
      preview: URL.createObjectURL(file),
    };
    setFile(newFile); // Replace the current file
  };

  const removeFile = () => {
    setFile(null); // Clear the file state
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
    const token = localStorage.getItem("accessToken");
    // if (!file || !file.file) {
    //   alert("Please upload a file before saving.");
    //   return;
    // }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("tenancyAgreement", file.file);

    try {
      const response = await fetch(
        `${apiUrl}/api/v1/agents/listings/${storedDetails.listingId}/tenancy-agreement?listingId=${storedDetails.listingId}`,
        {
          method: "POST",
          body: formData,
          Authorization: `Bearer ${token}`,
        },
      );

      if (response.ok) {
        setFile(null); // Clear file after successful upload
        setTimeout(() => {
          navigate("/agent/addlisting/13");
        }, 500);
      } else {
        const errorData = await response.json();
        console.log(errorData);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <div>
        <div className="flex items-center justify-between border-b border-gray-200 pb-4 px-6">
          <p className="text-xl font-medium">
            Upload Tenancy Agreement (Optional)
          </p>
          <Button
            className="bg-secondaryPurple text-primaryPurple font-poppins font-medium shadow-none hover:shadow-none hover:bg-primaryPurple hover:text-white duration-300 transition-all"
            onClick={uploadFile}
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Save"}
          </Button>
        </div>
        <div className="px-6">
          <div>
            <p className="text-gray-500 mt-2 font-medium">Optional Step</p>
            <p className="mt-2 text-lg">Upload Tenancy Agreement</p>
            <p className="text-sm text-gray-500 my-2">
              Please upload a PDF or Word document of the tenancy agreement or
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
                    or drag and drop PDF (max. 5MB)
                  </p>
                </div>
              </div>

              {/* Hidden file input */}
              <input
                id="fileInput"
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={handleFileInput}
              />
            </div>

            {/* Display Uploaded File */}
            {file && (
              <div className="relative group w-full h-full mt-6 border border-gray-300 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between p-3">
                  <p className="text-gray-700 font-medium">{file.name}</p>

                  {/* Remove button */}
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
          <Radio label="I agree that the tenancy agreement is valid, accurate and includes all required details." />
          <div className="my-2">
            <ul>
              <li className="text-sm text-gray-500">1) Property Address</li>
              <li className="text-sm text-gray-500">2) Ownership Details</li>
              <li className="text-sm text-gray-500">3) Proposed Rental Amount</li>
              <li className="text-sm text-gray-500">
                4) Responsibilities of Renters and Landlords
              </li>
              <li className="text-sm text-gray-500">5) Signature of Landlord</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between my-8 gap-4 px-6">
          <Button
            className="font-poppins bg-secondaryPurple text-primaryPurple w-full font-medium"
            onClick={() => navigate(`/agent/addlisting/11`)}
          >
            Previous
          </Button>
          <Button
            className="font-poppins bg-primaryPurple text-white w-full flex justify-center items-center"
            onClick={uploadFile}
            disabled={isUploading}
          >
            {isUploading ? <Spinner className="w-5 h-5"/> : "Proceed"}
          </Button>
          <Button
              className="font-poppins bg-red-400 text-white w-full flex justify-center items-center"
              onClick={()=>{navigate("/agent/addlisting/13")}}
              disabled={isUploading}
          >
            Skip
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadTenancyAgreement;
