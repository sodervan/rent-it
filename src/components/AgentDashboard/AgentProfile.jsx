import { useState, useRef, useEffect } from "react";
import ConfirmationModal from "@/components/AgentDashboard/ConfirmationModal.tsx";
import { useNavigate } from "react-router-dom";
import { IconEdit } from "@tabler/icons-react";
import { toast } from "react-toastify";
import { Spinner } from "@material-tailwind/react";
import { motion } from "framer-motion";
import useTokenData from "../../../TokenHook.js";
import Sidebar from "./Sidebar.jsx";
import axios from "axios";

const AgentProfile = () => {
  const filePickerRef = useRef();
  const navigate = useNavigate();

  // States
  const [toggle, setToggleState] = useState(1);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState("");
  const [agentData, setAgentData] = useState({});
  const [formData, setFormData] = useState({
    phoneNumber: "",
    firstName: "",
    lastName: "",
    addressLine1: "",
    lga: "",
    state: "",
  });
  const [originalFormData, setOriginalFormData] = useState({});
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);
  const { clearToken } = useTokenData();
  const apiUrl = import.meta.env.VITE_API_URL;

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
      await handleProfileImageUpdate(file);
    }
  };

  const handleLogout = () => {
    clearToken();
    localStorage.clear();
    navigate("/login");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const hasChanges = () => {
    return Object.keys(formData).some(
      (key) => formData[key] !== originalFormData[key],
    );
  };

  const fetchAgentData = async () => {
    setFetchingData(true);
    try {
      const response = await axios.get(`${apiUrl}/api/v1/agents`, {
        withCredentials: true,
      });
      const data = response.data;
      localStorage.setItem("agentData", JSON.stringify(data));
      setAgentData(data.payload || data);
      console.log(data);
      initializeFormData(data.payload || data);
    } catch (error) {
      console.error(
        "Error fetching agent data:",
        error.response?.data || error.message,
      );
      toast.error("Failed to load profile data");
    } finally {
      setFetchingData(false);
    }
  };

  const initializeFormData = (data) => {
    if (!data) return;

    // Handle both camelCase and lowercase field names
    const initialFormData = {
      phoneNumber: data.phoneNumber || data.phonenumber || "",
      firstName: data.firstname || data.firstName || "",
      lastName: data.lastname || data.lastName || "",
      addressLine1: data.addressLine1 || data.addressline1 || "",
      lga: data.lga || "",
      state: data.state || "",
    };

    setFormData(initialFormData);
    setOriginalFormData(initialFormData);

    // Also update agentData to ensure consistent data structure
    setAgentData((prev) => ({
      ...prev,
      ...data,
      firstname: data.firstname || data.firstName,
      lastname: data.lastname || data.lastName,
      email: data.email,
      profilePicLink: data.profilePicLink || data.profilepiclink,
    }));
  };

  const handleSaveChanges = async () => {
    if (!hasChanges()) return;

    setIsLoading(true);
    try {
      const updatedData = {
        ...agentData,
        phoneNumber: formData.phoneNumber,
        firstname: formData.firstName,
        lastname: formData.lastName,
        addressLine1: formData.addressLine1,
        lga: formData.lga,
        state: formData.state,
      };

      localStorage.setItem(
        "agentData",
        JSON.stringify({ payload: updatedData }),
      );
      setAgentData(updatedData);
      setOriginalFormData({ ...formData });

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Update profile error:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileImageUpdate = async (imageFile) => {
    if (!imageFile) return;
    setIsLoading(true);

    const formData = new FormData();
    formData.append("profile", imageFile);

    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/agents/profile-picture`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      // Since axios automatically returns the parsed data
      const result = response.data;

      const storedData = JSON.parse(localStorage.getItem("agentData"));
      const updatedData = {
        ...storedData,
        payload: {
          ...(storedData.payload || storedData),
          profilePicLink: result.profilePicLink,
        },
      };

      localStorage.setItem("agentData", JSON.stringify(updatedData));
      setAgentData((prev) => ({
        ...prev,
        profilePicLink: result.profilePicLink,
      }));

      toast.success("Profile image updated successfully!");
    } catch (error) {
      console.error("Profile Image Update Error:", error);
      // Handle axios error response
      const errorMessage =
        error.response?.data?.message || "Failed to update profile image";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const storedAgentData = localStorage.getItem("agentData");
    console.log("Stored Agent Data:", storedAgentData); // Debugging

    if (storedAgentData) {
      try {
        const parsed = JSON.parse(storedAgentData);
        console.log("Parsed Data:", parsed); // Debugging

        // Handle both possible data structures
        const agentPayload = parsed?.data.payload || parsed;
        console.log("Agent Payload:", agentPayload); // Debugging

        if (agentPayload) {
          setAgentData(parsed?.data.payload);
          initializeFormData(agentPayload);
        } else {
          fetchAgentData();
        }
      } catch (error) {
        console.error("Error parsing agentData:", error);
        fetchAgentData();
      }
    } else {
      fetchAgentData();
    }
  }, []);

  if (fetchingData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner className="h-12 w-12 text-purple-600" />
        <span className="ml-3 text-lg text-gray-700">
          Loading your profile...
        </span>
      </div>
    );
  }

  return (
    <>
      <Sidebar firstname={formData.firstName} loading={loading} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row mt-20 max-w-7xl w-[98%] mx-auto gap-10 min-h-screen px-4 lg:ml-64 lg:w-[80%]"
      >
        {/* Profile Sidebar */}
        <motion.div
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-1/4 p-6 bg-white rounded-lg shadow-sm"
        >
          <div className="flex flex-col items-center text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={filePickerRef}
              hidden
            />
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="relative cursor-pointer w-32 h-32 shadow-lg overflow-hidden rounded-full"
                onClick={() => filePickerRef.current.click()}
              >
                <motion.img
                  src={
                    imageFileUrl ||
                    agentData.profilePicLink ||
                    "https://via.placeholder.com/150"
                  }
                  alt="Profile"
                  className="object-cover border-4 border-gray-100 w-full h-full rounded-full"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <motion.div
                className="absolute right-0 bottom-0 p-2 bg-white rounded-full shadow-md cursor-pointer"
                whileHover={{ scale: 1.1 }}
                onClick={() => filePickerRef.current.click()}
              >
                {loading ? (
                  <Spinner className="text-purple-600 w-5 h-5" />
                ) : (
                  <IconEdit className="text-purple-600" size={20} />
                )}
              </motion.div>
            </motion.div>

            <h2 className="mt-4 font-semibold text-xl">
              {agentData.lastname || agentData.lastName}{" "}
              {agentData.firstname || agentData.firstName}
            </h2>
            <p className="text-sm text-gray-500">{agentData.email}</p>
          </div>

          <div className="mt-8 space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2.5 text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 transition-colors"
              onClick={() => navigate("/agent/dashboard")}
            >
              Dashboard
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300"
              onClick={() => setIsLogoutModalOpen(true)}
            >
              Logout
            </motion.button>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ x: 50 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              Profile Settings
            </h1>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex space-x-8">
              {[
                { id: 1, label: "Profile", icon: "profile" },
                { id: 2, label: "Password", icon: "password" },
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => toggleTab(tab.id)}
                  className={`pb-4 relative ${
                    toggle === tab.id
                      ? "text-purple-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <span className="text-base font-medium">{tab.label}</span>
                  {toggle === tab.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"
                      layoutId="activeTab"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Profile Form */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={toggle === 1 ? "block" : "hidden"}
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-700">
                  Basic Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      disabled
                      value={agentData.email || ""}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <h2 className="text-lg font-semibold text-gray-700 mb-4">
                    Office Address
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address Line 1
                      </label>
                      <input
                        type="text"
                        name="addressLine1"
                        value={formData.addressLine1}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        LGA
                      </label>
                      <input
                        type="text"
                        name="lga"
                        value={formData.lga}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter LGA"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter state"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <motion.button
                type="button"
                onClick={handleSaveChanges}
                disabled={!hasChanges() || loading}
                whileHover={{ scale: hasChanges() ? 1.02 : 1 }}
                whileTap={{ scale: hasChanges() ? 0.98 : 1 }}
                className={`w-full py-3 rounded-lg transition-all duration-300 ${
                  hasChanges()
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Spinner className="w-5 h-5" />
                    <span>Saving...</span>
                  </div>
                ) : (
                  "Save Changes"
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Password Form */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: toggle === 2 ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className={toggle === 2 ? "block" : "hidden"}
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-700">
                  Change Password
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
                >
                  Reset Password
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                >
                  Forgot Password?
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>

        {/* Logout Confirmation Modal */}
        {isLogoutModalOpen && (
          <ConfirmationModal
            isOpen={isLogoutModalOpen}
            onClose={() => setIsLogoutModalOpen(false)}
            onConfirm={handleLogout}
            message="Are you sure you want to log out? This action cannot be undone."
          />
        )}
      </motion.div>
    </>
  );
};

export default AgentProfile;
