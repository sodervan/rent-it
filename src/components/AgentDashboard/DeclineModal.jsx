import React, { useState } from "react";
import { motion } from "framer-motion";

const DeClineModal = ({ request, onClose, onConfirm }) => {
  const [quantity, setQuantity] = useState(2);
  const [note, setNote] = useState("");
  const [isNoteVisible, setIsNoteVisible] = useState(false);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const toggleNoteVisibility = () => {
    setIsNoteVisible(!isNoteVisible);
    if (isNoteVisible) {
      setNote("");
    }
  };
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
        className="bg-white w-[90%] sm:w-[400px] p-6 border-red-800 border rounded-lg shadow-lg transition-all"
        onClick={(e) => e.stopPropagation()} // Prevent closing the modal when clicking inside the modal content
      >
        {/* Modal Content */}
        <h2 className="text-xl font-medium text-center text-gray-800 mb-4">
          Confirmation
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Are you sure you want to accept this booking?
        </p>
        <div className="flex my-5 justify-between items-center">
          <div className="flex gap-1 items-center">
            <img
              src={`https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}
              alt={request.name}
              className="w-10 h-10 rounded-full"
            />
            <span className="text-sm">{request.name}</span>
          </div>
          <div className="">
            <span className="text-sm">Units Requested: 2</span>
          </div>
        </div>

        <div className="py-2">
          <span className="text-sm">Units Available for Rents</span>
          <div className="flex items-center p-1 rounded-lg mt-2 justify-between border w-full">
            <span className="text-sm font-medium mx-2">{quantity}</span>
            <div className="flex gap-2">
              <button
                onClick={increment}
                className="border px-3 py-1 rounded-md text-lg bg-gray-100 hover:bg-gray-200"
              >
                +
              </button>
              <button
                onClick={decrement}
                className="border px-3 py-1 rounded-md text-lg bg-gray-100 hover:bg-gray-200"
              >
                -
              </button>
            </div>
          </div>
        </div>

        <div className="my-2">
          <span
            className="text-[#6941C6] text-sm cursor-pointer underline"
            onClick={toggleNoteVisibility}
          >
            {isNoteVisible ? "Remove Note" : "Add Note"}
          </span>
          {isNoteVisible && (
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full text-sm mt-2 p-2 border  focus:outline-none focus:ring-1 focus:ring-purple-500  rounded-md  transition duration-1000 ease-in-out"
              rows="4"
              placeholder="Add any additional notes here..."
            />
          )}
        </div>

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
            Decline
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DeClineModal;
