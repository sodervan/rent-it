import { NavLink } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { Input, Checkbox } from "@material-tailwind/react";
import { useState } from "react";

const RenterSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const updateShowPasswordState = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  const updateSetPassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
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
            <form className="flex flex-col gap-5 my-5">
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
                <button
                  type="submit"
                  className="transition-all duration-300 px-4 py-3 bg-primaryPurple rounded-lg text-white"
                >
                  Login
                </button>
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
                      to="/renter-signup"
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
