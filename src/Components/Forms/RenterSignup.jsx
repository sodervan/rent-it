import { NavLink } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { Input,Checkbox, Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";

const RenterSignup = () => {
  const [isStudent, setIsStudent] = useState(false);
  const [isTermsAndConditions, setIsTermsAndConditions] = useState(false);
  const [isPassword, setIsPassword] = useState("");
  const [isConfirmPassword, setIsConfirmPassword] = useState("");
  const [isAccurate, setIsAccurate] = useState(null);

  const updateIsStudentState = () => {
    setIsStudent(!isStudent);
  };
  const updateIsTermsConditions = () => {
    setIsTermsAndConditions(!isTermsAndConditions);
  };
  const updateIsPassword = (event) => {
    event.preventDefault();
    setIsPassword(event.target.value);
  };
  useEffect(() => {
    console.log(isPassword);
  }, [isPassword]);
  useEffect(() => {
    console.log(isConfirmPassword);
  }, [isConfirmPassword]);

  const updateConfirmPassword = (event) => {
    event.preventDefault();
    setIsConfirmPassword(event.target.value);
  };

  useEffect(() => {
    if (isPassword && isConfirmPassword) {
      setIsAccurate(isPassword === isConfirmPassword);
    }
  }, [isPassword, isConfirmPassword]);

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
                    <i className="fi fi-rr-envelope text-primaryPurple"></i>
                  </div>
                  <div className="w-full">
                    <Input label="Email Address" required type="email"/>
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
                      onChange={updateIsPassword}
                      value={isPassword}
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
                      value={isConfirmPassword}
                      onChange={updateConfirmPassword}
                      success={isAccurate === true}
                      error={isAccurate === false}
                      className="focus:ring-0"
                      required
                    />
                    {!isAccurate && (
                      <Typography
                        variant="small"
                        color="gray"
                        className="mt-2 flex items-center gap-1 font-normal"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="-mt-px h-4 w-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Passwords must match
                      </Typography>
                    )}
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
                      <Input
                        label="Institution"
                        className="focus:ring-0"
                        required={isStudent}
                      />
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
                    <span className="text-primaryPurple cursor-pointer hover:underline">
                      RentIT's Terms and Conditions
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  disabled={!isTermsAndConditions}
                  type="submit"
                  className={`transition-all duration-300 ${isTermsAndConditions && isAccurate ? "px-4 py-3 bg-primaryPurple rounded-lg text-white" : "bg-gray-300 px-4 py-3 rounded-lg text-gray-500"}`}
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
