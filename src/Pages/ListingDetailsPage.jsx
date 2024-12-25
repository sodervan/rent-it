import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Avatar, Rating, Spinner } from "@material-tailwind/react";
import Footer from "@/components/Footer.tsx";
import {
  IconDatabaseImport,
  IconUserSquareRounded,
  IconHeartHandshake,
  IconAlertCircle,
  IconMessageCircle,
    IconBookmark
} from "@tabler/icons-react";
import BookMarkListingModal from "../components/Modals/BookMarkListingModal.jsx";
import ChatAgentModal from "../components/Modals/ChatAgentModal.jsx";

const firebaseUrl =
  "https://rentit-c3304-default-rtdb.firebaseio.com/locations.json";
const ListingDetailsPage = () => {
  const { id, index } = useParams();
  const [selected, setSelected] = useState(null);
  const [toggleBookListingModal, setToggleListingModal] = useState(false);
  const [toggleChat, setToggleChat] = useState(false);

  const updateChatAgentModal = () => {
    setToggleChat(true);
  };

  const closeChatModal = () => {
    setToggleChat(false);
  };
  const updateBookListingModal = () => {
    setToggleListingModal(true);
  };
  const closeModal = () => {
    setToggleListingModal(false);
  };

  const dateFormatter = (prop) => {
    const dateStr = prop;
    const dateObj = new Date(dateStr);
    const options = { year: "numeric", month: "long", day: "numeric" };

    return dateObj.toLocaleDateString("en-US", options);
  };

  const getDataFromFirebase = async () => {
    try {
      const response = await fetch(firebaseUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to receive data from Firebase");
      }

      const result = await response.json();

      console.log("Data received successfully:", result);

      if (result.length > 0) {
        const foundDetail = result.find((item) => item.id === Number(id));

        if (
          foundDetail &&
          foundDetail.accommodations &&
          foundDetail.accommodations[index]
        ) {
          setSelected(foundDetail.accommodations[index]);
        } else {
          console.error("Accommodation not found");
        }
      }
    } catch (error) {
      console.error("Error receiving data:", error);
    }
  };

  useEffect(() => {
    getDataFromFirebase();
  }, []);

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <>
      {selected ? (
        <div className="container mx-auto">
          {/* Main Section: Images and Video */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12 mx-auto px-4 md:px-6 lg:px-10">
            {/* Left Section: Main Image & Thumbnails */}
            <div className="md:col-span-2 lg:col-span-3 flex flex-col gap-4">
              {/* Main Image */}
              <div className="relative">
                <img
                  src={selected.poster}
                  alt="Main Property"
                  className="w-full h-80 md:h-96 rounded-lg object-cover shadow-lg"
                />
                <div className="absolute top-2 left-2 bg-purple-100 px-3 py-1 rounded">
                  <p className="text-sm font-semibold text-purple-600">
                    {selected.type}
                  </p>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {[...Array(6)].map((_, i) => (
                  <img
                    key={i}
                    src={selected.poster} // Replace with actual image URLs
                    alt={`Thumbnail ${i + 1}`}
                    className="w-full h-24 rounded-lg object-cover shadow transition-transform hover:scale-105 duration-300"
                  />
                ))}
              </div>
            </div>

            {/* Right Section: Video */}
            <div className="md:col-span-1 lg:col-span-1 flex flex-col">
              <div className="relative bg-gray-100 rounded-lg shadow-lg overflow-hidden">
                <video
                  className="w-full h-80 md:h-96 object-cover rounded-lg"
                  controls
                >
                  <source
                    src="https://www.example.com/video.mp4"
                    type="video/mp4"
                  />
                </video>
                <div className="absolute top-2 left-2 bg-black px-3 py-1 rounded text-white text-sm">
                  Virtual Tour
                </div>
              </div>
            </div>
          </div>

          {/* Side Section: Agent, Book, and Cost */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 mx-auto px-4 md:px-6 lg:px-10">
            {/* Agent Details */}
            <div className="md:col-span-1 w-full flex flex-col gap-4">
              <div className="p-4 bg-purple-50 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-gray-800">
                  Listing Agent
                </h2>
                <div className="flex items-center gap-4 mt-4">
                  <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" />
                  <div>
                    <p className="font-semibold underline">
                      {selected.agentName}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <Rating
                        value={Math.floor(selected.rating)}
                        readonly
                        ratedColor="amber"
                      />
                      <span className="text-sm font-medium">
                        {selected.rating}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={updateChatAgentModal}
                  className="mt-4 w-full bg-purple-200 text-purple-800 px-4 py-2
                rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-purple-500 hover:text-white hover:shadow-lg transition-all duration-300"
                >
                  <IconMessageCircle />
                  Chat with Agent
                </button>
              </div>

              {/* Book Listing */}
              <button
                onClick={updateBookListingModal}
                className="w-full bg-primaryPurple text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-purple-700 shadow-md transition-all duration-300"
              >
                <IconBookmark />
                Book Listing
              </button>
            </div>

            {/* Cost Breakdown */}
            <div className="col-span-2 flex flex-col w-full rounded-lg border shadow-md bg-white">
              {/* Section Header */}
              <div className="px-6 py-4 border-b bg-gray-50 rounded-t-lg">
                <h3 className="text-lg font-semibold text-gray-800">
                  Cost Breakdown
                </h3>
              </div>

              {/* Item Rows */}
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <div className="flex items-center gap-3">
                  <IconDatabaseImport className="text-primaryPurple" />
                  <p className="font-medium text-gray-700">Base Cost</p>
                </div>
                <p className="text-gray-900 font-medium">
                  N {selected.price.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b">
                <div className="flex items-center gap-3">
                  <IconUserSquareRounded className="text-primaryPurple" />
                  <p className="font-medium text-gray-700">Agent's Fee</p>
                </div>
                <p className="text-gray-900 font-medium">N 10,000</p>
              </div>

              <div className="flex items-center justify-between px-6 py-4 border-b">
                <div className="flex items-center gap-3">
                  <IconHeartHandshake className="text-primaryPurple" />
                  <p className="font-medium text-gray-700">Agreement Fee</p>
                </div>
                <p className="text-gray-900 font-medium">N 25,000</p>
              </div>

              <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b">
                <div className="flex items-center gap-3">
                  <IconAlertCircle className="text-primaryPurple" />
                  <p className="font-medium text-gray-700">Caution Fee</p>
                </div>
                <p className="text-gray-900 font-medium">N 75,000</p>
              </div>

              {/* Total Section */}
              <div className="flex items-center justify-between px-6 py-5 bg-secondaryPurple rounded-b-lg">
                <div>
                  <p className="font-semibold text-lg text-gray-800">TOTAL</p>
                </div>
                <div>
                  <p className="font-extrabold text-xl text-gray-800">
                    N {(Number(selected.price) + 10000 + 25000 + 75000).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Learn More Button */}
              <div className="p-4">
                <button
                  onClick={() => console.log("Redirect to More Info")}
                  className="w-full bg-purple-600 hover:bg-purple-800 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm transition-all duration-300"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* Modals */}
          {toggleBookListingModal && (
            <BookMarkListingModal
              closeModal={closeModal}
              unitsAvailable={selected.unitsAvailable}
            />
          )}
          {toggleChat && (
            <ChatAgentModal
              closeModal={closeChatModal}
              agentName={selected.agentName}
            />
          )}

          {/* Other Details */}
          <div className="my-12 px-4 md:px-6 lg:px-10">
            <h3 className="text-lg font-semibold mb-4">Description</h3>
            <p className="text-gray-700">{selected.description}</p>
          </div>
          {/*FEATURES*/}
          <div className="mt-8 p-4 bg-secondaryPurple px-4 md:px-6 lg:px-10 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>
                Date Listed: {dateFormatter(selected.features.dateListed)}
              </li>
              <li>Type: {selected.features.type}</li>
              <li>Electricity: {selected.features.electricityStatus}</li>
            </ul>
          </div>

        </div>
      ) : (
        <div className="w-full h-screen flex items-center justify-center">
          <Spinner className="w-10 h-10" />
        </div>
      )}
      <Footer />
    </>
  );
};

export default ListingDetailsPage;
