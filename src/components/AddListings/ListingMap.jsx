import { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Button, Spinner } from "@material-tailwind/react";
import {useNavigate} from "react-router-dom";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 6.5244, // Default to Lagos, Nigeria
  lng: 3.3792,
};

const ListingLocation = ({ listingId }) => {
  const [locationData, setLocationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBJYIthIF1IdQuGVe5bqpDGec2z6aKJ7lc",
  });

  useEffect(() => {
    const fetchLocationData = async () => {
      const storedDetails = JSON.parse(localStorage.getItem("basicDetails"));
      const token = localStorage.getItem("accessToken");
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${apiUrl}/api/v1/agents/listings/${storedDetails.listingId}/location?listingId=${storedDetails.listingId}`,
            {
              method: "GET",
              headers: { Authorization: `Bearer ${token}` },
            },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch location data");
        }

        const data = await response.json();

        if (!data.payload || data.payload.length === 0) {
          throw new Error("No location data available");
        }

        const location = data.payload[0];

        if (!location.city || !location.state || !location.country) {
          throw new Error("Incomplete location data");
        }

        const geocodedLocation = await geocodeAddress(
          `${location.streetAddress}, ${location.city.name}, ${location.state.name}, ${location.country.name}`,
        );

        setLocationData({
          ...location,
          lat: geocodedLocation.lat,
          lng: geocodedLocation.lng,
        });
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocationData();
  }, [listingId]);

  const geocodeAddress = async (address) => {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address,
    )}&key=AIzaSyBJYIthIF1IdQuGVe5bqpDGec2z6aKJ7lc`; // Replace with your actual API key

    const response = await fetch(geocodeUrl);
    const data = await response.json();

    if (data.status === "OK" && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location;
      return { lat, lng };
    } else {
      throw new Error("Failed to geocode address");
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

          {isLoading && (
            <div className="flex justify-center items-center mt-4">
              <Spinner className="h-8 w-8" color="purple" />
            </div>
          )}

          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

          {isLoaded && locationData && (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={{ lat: locationData.lat, lng: locationData.lng }}
              zoom={15}
            >
              <Marker
                position={{ lat: locationData.lat, lng: locationData.lng }}
                title={locationData.streetAddress}
              />
            </GoogleMap>
          )}

          {!isLoaded && !isLoading && (
            <p className="text-gray-500 mt-4 text-center">
              Loading Google Map...
            </p>
          )}
        </div>
        <div className="flex justify-between my-8 gap-4 px-6">
          <Button
            className="font-poppins bg-secondaryPurple text-primaryPurple w-full font-medium"
            onClick={() => navigate(`/agent/addlisting/10`)}
          >
            Previous
          </Button>
          <Button
            className="font-poppins bg-primaryPurple text-white w-full"
            onClick={() => navigate(`/agent/addlisting/12`)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ListingLocation;
