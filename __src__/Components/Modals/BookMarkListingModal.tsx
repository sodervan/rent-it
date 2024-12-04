import { useState, useEffect } from "react";

const BookMarkListingModal = ({ closeModal, unitsAvailable }) => {
  const [units, setUnits] = useState(1);
  const [isVisible, setIsVisible] = useState(false); // Controls modal visibility
  const [animateOut, setAnimateOut] = useState(false); // Controls exit animation

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

  const updateUnits = () => {
    if (units < unitsAvailable) setUnits(units + 1);
  };
  const deductUnits = () => {
    if (units > 1) {
      setUnits(units - 1);
    }
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
            <p className="text-xl font-semibold text-center mb-4">
              Confirm Booking
            </p>
          </div>
          <div className="text-center mb-6">
            <p>Are you sure you want to book this listing?</p>
          </div>
          <div>
            <div className="flex items-center justify-between text text-gray-500 mb-2">
              <p>Units to Book</p>
              <p>Max - {unitsAvailable}</p>
            </div>
            <div className="flex justify-between items-center border border-gray-200 px-3 py-2 rounded-lg mb-4">
              <div>
                <p>{units}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="bg-gray-200 text-black px-4 py-2 rounded-lg"
                  onClick={deductUnits}
                >
                  -
                </button>
                <button
                  className="bg-gray-200 text-black px-4 py-2 rounded-lg"
                  onClick={updateUnits}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <button
                className="bg-primaryPurple w-full py-3 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                onClick={handleClose}
              >
                Confirm Booking
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

export default BookMarkListingModal;
