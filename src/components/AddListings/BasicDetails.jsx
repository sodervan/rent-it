import { Button, Input, Option, Select } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { IoMdAdd, IoIosRemove } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const BasicDetails = () => {
  const navigate = useNavigate();
  const [appTypes, setAppTypes] = useState([]);
  const [selectedAppType, setSelectedAppType] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [units, setUnits] = useState(1);
  const [description, setDescription] = useState("");

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleUnitsChange = (e) => {
    setUnits(Number(e.target.value));
  };

  const handleUnitsAdd = () => {
    setUnits((prevUnits) => prevUnits + 1);
  };

  const handleUnitsSubtract = () => {
    setUnits((prevUnits) => Math.max(1, prevUnits - 1));
  };

  const getApartmentTypes = async (token) => {
    try {
      const response = await fetch(
        "https://rent-it-api.onrender.com/api/v1/agents/listings-attributes/apartmentTypes",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.ok) {
        const result = await response.json();
        setAppTypes(result.payload?.data || []);
      } else {
        console.log("Failed to fetch apartment types");
      }
    } catch (error) {
      console.log("Error fetching apartment types:", error);
    }
  };

  const getStates = async (token) => {
    try {
      const response = await fetch(
        "https://rent-it-api.onrender.com/api/v1/agents/listings-attributes/location/states?country_id=1",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.ok) {
        const result = await response.json();
        setStates(result.payload || []);
      } else {
        console.log("Failed to fetch states");
      }
    } catch (error) {
      console.log("Error fetching states:", error);
    }
  };

  const getCities = async (token, stateId) => {
    try {
      const response = await fetch(
        `https://rent-it-api.onrender.com/api/v1/agents/listings-attributes/location/cities?state_id=${stateId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.ok) {
        const result = await response.json();
        setCities(result.payload || []);
      } else {
        console.log("Failed to fetch cities");
      }
    } catch (error) {
      console.log("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setAccessToken(token);
    if (token) {
      getApartmentTypes(token);
      getStates(token);
    }
  }, []);

  const handleStateChange = (stateId) => {
    setSelectedState(stateId);
    getCities(accessToken, stateId);
  };

  return (
    <div className="mt-22">
      <div>
        <div className="flex items-center justify-between border-b border-gray-200 pb-4 px-6">
          <p className="text-xl font-medium">Add New Listing</p>
          <Button className="bg-secondaryPurple text-primaryPurple font-poppins font-medium shadow-none hover:shadow-none hover:bg-primaryPurple hover:text-white duration-300 transition-all">
            Save
          </Button>
        </div>
        <div className="px-6">
          <div>
            <p className="text-gray-500 mt-2 font-medium">Step 1 of 15</p>
            <p className="mt-2 text-lg">Basic Details</p>
          </div>
          <div className="mt-6">
            <p className="mb-2 text-gray-700">Listing Title</p>
            <Input
              label="Add a descriptive listing title"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
          <div className="my-2">
            <p className="text-gray-600 font-medium mb-2">
              Make it descriptive, for example:
            </p>
            <p className="text-gray-500">
              Spacious 3-Bedroom Apartment in Lekki with Modern Finishes, Single
              Rooms near UNILAG, Akoka
            </p>
          </div>
          <div className="my-5">
            <p className="mb-1 text-gray-700">Apartment Type</p>
            <div className="relative w-full">
              <Select
                value={selectedAppType}
                onChange={(e) => setSelectedAppType(e)}
              >
                {appTypes.length > 0 ? (
                  appTypes.map((type) => (
                    <Option key={type.id} value={String(type.id)}>
                      {type.name}
                    </Option>
                  ))
                ) : (
                  <Option disabled>No apartment types available</Option>
                )}
              </Select>
            </div>
          </div>
          <div>
            <p className="text-gray-700 mb-2">Units Available</p>
            <div className="relative flex w-full items-center gap-2">
              <Input
                label="Units"
                value={String(units)}
                onChange={handleUnitsChange}
                className="pr-20"
                containerProps={{
                  className: "min-w-0",
                }}
              />
              <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex gap-2">
                <Button
                  size="sm"
                  className="rounded bg-secondaryPurple text-primaryPurple shadow-none"
                  onClick={handleUnitsAdd}
                >
                  <IoMdAdd />
                </Button>
                <Button
                  size="sm"
                  className="rounded bg-secondaryPurple text-primaryPurple shadow-none"
                  onClick={handleUnitsSubtract}
                >
                  <IoIosRemove />
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <p className="mb-2 text-gray-700">Address</p>
            <Input label="e.g., 10 Adewale Street" />
            <div className="relative w-full mt-4">
              <p className="mb-2 text-gray-700">State</p>
              <Select
                value={selectedState}
                onChange={(e) => handleStateChange(e)}
              >
                {states.length > 0 ? (
                  states.map((state) => (
                    <Option key={state.id} value={String(state.id)}>
                      {state.name}
                    </Option>
                  ))
                ) : (
                  <Option disabled>No states available</Option>
                )}
              </Select>
            </div>
            <div className="relative w-full mt-4">
              <p className="my-2 text-gray-700">City</p>
              <Select value={selectedCity} onChange={(e) => setSelectedCity(e)}>
                {cities.length > 0 ? (
                  cities.map((city) => (
                    <Option key={city.id} value={String(city.id)}>
                      {city.name}
                    </Option>
                  ))
                ) : (
                  <Option disabled>No cities available</Option>
                )}
              </Select>
            </div>
            <div className="my-8">
              <Button
                className="bg-primaryPurple text-white w-full text-[15px] font-poppins"
                onClick={() => {
                  navigate("/agent/addlisting/2");
                }}
              >
                Proceed
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;
