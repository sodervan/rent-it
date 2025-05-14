import React, { useEffect } from "react";
import { X, User, ArrowRight, Home, Badge, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const BlockedBookingModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 300,
        delay: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: 30,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop layer */}
          <motion.div
            className="fixed inset-0 z-[100] bg-black bg-opacity-60 backdrop-blur-sm"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            onClick={onClose}
          />

          {/* Modal container - positioned above backdrop */}
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
          >
            <motion.div
              className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 relative overflow-hidden pointer-events-auto"
              variants={modalVariants}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header - Gradient Background */}
              <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-5 text-white flex justify-between items-center">
                <h2 className="text-xl font-bold tracking-tight">
                  Renter Account Required
                </h2>
                <motion.button
                  onClick={onClose}
                  className="text-white hover:text-gray-200 transition-colors rounded-full bg-purple-500 bg-opacity-30 p-1"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(255,255,255,0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Modal Body */}
              <div className="p-6 pt-2">
                <motion.div
                  className="flex items-center justify-center mb-6"
                  initial={{ scale: 0.8, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <div className="bg-purple-100 p-5 rounded-full shadow-md">
                    <User size={48} className="text-purple-600" />
                  </div>
                </motion.div>

                <motion.h3
                  className="text-xl font-semibold text-gray-800 text-center mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Booking Limited to Renters
                </motion.h3>

                <motion.p
                  className="text-gray-600 mb-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  To book this apartment, you need to have a renter account.
                  Please sign up to a renter account to continue.
                </motion.p>

                {/* Benefits Section */}
                <motion.div
                  className="bg-purple-50 p-4 rounded-lg mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h4 className="font-medium text-purple-800 mb-2">
                    Renter Benefits:
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle size={16} className="text-purple-600" />
                      <span>Book apartments instantly</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle size={16} className="text-purple-600" />
                      <span>Access exclusive listings</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle size={16} className="text-purple-600" />
                      <span>Manage bookings in one place</span>
                    </li>
                  </ul>
                </motion.div>

                <div className="flex flex-col gap-3">
                  <motion.button
                    whileHover={{
                      scale: 1.02,
                    }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    onClick={() => (window.location.href = "/renter/signup")}
                    className="bg-purple-600 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2"
                  >
                    Sign Up as Renter
                    <ArrowRight size={18} />
                  </motion.button>

                  <motion.button
                    onClick={onClose}
                    className="border border-gray-300 text-gray-700 py-3 px-4 rounded-lg"
                    whileHover={{ scale: 1.02, backgroundColor: "#f9fafb" }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BlockedBookingModal;
