import { Button, Radio, Spinner } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { IconAlertCircle } from "@tabler/icons-react";

const UploadTenancyAgreement = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
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
    setExistingAgreement(null);
  };

  const removeFile = async () => {
    // If it's an existing file, we need to delete it from the server
    if (existingAgreement) {
      setIsDeleting(true);
      try {
        const targetId = encodedItemId
          ? itemId
          : JSON.parse(localStorage.getItem("basicDetails"))?.listingId;

        const response = await axios.delete(
          `${apiUrl}/api/v1/agents/listings/${targetId}/tenancy-agreement`,
          { withCredentials: true },
        );
        console.log(response);
        if (response.status !== 204) {
          throw new Error("Failed to delete tenancy agreement.");
        }

        toast.success("Tenancy agreement deleted successfully!");
      } catch (error) {
        console.error("Error deleting file:", error);
        toast.error(
          error.response?.data?.message ||
            "An error occurred while deleting the file.",
        );
        return; // Don't clear the file if delete failed
      } finally {
        setIsDeleting(false);
      }
    }

    // Clear the file from state
    setFile(null);
    setAgreeToTerms(false);
    setExistingAgreement(null);

    // If there was a preview URL for a new file, revoke it to prevent memory leaks
    if (file && !file.existingFile && file.preview) {
      URL.revokeObjectURL(file.preview);
    }
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

  const handleProceed = async () => {
    if (!agreeToTerms) {
      toast.error("You must agree to the terms and conditions to proceed.");
      return;
    }

    if (!file) {
      toast.error("Please select or upload a tenancy agreement.");
      return;
    }

    const targetId = encodedItemId
      ? itemId
      : JSON.parse(localStorage.getItem("basicDetails"))?.listingId;

    // Only upload if there's a new file
    if (!file.existingFile) {
      setIsUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file.file);

        const response = await axios.post(
          `${apiUrl}/api/v1/agents/listings/${targetId}/tenancy-agreement`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        if (response.data.status !== "success") {
          throw new Error("Failed to process tenancy agreement.");
        }

        toast.success("Tenancy agreement processed successfully!");
      } catch (error) {
        console.error("Error processing file:", error);
        toast.error(
          error.response?.data?.message ||
            "An error occurred while processing the file.",
        );
        return; // Don't navigate if upload failed
      } finally {
        setIsUploading(false);
      }
    }

    // Navigate to next page regardless of whether we uploaded or not
    navigate(
      `/agent/addlisting/13${encodedItemId ? `?itemId=${encodedItemId}` : ""}`,
    );
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
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <div className="flex items-center gap-1">
                          <Spinner className="w-3 h-3" /> Removing...
                        </div>
                      ) : (
                        "Remove"
                      )}
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
          {/*GUIDELINES*/}
          <div className="my-4 p-4 bg-blue-50 rounded-lg flex items-start gap-3">
            <IconAlertCircle
              className="text-blue-500 flex-shrink-0 mt-1"
              size={20}
            />
            <div className="text-sm text-blue-700">
              <p className="font-medium">Tenancy agreement requirements:</p>
              <ul className="list-disc ml-4 mt-1">
                <li>Property Address</li>
                <li>Ownership Details</li>
                <li>Proposed Rental Amount</li>
                <li> Signature of Landlord</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-between my-8 gap-4 px-6">
          <Button
            className="font-poppins bg-secondaryPurple text-primaryPurple w-full font-medium hover:bg-purple-100 transition-colors"
            onClick={() => {
              navigate(
                `/agent/addlisting/11${
                  encodedItemId ? `?itemId=${encodedItemId}` : ""
                }`,
              );
            }}
          >
            Previous
          </Button>
          <Button
            className="font-poppins bg-primaryPurple text-white w-full flex justify-center items-center hover:bg-purple-700 transition-colors"
            onClick={handleProceed}
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
