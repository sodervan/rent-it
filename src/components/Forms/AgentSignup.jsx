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
import axios from "axios";
import SelectComponent from "@/components/AddListings/SelectComponent.jsx";

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
  const [states, setStates] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedInstitution, setSelectedInstitution] = useState("");
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

  const stateOptions = states.map((type) => ({
    value: String(type.id),
    label: type.name,
  }));

  const institutionOptions = universities.map((type) => ({
    value: String(type.id),
    label: type.name,
  }));
  useEffect(() => {
    getStates();
  }, []);
  useEffect(() => {
    const getUniversities = async () => {
      console.log(selectedState);
      // e.preventDefault();
      // setIsLoading(true);
      try {
        const response = await axios.get(
          `${apiUrl}/api/v1/locations/states/${selectedState}/universities`,
          {
            withCredentials: true,
          },
        );
        const result = response.data;
        setUniversities(result?.payload);
        console.log(result);
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || "Failed to get universities!";
        console.log(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    getUniversities();
  }, [selectedState]);

  const getStates = async () => {
    // e.preventDefault();
    // setIsLoading(true);
    try {
      const response = await axios.get(
        `${apiUrl}/api/v1/locations/states?country_id=1`,
        {
          withCredentials: true,
        },
      );
      const result = response.data;
      setStates(result?.payload);
      // console.log(result);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to get states!";
      console.log(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  // Handle Google Login Success
  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/agents/google`,
        {
          token: credentialResponse.credential,
        },
        {
          withCredentials: true,
        },
      );

      console.log(response.data);

      toast.success("Google login successful! Redirecting...", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Optional: Store token or other auth data
      // if (response.data.token) {
      //   localStorage.setItem("token", response.data.token);
      // }

      setTimeout(() => {
        navigate("/agent/dashboard");
      }, 500);
    } catch (error) {
      console.error("Error during Google login:", error);

      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong with Google login. Please try again.";

      toast.error(errorMessage, {
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
          schoolId: isStudent ? selectedInstitution : "none",
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
                  error={!isAccurate && formData.confirmPassword}
                  onChange={handleChange}
                  type="password"
                  required
                />
              </div>

              {/*STUDENT OPTION*/}
              {isStudent && (
                <div className="flex flex-col items-center gap-6 border border-gray-200 rounded-xl p-6 shadow-md bg-white">
                  <h3 className="text-lg font-medium text-gray-800 self-start">
                    Student Information
                  </h3>

                  {/* STATE SELECTION */}
                  <div className="flex flex-col w-full space-y-2">
                    <div className="flex items-center gap-3 px-4 py-2 rounded-lg hover:border-primaryPurple transition-colors">
                      <i className="fi fi-rr-map-marker text-primaryPurple"></i>
                      <SelectComponent
                        options={stateOptions}
                        value={selectedState}
                        onChange={setSelectedState}
                        placeholder="Select your state"
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* INSTITUTION SELECTION */}
                  <div className="flex flex-col w-full space-y-2">
                    <div className="flex items-center gap-3 px-4 py-2 rounded-lg hover:border-primaryPurple transition-colors">
                      <i className="fi fi-rr-building text-primaryPurple"></i>
                      <SelectComponent
                        options={institutionOptions}
                        value={selectedInstitution}
                        onChange={setSelectedInstitution}
                        placeholder="Select your institution"
                        className="w-full"
                        isDisabled={!selectedState}
                      />
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 self-start mt-2">
                    Your student information helps us personalize your
                    experience
                  </p>
                </div>
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
