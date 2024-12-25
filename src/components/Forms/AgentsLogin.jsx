import { NavLink, useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { Input, Button } from "@material-tailwind/react";
import { useState } from "react";
import Lottie from "lottie-react"; // Lottie animations
import loginAnimation from "../../assets/signup-animation.json"; // Update to proper animation if needed
import { toast } from "react-toastify";

const AgentLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
          "https://rent-it-api.onrender.com/api/v1/agents/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
      );

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem("accessToken", result.payload.access_token);
        localStorage.setItem("refreshToken", result.payload.refresh_token);
        localStorage.setItem("accountType", result.payload.role[0]);
        toast.success("Login successful!");
        navigate("/dashboard"); // Redirect to the admin dashboard or main agent area
      } else {
        const error = await response.json();
        toast.error(error.message || "Login failed!");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="min-h-screen flex flex-col-reverse lg:flex-row items-center justify-center p-6 lg:p-20 ">
        {/* Left Section - Login Form */}
        <div className="w-full lg:w-1/2 bg-white rounded-lg p-6 md:p-10 max-w-lg">
          <div className="flex flex-col gap-6">
            {/* Welcome Message */}
            <div className="text-center">
              <Typewriter
                  onInit={(typewriter) => {
                    typewriter
                        .typeString(
                            '<strong style="font-size: 22px; font-weight: bold">WELCOME BACK <span style="color: #6941C6;">AGENT</span>!</strong>'
                        )
                        .pauseFor(2500)
                        .start();
                  }}
              />
              <p className="text-gray-600 font-medium mt-2">Agent Login</p>
            </div>

            {/* Login Form */}
            <form className="flex flex-col gap-6" onSubmit={handleLogin}>
              {/* Email Input */}
              <div className="relative">
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg">
                  <i className="fi fi-rr-envelope text-primaryPurple"></i>
                  <Input
                      label="Email"
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-transparent focus:ring-0"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg ">
                  <i className="fi fi-rr-lock text-primaryPurple"></i>
                  <Input
                      label="Password"
                      required
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-transparent focus:ring-0"
                  />
                </div>
                <button
                    onClick={toggleShowPassword}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-primaryPurple text-sm font-medium focus:outline-none"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {/* Login Button */}
              <div className="flex flex-col gap-4">
                <Button
                    type="submit"
                    loading={isLoading}
                    className="bg-primaryPurple text-white py-3 rounded-lg shadow-sm hover:bg-purple-700 transition-all duration-300"
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </div>

              {/* Forgot Password and Signup Links */}
              <div className="flex justify-between text-sm text-gray-600">
                <NavLink
                    to="/forgot-password"
                    className="underline text-primaryPurple hover:text-purple-700"
                >
                  Forgot Password?
                </NavLink>
                <div>
                  Don't have an account?{" "}
                  <NavLink
                      to="/agent/signup"
                      className="text-primaryPurple underline hover:text-purple-700"
                  >
                    Signup
                  </NavLink>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right Section - Lottie Animation */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
          <div className="w-[90%] xl:w-[100%] max-w-2xl">
            <Lottie animationData={loginAnimation} loop={true} />
          </div>
        </div>
      </div>
  );
};

export default AgentLogin;