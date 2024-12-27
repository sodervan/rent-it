import React from "react";
import { motion } from "framer-motion";

// Props interface for the Modal
interface ModalProps {
  isOpen: boolean; // Controls if the modal is visible
  onClose: () => void; // Function to close the modal
  onConfirm: () => void; // Function triggered when confirming action
  message: string; // Message to show in the modal
}

const ConfirmationModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}) => {
  if (!isOpen) return null; // Do not render anything if the modal is not open

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose} // Close modal if the overlay is clicked
    >
      {/* Modal contains animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white w-[90%] sm:w-[400px] p-6 rounded-lg shadow-lg transition-all"
        onClick={(e) => e.stopPropagation()} // Prevent closing the modal when clicking inside the modal content
      >
        {/* Modal Content */}
        <h2 className="text-xl font-medium text-center text-gray-800 mb-4">Confirmation</h2>
        <p className="text-gray-600 mb-6 text-center">{message}</p>

        {/* Buttons */}
        <div className="flex gap-4 w-full justify-center">
          <button
            onClick={onClose}
            className="py-2 px-4 flex-1 bg-[#FEF3F2] text-[#B42318] rounded-md hover:shadow-md transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="py-2 px-4 flex-1 bg-primaryPurple text-white rounded-md  transition"
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmationModal;
