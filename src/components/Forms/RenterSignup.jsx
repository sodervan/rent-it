import { NavLink, useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { Input, Checkbox, Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RenterSignup = () => {
  const [isStudent, setIsStudent] = useState(false);
  const [isTermsAndConditions, setIsTermsAndConditions] = useState(false);
  const [isPassword, setIsPassword] = useState("");
  const [isConfirmPassword, setIsConfirmPassword] = useState("");
  const [isAccurate, setIsAccurate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    institution: "",
  });

  const navigate = useNavigate();

  // Update input field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Toggle student state
  const handleStudentToggle = () => {
    setIsStudent(!isStudent);
  };

  // Password comparison and accuracy update
  useEffect(() => {
    setIsAccurate(
      isPassword && isConfirmPassword && isPassword === isConfirmPassword,
    );
  }, [isPassword, isConfirmPassword]);

  // Signup Handler
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!isAccurate) {
      toast.error("Passwords do not match!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    setIsLoading(true); // Show loading state
    try {
      const response = await fetch(
        "https://rent-it-api.onrender.com/api/v1/users/register",
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
        toast.success("Registration successful!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/renter/signup/verifyemail", {
          state: { email: formData.email },
        });
      } else {
        toast.error(result.message || "Registration failed!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again later.", {
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
    <div className="flex items-center justify-center min-h-screen px-4 md:px-10 lg:px-20">
      <div className="w-full max-w-screen-sm bg-white rounded-lg p-6 md:p-10">
        <div className="text-center">
          {/* Welcome Typewriter Animation */}
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString(
                  '<strong style="font-size: 20px; font-weight: bold">WELCOME TO <span style="color: #6941C6;"> RentIT!</span></strong>',
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
              value={isPassword}
              onChange={(e) => setIsPassword(e.target.value)}
              type="password"
              required
              className="bg-transparent focus:ring-0 w-full"
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <div className="flex items-center gap-3 px-4 rounded-lg ">
              <i className="fi fi-rr-lock text-primaryPurple"></i>
              <Input
                label="Confirm Password"
                value={isConfirmPassword}
                onChange={(e) => setIsConfirmPassword(e.target.value)}
                type="password"
                required
                className="bg-transparent focus:ring-0 w-full"
              />
            </div>
            {isAccurate === false && (
              <p className="text-xs text-red-500 mt-1">
                Passwords do not match.
              </p>
            )}
          </div>

          {/* Institution Field (Conditional Student) */}
          {isStudent && (
            <div className="flex items-center gap-3 px-4 rounded-lg ">
              <i className="fi fi-rr-school text-primaryPurple"></i>
              <Input
                label="Institution Name"
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
              <Checkbox onChange={handleStudentToggle} />
              <span className="text-sm text-gray-600">I am a student</span>
            </div>
            <div className="flex items-center">
              <Checkbox
                onChange={() => setIsTermsAndConditions(!isTermsAndConditions)}
              />
              <span className="text-sm text-gray-600">
                I agree to the{" "}
                <span className="underline text-primaryPurple cursor-pointer">
                  terms and conditions
                </span>
              </span>
            </div>
          </div>

          {/* Signup Button */}
          <Button
            type="submit"
            loading={isLoading}
            disabled={!isTermsAndConditions || !isAccurate}
            className={`transition-all py-3 rounded-lg w-full text-lg font-semibold ${
              isTermsAndConditions && isAccurate
                ? "bg-primaryPurple text-white hover:bg-purple-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Sign Up
          </Button>

          {/* Already have an account */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <NavLink
              to="/renter/login"
              className="text-primaryPurple underline hover:text-purple-700"
            >
              Login
            </NavLink>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RenterSignup;