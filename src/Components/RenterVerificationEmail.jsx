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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {status === "loading" && (
        <div className="flex items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
          <p className="ml-4 text-gray-500">
            Verifying your email, please wait...
          </p>
        </div>
      )}

      {status === "success" && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-500">Success!</h2>
          <p className="mt-2 text-gray-600">{message}</p>
          <button
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => navigate("/renter/login")}
          >
            Go to Login
          </button>
        </div>
      )}

      {status === "error" && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500">
            Verification Failed
          </h2>
          <p className="mt-2 text-gray-600">{message}</p>
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => navigate("/")}
          >
            Go to Home
          </button>
        </div>
      )}

      {status === "expired" && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-yellow-500">Token Expired</h2>
          <p className="mt-2 text-gray-600">{message}</p>
          <button
            className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded"
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
