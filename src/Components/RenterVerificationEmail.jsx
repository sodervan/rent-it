import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { HiCheckCircle, HiExclamationCircle } from "react-icons/hi"; // For success and failure icons

const RenterVerificationEmail = () => {
  const [status, setStatus] = useState("loading"); // 'loading', 'success', 'error', 'expired', 'no-token'
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // Get the token from the URL query params
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        // No token in the URL
        setStatus("no-token");
        setMessage(
          "No verification token found. Please check your email and try again.",
        );
        return;
      }

      try {
        const response = await fetch(
          `https://rent-it-api.onrender.com/api/v1/users/verify/${token}`,
          {
            method: "POST",
          },
        );
        const result = await response.json();

        if (response.ok) {
          setStatus("success");
          setMessage(result.message || "Email successfully verified!");
        } else if (result.message === "Token expired") {
          setStatus("expired");
          setMessage(
            "The token has expired. Please request a new verification email.",
          );
        } else {
          setStatus("error");
          setMessage(result.message || "Email verification failed.");
        }
      } catch (error) {
        console.error("Error during verification:", error);
        setStatus("error");
        setMessage("Something went wrong, please try again later.");
      }
    };

    verifyEmail();
  }, [token]);

  const handleRedirect = () => {
    navigate("/renter/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg text-center max-w-md">
        {status === "loading" && (
          <div className="flex items-center justify-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
            <p className="ml-4 text-gray-500">
              Verifying your email, please wait...
            </p>
          </div>
        )}

        {status === "success" && (
          <div>
            <HiCheckCircle className="h-12 w-12 text-green-500 mx-auto" />
            <h2 className="text-2xl font-bold mt-4 text-green-600">Success!</h2>
            <p className="text-gray-600 mt-2">{message}</p>
            <button
              onClick={handleRedirect}
              className="mt-4 px-4 py-2 bg-primaryPurple text-white rounded-lg"
            >
              Go to Login
            </button>
          </div>
        )}

        {status === "expired" && (
          <div>
            <HiExclamationCircle className="h-12 w-12 text-yellow-500 mx-auto" />
            <h2 className="text-2xl font-bold mt-4 text-yellow-600">
              Token Expired
            </h2>
            <p className="text-gray-600 mt-2">{message}</p>
            <button
              onClick={() => navigate("/resend-verification")} // Redirect to a page to resend the token
              className="mt-4 px-4 py-2 bg-primaryPurple text-white rounded-lg"
            >
              Resend Verification Email
            </button>
          </div>
        )}

        {status === "error" && (
          <div>
            <HiExclamationCircle className="h-12 w-12 text-red-500 mx-auto" />
            <h2 className="text-2xl font-bold mt-4 text-red-600">
              Verification Failed
            </h2>
            <p className="text-gray-600 mt-2">{message}</p>
          </div>
        )}

        {status === "no-token" && (
          <div>
            <HiExclamationCircle className="h-12 w-12 text-red-500 mx-auto" />
            <h2 className="text-2xl font-bold mt-4 text-red-600">
              Invalid Request
            </h2>
            <p className="text-gray-600 mt-2">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RenterVerificationEmail;
