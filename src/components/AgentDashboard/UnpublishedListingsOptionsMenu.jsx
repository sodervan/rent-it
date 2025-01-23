import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  MoreVertical,
  Edit,
  Trash,
  Bookmark,
  AlertCircle,
  X,
  Loader,
  Home,
  DollarSign,
  FileText,
  Zap,
  Settings,
  Image,
  Video,
  MapPin,
  File,
  ClipboardCheck,
  Info,
  BedDouble,
  RefreshCcw,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Modal = ({ isOpen, onClose, children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto mt-10">
      <div
        className="fixed inset-0 bg-black bg-opacity-25 transition-opacity"
        onClick={onClose}
      />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all w-full max-w-md animate-in zoom-in-95 duration-300">
          {children}
        </div>
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
};

const UnpublishedListingOptionsMenu = ({
  onEdit,
  onDelete,
  onBookings,
  onRepublish,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBookingsModal, setShowBookingsModal] = useState(false);
  const [isDelisting, setIsDelisting] = useState(false);
  const [delistError, setDelistError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRePublishing, setIsRePublishing] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [isRepublishedError, setIsRepublishedError] = useState(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate();

  // Steps for the Edit Modal
  const steps = [
    {
      id: 1,
      label: "Basic Details",
      icon: Home,
      description: "Set property type, rooms, and basic amenities",
      category: "Property Info",
    },
    {
      id: 2,
      label: "Cost Breakdown",
      icon: DollarSign,
      description: "Define rent, deposits, and other fees",
      category: "Pricing",
    },
    {
      id: 3,
      label: "Cost Preview",
      icon: ClipboardCheck,
      description: "Review and confirm all costs",
      category: "Pricing",
    },
    {
      id: 4,
      label: "Description",
      icon: FileText,
      description: "Write detailed property description",
      category: "Content",
    },
    {
      id: 5,
      label: "Description Preview",
      icon: Info,
      description: "Review property description",
      category: "Content",
    },
    {
      id: 6,
      label: "Utilities",
      icon: Zap,
      description: "Add electricity and water details",
      category: "Features",
    },
    {
      id: 7,
      label: "Features",
      icon: BedDouble,
      description: "Add property features and amenities",
      category: "Features",
    },
    {
      id: 8,
      label: "Bills",
      icon: DollarSign,
      description: "Add recurring bills and charges",
      category: "Pricing",
    },
    {
      id: 9,
      label: "Images",
      icon: Image,
      description: "Upload property photos",
      category: "Media",
    },
    {
      id: 10,
      label: "Videos",
      icon: Video,
      description: "Upload property videos",
      category: "Media",
    },
    {
      id: 11,
      label: "Location",
      icon: MapPin,
      description: "Set property location and address",
      category: "Property Info",
    },
    {
      id: 12,
      label: "Agreement",
      icon: File,
      description: "Upload tenancy agreement documents",
      category: "Documents",
    },
    {
      id: 13,
      label: "Review",
      icon: ClipboardCheck,
      description: "Final review before publishing",
      category: "Final Steps",
    },
  ];
  const groupedSteps = steps.reduce((acc, step) => {
    if (!acc[step.category]) {
      acc[step.category] = [];
    }
    acc[step.category].push(step);
    return acc;
  }, {});

  const handleAction = (action) => {
    setIsOpen(false);
    switch (action) {
      case "edit":
        setShowEditModal(true);
        break;
      case "delete":
        setShowDeleteModal(true);
        break;
      case "bookings":
        setShowBookingsModal(true);
        break;
    }
  };

  const handleStepClick = (stepId) => {
    setIsRedirecting(true);
    // Redirect to the respective step
    window.location.href = `/agent/addlisting/${stepId}`;
    setShowEditModal(false);
    setIsRedirecting(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setDeleteError(null);
    try {
      await onDelete?.();
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting:", error);
      setDeleteError("Failed to delete. Please try again.");
      setTimeout(() => setDelistError(""), 3000);
    } finally {
      setIsDeleting(false);
    }
    setShowDeleteModal(false);
  };

  const handleRePublish = async () => {
    setIsRePublishing(true);
    setIsRepublishedError(null);
    try {
      await onRepublish?.();
      setShowBookingsModal(false);
    } catch (error) {
      console.error("Error deleting:", error);
      setIsRepublishedError("Failed to delete. Please try again.");
      setTimeout(() => setDelistError(""), 3000);
    } finally {
      setIsRePublishing(false);
    }
    setShowBookingsModal(false);
  };

  const handleEdit = async () => {
    setIsDelisting(true);
    setDelistError(null);

    try {
      await onEdit?.();
      setShowEditModal(false);
    } catch (error) {
      console.error("Error delisting:", error);
      setDelistError("Failed to delist. Please try again.");
    } finally {
      setIsDelisting(false);
    }
  };

  const handleBookings = () => {
    onBookings?.();
    setShowBookingsModal(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-8 w-8 bg-[#F4EBFF] text-primaryPurple rounded-full flex items-center justify-center hover:bg-primaryPurple hover:text-white transition-all duration-300"
      >
        <MoreVertical size={16} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[150]"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-[151] animate-in slide-in-from-top-2 duration-200">
            <div className="py-1 divide-y divide-gray-100">
              <button
                onClick={() => handleAction("edit")}
                className="group flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 transition-all duration-300"
              >
                <Edit className="mr-3 h-4 w-4 text-gray-400 group-hover:text-primaryPurple" />
                Edit Listing
              </button>
              {/*<button*/}
              {/*  onClick={() => handleAction("delete")}*/}
              {/*  className="group flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-all duration-300"*/}
              {/*>*/}
              {/*  <Trash className="mr-3 h-4 w-4 text-red-400 group-hover:text-red-600" />*/}
              {/*  Delete Listing*/}
              {/*</button>*/}
              <button
                onClick={() => handleAction("bookings")}
                className="group flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 transition-all duration-300"
              >
                <Bookmark className="mr-3 h-4 w-4 text-gray-400 group-hover:text-primaryPurple" />
                View Bookings
              </button>
              <button
                onClick={() => handleAction("bookings")}
                className="group flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 transition-all duration-300"
              >
                <RefreshCcw className="mr-3 h-4 w-4 text-gray-400 group-hover:text-primaryPurple" />
                re-Publish
              </button>
            </div>
          </div>
        </>
      )}

      {/* Edit Modal */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)}>
        <div className="relative">
          <button
            onClick={() => setShowEditModal(false)}
            className="absolute right-0 top-0 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Edit Listing
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Select a section to edit your listing details
            </p>
          </div>

          <div className="max-h-[50vh] overflow-y-auto px-1">
            {Object.entries(groupedSteps).map(([category, categorySteps]) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <h3 className="text-sm font-semibold text-gray-500 mb-3 px-2">
                  {category}
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {categorySteps.map((step) => {
                    const Icon = step.icon;
                    return (
                      <motion.button
                        key={step.id}
                        onClick={() => handleStepClick(step.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-purple-50 transition-all duration-200 group text-left"
                      >
                        <div className="mt-1 p-2 rounded-lg bg-purple-100 text-purple-600 group-hover:bg-purple-200">
                          <Icon size={18} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 group-hover:text-purple-600">
                            {step.label}
                          </p>
                          <p className="text-sm text-gray-500 mt-0.5">
                            {step.description}
                          </p>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
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
                <div className="flex flex-col items-center gap-3">
                  <Loader className="h-8 w-8 animate-spin text-white" />
                  <p className="text-white text-sm">Redirecting to editor...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <div className="relative">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="absolute right-0 top-0 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>

          <div className="flex items-center gap-2 text-red-600 mb-2">
            <AlertCircle className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Confirm Deletion</h3>
          </div>

          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this listing? This action cannot be
            undone and will permanently remove all associated data.
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              {isDeleting ? (
                <>
                  <Loader className="h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Permanently"
              )}
            </button>
          </div>
        </div>
      </Modal>

      {/* Republished Modal */}
      <Modal
        isOpen={showBookingsModal}
        onClose={() => setShowBookingsModal(false)}
      >
        <div className="relative">
          <button
            onClick={() => setShowBookingsModal(false)}
            className="absolute right-0 top-0 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>

          <div className="flex items-center gap-2 text-primaryPurple mb-2">
            <RefreshCcw className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Confirm re-Publish</h3>
          </div>

          <p className="text-gray-600 mb-6">
            Are you sure you want to re-Publish this listing, this action will
            make the listing available for renters to book.
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowBookingsModal(false)}
              className="px-4 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleRePublish}
              className="px-4 py-2 text-sm rounded-lg bg-primaryPurple text-white transition-colors flex items-center gap-2"
            >
              {isRePublishing ? (
                <>
                  <Loader className="h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                "re-Publish"
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UnpublishedListingOptionsMenu;
