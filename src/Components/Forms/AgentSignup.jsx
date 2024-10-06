import { NavLink, useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { Input, Checkbox, Typography, Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation } from "react-icons/hi";

const RenterSignup = () => {
  const [isStudent, setIsStudent] = useState(false);
  const [isTermsAndConditions, setIsTermsAndConditions] = useState(false);
  const [isPassword, setIsPassword] = useState("");
  const [isConfirmPassword, setIsConfirmPassword] = useState("");
  const [isAccurate, setIsAccurate] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    institution: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const timeOut = () => {
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };
  const updateIsStudentState = () => {
    setIsStudent(!isStudent);
  };
  const updateIsTermsConditions = () => {
    setIsTermsAndConditions(!isTermsAndConditions);
  };
  const updateIsPassword = (event) => {
    setIsPassword(event.target.value);
    setFormData({ ...formData, password: event.target.value });
  };
  const updateConfirmPassword = (event) => {
    setIsConfirmPassword(event.target.value);
  };
  useEffect(() => {
    setIsAccurate(
      isPassword && isConfirmPassword && isPassword === isConfirmPassword,
    );
  }, [isPassword, isConfirmPassword]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    // Validate passwords
    if (!isAccurate) {
      setMessage("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    try {
      // Set isLoading to true before making the request
      setIsLoading(true);

      const response = await fetch(
        "https://rent-it-api.onrender.com/api/v1/agents/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            phoneNumber: formData.phoneNumber,
            school: isStudent ? formData.institution : "none",
            firstname: formData.firstName,
            lastname: formData.lastName,
            isStudent: isStudent,
          }),
        },
      );

      const result = await response.json();

      if (response.ok) {
        setMessage("Registration Successful");
        localStorage.setItem("role", "agent");
        navigate("/renter/signup/verifyemail", {
          state: { email: formData.email },
        });
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
              className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${message === "Registration Successful" ? "bg-green-100" : "bg-red-100"} ${message === "Registration Successful" ? "text-green-500" : "text-red-500"} dark:bg-green-800 dark:text-green-200`}
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
                      '<strong style="font-size: 16px; font-weight: bold">WELCOME TO <span style="color: #6941C6;">RentIT!</span></strong>',
                    )
                    .pauseFor(2500)
                    .start();
                }}
              />
            </div>
            <p className="font-normal text-center">Create a New Account</p>
            <p className="text-gray-400 text-[14px] mt-2 text-center">
              You have to create an account before proceeding to Agents
              registration
            </p>
            <form className="flex flex-col gap-5 my-5" onSubmit={handleSignup}>
              {/* First Name */}
              <div className="w-full">
                <div className="flex items-center gap-3 px-3 w-full rounded-[10px]">
                  <div>
                    <i className="fi fi-rr-user text-primaryPurple"></i>
                  </div>
                  <div className="w-full">
                    <Input
                      label="First Name"
                      name="firstName"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Last Name */}
              <div className="w-full">
                <div className="flex items-center gap-3 px-3 w-full rounded-[10px]">
                  <div>
                    <i className="fi fi-rr-user text-primaryPurple"></i>
                  </div>
                  <div className="w-full">
                    <Input
                      label="Last Name"
                      name="lastName"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="w-full">
                <div className="flex items-center gap-3 px-3 w-full rounded-[10px]">
                  <div>
                    <i className="fi fi-rr-envelope text-primaryPurple"></i>
                  </div>
                  <div className="w-full">
                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      onChange={handleChange}
                      className="focus:ring-0"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Mobile Number */}
              <div className="w-full">
                <div className="flex items-center gap-3 px-3 w-full rounded-[10px]">
                  <div>
                    <i className="fi fi-rr-phone-call text-primaryPurple"></i>
                  </div>
                  <div className="w-full">
                    <Input
                      label="Mobile Number"
                      name="phoneNumber"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="w-full">
                <div className="flex items-center gap-3 px-3 w-full rounded-[10px]">
                  <div>
                    <i className="fi fi-rr-lock text-primaryPurple"></i>
                  </div>
                  <div className="w-full">
                    <Input
                      label="Password"
                      type="password"
                      onChange={updateIsPassword}
                      value={isPassword}
                      className="focus:ring-0"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Confirm Password */}
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
                        className="mt-2 flex items-center gap-1"
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

              {/* Student Institution */}
              {isStudent && (
                <div className="w-full">
                  <div className="flex items-center gap-3 px-3 w-full rounded-[10px]">
                    <div>
                      <i className="fi fi-rr-school text-primaryPurple"></i>
                    </div>
                    <div className="w-full">
                      <Input
                        label="Institution"
                        name="institution"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Checkboxes */}
              <div className="flex flex-col">
                <div className="flex gap-1 items-center">
                  <Checkbox
                    onChange={updateIsStudentState}
                    className="focus:ring-0"
                  />
                  <p className="text-gray-500 text-[14px]">I am A Student</p>
                </div>
                <div className="flex gap-1 items-center">
                  <Checkbox
                    onChange={updateIsTermsConditions}
                    className="focus:ring-0"
                  />
                  <p className="text-gray-500 text-[14px]">
                    I have read and agreed to{" "}
                    <span className="text-primaryPurple cursor-pointer">
                      RentIT's Terms and Conditions
                    </span>
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col gap-2">
                <Button
                  disabled={!isTermsAndConditions || !isAccurate}
                  loading={isLoading}
                  type="submit"
                  className={`transition-all duration-300 font-poppins ${isTermsAndConditions && isAccurate ? "px-4 py-3 bg-primaryPurple rounded-lg text-white" : "bg-gray-300 px-4 py-3 rounded-lg text-gray-500"}`}
                >
                  Sign up
                </Button>

                {/*{errorMessage && (*/}
                {/*  <p className="text-red-500 text-center">{errorMessage}</p>*/}
                {/*)}*/}

                <p className="font-medium text-center">
                  Already Have An Account?{" "}
                  <NavLink
                    to="/agent/login"
                    className="text-primaryPurple underline"
                  >
                    Login
                  </NavLink>
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
