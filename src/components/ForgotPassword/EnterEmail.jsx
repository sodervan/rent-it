import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Mail, ArrowLeft } from "lucide-react";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const validateEmail = (emailToValidate) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailToValidate) {
      setEmailError("Email is required");
      return false;
    }
    if (!emailRegex.test(emailToValidate)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/agents/reset-password-mail`,
        { email },
        { withCredentials: true },
      );
      console.log(response);
      toast.success(
        response.data.message || "Password reset link sent successfully",
      );
      setTimeout(() => {
        window.open("mailto:?", "_blank");
      }, 1000);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to send reset link. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-50 to-indigo-100 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full space-y-6 transform transition-all hover:shadow-3xl">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
                placeholder="Enter your email"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                  emailError
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-purple-500"
                }`}
                required
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {emailError && (
              <p className="text-red-500 text-xs mt-1">{emailError}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !!emailError}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:bg-purple-400"
          >
            {isLoading ? "Sending Reset Link..." : "Send Reset Link"}
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={() => navigate("/renter/login")}
            className="text-purple-600 hover:text-purple-800 text-sm flex items-center justify-center w-full gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
