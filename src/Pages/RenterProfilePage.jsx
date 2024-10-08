import { useEffect, useState } from "react";
import LoaderTwo from "../Components/Loaders/LoaderTwo.jsx";
import { Avatar } from "@material-tailwind/react";
import { FiEdit, FiBookmark, FiCreditCard, FiLock } from "react-icons/fi";
import {useNavigate} from "react-router-dom";// Importing the edit icon from react-icons

const RenterProfilePage = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [renterData, setRenterData] = useState([]);
  const [profilePic, setProfilePic] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // State for temporary selected image

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("accountType");
    localStorage.removeItem("profileImage");
    navigate("/");
    window.history.replaceState(
        null,
        "",
        "/",
    );
    window.location.reload();
  };

  const fetchRenterDetails = async (accessToken) => {
    try {
      setIsLoading(true); // Start loading
      const response = await fetch(
        "https://rent-it-api.onrender.com/api/v1/users",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const result = await response.json();
      if (response.ok) {
        setRenterData(result);
        setProfilePic(result.payload?.profilePicLink); // Set profile picture
        console.log(result);
      } else {
        console.log("Failed to fetch renter details");
        setMessage("Error");
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("profile", file);

    try {
      const response = await fetch(
        "https://rent-it-api.onrender.com/api/v1/users/profile-picture",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: formData,
        },
      );

      if (response.ok) {
        // Refetch renter details after successful upload
        const token = localStorage.getItem("accessToken");
        fetchRenterDetails(token);
        setMessage("Profile picture updated successfully!");
      } else {
        console.log("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  const handleIconClick = () => {
    document.getElementById("profilePicInput").click();
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Temporarily show selected image
      handleImageUpload(file); // Upload the image
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    fetchRenterDetails(token);
  }, []);

  return (
    <>
      <div>
        {isLoading ? (
          <div className="mt-20 px-6 flex justify-center w-full">
            <LoaderTwo />
          </div>
        ) : (
          <div className="px-6 mt-20">
            <div className="flex flex-col h-full min-h-screen">
              <div>
                {/* Profile Section */}
                <div className="flex justify-center relative">
                  <div className="relative border-4 border-white shadow-xl rounded-full">
                    <Avatar
                      src={
                        selectedImage
                          ? selectedImage
                          : profilePic
                            ? profilePic
                            : "https://res.cloudinary.com/dmlgns85e/image/upload/v1728420212/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8_xhafna.jpg"
                      }
                      alt="Profile"
                      size="xxl"
                    />
                    {/* Pen Icon using react-icons */}
                    <button
                      type="button"
                      className="absolute bottom-0 right-0 bg-gray-200 p-2 rounded-full"
                      onClick={handleIconClick}
                    >
                      <FiEdit className="h-5 w-5 text-primaryPurple" />
                    </button>

                    {/* Hidden file input */}
                    <input
                      id="profilePicInput"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageSelect} // Handle image select
                    />
                  </div>
                </div>

                {/* Renter details */}
                <div className="flex flex-col items-center justify-center mt-2">
                  <p className="font-medium text-[18px] mb-1">
                    {renterData?.payload?.lastname}{" "}
                    {renterData?.payload?.firstname}
                  </p>
                  <p className="text-[16px] text-gray-600">
                    {renterData?.payload?.email}
                  </p>
                </div>

                {/* Options Section */}
                <div className="flex flex-col gap-4 mt-10">
                  <div className="flex gap-2 items-center w-full py-2 px-3 rounded-lg hover:bg-gray-200 transition-all duration-300 cursor-pointer">
                    <div className="text-gray-700">
                      <FiEdit />
                    </div>
                    <div className="text-gray-700">
                      <p>Edit Profile</p>
                    </div>
                  </div>

                  <div className="flex gap-2 items-center w-full py-2 px-3 rounded-lg hover:bg-gray-200 transition-all duration-300 cursor-pointer">
                    <div className="text-gray-700">
                      <FiBookmark />
                    </div>
                    <div className="text-gray-700">
                      <p>Booking History</p>
                    </div>
                  </div>

                  <div className="flex gap-2 items-center w-full py-2 px-3 rounded-lg hover:bg-gray-200 transition-all duration-300 cursor-pointer">
                    <div className="text-gray-700">
                      <FiCreditCard />
                    </div>
                    <div className="text-gray-700">
                      <p>Transaction History</p>
                    </div>
                  </div>

                  <div className="flex gap-2 items-center w-full py-2 px-3 rounded-lg hover:bg-gray-200 transition-all duration-300 cursor-pointer">
                    <div className="text-gray-700">
                      <FiLock />
                    </div>
                    <div className="text-gray-700">
                      <p>Change Password</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Button at the bottom */}
              <div className="mt-16 mb-5">
                <button onClick={logout} className="w-full bg-primaryPurple text-white rounded-lg p-3 hover:shadow-lg transition-all duration-300">
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RenterProfilePage;
