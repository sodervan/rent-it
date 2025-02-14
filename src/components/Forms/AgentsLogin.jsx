import { NavLink, useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { Input, Button } from "@material-tailwind/react";
import { useState } from "react";
import Lottie from "lottie-react";
import loginAnimation from "../../../public/assets/signup-animation.json";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SignJWT } from "jose";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";

const AgentLogin = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  // Handle Google Login Success
  const handleGoogleSuccess = async (credentialResponse) => {
    console.log(credentialResponse);
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/agents/google`,
        {
          token: credentialResponse.credential,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const result = response.data;
      const timeExpiry = Math.floor(
        new Date(response.data.payload.session_expiry_time).getTime() / 1000,
      );

      const payload = {
        role: response.data.payload.role[0],
        exp: timeExpiry,
      };

      // Create JWT token
      const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(payload.exp)
        .sign(new TextEncoder().encode(SECRET_KEY));

      // Set cookie
      document.cookie = `the_token=${token}; path=/; expires=${new Date(
        timeExpiry * 1000,
      ).toUTCString()}; secure; SameSite=Strict`;

      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setTimeout(() => {
        window.location.href = result.payload?.isRegistrationComplete
          ? "/agent/dashboard"
          : `/agent/agentregistration/${result.payload.registrationStep}`;
      }, 1000);
    } catch (error) {
      console.error("Google Login Error:", error);
      toast.error(
        error.response?.data?.message ||
          "Google login failed. Please try again.",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        },
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Google Login Error
  const handleGoogleError = () => {
    toast.error("Google login failed. Please try again.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/agents/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const result = response.data;
      const timeExpiry = Math.floor(
        new Date(response.data.payload.session_expiry_time).getTime() / 1000,
      );

      const payload = {
        role: response.data.payload.role[0],
        exp: timeExpiry,
      };

      const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(payload.exp)
        .sign(new TextEncoder().encode(SECRET_KEY));

      document.cookie = `the_token=${token}; path=/; expires=${new Date(
        timeExpiry * 1000,
      ).toUTCString()}; secure; SameSite=Strict`;

      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setTimeout(() => {
        window.location.href = result.payload?.isRegistrationComplete
          ? "/agent/dashboard"
          : `/agent/agentregistration/${result.payload.registrationStep}`;
      }, 1000);
    } catch (error) {
      console.error("Login Error:", error);

      if (error.response) {
        toast.error(error.response.data.message || "Login failed!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else if (error.request) {
        toast.error("No response from server. Please check your connection.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error("Something went wrong. Please try again later.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="min-h-screen flex items-center justify-center px-6 lg:px-20 py-10 bg-gray-50">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl">
          <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-md p-6 md:p-10">
            <div className="flex flex-col gap-6">
              <div className="text-center">
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter
                      .typeString(
                        '<strong style="font-size: 22px; font-weight: bold">WELCOME BACK <span style="color: #6941C6;">AGENT</span>!</strong>',
                      )
                      .pauseFor(2500)
                      .start();
                  }}
                />
                <p className="text-gray-600 font-medium mt-2">Agent Login</p>
              </div>

              <form className="flex flex-col gap-6" onSubmit={handleLogin}>
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

                <div className="relative">
                  <div className="flex items-center gap-3 px-3 py-2 rounded-lg">
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

                <div className="flex flex-col gap-4">
                  <Button
                    type="submit"
                    className={`py-3 rounded-lg shadow-sm ${
                      isLoading
                        ? "bg-gray-400 cursor-not-allowed text-gray-600"
                        : "bg-primaryPurple text-white hover:bg-purple-700"
                    } transition-all duration-300`}
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </div>

                {/* Divider */}
                <div className="flex items-center justify-center">
                  <div className="border-t border-gray-300 flex-grow"></div>
                  <span className="px-4 text-gray-500">or</span>
                  <div className="border-t border-gray-300 flex-grow"></div>
                </div>

                <div className="flex justify-center">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    size="large"
                    theme="outline"
                    text="continue_with"
                    shape="rectangular"
                  />
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <NavLink
                    to="/agent/forgotpassword"
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

          <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
            <div className="w-[90%] xl:w-[100%] max-w-md">
              <Lottie animationData={loginAnimation} loop={true} />
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </GoogleOAuthProvider>
  );
};

export default AgentLogin;
