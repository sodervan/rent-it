import { NavLink } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { Input, Button } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import AuthService from "../../../authService.js";

const RenterSignup = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
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

  const fetchRenterDetails = async (accessToken) => {
    try {
      setIsLoading(true); // Start loading
      const response = await fetch(`${apiUrl}/api/v1/agents`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const result = await response.json();
      if (response.ok) {
        localStorage.setItem("profileImage", result.payload.profilePicLink);
        console.log(result);
      } else {
        console.log("Failed to fetch agent details");
        toast.error(
          result.message || "An error occurred while fetching agent details.",
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
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      console.log(email, password);
      const response = await fetch(`${apiUrl}/api/v1/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        localStorage.setItem("userId", result.payload.id);
        localStorage.setItem("accessToken", result.payload.access_token);
        localStorage.setItem("refreshToken", result.payload.refresh_token);
        localStorage.setItem("accountType", result.payload.role[0]);
        AuthService.startRefreshTimer();
        toast.success(result.message || "Login Successful!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        await fetchRenterDetails();
        if (result.payload.accountType[0] === "user") {
          navigate("/renter/dashboard");
        } else {
          navigate("/agent/dashboard");
        }

        window.history.replaceState(null, "", "/");
        console.log(result);
      } else {
        console.log("Registration Failed");
        setMessage(result.message || "Login failed");
        toast.error(
          result.message || "Login failed. Please check your credentials.",
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
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("Something went wrong, please try again later.");
      toast.error("Something went wrong, please try again later.", {
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
    <>

      <div className="flex items-center justify-center h-screen px-4 md:px-10 lg:px-20">
        <div className="w-full max-w-screen-md bg-white rounded-lg p-6 md:p-10">
          <div className="flex flex-col gap-6">
            {/* Welcome Message */}
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

            {/* Login Form */}
            <form className="flex flex-col gap-6" onSubmit={handleLogin}>
              {/* Email Input */}
              <div className="relative">
                <div className="flex items-center gap-3 px-3 rounded-lg ">
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

              {/* Password Input */}
              <div className="relative">
                <div className="flex items-center gap-3 px-3 rounded-lg ">
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

              {/* Show/Hide Password & Forgot Password */}
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
                  to=""
                  className="underline text-primaryPurple hover:text-purple-700"
                >
                  Forgot Password
                </NavLink>
              </div>

              {/* Login Button */}
              <div className="flex flex-col gap-4">
                <Button
                  type="submit"
                  loading={isLoading}
                  className="bg-primaryPurple text-white py-3 rounded-lg shadow-sm hover:bg-purple-700 transition-all duration-300"
                >
                  Login
                </Button>
                <div className="text-center text-sm text-gray-500">or</div>
                <button className="border border-gray-300 flex justify-center items-center gap-3 py-3 rounded-lg hover:shadow-sm transition duration-300">
                  <img
                    src="https://res.cloudinary.com/dmlgns85e/image/upload/v1727705596/Social_icon_pixq6z.png"
                    alt="Google Icon"
                    className="w-5 h-5"
                  />
                  <p className="text-gray-600">Sign in with Google</p>
                </button>
              </div>

              {/* Signup Link */}
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
    </>
  );
};

export default RenterSignup;
