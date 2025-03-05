import { NavLink, useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { Input, Checkbox, Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import SelectComponent from "@/components/AddListings/SelectComponent.jsx";
import axios from "axios";

const RenterSignup = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const [isStudent, setIsStudent] = useState(false);
  const [isTermsAndConditions, setIsTermsAndConditions] = useState(false);
  const [isPassword, setIsPassword] = useState("");
  const [isConfirmPassword, setIsConfirmPassword] = useState("");
  const [isAccurate, setIsAccurate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [states, setStates] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedInstitution, setSelectedInstitution] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    institution: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStudentToggle = () => {
    setIsStudent(!isStudent);
  };

  useEffect(() => {
    setIsAccurate(
      isPassword && isConfirmPassword && isPassword === isConfirmPassword,
    );
  }, [isPassword, isConfirmPassword]);
  useEffect(() => {
    getStates();
  }, []);

  const stateOptions = states.map((type) => ({
    value: String(type.id),
    label: type.name,
  }));

  const institutionOptions = universities.map((type) => ({
    value: String(type.id),
    label: type.name,
  }));

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

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setIsLoading(true);

      const response = await axios.post(
        `${apiUrl}/api/v1/users/google`,
        {
          token: credentialResponse.credential,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const result = response.data;

      toast.success("Registration with Google successful!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      localStorage.setItem("role", "user");

      navigate("/renter/signup/studentInfo", {
        state: { email: result.email },
      });
    } catch (error) {
      console.error("Google signup error:", error);

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to register with Google";

      toast.error(errorMessage, {
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

  const handleGoogleError = () => {
    toast.error("Google sign-up was unsuccessful. Please try again.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

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

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/users/register`,
        {
          email: formData.email,
          password: isPassword,
          phoneNumber: formData.phoneNumber,
          schoolId: isStudent ? selectedInstitution : "none",
          firstname: formData.firstName,
          lastname: formData.lastName,
          isStudent: isStudent,
        },
        {
          withCredentials: true,
        },
      );

      const result = response.data;
      console.log(result);
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
      localStorage.setItem("role", "user");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Registration failed!";
      toast.error(errorMessage, {
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
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="flex items-center justify-center min-h-screen px-4 md:px-10 lg:px-20">
        <div className="w-full max-w-screen-sm bg-white rounded-lg p-6 md:p-10">
          <div className="text-center">
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
            <p className="text-gray-600 font-medium mt-2">
              Create Your Account
            </p>
          </div>

          {/* Google Sign-up Button */}
          <div className="mt-6 mb-4">
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap
                theme="outline"
                size="large"
                width="100%"
                text="signup_with"
                shape="rectangular"
              />
            </div>
            <div className="text-center text-sm text-gray-500 mt-4">or</div>
          </div>

          <form className="mt-4 flex flex-col gap-6" onSubmit={handleSignup}>
            <div className="flex items-center gap-3 px-4 rounded-lg">
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

            <div className="flex items-center gap-3 px-4 rounded-lg">
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

            <div className="flex items-center gap-3 px-4 rounded-lg">
              <i className="fi fi-rr-envelope text-primaryPurple"></i>
              <Input
                label="Email"
                f
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                required
                className="bg-transparent focus:ring-0 w-full"
              />
            </div>

            <div className="flex items-center gap-3 px-4 rounded-lg">
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

            <div className="flex items-center gap-3 px-4 rounded-lg">
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

            <div className="relative">
              <div className="flex items-center gap-3 px-4 rounded-lg">
                <i className="fi fi-rr-lock text-primaryPurple"></i>
                <Input
                  label="Confirm Password"
                  value={isConfirmPassword}
                  error={isAccurate === false}
                  onChange={(e) => setIsConfirmPassword(e.target.value)}
                  type="password"
                  required
                  className="bg-transparent focus:ring-0 w-full"
                />
              </div>
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
                  Your student information helps us personalize your experience
                </p>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <div className="flex items-center">
                <Checkbox onChange={handleStudentToggle} />
                <span className="text-sm text-gray-600">I am a student</span>
              </div>
              <div className="flex items-center">
                <Checkbox
                  onChange={() =>
                    setIsTermsAndConditions(!isTermsAndConditions)
                  }
                />
                <span className="text-sm text-gray-600">
                  I agree to the{" "}
                  <span className="underline text-primaryPurple cursor-pointer">
                    terms and conditions
                  </span>
                </span>
              </div>
            </div>

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
    </GoogleOAuthProvider>
  );
};

export default RenterSignup;
