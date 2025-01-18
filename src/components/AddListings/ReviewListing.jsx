import { useEffect, useState } from "react";
import Loader from "../Loaders/Loader.jsx";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import {
  IconVideo,
  IconPhoto,
  IconBath,
  IconHome,
  IconPower,
  IconPool,
} from "@tabler/icons-react";
import { Button, Spinner, Checkbox } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import MapReview from "./MapReview";
import { IconSchool, IconAmbulance, IconBus } from "@tabler/icons-react";
import axios from "axios";
import { toast } from "react-toastify";
import CompletedModal from "@/components/AddListings/CompletedModal.jsx";
import VideoModal from "./VideoModal";
import ImageModal from "@/components/AddListings/ImagesModal.jsx"; // Import the VideoModal component

const ReviewListing = () => {
  const navigate = useNavigate();
  const [reviewDetails, setReviewDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBJYIthIF1IdQuGVe5bqpDGec2z6aKJ7lc",
  });

  const getData = async () => {
    setIsLoading(true);
    const storedDetails = JSON.parse(localStorage.getItem("basicDetails"));

    try {
      const response = await axios.get(
        `${apiUrl}/api/v1/agents/listings/${storedDetails.listingId}/review?listingId=${storedDetails.listingId}`,
        { withCredentials: true },
      );

      console.log("Review Data Response:", response);

      if (response.status === 200) {
        setReviewDetails(response.data.payload);
      } else {
        toast.error("Failed to fetch review data.");
      }
    } catch (error) {
      console.error("Error fetching review data:", error);
      toast.error("An error occurred while fetching review data.");
    } finally {
      setIsLoading(false);
    }
  };

  const publishListing = async () => {
    setIsUploading(true);
    const storedDetails = JSON.parse(localStorage.getItem("basicDetails"));

    try {
      const response = await axios.get(
        `${apiUrl}/api/v1/agents/listings/${storedDetails.listingId}/publish`,
        { withCredentials: true },
      );

      console.log("Publish Listing Response:", response);

      if (response.status === 200) {
        toast.success("Listing published successfully!");
        setShowSuccessModal(true);
      } else {
        toast.error("Failed to publish listing.");
      }
    } catch (error) {
      console.error("Error publishing listing:", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while publishing the listing.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {!isLoading ? (
        <div>
          <div className="px-6 flex items-center justify-center">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-5 w-full">
              {/* Left Section (Image and Details) */}
              <div className="flex flex-col h-[350px] rounded-lg shadow-lg w-full md:w-[600px]">
                {/* Image Section */}
                <div className="h-[60%] rounded-t-[15px] rounded-b-[20px] overflow-hidden relative">
                  <div className="flex items-center justify-between absolute top-2 left-3 w-full z-[100]">
                    <div className="bg-[#F4EBFF] p-2 rounded-xl">
                      <p className="text-[12px] font-[600] text-[#1D2939]">
                        {reviewDetails?.apartmentType?.name || "Apartment Type"}
                      </p>
                    </div>
                  </div>
                  <div className="bg-[#F4EBFF] px-2 py-1 rounded-full mx-auto absolute z-[100] bottom-2 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <div>
                      <p className="text-[12px] text-primaryPurple whitespace-nowrap">
                        {" "}
                        Created at{" "}
                        <span className="text-sm font-semibold">
                          {new Date(
                            reviewDetails?.createdAt,
                          ).toLocaleDateString() || "N/A"}
                        </span>
                      </p>
                    </div>
                  </div>
                  <img
                    src={
                      reviewDetails?.pictures?.[0]?.cloudinaryUrl ||
                      "/placeholder.jpg"
                    }
                    alt="Listing"
                    className="w-full h-full object-cover transition-transform duration-500"
                  />
                </div>

                {/* Details Section */}
                <div className="h-[40%] p-2 flex flex-col gap-2 justify-center">
                  <p className="text-sm font-bold">
                    {reviewDetails?.title || "Title"}
                  </p>
                  <div className="flex gap-1 items-center">
                    <p className="text-[15px] text-gray-600">
                      {`${reviewDetails?.currency?.symbol || "₦"} ${
                        parseFloat(reviewDetails?.baseCost).toLocaleString() ||
                        "0"
                      }`}
                    </p>
                    <p className="text-xs bg-[#D7D6FD] font-light px-2 rounded-full">
                      {reviewDetails?.paymentDuration || "Payment Duration"}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <i className="fi fi-rr-text-box text-[#FF3D3D]"></i>
                    <p className="text-xs">
                      Units Available: {reviewDetails?.unitsLeft || "0"}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <i className="fi fi-rr-marker text-[#FF3D3D]"></i>
                    <p className="text-xs">
                      {reviewDetails?.location?.streetAddress ||
                        "Location not available"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Section (Video) */}
              <div className="w-full md:w-[600px] flex justify-center items-center">
                {reviewDetails?.video &&
                reviewDetails.video.length > 0 &&
                reviewDetails.video[0]?.cloudinaryUrl ? (
                  <video
                    src={reviewDetails.video[0].cloudinaryUrl}
                    controls
                    className="rounded-lg shadow-lg w-full h-[350px] max-w-[600px]"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <p>No video available</p>
                )}
              </div>
            </div>
          </div>
          {/*IMAGE AND VIDEO BUTTONS*/}
          <div className="px-6 flex gap-3 mt-3">
            <button
              className="bg-secondaryPurple border border-primaryPurple text-primaryPurple p-2 rounded-lg my-3 text-sm flex items-center"
              onClick={() => setShowImageModal(true)}
            >
              <IconPhoto size={16} className="mr-2" />
              View all images
            </button>
            <button
              className="bg-secondaryPurple border border-primaryPurple text-primaryPurple p-2 rounded-lg my-3 text-sm flex items-center"
              onClick={() => setShowVideoModal(true)} // Open video modal
            >
              <IconVideo size={16} className="mr-2" />
              View all videos
            </button>
          </div>

          {/* Video Modal */}
          <VideoModal
            videos={reviewDetails?.video || []}
            open={showVideoModal}
            onClose={() => setShowVideoModal(false)}
          />

          <ImageModal
            images={reviewDetails?.pictures || []}
            open={showImageModal}
            onClose={() => setShowImageModal(false)}
          />

          {/* Remaining sections */}
          <div className="my-4">
            {/* Cost Breakdown */}
            <div className="px-6 mt-6">
              <h3 className="font-medium text-lg mb-2">Cost Breakdown</h3>
              <div className="flex flex-col w-full rounded-[20px] border-2 border-[#E9D7FE] mb-7">
                <div className="px-4 py-5 flex items-center justify-between rounded-t-[20px] border-b-2 border-b-[#E9D7FE]">
                  <div>
                    <p className="font-semibold text-[14px]">Base Cost</p>
                  </div>
                  <div>
                    <p className="text-[14px]">
                      {`${reviewDetails?.currency?.symbol || "₦"} ${
                        reviewDetails.baseCost
                      }`}
                    </p>
                  </div>
                </div>
                {reviewDetails.extraFees?.map((fee, index) => (
                  <div
                    key={index}
                    className={`px-4 py-5 flex items-center justify-between ${
                      index % 2 === 0 ? "border-b-2 border-b-[#E9D7FE]" : ""
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-[14px]">
                        {fee?.feeType?.name || "Fee Type"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[14px]">
                        {`${reviewDetails?.currency?.symbol || "₦"} ${fee?.amount.toLocaleString() || "0"}`}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="px-4 py-5 flex items-center justify-between bg-[#E9D7FE] rounded-b-[20px]">
                  <div>
                    <p className="font-semibold">TOTAL</p>
                  </div>
                  <div>
                    <p className="font-semibold">
                      {`${reviewDetails?.currency?.symbol || "₦"} ${
                        reviewDetails.extraFees
                          ?.reduce(
                            (acc, fee) => acc + fee.amount,
                            parseFloat(reviewDetails?.baseCost || 0),
                          )
                          .toLocaleString() || "0"
                      }`}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="px-6 my-10">
              <h3 className="font-medium text-lg mb-4">Description</h3>
              <p className="text-sm">
                {reviewDetails?.description || "No description available."}
              </p>
            </div>

            {/* Features */}
            <div className="px-6 my-8 bg-[#E9D7FE] py-4 rounded-lg">
              <h3 className="font-medium text-lg mb-4">Features</h3>
              <ul className="flex gap-3 whitespace-nowrap flex-wrap">
                {reviewDetails?.featureTags?.length > 0
                  ? reviewDetails.featureTags.map((feature, index) => (
                      <div
                        key={index}
                        className="flex gap-2 items-center py-2 px-3 border border-gray-300 rounded-full bg-white"
                      >
                        <i
                          className={`${feature.featureTag.interfaceIconCode} text-primaryPurple text-sm shadow-inner`}
                        ></i>
                        <div>
                          <p className="text-sm text-gray-600">
                            {feature.featureTag.name}
                          </p>
                        </div>
                      </div>
                    ))
                  : "No features available."}
              </ul>
            </div>

            {/* Bills */}
            <div className="px-6 my-8 bg-[#E9D7FE] py-4 rounded-lg">
              <h3 className="font-medium text-lg mb-4">Bills</h3>
              <ul className="flex gap-3 whitespace-nowrap flex-wrap">
                {reviewDetails?.billsTags?.length > 0
                  ? reviewDetails.billsTags.map((bill, index) => (
                      <div
                        key={index}
                        className="flex gap-2 items-center py-2 px-3 border border-gray-300 rounded-full bg-white"
                      >
                        <div>
                          <p className="text-sm text-gray-600">
                            {bill.billTag.name || "Bill Name"}
                          </p>
                        </div>
                      </div>
                    ))
                  : "No bills available."}
              </ul>
            </div>
            {/*LISTING FEATRUES*/}
            <div className="px-6 my-8 bg-[#E9D7FE] py-4 rounded-lg">
              {reviewDetails?.listingFeatures && (
                <div>
                  <h3 className="font-medium text-lg mb-4">Listing Features</h3>

                  <div className="flex flex-wrap gap-4">
                    {/* Electricity Payment Type */}
                    <div className="flex items-center gap-2 py-2 px-3 border border-gray-300 rounded-full bg-white">
                      <IconPower size={16} className="text-primaryPurple" />
                      <span className="text-sm text-gray-600 font-semibold">
                        Electricity Payment Type:{" "}
                        <span className="font-normal">
                          {
                            reviewDetails.listingFeatures
                              ?.electricityPaymentType
                          }
                        </span>
                      </span>
                    </div>

                    {/* Electricity Access Type */}
                    <div className="flex items-center gap-2 py-2 px-3 border border-gray-300 rounded-full bg-white">
                      <IconPower size={16} className="text-primaryPurple" />
                      <span className="text-sm text-gray-600 font-semibold">
                        Electricity Access Type:{" "}
                        <span className="font-normal">
                          {reviewDetails.listingFeatures?.electricityAccessType}
                        </span>
                      </span>
                    </div>

                    {/* Furnishing State */}
                    <div className="flex items-center gap-2 py-2 px-3 border border-gray-300 rounded-full bg-white">
                      <IconHome size={16} className="text-primaryPurple" />
                      <span className="text-sm text-gray-600 font-semibold">
                        Furnishing State:{" "}
                        <span className="font-normal">
                          {reviewDetails.listingFeatures?.furnishingState}
                        </span>
                      </span>
                    </div>

                    {reviewDetails.listingFeatures.inHouseRunningWater && (
                      <div className="flex items-center gap-2 py-2 px-3 border border-gray-300 rounded-full bg-white">
                        <IconBath size={16} className="text-primaryPurple" />
                        <span className="text-sm text-gray-600 font-semibold">
                          In house running water
                        </span>
                      </div>
                    )}

                    {/* Water from External Source */}
                    {reviewDetails.listingFeatures.waterFromExternalSource && (
                      <div className="flex items-center gap-2 py-2 px-3 border border-gray-300 rounded-full bg-white">
                        <IconBath size={16} className="text-primaryPurple" />
                        <span className="text-sm text-gray-600 font-semibold">
                          Water from external source
                        </span>
                      </div>
                    )}

                    {/* Outdoor Water Taps */}
                    {reviewDetails.listingFeatures.outDoorWaterTaps && (
                      <div className="flex items-center gap-2 py-2 px-3 border border-gray-300 rounded-full bg-white">
                        <IconPool size={16} className="text-primaryPurple" />
                        <span className="text-sm text-gray-600 font-semibold">
                          Outdoor water taps
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            {/*LANDMARKS*/}
            <p className="text-center font-semibold text-gray-700">LANDMARKS</p>
            <div className="px-6 mb-8 mt-4 bg-[#E9D7FE] py-4 rounded-lg">
              <h3 className="font-medium text-lg mb-4">
                Educational Institutions
              </h3>
              <ul className="flex gap-3 whitespace-nowrap flex-wrap">
                {reviewDetails?.location?.educationalInstitutions?.length >
                0 ? (
                  reviewDetails.location.educationalInstitutions.map(
                    (institution, index) => (
                      <div
                        key={index}
                        className="flex gap-2 items-center py-2 px-3 border border-gray-300 rounded-full bg-white"
                      >
                        <IconSchool size={16} className="text-primaryPurple" />
                        <div>
                          <p className="text-sm text-gray-600">
                            {institution || "Institution Name"}
                          </p>
                        </div>
                      </div>
                    ),
                  )
                ) : (
                  <p className="text-sm text-gray-600">
                    No educational institutions available.
                  </p>
                )}
              </ul>
            </div>

            {/* Healthcare Facilities */}
            <div className="px-6 my-8 bg-[#E9D7FE] py-4 rounded-lg">
              <h3 className="font-medium text-lg mb-4">
                Healthcare Facilities
              </h3>
              <ul className="flex gap-3 whitespace-nowrap flex-wrap">
                {reviewDetails?.location?.healthFacilities?.length > 0 ? (
                  reviewDetails.location.healthFacilities.map(
                    (facility, index) => (
                      <div
                        key={index}
                        className="flex gap-2 items-center py-2 px-3 border border-gray-300 rounded-full bg-white"
                      >
                        <IconAmbulance
                          size={16}
                          className="text-primaryPurple"
                        />
                        <div>
                          <p className="text-sm text-gray-600">
                            {facility || "Facility Name"}
                          </p>
                        </div>
                      </div>
                    ),
                  )
                ) : (
                  <p className="text-sm text-gray-600">
                    No healthcare facilities available.
                  </p>
                )}
              </ul>
            </div>

            {/* Transportation */}
            <div className="px-6 my-8 bg-[#E9D7FE] py-4 rounded-lg">
              <h3 className="font-medium text-lg mb-4">Transportation</h3>
              <ul className="flex gap-3 whitespace-nowrap flex-wrap">
                {reviewDetails?.location?.transportation?.length > 0 ? (
                  reviewDetails.location.transportation.map(
                    (transport, index) => (
                      <div
                        key={index}
                        className="flex gap-2 items-center py-2 px-3 border border-gray-300 rounded-full bg-white"
                      >
                        <IconBus size={16} className="text-primaryPurple" />
                        <div>
                          <p className="text-sm text-gray-600">
                            {transport || "Transport Option"}
                          </p>
                        </div>
                      </div>
                    ),
                  )
                ) : (
                  <p className="text-sm text-gray-600">
                    No transportation options available.
                  </p>
                )}
              </ul>
            </div>

            <div className="mt-10 px-6">
              {isLoaded ? (
                <MapReview locationData={reviewDetails?.location} />
              ) : (
                <p>Loading Map...</p>
              )}
            </div>
            {/*action buttons*/}
            <div className="flex justify-between my-8 gap-4 px-6">
              <Button
                className="font-poppins bg-secondaryPurple text-primaryPurple w-full font-medium"
                onClick={() => navigate(`/agent/addlisting/12`)}
              >
                Previous
              </Button>
              <Button
                className="font-poppins bg-primaryPurple text-white w-full flex justify-center items-center"
                onClick={publishListing}
                disabled={isUploading}
              >
                {isUploading ? <Spinner className="w-5 h-5" /> : "Proceed"}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
      {/* ... existing JSX ... */}
      <CompletedModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </>
  );
};

export default ReviewListing;
