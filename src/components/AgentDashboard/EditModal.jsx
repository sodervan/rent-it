import { useState } from "react";
import { X, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Modal } from "@mantine/core";

const steps = [
  { id: 1, label: "Basic Details" },
  { id: 2, label: "Cost Breakdown" },
  { id: 3, label: "Cost Breakdown Preview" },
  { id: 4, label: "Description" },
  { id: 5, label: "Description Preview" },
  { id: 6, label: "Electricity and Water" },
  { id: 7, label: "Add Features" },
  { id: 8, label: "Add Bills" },
  { id: 9, label: "Upload Listing Images" },
  { id: 10, label: "Upload Listing Videos" },
  { id: 11, label: "Listing Location" },
  { id: 12, label: "Upload Tenancy Agreement" },
  { id: 13, label: "Review Listing" },
];

const EditModal = ({ isOpen, onClose, listingId }) => {
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleStepClick = (stepId) => {
    setIsRedirecting(true);
    // Redirect to the respective step
    navigate(`/agents/addlisting/${stepId}?listingId=${listingId}`);
    onClose(); // Close the modal after redirection
  };

  return (
    <Modal opened={isOpen} onClose={onClose} size="lg" title="Edit Listing">
      <div className="relative">
        {/* Steps Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {steps.map((step) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: step.id * 0.05 }}
              className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => handleStepClick(step.id)}
            >
              <p className="text-sm font-medium text-gray-700">{step.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Loading State */}
        <AnimatePresence>
          {isRedirecting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
              <Loader className="h-8 w-8 animate-spin text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  );
};

export default EditModal;
