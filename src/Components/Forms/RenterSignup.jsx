import { NavLink } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { Input } from "@material-tailwind/react";
import { Checkbox } from "@material-tailwind/react";
import { useState } from "react";

const RenterSignup = () => {
  const [isStudent, setIsStudent] = useState(false);
  const [isTermsAndConditions, setIsTermsAndConditions] = useState(false);

  const updateIsStudentState = () => {
    setIsStudent(!isStudent);
  };
  const updateIsTermsConditions = () => {
    setIsTermsAndConditions(!isTermsAndConditions);
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
                      '<strong style="font-size: 16px; font-weight: bold">WELCOME! TO <span style="color: #6941C6;">RentIT</span></strong>',
                    )
                    .pauseFor(2500)
                    .start();
                }}
              />
            </div>
            <p className="font-normal text-center">Create a New Account</p>
            <form className="flex flex-col gap-5 my-5">
              <div className="w-full">
                <div className="flex items-center gap-3 px-3 w-full rounded-[10px]">
                  <div>
                    <i className="fi fi-rr-user text-primaryPurple"></i>
                  </div>
                  <div className="w-full">
                    <Input label="First Name" required />
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="flex items-center gap-3 px-3 w-full rounded-[10px]">
                  <div>
                    <i className="fi fi-rr-user text-primaryPurple"></i>
                  </div>
                  <div className="w-full">
                    <Input label="Last Name" required />
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="flex items-center gap-3 px-3 w-full rounded-[10px]">
                  <div>
                    <i className="fi fi-rr-mailbox text-primaryPurple"></i>
                  </div>
                  <div className="w-full">
                    <Input label="Email Address" required />
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="flex items-center gap-3 px-3 w-full rounded-[10px]">
                  <div>
                    <i className="fi fi-rr-phone-call text-primaryPurple"></i>
                  </div>
                  <div className="w-full">
                    <Input label="Mobile Number" required />
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="flex items-center gap-3 px-3 w-full rounded-[10px]">
                  <div>
                    <i className="fi fi-rr-lock text-primaryPurple"></i>
                  </div>
                  <div className="w-full">
                    <Input
                      label="Password"
                      type="password"
                      className="focus:ring-0"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="flex items-center gap-3 px-3 w-full rounded-[10px]">
                  <div>
                    <i className="fi fi-rr-lock text-primaryPurple"></i>
                  </div>
                  <div className="w-full">
                    <Input
                      label="Confirm Password"
                      type="password"
                      className="focus:ring-0"
                      required
                    />
                  </div>
                </div>
              </div>
              {isStudent && (
                <div className="w-full">
                  <div className="flex items-center gap-3 px-3 w-full rounded-[10px]">
                    <div>
                      <i className="fi fi-rr-school text-primaryPurple"></i>
                    </div>
                    <div className="w-full">
                      <Input label="Institution" className="focus:ring-0" required={isStudent}/>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex flex-col">
                <div className="flex gap-1 items-center">
                  <Checkbox
                    className="focus:ring-0"
                    onChange={updateIsStudentState}
                  />
                  <p className="text-gray-500 text-[14px]">I am A Student</p>
                </div>
                <div className="flex gap-1 items-center">
                  <Checkbox
                    className="focus:ring-0"
                    onChange={updateIsTermsConditions}
                  />
                  <p className="text-gray-500 text-[14px]">
                    I have read and agreed to{" "}
                    <span className="text-primaryPurple">
                      RentIT's Terms and Conditions
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  disabled={!isTermsAndConditions}
                  type="submit"
                  className={`transition-all duration-300 ${isTermsAndConditions ? "px-4 py-3 bg-primaryPurple rounded-lg text-white" : "bg-gray-300 px-4 py-3 rounded-lg text-gray-500"}`}
                >
                  Sign up
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
                  Have an account with Us?{" "}
                  <span>
                    <NavLink
                      to="/renter-login"
                      className="underline text-primaryPurple"
                    >
                      Login
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
