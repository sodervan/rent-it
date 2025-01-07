import { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Button, Spinner, Input } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from 'axios';

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 6.4698,
  lng: 3.5852,
};

const ListingLocation = () => {
  const [locationData, setLocationData] = useState(null);
  const [landmarks, setLandmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [formData, setFormData] = useState({
    postalCode: "",
    transportation: [],
    healthFacilities: [],
    educationalInstitutions: [],
  });
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const onMapLoad = (map) => {
    setMapInstance(map);
  };

  useEffect(() => {
    const fetchLocationData = async () => {
      const storedDetails = JSON.parse(localStorage.getItem("basicDetails"));
      const token = localStorage.getItem("accessToken");

      if (!storedDetails?.listingId || !token) {
        setError("Missing listing details or authentication");
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${apiUrl}/api/v1/agents/listings/${storedDetails.listingId}/location`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch location data: ${response.statusText}`,
          );
        }

        const data = await response.json();
        console.log(data);

        if (
          !data.payload ||
          !Array.isArray(data.payload) ||
          data.payload.length === 0
        ) {
          throw new Error("Invalid location data format");
        }

        const location = data.payload[0];

        if (
          !location.city?.name ||
          !location.state?.name ||
          !location.country?.name
        ) {
          throw new Error("Incomplete location data");
        }

        const streetAddress = location.streetAddress || "";
        const address = `${streetAddress}, ${location.city.name}, ${location.state.name}, ${location.country.name}`;

        const geocodedLocation = await geocodeAddress(address);

        setLocationData({
          ...location,
          lat: geocodedLocation.lat,
          lng: geocodedLocation.lng,
          formattedAddress: address,
        });

        // Set initial form data if available
        if (
          location.postalCode ||
          location.transportation ||
          location.healthFacilities ||
          location.educationalInstitutions
        ) {
          setFormData({
            postalCode: location.postalCode || "",
            transportation: location.transportation || [],
            healthFacilities: location.healthFacilities || [],
            educationalInstitutions: location.educationalInstitutions || [],
          });
        }

        if (geocodedLocation.lat && geocodedLocation.lng) {
          await fetchLandmarks(geocodedLocation.lat, geocodedLocation.lng);
        }
      } catch (err) {
        console.error("Error fetching location data:", err);
        setError(err.message || "Failed to fetch location data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocationData();
  }, [apiUrl]);

  const geocodeAddress = async (address) => {
    try {
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address,
      )}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;

      const response = await fetch(geocodeUrl);
      const data = await response.json();

      if (data.status === "OK" && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        return { lat, lng };
      } else {
        throw new Error(`Geocoding failed: ${data.status}`);
      }
    } catch (err) {
      console.error("Geocoding error:", err);
      throw new Error("Failed to geocode address");
    }
  };

  const fetchLandmarks = async (lat, lng) => {
    try {
      const radius = 1000;
      const type = "hospital";
      const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;

      const response = await fetch(placesUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch landmarks");
      }

      const data = await response.json();

      if (data.status === "OK") {
        const relevantLandmarks = data.results
          .filter((place) => place.rating >= 1.0)
          .slice(0, 10);

        setLandmarks(relevantLandmarks);
      } else if (data.status === "OVER_QUERY_LIMIT") {
        console.warn("Quota exceeded: Try again later.");
      } else {
        throw new Error(`Places API error: ${data.status}`);
      }
    } catch (err) {
      console.error("Error fetching landmarks:", err);
      setError("Failed to fetch nearby landmarks. Please try again.");
    }
  };

  const handleAddLandmark = (type, value) => {
    if (value.trim()) {
      setFormData((prev) => ({
        ...prev,
        [type]: [...prev[type], value.trim()],
      }));
    }
  };

  const handleRemoveLandmark = (type, index) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const LandmarkInput = ({ type, label, placeholder }) => {
    const [inputValue, setInputValue] = useState("");

    return (
      <div className="mb-4">
        <div className="flex gap-2 mb-2">
          <Input
            type="text"
            label={label}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1"
          />
          <Button
            size="sm"
            className="bg-primaryPurple"
            onClick={() => {
              handleAddLandmark(type, inputValue);
              setInputValue("");
            }}
          >
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData[type].map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2"
            >
              <span className="text-sm">{item}</span>
              <button
                onClick={() => handleRemoveLandmark(type, index)}
                className="text-gray-500 hover:text-red-500"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    const token = localStorage.getItem("accessToken");
    const storedDetails = JSON.parse(localStorage.getItem("basicDetails"));
    console.log(token, "token token", storedDetails.listingId);
    console.log(formData.transportation);

    try {
      const response = await axios.put(
          `${apiUrl}/api/v1/agents/listings/${storedDetails.listingId}/location`,
          {
            streetAddress: locationData.streetAddress || "",
            localGovernmentAreaId: locationData.localGovernmentArea?.id,
            stateId: locationData.state?.id,
            cityId: locationData.city?.id,
            countryId: locationData.country?.id,
            coordinates: {
              x: locationData.lng,
              y: locationData.lat,
            },
            postalCode: formData.postalCode,
            transportation: formData.transportation,
            healthFacilities: formData.healthFacilities,
            educationalInstitutions: formData.educationalInstitutions,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
      );

      // Success logging
      console.log("Success Response:", response.data);
      console.log("Status Code:", response.status);
      console.log("Status Text:", response.statusText);
      console.log("Full Response:", response);

      toast.success("Success");
      setTimeout(() => {
        navigate("/agent/addlisting/12");
      }, 500);
    } catch (err) {
      // Error logging
      console.log("Error Response:", err.response?.data);
      console.log("Error Status:", err.response?.status);
      console.log("Error Message:", err.message);
      console.log("Full Error:", err);

      // Show the specific validation error message from the API
      const errorMessage = err.response?.data?.message || "An error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mt-6">
      <div>
        <div className="flex items-center justify-between border-b border-gray-200 pb-4 px-6">
          <p className="text-xl font-medium">Listing Location</p>
        </div>
        <div className="px-6">
          <p className="mt-2 text-lg">Location on Map</p>
          <p className="text-sm text-gray-500 my-2">
            View the location of this listing to help with navigation and find
            nearby landmarks.
          </p>

          {locationData && !isLoading && (
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Address:</span>{" "}
                {locationData.formattedAddress}
              </p>
            </div>
          )}

          {isLoading && (
            <div className="flex justify-center items-center mt-4">
              <Spinner className="h-8 w-8" color="purple" />
            </div>
          )}

          {error && (
            <div className="text-red-500 mt-4 p-4 bg-red-50 rounded-lg">
              <p className="text-center">{error}</p>
            </div>
          )}

          {loadError && (
            <div className="text-red-500 mt-4 text-center">
              Error loading Google Maps
            </div>
          )}

          {isLoaded && locationData && (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={{ lat: locationData.lat, lng: locationData.lng }}
              zoom={15}
              onLoad={onMapLoad}
              options={{
                mapTypeControl: true,
                streetViewControl: true,
                fullscreenControl: true,
              }}
            >
              <Marker
                position={{ lat: locationData.lat, lng: locationData.lng }}
                title={locationData.streetAddress || "Listing Location"}
                animation={window.google.maps.Animation.DROP}
              />

              {landmarks.map((landmark, index) => (
                <Marker
                  key={landmark.place_id || index}
                  position={{
                    lat: landmark.geometry.location.lat,
                    lng: landmark.geometry.location.lng,
                  }}
                  title={landmark.name}
                  icon={{
                    url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                  }}
                />
              ))}
            </GoogleMap>
          )}

          {!isLoaded && !isLoading && (
            <p className="text-gray-500 mt-4 text-center">
              Loading Google Map...
            </p>
          )}
          {/* Landmark Forms */}
          <p className="text-center mt-7 font-medium text-gray-700">Please Fill in Nearby LandMarks</p>
          <div className="mt-2 bg-white rounded-lg shadow-sm p-4">
            <div className="mb-4">
              <Input
                type="text"
                label="Postal Code"
                value={formData.postalCode}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    postalCode: e.target.value,
                  }))
                }
              />
            </div>

            <LandmarkInput
              type="transportation"
              label="Transportation Facilities"
              placeholder="Add transportation facility"
            />

            <LandmarkInput
              type="healthFacilities"
              label="Health Facilities"
              placeholder="Add health facility"
            />

            <LandmarkInput
              type="educationalInstitutions"
              label="Educational Institutions"
              placeholder="Add educational institution"
            />
          </div>

          {/* Display existing landmarks */}
          {landmarks.length > 0 && (
            <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
              <p className="text-lg font-medium mb-3">Nearby Landmarks</p>
              <div className="grid gap-3">
                {landmarks.map((landmark, index) => (
                  <div
                    key={landmark.place_id || index}
                    className="border-b border-gray-100 last:border-0 pb-2"
                  >
                    <p className="font-medium text-sm">{landmark.name}</p>
                    <div className="flex gap-4 text-xs text-gray-600 mt-1">
                      {landmark.rating && (
                        <span>Rating: {landmark.rating} ⭐</span>
                      )}
                      {landmark.vicinity && <span>{landmark.vicinity}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between my-8 gap-4 px-6">
          <Button
            className="font-poppins bg-secondaryPurple text-primaryPurple w-full font-medium"
            onClick={() => navigate("/agent/addlisting/10")}
          >
            Previous
          </Button>
          <Button
            className="font-poppins bg-primaryPurple text-white w-full"
            onClick={handleSubmit}
            disabled={isSaving}
          >
            {isSaving ? <Spinner className="h-4 w-4" /> : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ListingLocation;
