import { NavLink } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { Input, Button } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation } from "react-icons/hi";

const RenterSignup = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const timeOut = () => {
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };
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
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      console.log(email, password);
      const response = await fetch(
        "https://rent-it-api.onrender.com/api/v1/agents/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        },
      );
      const result = await response.json();
      if (response.ok) {
        setMessage("Login Successful");
        console.log(result)
        // navigate("/renter/signup/verifyemail");
      } else {
        console.log("Registration Failed");
        setMessage(result.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage("Something went wrong, please try again later.");
    } finally {
      setIsLoading(false);
      setShowToast(true);
      timeOut();
    }
  };

  return (
    <>
      {showToast && (
        <div className="fixed top-2 right-2 z-[3000]">
          <Toast>
            <div
              className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${message === "Login Successful" ? "bg-green-100" : "bg-red-100"} ${message === "Login Successful" ? "text-green-500" : "text-red-500"} dark:bg-green-800 dark:text-green-200`}
            >
              {message === "Registration Successful" && (
                <HiCheck className="h-5 w-5" />
              )}
              {message !== "Registration Successful" && (
                <HiExclamation className="h-5 w-5" />
              )}
            </div>
            <div className="ml-3 text-sm font-normal">{message}</div>
            <Toast.Toggle />
          </Toast>
        </div>
      )}
      <div className="mt-20 flex flex-col lg:flex-row px-6 gap-3">
        <div className="w-full lg:w-[50%] flex items-center">
          <div className="lg:px-20 w-full">
            <div className="flex items-center justify-center mb-6">
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString(
                      '<strong style="font-size: 16px; font-weight: bold">WELCOME BACK!</strong>',
                    )
                    .pauseFor(2500)
                    .start();
                }}
              />
            </div>
            <p className="font-normal text-center">Login to your Account</p>
            <form className="flex flex-col gap-5 my-5" onSubmit={handleLogin}>
              <div className="w-full">
                <div className="flex items-center gap-3 px-3 w-full rounded-[10px]">
                  <div>
                    <i className="fi fi-rr-envelope text-primaryPurple"></i>
                  </div>
                  <div className="w-full">
                    <Input
                      label="Email"
                      required
                      type="email"
                      onChange={updateSetEmail}
                      className="focus:ring-0"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="flex items-center gap-3 px-3 w-full rounded-[10px]">
                  <div>
                    <i className="fi fi-rr-lock text-primaryPurple text-lock"></i>
                  </div>
                  <div className="w-full">
                    <Input
                      label="Password"
                      required
                      type={showPassword ? "text" : "password"}
                      onChange={updateSetPassword}
                      className="focus:ring-0"
                    />
                  </div>
                </div>
              </div>
              <NavLink
                to=""
                className={`text-[14px] flex items-center ${password.length > 0 ? "justify-between" : "justify-end"}`}
              >
                {password.length > 0 && (
                  <button
                    className={`flex items-center px-3 py-2 rounded-lg transition-all duration-300 ${
                      showPassword ? "bg-secondaryPurple" : "bg-secondaryPurple"
                    } hover:bg-opacity-80`}
                    onClick={updateShowPasswordState}
                  >
                    <p
                      className={`text-[14px] transition-all duration-300 ${showPassword ? "text-gray-500" : "text-gray-500"}`}
                    >
                      {showPassword ? "Hide" : "Show"} Password
                    </p>
                    <i
                      className={`ml-2 fi fi-rr-eye${
                        showPassword ? "-slash" : ""
                      } transition-transform duration-300 transform ${
                        showPassword ? "rotate-180" : "rotate-0"
                      } text-gray-500`}
                    ></i>
                  </button>
                )}
                <p className="underline text-primaryPurple">Forgot Password</p>
              </NavLink>
              <div className="flex flex-col gap-2">
                <Button
                  type="submit"
                  loading={isLoading}
                  className="transition-all font-poppins duration-300 px-4 py-3 bg-primaryPurple rounded-lg text-white"
                >
                  Login
                </Button>
                <p className="text-center">or</p>
                <button className="px-4 py-3 border border-gray-400 rounded-lg flex items-center justify-center gap-2">
                  <img
                    src="https://res.cloudinary.com/dmlgns85e/image/upload/v1727705596/Social_icon_pixq6z.png"
                    alt="#"
                  />
                  <p className="text-gray-600">Sign in with Google</p>
                </button>
              </div>

              <div>
                <p className="text-sm text-gray-700">
                  Don't have an account with Us?{" "}
                  <span>
                    <NavLink
                      to="/agent/signup"
                      className="underline text-primaryPurple"
                    >
                      Signup
                    </NavLink>
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RenterSignup;
