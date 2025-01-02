import { useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

// Default coordinates for Lagos
const defaultCenter = {
  lat: 6.5244,
  lng: 3.3792,
};

const MapReview = ({ locationData }) => {
  const [coordinates, setCoordinates] = useState(null);
  const [isLoadingCoordinates, setIsLoadingCoordinates] = useState(true);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBJYIthIF1IdQuGVe5bqpDGec2z6aKJ7lc",
  });

  useEffect(() => {
    const geocodeAddress = async () => {
      if (!locationData?.streetAddress) {
        setIsLoadingCoordinates(false);
        return;
      }

      try {
        const fullAddress = `${locationData.streetAddress}, ${locationData.state?.name || "Lagos"}, ${locationData.country?.name || "Nigeria"}`;

        const geocoder = new window.google.maps.Geocoder();

        geocoder.geocode({ address: fullAddress }, (results, status) => {
          if (status === "OK") {
            const { lat, lng } = results[0].geometry.location;
            setCoordinates({
              lat: lat(),
              lng: lng(),
            });
          }
          setIsLoadingCoordinates(false);
        });
      } catch (error) {
        console.error("Geocoding error:", error);
        setIsLoadingCoordinates(false);
      }
    };

    if (isLoaded && locationData) {
      geocodeAddress();
    }
  }, [isLoaded, locationData]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
      </div>
    );
  }

  return (
    <div>
      <div className="mt-10">
        <h3 className="font-medium text-lg mb-4">Map</h3>
        <div className="mb-4 space-y-2">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Address:</span>{" "}
            {locationData?.streetAddress}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Area:</span>{" "}
            {locationData?.localGovernmentArea?.name}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">State:</span>{" "}
            {locationData?.state?.name}
          </p>
        </div>

        {isLoadingCoordinates ? (
          <div className="flex justify-center items-center h-[400px] bg-gray-50 rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
          </div>
        ) : (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={coordinates || defaultCenter}
            zoom={15}
            options={{
              mapTypeControl: true,
              streetViewControl: true,
              fullscreenControl: true,
              zoomControl: true,
            }}
          >
            {coordinates && (
              <Marker
                position={coordinates}
                animation={window.google.maps.Animation.DROP}
              />
            )}
          </GoogleMap>
        )}
      </div>
    </div>
  );
};

export default MapReview;
