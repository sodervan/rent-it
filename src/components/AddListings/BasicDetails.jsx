import {
  Button,
  Input,
  Option,
  Select,
  Spinner,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { IconPlus, IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const BasicDetails = () => {
  const navigate = useNavigate();
  const [appTypes, setAppTypes] = useState([]);
  const [selectedAppType, setSelectedAppType] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [units, setUnits] = useState(1);
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [lgas, setLgas] = useState([]);
  const [currentLgas, setCurrentLgas] = useState("");
  const [loading, isLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAddressChange = (e) => {
    e.preventDefault();
    setAddress(e.target.value);
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

  const getApartmentTypes = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/v1/agents/listings-attributes/apartmentTypes`,
        { withCredentials: true },
      );
      setAppTypes(response.data.payload?.data || []);
    } catch (error) {
      console.error("Error fetching apartment types:", error);
      toast.error("Failed to fetch apartment types");
    }
  };

  const getStates = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/v1/agents/listings-attributes/location/states?country_id=1`,
        { withCredentials: true },
      );
      setStates(response.data.payload || []);
    } catch (error) {
      console.error("Error fetching states:", error);
      toast.error("Failed to fetch states");
    }
  };

  const postBasicDetails = async () => {
    isLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/agents/listings/basic-details`,
        {
          title: description,
          apartmentTypeId: parseInt(selectedAppType),
          streetAddress: address,
          cityId: selectedCity,
          localGovernmentAreaId: parseInt(currentLgas),
          stateId: parseInt(selectedState),
          units: units,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        },
      );

      toast.success("Success");
      if (response.data) {
        localStorage.setItem(
          "basicDetails",
          JSON.stringify(response.data.payload),
        );
      }
      setTimeout(() => {
        navigate("/agent/addlisting/2");
      }, 500);
    } catch (error) {
      console.error("Error updating listing:", error);
      toast.error(error.response?.data?.message || "Error updating listing");
    } finally {
      isLoading(false);
    }
  };

  const getCities = async (stateId) => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/v1/agents/listings-attributes/location/cities?state_id=${stateId}`,
        { withCredentials: true },
      );
      setCities(response.data.payload || []);
    } catch (error) {
      console.error("Error fetching cities:", error);
      toast.error("Failed to fetch cities");
    }
  };

  const getLgas = async (stateId) => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/v1/agents/listings-attributes/location/lgas?state_id=${stateId}`,
        { withCredentials: true },
      );
      setLgas(response.data.payload || []);
    } catch (error) {
      console.error("Error fetching LGAs:", error);
      toast.error("Failed to fetch LGAs");
    }
  };

  useEffect(() => {
    getApartmentTypes();
    getStates();
  }, []);

  const handleStateChange = (stateId) => {
    setSelectedState(stateId);
    getCities(stateId);
    getLgas(stateId);
  };

  return (
    <div className="mt-22">
      <div>
        <div className="flex items-center justify-between border-b border-gray-200 pb-4 px-6">
          <p className="text-xl font-medium">Add New Listing</p>
        </div>
        <div className="px-6">
          <div>
            <p className="text-gray-500 mt-2 font-medium">Step 1 of 13</p>
            <p className="mt-2 text-lg">Basic Details</p>
          </div>
          {/*LISTING TITLE*/}
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

          {/*SET APARTMENT TYPE*/}
          <div className="my-5">
            <p className="mb-1 text-gray-700">Apartment Type</p>
            <div className="relative w-full">
              <Select
                onChange={(e) => setSelectedAppType(e)}
                label="Select Type"
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

          {/*SET UNITS*/}
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
                  <IconPlus size={15} />
                </Button>
                <Button
                  size="sm"
                  className="rounded bg-secondaryPurple text-primaryPurple shadow-none"
                  onClick={handleUnitsSubtract}
                >
                  <IconX size={15} />
                </Button>
              </div>
            </div>
          </div>

          {/*ADDRESS*/}
          <div className="mt-5">
            <p className="mb-2 text-gray-700">Address</p>
            <Input
              label="e.g., 10 Adewale Street"
              onChange={handleAddressChange}
            />

            {/*SELECT STATE*/}
            <div className="relative w-full mt-4">
              <p className="mb-2 text-gray-700">State</p>
              <Select
                label="Select State"
                onChange={(e) => handleStateChange(parseInt(e))}
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

            {/*SELECT LGAS*/}
            <div className="relative w-full mt-4">
              <p className="mb-2 text-gray-700">LGA</p>
              <Select label="Select LGA" onChange={(e) => setCurrentLgas(e)}>
                {lgas.length > 0 ? (
                  lgas.map((lga) => (
                    <Option key={lga.id} value={String(lga.id)}>
                      {lga.name}
                    </Option>
                  ))
                ) : (
                  <Option disabled>No LGAs available</Option>
                )}
              </Select>
            </div>

            {/*SELECT CITY*/}
            <div className="relative w-full mt-4">
              <p className="my-2 text-gray-700">City</p>
              <Select onChange={(e) => setSelectedCity(e)} label="Select City">
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
                className={`${
                  loading
                    ? "bg-gray-200 px-4 py-3 text-gray-500 rounded-lg w-full flex justify-center items-center"
                    : "bg-primaryPurple text-white w-full text-[15px] font-poppins flex justify-center items-center"
                }`}
                disabled={loading}
                onClick={postBasicDetails}
              >
                {loading ? <Spinner className="h-4 w-4" /> : "Proceed"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;
