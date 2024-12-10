import { Button, Spinner } from "@material-tailwind/react";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const UploadListingImages = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]); // Store multiple images
  const [loading, setLoading] = useState(false);

  const handleFile = (files) => {
    const selectedFiles = Array.from(files);
    selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prevImages) => [
          ...prevImages,
          { id: Date.now() + Math.random(), data: reader.result }, // Add unique ID and base64 data
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    handleFile(event.dataTransfer.files);
  };

  const removeImage = (id) => {
    setImages((prevImages) => prevImages.filter((image) => image.id !== id));
  };

  return (
    <div className="mt-22">
      <div>
        <div className="flex items-center justify-between border-b border-gray-200 pb-4 px-6">
          <p className="text-xl font-medium">Add New Listing</p>
          <Button className="bg-secondaryPurple text-primaryPurple font-medium shadow-none hover:shadow-none hover:bg-primaryPurple hover:text-white transition duration-300">
            Save
          </Button>
        </div>
        <div className="px-6">
          <div>
            <p className="text-gray-500 mt-2 font-medium">Step 9 of 15</p>
            <p className="mt-2 text-lg">Upload Listing Images</p>
            <p className="text-sm text-gray-500 my-2">
              Add high-quality images to attract potential renters. Drag to
              rearrange and place cover image to the top.
            </p>
            <div className="mt-6">
              <div
                className="w-full border border-gray-500 rounded-lg px-3 py-4 flex flex-col gap-3 items-center justify-center cursor-pointer"
                onClick={triggerFileInput}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()} // Prevent default to allow drop
              >
                <IoMdAdd className="text-4xl text-primaryPurple" />
                <p className="text-gray-500 text-center text-[15px]">
                  <span className="text-primaryPurple cursor-pointer hover:underline">
                    Click to upload
                  </span>{" "}
                  or drag and drop PNG, JPG (max. 800x400px)
                </p>
              </div>
              <input
                id="fileInput"
                type="file"
                accept="image/png, image/jpeg"
                multiple
                className="hidden"
                onChange={(e) => handleFile(e.target.files)}
              />
            </div>

            {/* Image Previews */}
            {images.length > 0 && (
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="relative group border rounded-lg overflow-hidden"
                  >
                    <img
                      src={image.data}
                      alt="Uploaded"
                      className="w-full h-32 object-cover"
                    />
                    <button
                      onClick={() => removeImage(image.id)}
                      className="absolute top-1 right-1 bg-gray-500 opacity-50 text-white rounded-full p-1"
                    >
                      <IoMdClose size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="my-8 flex items-center gap-4 px-6">
          <Button
            className="capitalize font-medium bg-secondaryPurple text-primaryPurple w-full text-[15px] font-poppins"
            onClick={() => {
              navigate("/agent/addlisting/8");
            }}
          >
            Previous
          </Button>
          <Button
            className={`${
              loading
                ? "bg-gray-200 px-4 py-3 text-gray-500 rounded-lg w-full flex justify-center items-center"
                : "bg-primaryPurple text-white w-full text-[15px] font-poppins flex justify-center items-center"
            }`}
            disabled={loading}
            onClick={() => {
              // postDescription();
            }}
          >
            {loading ? <Spinner className="h-4 w-4" /> : "Proceed"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadListingImages;
