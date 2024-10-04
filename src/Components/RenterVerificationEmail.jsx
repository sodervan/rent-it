import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const VerificationEmail = () => {
  const [status, setStatus] = useState("loading"); // loading, success, error, expired
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("No token found in the URL.");
      return;
    }

    const verifyEmail = async () => {
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
          setMessage("Email successfully verified!");
        } else if (result.message === "Token expired") {
          setStatus("expired");
          setMessage(
            "The verification token has expired. Please request a new one.",
          );
        } else {
          setStatus("error");
          setMessage(result.message || "Verification failed.");
        }
      } catch (error) {
        setStatus("error");
        setMessage("An error occurred during verification. Please try again.");
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 transition-all duration-300">
      {status === "loading" && (
        <div className="flex flex-col items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 animate-spin"></div>
          <p className="mt-4 text-gray-500 animate-fadeIn">
            Verifying your email, please wait...
          </p>
        </div>
      )}

      {status === "success" && (
        <div className="text-center transition-opacity duration-300">
          <h2 className="text-3xl font-extrabold text-green-600 animate-fadeIn">
            Success!
          </h2>
          <p className="mt-2 text-gray-700 animate-fadeIn">{message}</p>
          <button
            className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg shadow-md transition-all duration-200 hover:bg-green-700"
            onClick={() => navigate("/renter/login")}
          >
            Go to Login
          </button>
        </div>
      )}

      {status === "error" && (
        <div className="text-center transition-opacity duration-300">
          <h2 className="text-3xl font-extrabold text-red-600 animate-fadeIn">
            Verification Failed
          </h2>
          <p className="mt-2 text-gray-700 animate-fadeIn">{message}</p>
          <button
            className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg shadow-md transition-all duration-200 hover:bg-red-700"
            onClick={() => navigate("/")}
          >
            Go to Home
          </button>
        </div>
      )}

      {status === "expired" && (
        <div className="text-center transition-opacity duration-300">
          <h2 className="text-3xl font-extrabold text-yellow-600 animate-fadeIn">
            Token Expired
          </h2>
          <p className="mt-2 text-gray-700 animate-fadeIn">{message}</p>
          <button
            className="mt-6 px-6 py-3 bg-yellow-600 text-white rounded-lg shadow-md transition-all duration-200 hover:bg-yellow-700"
            onClick={() => navigate("/resend-verification")}
          >
            Resend Verification
          </button>
        </div>
      )}
    </div>
  );
};

export default VerificationEmail;
