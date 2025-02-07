import { useEffect } from "react";
import { IconAlertTriangleFilled } from "@tabler/icons-react";

const SessionExpiredModal = ({ isOpen, onConfirm, userRole }) => {
  const loginPath = userRole === "agent" ? "/agent/login" : "/renter/login";

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      {/* Animated Overlay */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out"
        style={{
          animation: "fadeIn 0.3s ease-in-out",
        }}
      />

      {/* Animated Modal */}
      <div
        className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
        style={{
          animation: "slideIn 0.3s ease-out",
        }}
      >
        <div className="flex flex-col items-center">
          {/* Animated Icon */}
          <div
            className="mb-4 rounded-full bg-yellow-100 p-3"
            style={{
              animation: "bounceIn 0.5s ease-out",
            }}
          >
            <IconAlertTriangleFilled className="h-6 w-6 text-yellow-500" />
          </div>

          {/* Animated Content */}
          <div
            className="text-center"
            style={{
              animation: "fadeInUp 0.4s ease-out",
            }}
          >
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              Session Expired
            </h2>

            <p className="mb-6 text-gray-600">
              Your session has expired for security reasons. Please log in again
              to continue accessing your account.
            </p>
          </div>

          {/* Animated Button */}
          <button
            onClick={() => {
              localStorage.removeItem("token");
              onConfirm();
              window.location.href = loginPath;
            }}
            className="w-full transform rounded-lg bg-primaryPurple px-4 py-2 text-white transition-all duration-200 ease-in-out hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              animation: "fadeInUp 0.5s ease-out",
            }}
          >
            Log in again
          </button>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideIn {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes bounceIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          70% {
            transform: scale(0.95);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            transform: translateY(10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default SessionExpiredModal;
