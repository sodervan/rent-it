import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

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
          <div className="flex items-center justify-center space-x-2">
            <div className="w-8 h-8 border-4 border-primaryPurple border-t-transparent rounded-full animate-spin" />
            <p className="text-lg text-gray-600">Verifying your email...</p>
          </div>
        );

      case "success":
        return (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-green-800 font-semibold">Success!</h3>
              <p className="text-green-700">{message}</p>
            </div>
            <button
              onClick={() =>
                navigate(role === "agent" ? "/agent/login" : "/renter/login")
              }
              className="w-full px-6 py-3 text-white bg-primaryPurple rounded-lg hover:bg-opacity-90 transition-all duration-200"
            >
              Proceed to Login
            </button>
          </div>
        );

      case "error":
        return (
          <div className="text-center space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-red-800 font-semibold">
                Verification Failed
              </h3>
              <p className="text-red-700">{message}</p>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate("/")}
                className="px-6 py-3 text-white bg-primaryPurple rounded-lg hover:bg-opacity-90 transition-all"
              >
                Request New Verification
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-3 text-primaryPurple bg-secondaryPurple rounded-lg hover:bg-opacity-90 transition-all"
              >
                Return Home
              </button>
            </div>
          </div>
        );

      case "expired":
        return (
          <div className="text-center space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="text-yellow-800 font-semibold">Link Expired</h3>
              <p className="text-yellow-700">{message}</p>
            </div>
            <button
              onClick={() => navigate("/resend-verification")}
              className="w-full px-6 py-3 text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 transition-all"
            >
              Request New Link
            </button>
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
