import { useEffect, useState } from "react";
import { IconX, IconBrandWhatsapp, IconClipboard } from "@tabler/icons-react"; // Import Tabler Icons

const ChatAgentModal = ({ closeModal, agentName }) => {
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
    setUnits(units + 1);
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
              } max-h-[80vh] mt-5 overflow-y-auto`} // Scrollable modal content
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <p className="font-semibold text-lg">Chat with {agentName}</p>
              {/* Close icon button */}
              <button onClick={handleClose} className="text-gray-600 hover:text-gray-800">
                <IconX size={20} />
              </button>
            </div>

            {/* Agent Details */}
            <div className="flex flex-col gap-2">
              <p className="text-[14px] font-semibold">
                Mobile Number:{" "}
                <span className="text-primaryPurple cursor-pointer font-normal underline">
                +234-000000000
              </span>
              </p>
              <p className="text-[14px] font-semibold">
                Email:{" "}
                <span className="text-primaryPurple cursor-pointer font-normal underline">
                yemiwilliams@gmail.com
              </span>
              </p>
              <p className="text-[14px] font-semibold">
                Office Address:{" "}
                <span className="text-primaryPurple cursor-pointer font-normal">
                39, Sawmill, Gbagada. Lagos
              </span>
              </p>
            </div>

            {/* WhatsApp Button */}
            <button
                className="mb-6 bg-[#32D583] px-3 py-2 rounded-lg my-4 flex items-center gap-2 hover:opacity-90 transition-opacity"
                onClick={() => {
                  window.open("http://wa.me/2347089327367", "_blank");
                }}
            >
              <IconBrandWhatsapp size={20} className="text-white" />
              <p className="text-[14px] text-white">Chat via WhatsApp</p>
            </button>

            {/* Predefined Message Section */}
            <div className="bg-gray-300 px-4 py-3 rounded-lg relative">
              {/* Clipboard button */}
              <button
                  className="absolute right-3 top-3 p-1 hover:bg-gray-200 rounded-lg"
                  onClick={() =>
                      navigator.clipboard.writeText(
                          `Hello Yemi Williams, I'm interested in the property (Student Hostels) at 8 Solanke Street, Yaba, Lagos. I would like to know more about the availability, and any other necessary details. Could you please share more information and schedule a viewing? Looking forward to your response. Best regards, [Your Name] [Your Phone Number]`
                      )
                  }
              >
                <IconClipboard size={20} className="text-gray-600" />
              </button>
              {/* Predefined message content */}
              <p className="text-[14px]">
                Hello Yemi Williams,
                <br />
                <br />
                I'm interested in the property (Student Hostels) at 8 Solanke
                Street, Yaba, Lagos. I would like to know more about the
                availability, and any other necessary details. Could you please
                share more information and schedule a viewing?
                <br />
                <br />
                Looking forward to your response.
                <br /> Best regards, <br />
                [Your Name] <br />
                [Your Phone Number]
              </p>
            </div>

            {/* Cancel Button */}
            <button
                onClick={handleClose}
                className="px-3 py-2 border-2 mb-3 mt-5 border-gray-400 text-[14px] rounded-lg hover:bg-black hover:text-white transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </>
  );
};

export default ChatAgentModal;