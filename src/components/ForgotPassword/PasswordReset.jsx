import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Lock, LockOpen, Eye, EyeOff, ArrowLeft } from "lucide-react";

const PasswordReset = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (newPassword.length >= 8 && confirmPassword.length >= 8) {
      setPasswordError("");
    } else {
      setPasswordError("Password must be at least 8 characters long");
    }
  }, [newPassword, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordError) return;

    setIsLoading(true);

    try {
      const token = searchParams.get("token");
      const response = await axios.post(
        `${apiUrl}/api/v1/agents/reset-password?token=${token}`,
        { newPassword, confirmPassword },
        { withCredentials: true },
      );
      toast.success(response.data.message);
      setTimeout(() => (window.location.href = "/renter/login"), 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to reset password");
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
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter a new password"
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${passwordError ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-purple-500"}`}
                required
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${passwordError ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-purple-500"}`}
                required
              />
              <LockOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {passwordError && (
              <p className="text-red-500 text-xs mt-1">{passwordError}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading || !!passwordError}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:bg-purple-400"
          >
            {isLoading ? "Resetting Password..." : "Reset Password"}
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

export default PasswordReset;
