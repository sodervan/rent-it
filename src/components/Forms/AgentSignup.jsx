import { NavLink, useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import animationData from "../../../public/assets/agent-signup.json";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AgentSignup = () => {
  const [isStudent, setIsStudent] = useState(false);
  const [isTermsAndConditions, setIsTermsAndConditions] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    institution: "",
  });
  const [isAccurate, setIsAccurate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Ensure that password matches confirm password
  useEffect(() => {
    setIsAccurate(
        formData.password &&
        formData.confirmPassword &&
        formData.password === formData.confirmPassword
    );
  }, [formData.password, formData.confirmPassword]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSignup = async (event) => {
    event.preventDefault();

    if (!isAccurate || !isTermsAndConditions) {
      toast.error("Please ensure all fields are filled correctly!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
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
              isStudent,
            }),
          }
      );

      const result = await response.json();
      if (response.ok) {
        toast.success("Account created successfully! Redirecting...", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        navigate("/renter/signup/verifyemail", {
          state: { email: formData.email },
        });
      } else {
        console.error("Registration Failed:", result.message);
        toast.error(result.message || "Registration failed!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("Something went wrong. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl px-6 lg:px-0">
          {/* Left Section: Form */}
          <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-md p-6 md:p-10">
            {/* Welcome Message */}
            <div className="text-center">
              <Typewriter
                  onInit={(typewriter) => {
                    typewriter
                        .typeString(
                            "<strong style='font-size: 22px;'>WELCOME TO <span style='color: #6941C6;'>RentIT!</span></strong>"
                        )
                        .pauseFor(2500)
                        .start();
                  }}
              />
              <p className="text-gray-800 mt-3">Create your Agent account</p>
            </div>

            {/* Signup Form */}
            <form className="mt-8 space-y-6" onSubmit={handleSignup}>
              {/* Row for First Name & Last Name */}
              <div className="flex flex-col lg:flex-row gap-6">
                <Input
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
              </div>

              {/* Row for Email & Phone Number */}
              <div className="flex flex-col lg:flex-row gap-6">
                <Input
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    required
                />
                <Input
                    label="Mobile Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                />
              </div>

              {/* Row for Password & Confirm Password */}
              <div className="flex flex-col lg:flex-row gap-6">
                <Input
                    label="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type="password"
                    required
                />
                <Input
                    label="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    type="password"
                    required
                />
              </div>
              {!isAccurate && formData.confirmPassword && (
                  <Typography
                      variant="small"
                      className="text-red-500 text-sm text-center"
                  >
                    Passwords do not match.
                  </Typography>
              )}

              {/* Institution Field for Students */}
              {isStudent && (
                  <Input
                      label="Institution"
                      name="institution"
                      value={formData.institution}
                      onChange={handleChange}
                      required
                  />
              )}

              {/* Checkboxes */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Checkbox
                      id="student"
                      onChange={() => setIsStudent((prev) => !prev)}
                      className="cursor-pointer"
                  />
                  <label htmlFor="student" className="text-gray-700">
                    I am a student.
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox
                      id="terms"
                      onChange={() => setIsTermsAndConditions((prev) => !prev)}
                      className="cursor-pointer"
                  />
                  <label htmlFor="terms" className="text-gray-700">
                    I agree to the{" "}
                    <NavLink to="/terms" className="text-primaryPurple underline">
                      Terms and Conditions
                    </NavLink>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                  type="submit"
                  disabled={!isTermsAndConditions || !isAccurate || isLoading}
                  className={`w-full rounded-lg py-3 text-white ${
                      isAccurate && isTermsAndConditions
                          ? "bg-primaryPurple hover:bg-purple-700"
                          : "bg-gray-300 cursor-not-allowed"
                  }`}
              >
                {isLoading ? "Creating Account..." : "Sign Up"}
              </Button>

              <p className="text-center mt-4 text-sm text-gray-600">
                Already have an account?{" "}
                <NavLink
                    to="/agent/login"
                    className="text-primaryPurple underline"
                >
                  Login
                </NavLink>
              </p>
            </form>
          </div>

          {/* Right Section: Animation */}
          <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
            <div className="w-[90%] xl:w-[100%] max-w-md">
              <Lottie animationData={animationData} loop={true} />
            </div>
          </div>
        </div>

        {/* Toast Notification Container */}
        <ToastContainer />
      </div>
  );
};

export default AgentSignup;