import { NavLink, useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";

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

  // Update password match status on change
  useEffect(() => {
    setIsAccurate(
        formData.password &&
        formData.confirmPassword &&
        formData.password === formData.confirmPassword
    );
  }, [formData.password, formData.confirmPassword]);

  // Handle form state updates
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit handler
  const handleSignup = async (event) => {
    event.preventDefault();

    if (!isAccurate || !isTermsAndConditions) return;

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
        // Go to verify email page on success
        navigate("/renter/signup/verifyemail", {
          state: { email: formData.email },
        });
      } else {
        console.error("Registration Failed:", result.message);
        alert(result.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="flex items-center justify-center min-h-screen px-4 md:px-10 lg:px-20 ">
        <div className="w-full max-w-screen-sm bg-white rounded-lg p-6 md:p-10">
          {/* Welcome Message */}
          <div className="text-center">
            <Typewriter
                onInit={(typewriter) => {
                  typewriter
                      .typeString(
                          '<strong style="font-size: 20px; font-weight: bold">WELCOME TO <span style="color: #6941C6;">RentIT!</span></strong>'
                      )
                      .pauseFor(2500)
                      .start();
                }}
            />
            <p className="text-gray-600 font-medium mt-2">Create Your Account</p>
          </div>

          {/* Signup Form */}
          <form className="mt-8 flex flex-col gap-6" onSubmit={handleSignup}>
            {/* First Name */}
            <div className="flex items-center gap-3 px-4 rounded-lg ">
              <i className="fi fi-rr-user text-primaryPurple"></i>
              <Input
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="bg-transparent focus:ring-0 w-full"
              />
            </div>

            {/* Last Name */}
            <div className="flex items-center gap-3 px-4 rounded-lg ">
              <i className="fi fi-rr-user text-primaryPurple"></i>
              <Input
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="bg-transparent focus:ring-0 w-full"
              />
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 px-4 rounded-lg ">
              <i className="fi fi-rr-envelope text-primaryPurple"></i>
              <Input
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  required
                  className="bg-transparent focus:ring-0 w-full"
              />
            </div>

            {/* Phone Number */}
            <div className="flex items-center gap-3 px-4 rounded-lg ">
              <i className="fi fi-rr-phone-call text-primaryPurple"></i>
              <Input
                  label="Mobile Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="bg-transparent focus:ring-0 w-full"
              />
            </div>

            {/* Password */}
            <div className="flex items-center gap-3 px-4 rounded-lg ">
              <i className="fi fi-rr-lock text-primaryPurple"></i>
              <Input
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                  required
                  className="bg-transparent focus:ring-0 w-full"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <div className="flex items-center gap-3 px-4 rounded-lg ">
                <i className="fi fi-rr-lock text-primaryPurple"></i>
                <Input
                    label="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    type="password"
                    required
                    className="bg-transparent focus:ring-0 w-full"
                />
              </div>
              {!isAccurate && formData.confirmPassword.length > 0 && (
                  <Typography
                      variant="small"
                      className="text-red-500 mt-1 ml-3 text-sm"
                  >
                    Passwords do not match.
                  </Typography>
              )}
            </div>

            {/* Institution Field (Student Only) */}
            {isStudent && (
                <div className="flex items-center gap-3 px-4 rounded-lg ">
                  <i className="fi fi-rr-school text-primaryPurple"></i>
                  <Input
                      label="Institution"
                      name="institution"
                      value={formData.institution}
                      onChange={handleChange}
                      required
                      className="bg-transparent focus:ring-0 w-full"
                  />
                </div>
            )}

            {/* Checkboxes */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center">
                <Checkbox
                    onChange={() => setIsStudent((prev) => !prev)}
                    className="cursor-pointer"
                />
                <span className="text-sm text-gray-600">
                I am a student.
              </span>
              </div>
              <div className="flex items-center">
                <Checkbox
                    onChange={() =>
                        setIsTermsAndConditions((prev) => !prev)
                    }
                    className="cursor-pointer"
                />
                <span className="text-sm text-gray-600">
                I agree to the{" "}
                  <span className="text-primaryPurple underline cursor-pointer">
                  RentIT Terms and Conditions
                </span>
              </span>
              </div>
            </div>

            {/* Submit Button */}
            <Button
                type="submit"
                loading={isLoading}
                disabled={!isTermsAndConditions || !isAccurate}
                className={`py-3 rounded-lg text-lg font-medium w-full transition-all ${
                    isTermsAndConditions && isAccurate
                        ? "bg-primaryPurple hover:bg-purple-700 text-white"
                        : "bg-gray-300 cursor-not-allowed text-gray-500"
                }`}
            >
              Sign Up
            </Button>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <NavLink
                  to="/agent/login"
                  className="text-primaryPurple underline hover:text-purple-700"
              >
                Login
              </NavLink>
            </p>
          </form>
        </div>
      </div>
  );
};

export default AgentSignup;