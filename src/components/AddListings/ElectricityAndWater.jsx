import {
  Button,
  Checkbox,
  Option,
  Radio,
  Select,
  Spinner,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"; // Import Axios
import { toast } from "react-toastify"; // For toast notifications
import Cookies from "js-cookie"; // For working with cookies

const ElectricityAndWater = () => {
  const navigate = useNavigate();
  const [paymentType, setPaymentType] = useState("");
  const [accessType, setAccessType] = useState("");
  const [waterSupply, setWaterSupply] = useState([]);
  const [furnishingState, setFurnishingState] = useState("");
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleWaterSupplyChange = (label) => {
    setWaterSupply((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    );
  };

  // POST ELECTRICITY AND WATER DETAILS TO THE API
  const postElecAndWater = async () => {
    setLoading(true);
    try {
      const storedDetails = JSON.parse(localStorage.getItem("basicDetails")); // Get data from cookies

      if (!storedDetails || !storedDetails.listingId) {
        throw new Error("Invalid basicDetails or listingId missing.");
      }

      const data = {
        electricityPaymentType: paymentType.toLowerCase(),
        electricityAccessType: accessType.toLowerCase(),
        inHouseRunningWater: waterSupply.includes("In-House running water"),
        outDoorWaterTaps: waterSupply.includes("Outdoor water taps"),
        waterFromExternalSource: waterSupply.includes(
          "Water from external source",
        ),
        furnishingState: furnishingState.toLowerCase(),
      };

      const response = await axios.post(
        `${apiUrl}/api/v1/agents/listings/${storedDetails.listingId}/features`,
        data,
        { withCredentials: true }, // Include cookies in the request
      );

      if (response.data.status === "success") {
        console.log("Success:", response.data);
        toast.success("Electricity and water details saved successfully!"); // Success toast
        setTimeout(() => {
          navigate("/agent/addlisting/7");
        }, 500);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while saving details.",
      ); // Error toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <div>
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 px-6">
            <p className="text-xl font-medium">Add New Listing</p>
            <Button className="bg-secondaryPurple text-primaryPurple font-poppins font-medium shadow-none hover:shadow-none hover:bg-primaryPurple hover:text-white duration-300 transition-all">
              Save
            </Button>
          </div>
          <div className="px-6">
            <div className="mb-5">
              <p className="text-gray-500 mt-2 font-medium">Step 6 of 15</p>
              <p className="mt-2 text-lg">Electricity and water supply</p>
              <div className="w-full border border-gray-200 mt-3"></div>
            </div>
            <div>
              <div className="border-b border-gray-300 mb-5">
                <p className="text-md">Electricity</p>
                <div>
                  {/* PAYMENT TYPE */}
                  <div>
                    <p className="mt-5 text-gray-600">Payment type</p>
                    <div className="flex gap-3">
                      <Radio
                        label="Prepaid"
                        name="type"
                        checked={paymentType === "Prepaid"}
                        onChange={() => setPaymentType("Prepaid")}
                      />
                      <Radio
                        name="type"
                        label="Postpaid"
                        checked={paymentType === "Postpaid"}
                        onChange={() => setPaymentType("Postpaid")}
                      />
                    </div>
                  </div>
                  {/* ACCESS TYPE */}
                  <div className="mb-2">
                    <p className="mt-5 text-gray-600">Access type</p>
                    <div className="flex gap-3">
                      <Radio
                        label="Shared"
                        name="access"
                        checked={accessType === "Shared"}
                        onChange={() => setAccessType("Shared")}
                      />
                      <Radio
                        name="access"
                        label="Personal"
                        checked={accessType === "Personal"}
                        onChange={() => setAccessType("Personal")}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* WATER SUPPLY */}
              <div className="border-b border-gray-300 mb-5">
                <p className="text-md mb-3">Water Supply</p>
                <div className="mb-4">
                  <Checkbox
                    label="In-House running water"
                    checked={waterSupply.includes("In-House running water")}
                    onChange={() =>
                      handleWaterSupplyChange("In-House running water")
                    }
                  />
                  <Checkbox
                    label="Outdoor water taps"
                    checked={waterSupply.includes("Outdoor water taps")}
                    onChange={() =>
                      handleWaterSupplyChange("Outdoor water taps")
                    }
                  />
                  <Checkbox
                    label="Water from external source"
                    checked={waterSupply.includes("Water from external source")}
                    onChange={() =>
                      handleWaterSupplyChange("Water from external source")
                    }
                  />
                </div>
              </div>
              {/* FURNISHING STATE */}
              <div>
                <div className="mb-5">
                  <p className="text-md text-gray-600">Furnishing State</p>
                  <div className="w-full mt-3">
                    <Select
                      label="Select"
                      onChange={(e) => setFurnishingState(e)}
                    >
                      <Option value="Fully-Furnished">Fully Furnished</Option>
                      <Option value="Semi-Furnished">Semi-Furnished</Option>
                      <Option value="Not-Furnished">Not Furnished</Option>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            <div className="my-8 flex items-center gap-4">
              <Button
                className="capitalize font-medium bg-secondaryPurple text-primaryPurple w-full text-[15px] font-poppins"
                onClick={() => {
                  navigate("/agent/addlisting/5");
                }}
              >
                Previous
              </Button>
              <Button
                className={`${
                  loading
                    ? "bg-gray-200 px-4 py-3 text-gray-500 rounded-lg w-full flex justify-center items-center"
                    : "bg-primaryPurple text-white w-full text-[15px] font-poppins flex justify-center items-center"
                }`}
                disabled={loading}
                onClick={postElecAndWater}
              >
                {loading ? <Spinner className="h-4 w-4" /> : "Proceed"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ElectricityAndWater;
