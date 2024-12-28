import { useEffect, useState } from "react";
import Loader from "../Loaders/Loader.jsx";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { Button, Spinner } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const ReviewListing = () => {
  const navigate = useNavigate();
  const [reviewDetails, setReviewDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false)
  // const mapKey = import.meta.env.VITE_APP_MAP_KEY;
  const apiUrl = import.meta.env.VITE_API_URL;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBJYIthIF1IdQuGVe5bqpDGec2z6aKJ7lc",
  });

  const getData = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("accessToken");
    const storedDetails = JSON.parse(localStorage.getItem("basicDetails"));
    try {
      const response = await fetch(
        `${apiUrl}/api/v1/agents/listings/${storedDetails.listingId}/review?listingId=${storedDetails.listingId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.ok) {
        const result = await response.json();
        setReviewDetails(result.payload);
        console.log(reviewDetails);
      } else {
        console.error("Failed to fetch listings");
      }
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const publishListing = async () => {
    setIsUploading(true);
    const token = localStorage.getItem("accessToken");
    const storedDetails = JSON.parse(localStorage.getItem("basicDetails"));
    try {
      const response = await fetch(
        `${apiUrl}/api/v1/agents/listings/${storedDetails.listingId}/publish?listingId=${storedDetails.listingId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.ok) {
        const result = await response.json();
        console.log(result)
      } else {
        console.error("Failed to publish listing");
      }
    } catch (error) {
      console.error("Error publishing listing:", error);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: reviewDetails?.location?.coordinates?.lat || 6.5244, // Default to Lagos coordinates
    lng: reviewDetails?.location?.coordinates?.lng || 3.3792,
  };
  return (
    <>
      {!isLoading ? (
        <div>
          <div className="px-6 flex items-center justify-center">
            <div className="flex flex-col h-[350px] rounded-lg shadow-lg w-[280px] min-w-full">
              {/* Image Section */}
              <div className="h-[60%] rounded-t-[15px] rounded-b-[20px] overflow-hidden relative">
                <div className="flex items-center justify-between absolute top-2 left-3 w-full z-[100]">
                  <div className="bg-[#F4EBFF] p-2 rounded-xl">
                    <p className="text-[12px] font-[600] text-[#1D2939]">
                      {reviewDetails?.apartmentType?.name || "Apartment Type"}
                    </p>
                  </div>
                  <div className="flex gap-1 mr-5">
                    <div className="h-8 w-8 bg-[#F4EBFF] rounded-full flex items-center justify-center">
                      <i className="fi fi-rr-heart text-[12px]"></i>
                    </div>
                    <div className="h-8 w-8 bg-[#F4EBFF] rounded-full flex items-center justify-center">
                      <i className="fi fi-rr-share text-[12px]"></i>
                    </div>
                  </div>
                </div>
                <div className="bg-[#F4EBFF] px-2 py-1 rounded-full mx-auto absolute z-[100] bottom-2 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div>
                    <p className="text-[12px] text-primaryPurple whitespace-nowrap"> Created at{" "}
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
                    reviewDetails?.pictures?.[0]?.photoLink ||
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
          </div>

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
            <div className="px-6 my-8 bg-[#E9D7FE] py-4">
              <h3 className="font-medium text-lg mb-2">Features</h3>
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
            <div className="px-6 my-8 bg-[#E9D7FE] py-4">
              <h3 className="font-medium text-lg mb-2">Bills</h3>
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
            <div className="mt-10 px-6">
              <h3 className="font-medium text-lg mb-4">Map</h3>
              {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={center}
                  zoom={15}
                >
                  <Marker position={center} />
                </GoogleMap>
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
    </>
  );
};

export default ReviewListing;
