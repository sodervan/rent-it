import axios from "axios";
import { NavLink } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { Input, Button } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SignJWT } from "jose";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";

const RenterSignup = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const updateShowPasswordState = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const updateSetPassword = (e) => {
    setPassword(e.target.value);
  };

  const updateSetEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setIsLoading(true);
      // console.log(credentialResponse.credential);
      const response = await axios.post(
        `${apiUrl}/api/v1/users/google`,
        {
          token: credentialResponse.credential,
        },
        {
          withCredentials: true,
        },
      );

      console.log("Google auth server response:", response);
      // console.log(credentialResponse);

      const expiryTime = Math.floor(
        new Date(response.data.payload.session_expiry_time).getTime() / 1000,
      );

      const payload = {
        role: response.data.payload.role[0],
        exp: expiryTime,
      };

      const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(payload.exp)
        .sign(new TextEncoder().encode(SECRET_KEY));

      document.cookie = `the_token=${token}; path=/; expires=${new Date(
        expiryTime * 1000,
      ).toUTCString()}; secure; SameSite=Strict`;

      toast.success("Google Sign-in Successful!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(response);
      setTimeout(() => {
        window.location.href = "/renter/dashboard";
      }, 500);
    } catch (error) {
      console.error("Google auth error:", error);
      toast.error(
        error.response?.data?.message || "Failed to authenticate with Google",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        },
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    toast.error("Google sign-in was unsuccessful. Please try again.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      console.log("Attempting login with:", { email, password });

      const response = await axios.post(
        `${apiUrl}/api/v1/users/login`,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        },
      );

      console.log("Server response:", response.data);

      const expiryTime = Math.floor(
        new Date(response.data.payload.session_expiry_time).getTime() / 1000,
      );

      const payload = {
        role: response.data.payload.role[0],
        exp: expiryTime,
      };

      console.log("Token payload:", payload);

      const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(payload.exp)
        .sign(new TextEncoder().encode(SECRET_KEY));

      console.log("JWT token created successfully");

      document.cookie = `the_token=${token}; path=/; expires=${new Date(
        expiryTime * 1000,
      ).toUTCString()}; secure; SameSite=Strict`;

      toast.success(response.data.message || "Login Successful!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // setTimeout(() => {
      //   window.location.href = "/renter/dashboard";
      // }, 500);
    } catch (error) {
      console.error("Login error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong, please try again later.";

      setMessage(errorMessage);
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="flex items-center justify-center h-screen px-4 md:px-10 lg:px-20">
        <div className="w-full max-w-screen-md bg-white rounded-lg p-6 md:p-10">
          <div className="flex flex-col gap-6">
            <div className="text-center">
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString(
                      '<strong style="font-size: 20px; font-weight: bold">WELCOME BACK!</strong>',
                    )
                    .pauseFor(2500)
                    .start();
                }}
              />
              <p className="text-gray-600 font-medium mt-2">Renter Login</p>
            </div>

            <form className="flex flex-col gap-6" onSubmit={handleLogin}>
              <div className="relative">
                <div className="flex items-center gap-3 px-3 rounded-lg">
                  <i className="fi fi-rr-envelope text-primaryPurple"></i>
                  <Input
                    label="Email"
                    required
                    type="email"
                    onChange={updateSetEmail}
                    className="bg-transparent focus:ring-0"
                  />
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center gap-3 px-3 rounded-lg">
                  <i className="fi fi-rr-lock text-primaryPurple"></i>
                  <Input
                    label="Password"
                    required
                    type={showPassword ? "text" : "password"}
                    onChange={updateSetPassword}
                    className="bg-transparent focus:ring-0"
                  />
                </div>
              </div>

              <div className="flex justify-between text-sm">
                {password.length > 0 && (
                  <button
                    onClick={updateShowPasswordState}
                    className="bg-transparent flex items-center text-gray-500 hover:text-primaryPurple transition-all duration-300"
                  >
                    {showPassword ? "Hide" : "Show"} Password
                  </button>
                )}
                <NavLink
                  to="/renter/forgotpassword"
                  className="underline text-primaryPurple hover:text-purple-700"
                >
                  Forgot Password
                </NavLink>
              </div>

              <div className="flex flex-col gap-4">
                <Button
                  type="submit"
                  loading={isLoading}
                  className="bg-primaryPurple text-white py-3 rounded-lg shadow-sm hover:bg-purple-700 transition-all duration-300"
                >
                  Login
                </Button>
                <div className="text-center text-sm text-gray-500">or</div>
                <div className="flex justify-center">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    useOneTap
                    theme="outline"
                    size="large"
                    width="100%"
                    text="signin_with"
                    shape="rectangular"
                  />
                </div>
              </div>

              <div className="text-center text-sm text-gray-600">
                Don't have an account with us?{" "}
                <NavLink
                  to="/renter/signup"
                  className="text-primaryPurple underline hover:text-purple-700"
                >
                  Signup
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </GoogleOAuthProvider>
  );
};

export default RenterSignup;
