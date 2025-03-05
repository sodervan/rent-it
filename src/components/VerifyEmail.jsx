import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import { CheckCircleIcon, MailIcon } from "lucide-react";

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const [email, setEmail] = useState(location.state?.email || "");
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    // Redirect if no email is present
    if (!email) {
      navigate("/renter/signup");
      return;
    }

    // Initial success toast
    toast.success("Account created successfully!", {
      position: "top-right",
      autoClose: 5000,
    });
  }, [email, navigate]);

  // Cooldown timer for resend button
  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleResendVerification = async () => {
    // Prevent multiple clicks during cooldown
    if (resendCooldown > 0) return;

    setIsLoading(true);
    try {
      await axios.post(
        `${apiUrl}/api/v1/users/resend-verification`,
        { email },
        { withCredentials: true },
      );

      toast.success("Verification link resent successfully!", {
        position: "top-right",
        autoClose: 5000,
      });

      // Set 60-second cooldown
      setResendCooldown(60);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to resend verification link",
        {
          position: "top-right",
          autoClose: 5000,
        },
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg text-center">
        <div className="flex justify-center mb-6">
          <CheckCircleIcon
            className="text-green-500"
            size={80}
            strokeWidth={1.5}
          />
        </div>

        <h2 className="text-2xl font-bold text-gray-800">
          Verify Your Email Address
        </h2>

        <p className="text-gray-600 mb-6">
          We've sent a verification link to{" "}
          <span className="text-primaryPurple font-semibold">{email}</span>.
          Please check your inbox and click the link to verify your email.
        </p>

        <Button
          onClick={handleResendVerification}
          disabled={isLoading || resendCooldown > 0}
          className="w-full flex items-center justify-center gap-2"
          color="purple"
        >
          <MailIcon size={20} />
          {resendCooldown > 0
            ? `Resend in ${resendCooldown}s`
            : "Resend Verification Link"}
        </Button>

        <div className="text-sm text-gray-500 mt-4">
          Didn't receive the email? Check your spam folder or{" "}
          <button
            onClick={() => navigate("/support")}
            className="text-primaryPurple hover:underline"
          >
            contact support
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
