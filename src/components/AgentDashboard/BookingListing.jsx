import React from "react";
import Loader from "../Loaders/Loader";
import Sidebar from "./Sidebar";
import { useState } from "react";
import AcceptModal from "./AcceptModal";
import DeclineModal from "./DeclineModal";

const BookingListing = () => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [actionType, setActionType] = useState("");

  const handleAction = (requestId, action) => {
    // Handle the action (accept/decline)
  };

  const openModal = (request, action) => {
    setCurrentRequest(request);
    setActionType(action);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentRequest(null);
    setActionType("");
  };
  const data = [
    {
      title: "3 Roommates (male) needed near FUTA",
      requests: [
        { id: 1, name: "Jeffrey Ada", units: 4, status: "pending" },
        { id: 2, name: "Alao Bamidele", units: 1, status: "accepted" },
        { id: 3, name: "Olugbenga Adeyemi", units: 2, status: "pending" },
      ],
    },
    {
      title: "Single Apartment in Gberigbe, Ikorodu",
      requests: [
        { id: 4, name: "Adeayo Bimpe", units: 1, status: "pending" },
        { id: 5, name: "Sanusi Usman", units: 1, status: "pending" },
      ],
    },
  ];

  return (
    <>
      <Sidebar />
      <div className={`content mt-20 lg:ml-[23rem] xl:ml-[25rem] `}>
        <div className="">
          {loading ? (
            <Loader />
          ) : (
            <div className="p-5">
              <h2 className="font-bold text-lg">Dashboard - Listings</h2>
            </div>
          )}
        </div>

        <div className="grid  max-w-[1000px] w-[95%] mx-auto xl:mx-0 xl:grid-cols-2 grid-cols-1 gap-6">
          {data.map((group, groupIndex) => (
            <div key={groupIndex} className="w-full ">
              <h2 className="text-base font-semibold text-gray-800 mb-4">
                {group.title}
              </h2>
              <div className="space-y-4">
                {group.requests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between bg-[#F2F4F7] py-5 px-2   border"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}
                        alt={request.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {request.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Units Requested: {request.units}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openModal(request, "accept")}
                        className={`px-3 py-2 rounded-lg text-sm font-medium ${
                          request.status === "accepted"
                            ? "bg-purple-500 text-white cursor-not-allowed"
                            : "bg-purple-500 hover:bg-purple-600 text-white"
                        }`}
                        disabled={request.status === "accepted"}
                      >
                        {request.status === "accepted" ? "Accepted" : "Accept"}
                      </button>
                      <button
                        onClick={() => openModal(request, "decline")}
                        className="px-3 py-2 bg-red-100 text-sm  hover:bg-red-200 text-red-500 rounded-lg font-medium"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && actionType === "accept" && (
        <AcceptModal
          request={currentRequest}
          onClose={closeModal}
          onConfirm={() => handleAction(currentRequest.id, actionType)}
        />
      )}
      {isModalOpen && actionType === "decline" && (
        <DeclineModal
          request={currentRequest}
          onClose={closeModal}
          onConfirm={() => handleAction(currentRequest.id, actionType)}
        />
      )}
    </>
  );
};

export default BookingListing;
