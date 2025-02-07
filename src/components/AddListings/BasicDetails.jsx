import {
  Button,
  Input,
  Option,
  Select,
  Spinner,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { IconPlus, IconX } from "@tabler/icons-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import SelectComponent from "@/components/AddListings/SelectComponent.jsx";

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
  const [searchParams] = useSearchParams();
  const encodedItemId = searchParams.get("itemId");

  const decodeId = (encodedId) => {
    return atob(encodedId); // Decode the Base64 string
  };
  const itemId = decodeId(encodedItemId);

  const fetchBasicDetails = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/v1/agents/listings/${itemId}/basic-details`,
        { withCredentials: true },
      );
      console.log(response);
      const data = response.data.payload;

      // Set the fetched data as the default state
      setDescription(data.title || "");
      setSelectedAppType(String(data.apartmentTypeId) || "");
      setAddress(data.streetAddress || "");
      setSelectedState(String(data.stateId) || "");
      setSelectedCity(String(data.cityId) || "");
      setCurrentLgas(String(data.localGovernmentAreaId) || "");
      setUnits(data.units || 1);

      // Fetch dependent data (cities and LGAs) based on the selected state
      if (data.stateId) {
        await getCities(data.stateId);
        await getLgas(data.stateId);
      }
    } catch (error) {
      console.error("Error fetching basic details:", error);
      toast.error("Failed to fetch basic details");
    }
  };

  const appTypeOptions = appTypes.map((type) => ({
    value: String(type.id),
    label: type.name,
  }));

  const stateOptions = states.map((state) => ({
    value: String(state.id),
    label: state.name,
  }));

  const lgaOptions = lgas.map((lga) => ({
    value: String(lga.id),
    label: lga.name,
  }));

  const cityOptions = cities.map((city) => ({
    value: String(city.id),
    label: city.name,
  }));

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
        navigate(
          `/agent/addlisting/2${encodedItemId ? "?itemId=" + encodedItemId : ""}`,
        );
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
      console.log(response);
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
    if (encodedItemId) {
      fetchBasicDetails();
    }
  }, []);

  const handleStateChange = (stateId) => {
    setSelectedState(stateId);
    getCities(stateId);
    getLgas(stateId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="mt-22"
    >
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
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6"
          >
            <p className="mb-2 text-gray-700">Listing Title</p>
            <Input
              label="Add a descriptive listing title"
              value={description}
              onChange={handleDescriptionChange}
              aria-label="Listing Title"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="my-2"
          >
            <p className="text-gray-600 font-medium mb-2">
              Make it descriptive, for example:
            </p>
            <p className="text-gray-500">
              Spacious 3-Bedroom Apartment in Lekki with Modern Finishes, Single
              Rooms near UNILAG, Akoka
            </p>
          </motion.div>

          {/*SET APARTMENT TYPE*/}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="my-5"
          >
            <p className="mb-1 text-gray-700">Apartment Type</p>
            <SelectComponent
              options={appTypeOptions}
              value={selectedAppType}
              onChange={setSelectedAppType}
              label="Select Apartment Type"
              placeholder="Choose an apartment type"
            />
          </motion.div>

          {/*SET UNITS*/}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
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
                aria-label="Units Available"
              />
              <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex gap-2">
                <Button
                  size="sm"
                  className="rounded bg-secondaryPurple text-primaryPurple shadow-none"
                  onClick={handleUnitsAdd}
                  aria-label="Increase Units"
                >
                  <IconPlus size={15} />
                </Button>
                <Button
                  size="sm"
                  className="rounded bg-secondaryPurple text-primaryPurple shadow-none"
                  onClick={handleUnitsSubtract}
                  aria-label="Decrease Units"
                >
                  <IconX size={15} />
                </Button>
              </div>
            </div>
          </motion.div>

          {/*ADDRESS*/}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-5"
          >
            <p className="mb-2 text-gray-700">Address</p>
            <Input
              label="e.g., 10 Adewale Street"
              value={address}
              onChange={handleAddressChange}
              aria-label="Address"
            />

            {/*SELECT STATE*/}
            <div className="relative w-full mt-4">
              <p className="mb-2 text-gray-700">State</p>
              <SelectComponent
                options={stateOptions}
                value={selectedState}
                onChange={(stateId) => {
                  handleStateChange(parseInt(stateId));
                }}
                label="Select State"
                placeholder="Choose a state"
              />
            </div>

            {/*SELECT LGAS*/}
            <div className="relative w-full mt-4">
              <p className="mb-2 text-gray-700">LGA</p>
              <SelectComponent
                options={lgaOptions}
                value={currentLgas}
                onChange={setCurrentLgas}
                label="Select LGA"
                placeholder="Choose an LGA"
              />
            </div>

            {/*SELECT CITY*/}
            <div className="relative w-full mt-4">
              <p className="my-2 text-gray-700">City</p>
              <SelectComponent
                options={cityOptions}
                value={String(selectedCity)}
                onChange={setSelectedCity}
                label="Select City"
                placeholder="Choose a city"
              />
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
                aria-label="Proceed"
              >
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Spinner className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Proceed
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default BasicDetails;
