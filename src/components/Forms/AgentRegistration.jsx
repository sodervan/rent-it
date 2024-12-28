import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import StepTwo from "../StepTwo.jsx";
import StepThree from "../StepThree.jsx";
import StepOne from "../StepOne.jsx";
import StepFour from "../StepFour.jsx";
import AgentRegistrationSidebar from "@/components/AgentRegistrationSidebar.jsx";
import {toast} from "react-toastify";

const AgentRegistration = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { step } = useParams();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [role, setRole] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const [nin, setNin] = useState("");

  const onNinChange = (e) => {
    setNin(e.target.value);
  };
  // Handle file selection or drop
  const handleFile = (file) => {
    setProfileImage(file); // Store the raw file instead of converting to base64
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

  // Upload profile picture to the backend
  const profilePicture = async (event) => {
    event.preventDefault();

    if (!profileImage) {
      setMessage("Please select a profile image to upload.");
      return;
    }

    try {
      setIsLoading(true);

      const formData = new FormData(); // Create a FormData object
      formData.append("profile", profileImage); // Append the file with the key "profile"

      const response = await fetch(`${apiUrl}/api/v1/agents/profile-picture`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData, // Send the FormData object
      });

      const result = await response.json();
      setStatus(result.statusCode);

      if (response.ok) {
        toast.success("Successfully uploaded");
        timeOut();
      } else {
        toast.error("Failed to upload");
        failedTimeout();
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  {
    /*HANDLING NIN UPLOAD*/
  }
  const handleNin = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);

      const response = await fetch(`${apiUrl}/api/v1/agents/verify-nin`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: nin,
      });

      const result = await response.json();
      setStatus(result.statusCode);

      if (response.ok) {
        toast.success("NIN updated successfully!")
        timeOut();
      } else {
        toast.error("Failed to update NIN.")
        failedTimeout();
      }
    } catch (error) {
      console.error("Error updating NIN:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const timeOut = () => {
    setTimeout(() => {
      setMessage("");
      navigate(`/agent/agentregistration/${parseInt(step) + 1}`);
    }, 2000);
  };
  const failedTimeout = () => {
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
    setAccessToken(localStorage.getItem("accessToken"));
    setRefreshToken(localStorage.getItem("refreshToken"));
    setRole(localStorage.getItem("accountType"));
  }, []);

  return (
    <>
      <AgentRegistrationSidebar activeStep={step}/>
      {step === "1" && (
        <StepOne
          triggerFileInput={triggerFileInput}
          handleDrop={handleDrop}
          profileImage={profileImage}
          handleFile={handleFile}
          isLoading={isLoading}
          profilePicture={profilePicture}
          message={message}
          status={status}
        />
      )}

      {step === "2" && (
        <StepTwo
          nin={nin}
          onNinChange={onNinChange}
          isLoading={isLoading}
          handleNin={handleNin}
          message={message}
          status={status}
        />
      )}

      {step === "3" && (
        <StepThree
          accessToken={accessToken}
          refreshToken={refreshToken}
          step={step}
        />
      )}
      {step === "4" && <StepFour accessToken={accessToken} step={step} />}
    </>
  );
};

export default AgentRegistration;
