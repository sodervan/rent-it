import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

const VerifyEmail = () => {
  const location = useLocation();
  const email = location.state?.email;
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    if (showToast) {
      toast.success("Saved Successfully", {
        position: "top-right",
        autoClose: 5000,
      });
      setShowToast(false); // Avoid showing the toast multiple times
    }
  }, [showToast]);

  return (
    <>
      <div className="pt-24 w-full h-screen flex items-center flex-col gap-3 px-6">
        {/* Success Checkmark */}
        <div>
          <img
            src="https://res.cloudinary.com/dmlgns85e/image/upload/v1727951271/Vector_hhqepo.png"
            alt="#"
          />
        </div>
        <div>
          <p className="text-xl font-semibold">Verify Your Email Address</p>
        </div>
        <div>
          <p className="text-center">
            We’ve sent a verification link to{" "}
            <span className="text-primaryPurple">{email}</span>. Please check
            your inbox and click the link to verify your email.
          </p>
        </div>
        {/* Resend Verification Button */}
        <button className="px-3 py-2 bg-secondaryPurple text-primaryPurple rounded-lg">
          Resend verification link
        </button>
      </div>
    </>
  );
};

export default VerifyEmail;
