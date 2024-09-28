import { useState } from "react";

const BookMarkListingModal = ({ closeModal }) => {
  const [units, setUnits] = useState(1);

  const updateUnits = () => {
    setUnits(units + 1);
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 z-[100] h-screen w-full bg-black bg-opacity-50 flex justify-center items-center 
          transition-opacity duration-500 ease-out opacity-100`} // Fade-in backdrop
      >
        <div
          className={`bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-lg transform transition-all duration-700 ease-in-out
            translate-y-0 opacity-100`} // Slide-up modal
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
            <div className="text-gray-500 mb-2">
              <p>Units to Book</p>
            </div>
            <div className="flex justify-between items-center border border-gray-200 px-3 py-2 rounded-lg mb-4">
              <div>
                <p>{units}</p>
              </div>
              <button
                className="bg-gray-200 text-black px-4 py-2 rounded-lg"
                onClick={updateUnits}
              >
                +
              </button>
            </div>
            <div className="flex items-center justify-center gap-3">
              <button
                className="bg-primaryPurple w-full py-3 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                onClick={closeModal}
              >
                Confirm Booking
              </button>
              <button
                className="bg-[#FEF3F2] w-full py-3 text-[#B42318] rounded-lg hover:shadow-lg transition-all duration-300"
                onClick={closeModal}
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
