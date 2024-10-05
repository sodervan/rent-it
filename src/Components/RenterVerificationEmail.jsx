import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";

const VerificationEmail = () => {
  const [status, setStatus] = useState("loading"); // loading, success, error, expired
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("No token found in the URL.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `https://rent-it-api.onrender.com/api/v1/users/verify/${token}`,
          {
            method: "POST",
          },
        );

        const result = await response.json();

        if (response.ok) {
          setStatus("success");
          setMessage("Email successfully verified!");
        } else if (result.message === "Token expired") {
          setStatus("expired");
          setMessage(
            "The verification token has expired. Please request a new one.",
          );
        } else {
          setStatus("error");
          setMessage(result.message || "Verification failed.");
        }
      } catch (error) {
        setStatus("error");
        setMessage("An error occurred during verification. Please try again.");
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 transition-all duration-300">
      {status === "loading" && (
        <div className="flex flex-col items-center justify-center">
          <div className="flex gap-2 items-center justify-center">
            <Spinner />
            <div>
              <p className="mt-4 text-gray-500 animate-fadeIn">
                Verifying your email, please wait...
              </p>
            </div>
          </div>
        </div>
      )}

      {status === "success" && (
        <div className="flex flex-col gap-3 items-center justify-center transition-opacity duration-300">
          <img
            src="https://res.cloudinary.com/dmlgns85e/image/upload/v1728146702/vector-2_vfbd1n.png"
            alt="#"
          />
          <div>
            <p className="animate-fadeIn text-xl font-semibold">Email Verified</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div>
              <p className="text-gray-500 mb-2 text-[15px]">
                Signed up as renter?
              </p>
            </div>
            <button
              className="px-4 text-primaryPurple py-3 bg-secondaryPurple rounded-lg transition-all duration-200 hover:bg-primaryPurple"
              onClick={() => navigate("/renter/login")}
            >
              Go to Login
            </button>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div>
              <p className="text-gray-500 mb-2 text-[15px]">Signed up as Agent?</p>
            </div>
            <button
              className="px-4 text-primaryPurple py-4 bg-secondaryPurple rounded-lg transition-all duration-200 hover:bg-primaryPurple"
              onClick={() => navigate("/agent/login")}
            >
              Login to continue Registration
            </button>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col items-center justify-center gap-3 transition-opacity duration-300">
          <div>
            <h2 className="text-xl font-bold text-primaryPurple animate-fadeIn">
              Oops!
            </h2>
          </div>
          <div>
            <p className="mt-2 text-gray-700 animate-fadeIn">
              Verification Failed. Please request another Link
            </p>
          </div>
          <button
            className="px-4 py-3 bg-primaryPurple rounded-lg text-white transition-all duration-200 hover:shadow-lg"
            onClick={() => navigate("/")}
          >
            Request another Link
          </button>
          <button
            className="px-4 py-3 bg-secondaryPurple rounded-lg text-primaryPurple transition-all duration-200 hover:shadow-lg"
            onClick={() => navigate("/")}
          >
            Go to Home
          </button>
        </div>
      )}

      {status === "expired" && (
        <div className="text-center transition-opacity duration-300">
          <h2 className="text-3xl font-extrabold text-yellow-600 animate-fadeIn">
            Token Expired
          </h2>
          <p className="mt-2 text-gray-700 animate-fadeIn">{message}</p>
          <button
            className="mt-6 px-6 py-3 bg-yellow-600 text-white rounded-lg shadow-md transition-all duration-200 hover:bg-yellow-700"
            onClick={() => navigate("/resend-verification")}
          >
            Resend Verification
          </button>
        </div>
      )}
    </div>
  );
};

export default VerificationEmail;
