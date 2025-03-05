import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import { CheckCircle, AlertTriangle, AlertCircle, Loader2 } from "lucide-react";

const VerificationEmail = () => {
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const role = localStorage.getItem("role");
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("No verification token found. Please check your email link.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await axios.post(
          `${apiUrl}/api/v1/users/verify/${token}`,
        );

        console.log("Verification successful:", response.data);
        setStatus("success");
        setMessage("Your email has been successfully verified!");
      } catch (error) {
        console.error(
          "Verification error:",
          error.response?.data || error.message,
        );

        if (
          error.response?.status === 403 &&
          error.response?.data?.message === "Token expired"
        ) {
          setStatus("expired");
          setMessage(
            "Your verification link has expired. Please request a new one.",
          );
        } else {
          setStatus("error");
          setMessage(
            error.response?.data?.message ||
              "Verification failed. Please try again.",
          );
        }
      }
    };

    verifyEmail();
  }, [token, apiUrl]);

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("accountType");
    navigate("/");
    window.location.reload();
  };

  const renderContent = () => {
    switch (status) {
      case "loading":
        return (
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2
              className="animate-spin text-primaryPurple"
              size={48}
              strokeWidth={2}
            />
            <p className="text-lg text-gray-600 text-center">
              Verifying your email address...
            </p>
          </div>
        );

      case "success":
        return (
          <div className="space-y-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 rounded-full p-4">
                <CheckCircle
                  className="text-green-600"
                  size={56}
                  strokeWidth={1.5}
                />
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                Verification Successful
              </h3>
              <p className="text-green-700">{message}</p>
            </div>
            <Button
              color="green"
              className="w-full"
              onClick={() =>
                navigate(role === "agent" ? "/agent/login" : "/renter/login")
              }
            >
              Proceed to Login
            </Button>
          </div>
        );

      case "error":
        return (
          <div className="space-y-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 rounded-full p-4">
                <AlertCircle
                  className="text-red-600"
                  size={56}
                  strokeWidth={1.5}
                />
              </div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <h3 className="text-xl font-semibold text-red-800 mb-2">
                Verification Failed
              </h3>
              <p className="text-red-700">{message}</p>
            </div>
            <div className="space-y-3">
              <Button
                color="purple"
                className="w-full"
                onClick={() => navigate("/")}
              >
                Request New Verification
              </Button>
              <Button
                variant="outlined"
                color="purple"
                className="w-full"
                onClick={handleLogout}
              >
                Return Home
              </Button>
            </div>
          </div>
        );

      case "expired":
        return (
          <div className="space-y-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-yellow-100 rounded-full p-4">
                <AlertTriangle
                  className="text-yellow-600"
                  size={56}
                  strokeWidth={1.5}
                />
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <h3 className="text-xl font-semibold text-yellow-800 mb-2">
                Verification Link Expired
              </h3>
              <p className="text-yellow-700">{message}</p>
            </div>
            <Button
              color="yellow"
              className="w-full"
              onClick={() => navigate("/resend-verification")}
            >
              Request New Link
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default VerificationEmail;
