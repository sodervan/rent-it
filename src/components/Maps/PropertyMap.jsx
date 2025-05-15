import { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
  Circle,
} from "@react-google-maps/api";
import {
  FaSchool,
  FaHospital,
  FaBuilding,
  FaShoppingCart,
  FaBus,
  FaUtensils,
  FaCoffee,
} from "react-icons/fa";

// Custom marker icons for landmarks with their colors
const landmarkIcons = {
transportation: { icon: <FaBus className="text-blue-600" size={20} />, color: "#3b82f6" },
hospital: { icon: <FaHospital className="text-red-600" size={20} />, color: "#ef4444" },
school: { icon: <FaSchool className="text-green-600" size={20} />, color: "#22c55e" },
restaurant: { icon: <FaUtensils className="text-orange-500" size={20} />, color: "#f97316" },
cafe: { icon: <FaCoffee className="text-yellow-800" size={20} />, color: "#92400e" },
store: { icon: <FaShoppingCart className="text-indigo-600" size={20} />, color: "#4f46e5" },
building: { icon: <FaBuilding className="text-gray-600" size={20} />, color: "#4b5563" },
};

// Map container style
const containerStyle = {
  width: "100%",
  height: "350px",
  borderRadius: "12px",
};

// Default center (Nigeria)
const defaultCenter = {
  lat: 9.0820,
  lng: 8.6753,
};

const PropertyMap = ({
  latitude,
  longitude,
  address,
  landmarks = [],
  showCircle = true,
}) => {
  // Initialize Google Maps API
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [center, setCenter] = useState(
    latitude && longitude
      ? { lat: parseFloat(latitude), lng: parseFloat(longitude) }
      : defaultCenter
  );

  // Create object of nearby landmark types for rendering icon and color
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [mapError, setMapError] = useState(null);

  // Fetch nearby places using Google Places API
  const fetchNearbyPlaces = useCallback(async () => {
    if (!isLoaded || !map) return;

    // Default to center of Nigeria if coordinates aren't provided
    if (!latitude || !longitude) {
      console.warn("No coordinates provided for the property map");
      return;
    }

    try {
      // If landmarks are provided as props, use those
      if (landmarks && landmarks.length > 0) {
        // Create a spread of positions for landmarks that don't have coordinates
        const generatePosition = (index) => {
          // Place landmarks in a spiral around the property for better visibility
          const angle = (index / landmarks.length) * 4 * Math.PI;
          const radius = 0.002 + (index / landmarks.length * 0.003); // Increasing radius as we go
          return {
            lat: center.lat + radius * Math.cos(angle),
            lng: center.lng + radius * Math.sin(angle)
          };
        };
        
        // Map the landmarks to the format we need
        const formattedLandmarks = landmarks.map((landmark, index) => {
          const position = generatePosition(index);
          return {
            id: `custom-${index}`,
            name: landmark.name || "Unnamed Place",
            type: landmark.type || "building",
            location: {
              lat: landmark.lat || position.lat,
              lng: landmark.lng || position.lng,
            },
            vicinity: landmark.vicinity || landmark.address || address,
          };
        });
        setNearbyPlaces(formattedLandmarks);
        return;
      }

      // Otherwise fetch from Google Places API
      // Define place types to search for
      const placeTypes = [
        "hospital",
        "school",
        "transit_station",
        "shopping_mall",
        "restaurant",
      ];
      
      const allPlaces = [];
      
      // Make a request for each place type
      for (const type of placeTypes) {
        const request = {
          location: new window.google.maps.LatLng(center.lat, center.lng),
          radius: 1500, // 1.5km radius
          type: type,
        };

        const service = new window.google.maps.places.PlacesService(map);
        
        // Wrap the service.nearbySearch in a Promise
        const searchResult = await new Promise((resolve) => {
          service.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              resolve(results.slice(0, 5)); // Limit to 5 results per type
            } else {
              resolve([]);
            }
          });
        });
      
        // Add the places to our collection with proper type mapping for icons
        allPlaces.push(...searchResult.map(place => ({
          ...place,
          // Map Google Places types to our icon types
          type: type === "transit_station" || type === "bus_station" ? "transportation" : 
                type === "shopping_mall" ? "building" : type
        })));
      }
      
      setNearbyPlaces(allPlaces);
    } catch (error) {
      console.error("Error fetching nearby places:", error);
      setMapError("Could not load nearby places. Please try again later.");
    }
  }, [latitude, longitude, isLoaded, map, center, landmarks, address]);

  // Initialize map
  const onMapLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  // Clear selected marker when map is clicked
  const onMapClick = useCallback(() => {
    setSelectedMarker(null);
  }, []);

  // Update center when coordinates change
  useEffect(() => {
    if (latitude && longitude) {
      try {
        const lat = parseFloat(latitude);
        const lng = parseFloat(longitude);
        
        // Validate coordinates are within reasonable bounds
        if (isNaN(lat) || isNaN(lng) || 
            lat < -90 || lat > 90 || 
            lng < -180 || lng > 180) {
          console.error("Invalid coordinates:", latitude, longitude);
          setMapError("Invalid location coordinates");
          return;
        }
        
        setCenter({ lat, lng });
      } catch (error) {
        console.error("Error parsing coordinates:", error);
        setMapError("Could not read location coordinates");
      }
    }
  }, [latitude, longitude]);

  // Fetch nearby places when map is loaded
  useEffect(() => {
    if (isLoaded && map) {
      fetchNearbyPlaces();
    }
  }, [isLoaded, map, fetchNearbyPlaces]);

  // Handle loading and error states
  if (loadError) {
    return (
      <div className="bg-gray-100 rounded-lg p-4 text-center h-[350px] flex items-center justify-center">
        <p className="text-red-500">
          Error loading maps. Please check your internet connection.
        </p>
      </div>
    );
  }

  if (mapError) {
    return (
      <div className="bg-gray-100 rounded-lg p-4 text-center h-[350px] flex items-center justify-center">
        <p className="text-red-500">{mapError}</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="bg-gray-100 rounded-lg p-4 text-center h-[350px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="relative">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onLoad={onMapLoad}
        onClick={onMapClick}
        options={{
          fullscreenControl: true,
          streetViewControl: false,
          mapTypeControl: true,
          zoomControl: true,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        }}
      >
        {/* Property marker */}
        <Marker
          position={center}
          icon={{
            url: "/marker-home.svg", // Path to custom marker icon
            scaledSize: new window.google.maps.Size(40, 40),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(20, 20),
            // Fallback if SVG fails to load
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: "#673ab7",
            fillOpacity: 0.9,
            strokeWeight: 1,
            strokeColor: "#ffffff",
            scale: 10,
          }}
          animation={window.google.maps.Animation.DROP}
          onClick={() => {
            setSelectedMarker({
              id: "property",
              position: center,
              name: "Your Property",
              vicinity: address,
            });
          }}
          zIndex={1000}
        />

        {/* Circle around property to show area */}
        {showCircle && (
          <Circle
            center={center}
            radius={1000}
            options={{
              fillColor: "rgba(103, 58, 183, 0.1)",
              fillOpacity: 0.35,
              strokeColor: "rgba(103, 58, 183, 0.8)",
              strokeOpacity: 0.8,
              strokeWeight: 1,
            }}
          />
        )}

        {/* Nearby places markers */}
        {nearbyPlaces.map((place) => {
          const placePosition = {
            lat: place.location ? place.location.lat : place.geometry?.location.lat(),
            lng: place.location ? place.location.lng : place.geometry?.location.lng(),
          };

          return (
            <Marker
              key={place.id || place.place_id}
              position={placePosition}
              icon={{
                url: `/markers/${place.type}.svg`, // SVG marker based on type
                scaledSize: new window.google.maps.Size(30, 30),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                // Fallback if SVG fails to load
                path: window.google.maps.SymbolPath.CIRCLE,
                fillColor: landmarkIcons[place.type]?.color || "#6b7280",
                fillOpacity: 0.9,
                strokeWeight: 1,
                strokeColor: "#ffffff",
                scale: 8,
              }}
              onClick={() => {
                setSelectedMarker({
                  id: place.id || place.place_id,
                  position: placePosition,
                  name: place.name,
                  vicinity: place.vicinity,
                  type: place.type,
                });
              }}
            />
          );
        })}

        {/* Info window for selected marker */}
        {selectedMarker && (
          <InfoWindow
            position={selectedMarker.position}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div className="p-1 max-w-[200px]">
              <div className="flex items-center gap-2 mb-1">
                {selectedMarker.type && landmarkIcons[selectedMarker.type] ? (
                  landmarkIcons[selectedMarker.type].icon
                ) : (
                  <FaBuilding className="text-purple-600" size={16} />
                )}
                <h3 className="font-medium text-gray-900">{selectedMarker.name}</h3>
              </div>
              {selectedMarker.vicinity && (
                <p className="text-gray-600 text-sm">{selectedMarker.vicinity}</p>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {/* Legend */}
      <div className="absolute bottom-2 left-2 bg-white bg-opacity-90 px-3 py-2 rounded-lg text-xs shadow-md max-w-[calc(100%-20px)] flex flex-wrap gap-2 items-center">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-purple-600"></div>
          <span>Property</span>
        </div>
        {nearbyPlaces.some(place => place.type === 'hospital') && (
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-600"></div>
            <span>Hospital</span>
          </div>
        )}
        {nearbyPlaces.some(place => place.type === 'school') && (
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-600"></div>
            <span>School</span>
          </div>
        )}
        {nearbyPlaces.some(place => place.type === 'transportation') && (
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <span>Transport</span>
          </div>
        )}
        {nearbyPlaces.some(place => !['hospital', 'school', 'transportation'].includes(place.type)) && (
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-gray-600"></div>
            <span>Other</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyMap;