import { Toast } from "flowbite-react";
import { HiCheck } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const VerifyEmail = () => {
  const location = useLocation();
  const email = location.state?.email;
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  }, []);

  return (
    <>
      {showToast && (
        <div className="fixed top-2 right-2 z-[3000]">
          <Toast>
            <div
              className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200`}
            >
              <HiCheck className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">Saved Successfully</div>
            <Toast.Toggle />
          </Toast>
        </div>
      )}
      <div className="pt-24 w-full h-screen flex items-center flex-col gap-3 px-6">
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
        <button className="px-3 py-2 bg-secondaryPurple text-primaryPurple rounded-lg">
          Resend verification link
        </button>
      </div>
    </>
  );
};
export default VerifyEmail;
