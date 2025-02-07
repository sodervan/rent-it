import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  MoreVertical,
  BadgeMinus,
  Trash,
  Bookmark,
  AlertCircle,
  X,
  Loader,
  View,
} from "lucide-react";

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
    <div className="fixed inset-0 z-50 overflow-y-auto">
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

const ListingOptionsMenu = ({ onDelist, onDelete, onBookings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDelistModal, setShowDelistModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBookingsModal, setShowBookingsModal] = useState(false);
  const [isDelisting, setIsDelisting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [delistError, setDelistError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  const handleAction = (action) => {
    setIsOpen(false);
    switch (action) {
      case "delist":
        setShowDelistModal(true);
        break;
      case "delete":
        setShowDeleteModal(true);
        break;
      case "bookings":
        setShowBookingsModal(true);
        break;
    }
  };

  const handleDelist = async () => {
    setIsDelisting(true);
    setDelistError(null);

    try {
      await onDelist?.();
      setShowDelistModal(false);
    } catch (error) {
      console.error("Error delisting:", error);
      setDelistError("Failed to delist. Please try again.");
    } finally {
      setIsDelisting(false);
    }
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
                onClick={() => handleAction("bookings")}
                className="group flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 transition-all duration-300"
              >
                <View className="mr-3 h-4 w-4 text-gray-400 group-hover:text-primaryPurple" />
                View Listing
              </button>
              <button
                onClick={() => handleAction("delist")}
                className="group flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 transition-all duration-300"
              >
                <BadgeMinus className="mr-3 h-4 w-4 text-gray-400 group-hover:text-primaryPurple" />
                De-List apartment
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
            </div>
          </div>
        </>
      )}

      {/* De-list Modal */}
      <Modal isOpen={showDelistModal} onClose={() => setShowDelistModal(false)}>
        <div className="relative">
          <button
            onClick={() => setShowDelistModal(false)}
            className="absolute right-0 top-0 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>

          <div className="flex items-center gap-2 text-amber-600 mb-2">
            <AlertCircle className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Confirm De-listing</h3>
          </div>

          <p className="text-gray-600 mb-6">
            Are you sure you want to de-list this apartment? It will no longer
            be visible to potential tenants, but you can re-list it at any time.
          </p>

          {delistError && (
            <p className="text-red-500 mb-4 text-sm">{delistError}</p>
          )}

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowDelistModal(false)}
              className="px-4 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelist}
              disabled={isDelisting}
              className="px-4 py-2 text-sm rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition-colors flex items-center gap-2"
            >
              {isDelisting ? (
                <>
                  <Loader className="h-4 w-4 animate-spin" />
                  Delisting...
                </>
              ) : (
                "De-list Apartment"
              )}
            </button>
          </div>
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
          {deleteError && (
            <p className="text-red-500 mb-4 text-sm">{deleteError}</p>
          )}

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
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

      {/* Bookings Modal */}
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
            <Bookmark className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Apartment Bookings</h3>
          </div>

          <p className="text-gray-600">
            Redirecting you to view all bookings for this apartment...
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default ListingOptionsMenu;
