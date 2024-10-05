import { useState, useEffect } from "react";

const LogOutModal = ({ closeModal, unitsAvailable, onLogOut }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  // Trigger animation when component mounts
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true); // Show modal with animation
    }, 100); // Small delay for a smoother appearance
  }, []);

  // Handle modal close with animation
  const handleClose = () => {
    setAnimateOut(true); // Trigger exit animation
    setTimeout(() => {
      closeModal(); // Close the modal after animation completes
    }, 500); // Matches transition duration
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 z-[100] h-screen w-full bg-black bg-opacity-50 flex justify-center items-center
          transition-opacity duration-500 ease-out ${
            animateOut ? "opacity-0" : "opacity-100"
          }`} // Backdrop fade-in/fade-out
      >
        <div
          className={`bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-lg transform transition-transform transition-opacity
            duration-500 ease-out ${
              isVisible && !animateOut
                ? "translate-y-0 scale-100 opacity-100" // Animate in: slide up, scale, fade in
                : "translate-y-10 scale-95 opacity-0" // Animate out: slide down, scale down, fade out
            }`}
        >
          <div>
            <p className="font-normal text-center mb-6">
              Are you sure you want to log out?
            </p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-3">
              <button
                className="bg-primaryPurple w-full py-3 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                onClick={onLogOut}
              >
                Log Out
              </button>
              <button
                className="bg-[#FEF3F2] w-full py-3 text-[#B42318] rounded-lg hover:shadow-lg transition-all duration-300"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogOutModal;
