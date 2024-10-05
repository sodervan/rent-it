import { useState } from "react";

const AgentRegistration = () => {
  const [profileImage, setProfileImage] = useState(null);

  // Handle file selection or drop
  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => setProfileImage(e.target.result);
    reader.readAsDataURL(file);
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

  return (
    <>
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
                src={profileImage}
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

          <button className="bg-secondaryPurple px-4 py-3 text-primaryPurple rounded-lg hover:bg-primaryPurple hover:text-white transition-all duration-300">
            Confirm
          </button>
        </div>
      </div>
    </>
  );
};

export default AgentRegistration;
