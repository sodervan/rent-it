import { Spinner } from "@material-tailwind/react";
import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation } from "react-icons/hi";

const StepOne = ({
  triggerFileInput,
  handleDrop,
  profileImage,
  handleFile,
  isLoading,
  profilePicture,
  message,
  status,
}) => {
  return (
    <div>
      <div className="mt-20 px-6">
        <div className="flex flex-col gap-4">
          <div className="text-center text-lg font-semibold">
            <p>Agent Registration</p>
          </div>
          <div className="text-[14px]">
            <p className="text-gray-500">Step 2 of 5</p>
          </div>
          <div>
            <p>Upload Profile Photo</p>
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

          {/* Confirm button to trigger upload */}
          <button
            className={`${profileImage && isLoading === false ? "bg-secondaryPurple px-4 py-3 text-primaryPurple rounded-lg hover:bg-primaryPurple hover:text-white transition-all duration-300" : "bg-gray-200 px-4 py-3 text-gray-500 rounded-lg"}`}
            onClick={profilePicture}
            disabled={isLoading || profileImage === null}
          >
            <div className="flex items-center justify-center">
              {isLoading ? <Spinner /> : "Confirm"}
            </div>
          </button>

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

export default StepOne;
