import { Button, Radio, Spinner } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const UploadTenancyAgreement = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [existingAgreement, setExistingAgreement] = useState(null);

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [searchParams] = useSearchParams();
  const encodedItemId = searchParams.get("itemId");

  const decodeId = (encodedId) => {
    return atob(encodedId);
  };

  const itemId = encodedItemId ? decodeId(encodedItemId) : null;

  const fetchTenancyAgreement = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${apiUrl}/api/v1/agents/listings/${itemId}/tenancy-agreement`,
        { withCredentials: true },
      );

      if (response.data.payload && response.data.payload[0]) {
        const agreement = response.data.payload[0];
        const agreementData = {
          name: agreement.path.split("/").pop(),
          preview: agreement.fileUrl,
          existingFile: true,
          id: agreement.id,
          path: agreement.path,
          listingId: agreement.listingId,
        };
        setExistingAgreement(agreementData);
        setFile(agreementData);
        setAgreeToTerms(true);
      }
    } catch (error) {
      console.error("Error fetching tenancy agreement:", error);
      toast.error("Failed to fetch tenancy agreement");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (file) => {
    const newFile = {
      file,
      name: file.name,
      preview: URL.createObjectURL(file),
      existingFile: false,
    };
    setFile(newFile);
    setExistingAgreement(null); // Clear existing agreement when new file is uploaded
  };

  const removeFile = () => {
    setFile(null);
    setAgreeToTerms(false);
    setExistingAgreement(null);
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
    if (!agreeToTerms) {
      toast.error("You must agree to the terms and conditions to proceed.");
      return;
    }

    if (!file) {
      toast.error("Please select or upload a tenancy agreement.");
      return;
    }

    setIsUploading(true);

    try {
      let response;
      const targetId = encodedItemId
        ? itemId
        : JSON.parse(localStorage.getItem("basicDetails"))?.listingId;

      if (file.existingFile) {
        // If using existing agreement, send it as JSON
        const formData = new FormData();
        formData.append("file", existingAgreement);
        response = await axios.post(
          `${apiUrl}/api/v1/agents/listings/${targetId}/tenancy-agreement`,
          {
            formData,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
      } else {
        // If using new file, send as FormData
        const formData = new FormData();
        formData.append("file", file.file);

        response = await axios.post(
          `${apiUrl}/api/v1/agents/listings/${targetId}/tenancy-agreement`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
      }

      if (response.data.status === "success") {
        toast.success("Tenancy agreement processed successfully!");
        setTimeout(() => {
          navigate(
            `/agent/addlisting/13${encodedItemId ? `?itemId=${encodedItemId}` : ""}`,
          );
        }, 500);
      } else {
        toast.error("Failed to process tenancy agreement.");
      }
    } catch (error) {
      console.error("Error processing file:", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while processing the file.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (itemId) {
      fetchTenancyAgreement();
    } else {
      setIsLoading(false);
    }
  }, [itemId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  return (
    <div>
      <div>
        <div className="flex items-center justify-between border-b border-gray-200 pb-4 px-6">
          <p className="text-xl font-medium">
            {existingAgreement
              ? "Review Tenancy Agreement"
              : "Upload Tenancy Agreement"}
          </p>
        </div>
        <div className="px-6">
          <div>
            <p className="mt-2 text-lg">
              {existingAgreement
                ? "Current Tenancy Agreement"
                : "Upload Tenancy Agreement"}
            </p>
            <p className="text-sm text-gray-500 my-2">
              Please upload a PDF, DOC, or DOCX file of the tenancy agreement or
              property documentation, ensuring it includes all key details.
            </p>

            {!file && (
              <div
                className="mt-6 w-full border border-gray-500 rounded-lg px-3 py-4 flex flex-col gap-3 items-center justify-center cursor-pointer"
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
            )}

            <input
              id="fileInput"
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="hidden"
              onChange={handleFileInput}
            />

            {file && (
              <div className="relative group w-full h-full mt-6 border border-gray-300 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://res.cloudinary.com/dmlgns85e/image/upload/v1725362394/Featured_icon_mtrbjd.png"
                      alt="File icon"
                      className="w-6 h-6"
                    />
                    <p className="text-gray-700 font-medium">{file.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {file.preview && (
                      <a
                        href={file.preview}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primaryPurple text-white text-xs px-2 py-1 rounded-md hover:bg-purple-700 transition-colors"
                      >
                        View
                      </a>
                    )}
                    <button
                      className="bg-black/60 text-white text-xs px-2 py-1 rounded-md hover:bg-black/70 transition-colors"
                      onClick={removeFile}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="px-6 my-4">
          <Radio
            label="I agree that the tenancy agreement is valid, accurate and includes all required details."
            checked={agreeToTerms}
            onChange={() => setAgreeToTerms(!agreeToTerms)}
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
            className="font-poppins bg-secondaryPurple text-primaryPurple w-full font-medium hover:bg-purple-100 transition-colors"
            onClick={() => {
              navigate(
                `/agent/addlisting/11${encodedItemId ? `?itemId=${encodedItemId}` : ""}`,
              );
            }}
          >
            Previous
          </Button>
          <Button
            className="font-poppins bg-primaryPurple text-white w-full flex justify-center items-center hover:bg-purple-700 transition-colors"
            onClick={uploadFile}
            disabled={isUploading || !agreeToTerms || !file}
          >
            {isUploading ? <Spinner className="w-5 h-5" /> : "Proceed"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadTenancyAgreement;
