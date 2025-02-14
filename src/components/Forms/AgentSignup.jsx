import { NavLink, useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import animationData from "../../../public/assets/agent-signup.json";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";

const AgentSignup = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
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
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const [isAccurate, setIsAccurate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAccurate(
      formData.password &&
        formData.confirmPassword &&
        formData.password === formData.confirmPassword,
    );
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Google Login Success
  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/v1/agents/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: credentialResponse.credential,
        }),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        console.log(response);
        toast.success("Google login successful! Redirecting...", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // localStorage.setItem("role", "agent");
        // You might want to store the token or other auth data here
        // if (result.token) {
        //   localStorage.setItem("token", result.token);
        // }
        setTimeout(() => {
          navigate("/agent/dashboard");
        }, 500);
      } else {
        toast.error(result.message || "Google login failed!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      toast.error("Something went wrong with Google login. Please try again.", {
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

  // Handle Google Login Error
  const handleGoogleError = () => {
    toast.error("Google login failed. Please try again.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

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
      const response = await fetch(`${apiUrl}/api/v1/agents/register`, {
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
      });

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

        navigate("/agent/signup/verifyemail", {
          state: { email: formData.email },
        });
        localStorage.setItem("role", "agent");
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
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl px-6 lg:px-0">
          <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-md p-6 md:p-10">
            <div className="text-center">
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString(
                      "<strong style='font-size: 22px;'>WELCOME TO <span style='color: #6941C6;'>RentIT!</span></strong>",
                    )
                    .pauseFor(2500)
                    .start();
                }}
              />
              <p className="text-gray-800 mt-3">Create your Agent account</p>
            </div>

            {/* Rest of your existing form */}
            <form className="mt-8 space-y-6" onSubmit={handleSignup}>
              {/* Your existing form fields... */}
              {/* First Name & Last Name */}
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

              {/* Email & Phone Number */}
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

              {/* Password & Confirm Password */}
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

              {isStudent && (
                <Input
                  label="Institution"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  required
                />
              )}

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
                    <NavLink
                      to="/terms"
                      className="text-primaryPurple underline"
                    >
                      Terms and Conditions
                    </NavLink>
                  </label>
                </div>
              </div>

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
              <div className="my-6 flex items-center justify-center">
                <div className="border-t border-gray-300 flex-grow"></div>
                <span className="px-4 text-gray-500">or</span>
                <div className="border-t border-gray-300 flex-grow"></div>
              </div>

              {/* Google Sign-in Button */}
              <div className="mt-6 flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  size="large"
                  theme="outline"
                  text="continue_with"
                  shape="rectangular"
                />
              </div>
            </form>
          </div>

          <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
            <div className="w-[90%] xl:w-[100%] max-w-md">
              <Lottie animationData={animationData} loop={true} />
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </GoogleOAuthProvider>
  );
};

export default AgentSignup;
