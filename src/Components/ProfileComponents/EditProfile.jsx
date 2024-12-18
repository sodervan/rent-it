import { Avatar } from "@material-tailwind/react";
import { FiEdit } from "react-icons/fi";
import { useState, useEffect } from "react";
import { Spinner, Input } from "@material-tailwind/react";

const EditProfile = ({
  profileImage,
  fetchRenterDetails,
  isVisible,
  firstName,
  lastName,
  email,
  phoneNumber,
  cancel,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTwo, setIsLoadingTwo] = useState(false);
  const [message, setMessage] = useState("");

  // State for input fields and tracking original values
  const [changeFirstName, setChangeFirstName] = useState(firstName);
  const [changeLastName, setChangeLastName] = useState(lastName);
  const [changeMobileNumber, setChangeMobileNumber] = useState(phoneNumber);
  const [disabled, setDisabled] = useState(true);

  // Effect to track changes in inputs and enable/disable the Save button
  useEffect(() => {
    if (
      changeFirstName !== firstName ||
      changeLastName !== lastName ||
      changeMobileNumber !== phoneNumber
    ) {
      setDisabled(false); // Enable Save button if changes are detected
    } else {
      setDisabled(true); // Disable Save button if no changes
    }
  }, [
    changeFirstName,
    changeLastName,
    changeMobileNumber,
    firstName,
    lastName,
    phoneNumber,
  ]);

  const handleFirstNameChange = (e) => {
    setChangeFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setChangeLastName(e.target.value);
  };

  const handleMobileChange = (e) => {
    setChangeMobileNumber(e.target.value);
  };

  const handleProfileUpdate = async (event) => {
    event?.preventDefault();
    setIsLoadingTwo(true);
    try {
      const response = await fetch(
        "https://rent-it-api.onrender.com/api/v1/users/profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            firstname: changeFirstName,
            lastname: changeLastName,
            phoneNumber: changeMobileNumber,
            isStudent: false,
          }),
        },
      );

      if (response.ok) {
        const token = localStorage.getItem("accessToken");
        fetchRenterDetails(token);
        setMessage("Profile updated successfully!");
      } else {
        setMessage("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoadingTwo(false);
    }
  };
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("profile", file);
    setIsLoading(true);

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
        const token = localStorage.getItem("accessToken");
        fetchRenterDetails(token);
        setMessage("Profile picture updated successfully!");
      } else {
        setMessage("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      handleImageUpload(file);
    }
  };

  const handleIconClick = () => {
    document.getElementById("profilePicInput").click();
  };

  return (
    <>
      <div
        className={`fixed bottom-0 left-0 z-50 transform overflow-y-auto transition-transform duration-500 ease-in-out ${
          isVisible ? "translate-y-0" : "translate-y-full"
        } bg-white h-[88%] w-full rounded-t-2xl shadow-2xl px-6`}
      >
        <div className="flex flex-col h-full relative">
          <div>
            {/* Profile Section */}
            <div className="flex justify-center relative mt-8">
              <div className="relative border-4 border-white shadow-xl rounded-full">
                <Avatar src={profileImage} alt="Profile" size="xxl" />
                {isLoading ? (
                  <Spinner className="h-4 w-4 absolute bottom-0 right-0" />
                ) : (
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 bg-gray-200 p-2 rounded-full"
                    onClick={handleIconClick}
                  >
                    <FiEdit className="h-5 w-5 text-primaryPurple" />
                  </button>
                )}
                <input
                  id="profilePicInput"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageSelect}
                />
              </div>
            </div>

            {/* Options Section */}
            <div className="flex flex-col gap-6 mt-10">
              <div>
                <Input
                  label="First Name"
                  value={changeFirstName}
                  onChange={handleFirstNameChange}
                />
              </div>

              <div>
                <Input
                  label="Last Name"
                  value={changeLastName}
                  onChange={handleLastNameChange}
                />
              </div>

              <div>
                <Input label="EMail" value={email} disabled />
              </div>

              <div>
                <Input
                  label="Mobile Number"
                  value={changeMobileNumber}
                  onChange={handleMobileChange}
                />
              </div>
            </div>
          </div>

          {/* Button at the bottom */}
          <div className="mt-16 mb-5 flex items-center gap-3">
            <button
              onClick={handleProfileUpdate}
              className={`w-full text-white flex justify-center rounded-lg p-3 hover:shadow-lg transition-all duration-300 ${
                disabled || isLoadingTwo ? "bg-gray-300" : "bg-primaryPurple"
              }`}
              disabled={disabled || isLoadingTwo}
            >
              {isLoadingTwo ? <Spinner /> : "Save Changes"}
            </button>
            <button
              disabled={isLoadingTwo}
              onClick={cancel}
              className={`w-full ${isLoadingTwo ? "bg-gray-300 text-gray-500" : "bg-red-100 text-red-500"} rounded-lg p-3 hover:shadow-lg transition-all duration-300`}
            >
              Cancel
            </button>
          </div>
          {message ? message : ""}
        </div>
      </div>
    </>
  );
};

export default EditProfile;
