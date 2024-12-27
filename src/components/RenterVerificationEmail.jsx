import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";

const VerificationEmail = () => {
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    setRole(localStorage.getItem("role"));

    if (!token) {
      setStatus("error");
      setMessage("No token found in the URL.");
      return;
    }

    const verifyEmail = async () => {
      try {
        // Simple POST request with just the token
        const response = await fetch(`${apiUrl}/api/v1/users/verify/${token}`, {
          method: "POST",
          // headers: {
          //   "Content-Type": "application/json",
          // },
        });

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
        console.error("Verification error:", error);
        setStatus("error");
        setMessage("An error occurred during verification. Please try again.");
      }
    };

    verifyEmail();
  }, [token, apiUrl]);

  const handleNavigation = () => {
    if (role === "agent") {
      navigate("/agent/login");
    } else {
      navigate("/renter/login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {status === "loading" && (
        <div className="flex flex-col items-center justify-center">
          <div className="flex gap-2 items-center justify-center">
            <Spinner />
            <p className="mt-4 text-gray-500 animate-fadeIn">
              Verifying your email, please wait...
            </p>
          </div>
        </div>
      )}

      {status === "success" && (
        <div className="flex flex-col gap-3 items-center justify-center">
          <img
            src="https://res.cloudinary.com/dmlgns85e/image/upload/v1728146702/vector-2_vfbd1n.png"
            alt="#"
          />
          <p className="animate-fadeIn text-xl font-semibold">Email Verified</p>
          <button
            className="px-4 text-secondaryPurple py-3 bg-primaryPurple rounded-lg transition-all duration-200 hover:bg-shadow-lg"
            onClick={handleNavigation}
          >
            Go to Login
          </button>
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col items-center justify-center gap-3">
          <h2 className="text-xl font-bold text-primaryPurple">Oops!</h2>
          <p className="mt-2 text-xl font-semibold">{message}</p>
          <button
            className="px-4 py-3 bg-primaryPurple rounded-lg text-white transition-all duration-200 hover:shadow-lg"
            onClick={() => navigate("/")}
          >
            Request another Link
          </button>
          <button
            className="px-4 py-3 bg-secondaryPurple rounded-lg text-primaryPurple transition-all duration-200 hover:shadow-lg"
            onClick={() => {
              localStorage.removeItem("role")
              localStorage.removeItem("accountType")
              navigate("/");
              window.location.reload()
            }}
          >
            Go to Home
          </button>
        </div>
      )}

      {status === "expired" && (
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-yellow-600">
            Token Expired
          </h2>
          <p className="mt-2 text-gray-700">{message}</p>
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
