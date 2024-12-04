import { useState, useEffect } from "react";
import { Clipboard } from "flowbite-react";

const ShareModal = ({ closeModal, name }) => {
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
          transition-opacity duration-500 ease-out${
            animateOut ? "opacity-0" : "opacity-100"
          }`} // Backdrop fade-in/fade-out
      >
        <div
          className={`bg-white rounded-lg shadow-lg flex flex-col gap-3 p-6 w-[90%] max-w-lg transform transition-transform transition-opacity
            duration-500 relative ease-out ${
              isVisible && !animateOut
                ? "translate-y-0 scale-100 opacity-100" // Animate in: slide up, scale, fade in
                : "translate-y-10 scale-95 opacity-0" // Animate out: slide down, scale down, fade out
            }`}
        >
          <button
            onClick={closeModal}
            className="text-primaryPurple flex items-center justify-center absolute right-2 top-2 h-8 w-8 rounded-full bg-secondaryPurple hover:bg-primaryPurple hover:text-white transition-all duration-300"
          >
            <i className="fi fi-rr-cross-small p-0 m-0"></i>
          </button>
          <div>
            <p className="font-semibold text-center">
              Share Listing - <span className="font-normal">{name}</span>
            </p>
          </div>
          <div className="flex items-center justify-center gap-4 my-3">
            <button>
              <img
                src="https://res.cloudinary.com/dmlgns85e/image/upload/v1727627197/logos_whatsapp-icon_rhkmca.png"
                alt="#"
              />
            </button>
            <button>
              <img
                src="https://res.cloudinary.com/dmlgns85e/image/upload/v1727627198/prime_twitter_l4mmvn.png"
                alt="#"
              />
            </button>
            <button>
              <img
                src="https://res.cloudinary.com/dmlgns85e/image/upload/v1727627196/logos_facebook_tbbilj.png"
                alt="#"
              />
            </button>
            <button>
              <img
                src="https://res.cloudinary.com/dmlgns85e/image/upload/v1727627196/devicon_linkedin_feqiug.png"
                alt="#"
              />
            </button>
          </div>
          <div className="flex w-full justify-center items-center">
            <div className="relative">
              <input
                id="npm-install"
                type="text"
                className="col-span-6 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value="https://rent.it/ap_id?1234544322"
                disabled
                readOnly
              />
              <Clipboard.WithIcon valueToCopy="https://rent.it/ap_id?1234544322" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShareModal;
