import { useState, useRef, useEffect } from "react";
import ConfirmationModal from "@/components/AgentDashboard/ConfirmationModal.tsx";
import { useNavigate } from "react-router-dom";
import { IconEdit, IconWallet, IconPlus, IconTrash } from "@tabler/icons-react";
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
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useState(false);
  const [loading, setIsLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);
  const { clearToken } = useTokenData();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  //STATED FOR CHANGING PASSWORD
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  // New states for withdrawal methods
  const [withdrawalMethods, setWithdrawalMethods] = useState([]);
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);
  const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false);
  const [newAccount, setNewAccount] = useState({
    accountType: "bank", // bank, crypto, or paypal
    bankName: "",
    accountNumber: "",
    accountName: "",
    cryptoAddress: "",
    cryptoType: "",
    paypalEmail: "",
    isDefault: false,
  });
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);
  const [balance, setBalance] = useState(0);
  const [isPasswordChanging, setsIsPasswordChanging] = useState(false);

  const changePasswordHandler = async () => {
    setsIsPasswordChanging(true); // you should also start loading at the beginning

    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/agents/change-password`,
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
          confirmPassword: repeatPassword,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const result = response.data;
      // Do something with result if needed
    } catch (error) {
      console.error("Password change Error:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to Change Password";
      toast.error(errorMessage);
    } finally {
      setsIsPasswordChanging(false);
    }
  };

  const handleSidebarCollapse = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

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
      localStorage.setItem("agentData", JSON.stringify(data.payload));
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

  const fetchWithdrawalMethods = async () => {
    // In production, this would be an API call
    // Mock data for now
    setWithdrawalMethods([
      {
        id: "1",
        accountType: "bank",
        bankName: "First Bank",
        accountNumber: "1234567890",
        accountName: "John Smith",
        isDefault: true,
        dateAdded: "2024-11-15",
      },
      {
        id: "2",
        accountType: "crypto",
        cryptoType: "Bitcoin",
        cryptoAddress: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
        isDefault: false,
        dateAdded: "2025-01-20",
      },
    ]);
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

  // New handlers for withdrawal functionality
  const handleNewAccountChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAccount((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const saveNewAccount = async () => {
    // Validate form based on account type
    let isValid = false;
    let errorMessage = "";

    if (newAccount.accountType === "bank") {
      if (
        !newAccount.bankName ||
        !newAccount.accountNumber ||
        !newAccount.accountName
      ) {
        errorMessage = "Please fill all bank account fields";
      } else {
        isValid = true;
      }
    } else if (newAccount.accountType === "crypto") {
      if (!newAccount.cryptoType || !newAccount.cryptoAddress) {
        errorMessage = "Please fill all cryptocurrency fields";
      } else {
        isValid = true;
      }
    } else if (newAccount.accountType === "paypal") {
      if (!newAccount.paypalEmail) {
        errorMessage = "Please enter your PayPal email";
      } else {
        isValid = true;
      }
    }

    if (!isValid) {
      toast.error(errorMessage);
      return;
    }

    setIsLoading(true);
    try {
      // Mock API response - In production, make a POST request to save account
      const newId = Math.random().toString(36).substring(2, 9);

      const newMethodData = {
        ...newAccount,
        id: newId,
        dateAdded: new Date().toISOString().split("T")[0],
      };

      // If this is set as default, update other methods to not be default
      if (newAccount.isDefault) {
        setWithdrawalMethods((prev) =>
          prev.map((method) => ({ ...method, isDefault: false })),
        );
      }

      setWithdrawalMethods((prev) => [...prev, newMethodData]);

      // Reset form
      setNewAccount({
        accountType: "bank",
        bankName: "",
        accountNumber: "",
        accountName: "",
        cryptoAddress: "",
        cryptoType: "",
        paypalEmail: "",
        isDefault: false,
      });

      setIsAddAccountModalOpen(false);
      toast.success("Withdrawal method added successfully!");
    } catch (error) {
      console.error("Error adding withdrawal method:", error);
      toast.error("Failed to add withdrawal method");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteWithdrawalMethod = async (id) => {
    setIsLoading(true);
    try {
      // In production, make a DELETE request
      setWithdrawalMethods((prev) => prev.filter((method) => method.id !== id));
      setShowConfirmDelete(null);
      toast.success("Withdrawal method deleted successfully!");
    } catch (error) {
      console.error("Error deleting withdrawal method:", error);
      toast.error("Failed to delete withdrawal method");
    } finally {
      setIsLoading(false);
    }
  };

  const setAsDefaultMethod = async (id) => {
    setIsLoading(true);
    try {
      // In production, make a PATCH request
      setWithdrawalMethods((prev) =>
        prev.map((method) => ({
          ...method,
          isDefault: method.id === id,
        })),
      );
      toast.success("Default withdrawal method updated!");
    } catch (error) {
      console.error("Error updating default method:", error);
      toast.error("Failed to update default method");
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
        const agentPayload = parsed?.data?.payload || parsed?.payload || parsed;
        console.log("Agent Payload:", agentPayload); // Debugging

        if (agentPayload) {
          setAgentData(agentPayload);
          initializeFormData(agentPayload);

          // Mock data setup
          setBalance(agentPayload.balance || 15000);
          fetchWithdrawalMethods();
          fetchWithdrawalHistory();
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
      <Sidebar
        firstname={formData.firstName}
        loading={loading}
        onCollapse={handleSidebarCollapse}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`flex flex-col lg:flex-row mt-20 max-w-7xl w-[98%] mx-auto gap-10 min-h-screen px-4 ${sidebarCollapsed ? "lg:ml-20" : "lg:ml-60"} lg:w-[80%]`}
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
              onClick={() => navigate("/agent/dashboard/mylistings")}
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
            <div className="flex space-x-8 overflow-x-auto pb-1">
              {[
                { id: 1, label: "Profile", icon: "profile" },
                { id: 2, label: "Password", icon: "password" },
                // { id: 3, label: "Withdrawal", icon: "withdrawal" },
                { id: 4, label: "Payment Methods", icon: "payment" },
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => toggleTab(tab.id)}
                  className={`pb-4 relative whitespace-nowrap ${
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
            animate={{ opacity: toggle === 1 ? 1 : 0 }}
            exit={{ opacity: 0 }}
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
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={toggle === 2 ? "block" : "hidden"}
          >
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                changePasswordHandler();
              }}
            >
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
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
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
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
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
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="Repeat new password"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300
        ${isPasswordChanging ? "opacity-50 cursor-not-allowed" : ""}
    `}
                >
                  {isPasswordChanging ? "Changing..." : "Change Password"}
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Payment Methods Tab */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: toggle === 4 ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={toggle === 4 ? "block" : "hidden"}
          >
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-700">
                  Payment Methods
                </h2>
                <motion.button
                  onClick={() => setIsAddAccountModalOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center text-sm px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <IconPlus size={16} className="mr-1" />
                  Add New
                </motion.button>
              </div>

              {withdrawalMethods.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                  <IconWallet
                    size={40}
                    className="mx-auto text-gray-400 mb-3"
                  />
                  <h3 className="text-lg font-medium text-gray-600 mb-1">
                    No payment methods
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Add a payment method to receive your earnings
                  </p>
                  <button
                    onClick={() => setIsAddAccountModalOpen(true)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Add Payment Method
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {withdrawalMethods.map((method) => (
                    <motion.div
                      key={method.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex justify-between">
                        <div>
                          {method.accountType === "bank" && (
                            <>
                              <div className="flex items-center space-x-2">
                                <span className="text-lg font-medium text-gray-800">
                                  {method.bankName}
                                </span>
                                {method.isDefault && (
                                  <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                                    Default
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-600">
                                {method.accountNumber} ({method.accountName})
                              </p>
                            </>
                          )}

                          {method.accountType === "crypto" && (
                            <>
                              <div className="flex items-center space-x-2">
                                <span className="text-lg font-medium text-gray-800">
                                  {method.cryptoType}
                                </span>
                                {method.isDefault && (
                                  <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                                    Default
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-600 text-sm truncate max-w-md">
                                {method.cryptoAddress}
                              </p>
                            </>
                          )}

                          {method.accountType === "paypal" && (
                            <>
                              <div className="flex items-center space-x-2">
                                <span className="text-lg font-medium text-gray-800">
                                  PayPal
                                </span>
                                {method.isDefault && (
                                  <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                                    Default
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-600">
                                {method.paypalEmail}
                              </p>
                            </>
                          )}

                          <p className="text-gray-400 text-xs mt-2">
                            Added: {method.dateAdded}
                          </p>
                        </div>

                        <div className="flex items-start space-x-2">
                          {!method.isDefault && (
                            <button
                              onClick={() => setAsDefaultMethod(method.id)}
                              className="text-sm px-3 py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                            >
                              Set as Default
                            </button>
                          )}

                          {showConfirmDelete === method.id ? (
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() =>
                                  deleteWithdrawalMethod(method.id)
                                }
                                className="text-sm px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setShowConfirmDelete(null)}
                                className="text-sm px-3 py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setShowConfirmDelete(method.id)}
                              className="text-sm p-1.5 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                            >
                              <IconTrash size={18} />
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
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

        {/* Delete Account Confirmation Modal */}
        {isDeleteAccountModalOpen && (
          <ConfirmationModal
            isOpen={isDeleteAccountModalOpen}
            onClose={() => setIsDeleteAccountModalOpen(false)}
            onConfirm={() => {
              toast.success(
                "Account deletion requested. Our team will contact you shortly.",
              );
              setIsDeleteAccountModalOpen(false);
            }}
            message="Are you sure you want to delete your account? This will remove all your data and listings from our platform. This action cannot be undone."
          />
        )}

        {/* Add Account Modal */}
        {isAddAccountModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Add Payment Method
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Type
                  </label>
                  <select
                    name="accountType"
                    value={newAccount.accountType}
                    onChange={handleNewAccountChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="bank">Bank Account</option>
                    <option value="crypto">Cryptocurrency</option>
                    <option value="paypal">PayPal</option>
                  </select>
                </div>

                {newAccount.accountType === "bank" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bank Name
                      </label>
                      <input
                        type="text"
                        name="bankName"
                        value={newAccount.bankName}
                        onChange={handleNewAccountChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter bank name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Account Number
                      </label>
                      <input
                        type="text"
                        name="accountNumber"
                        value={newAccount.accountNumber}
                        onChange={handleNewAccountChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter account number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Account Name
                      </label>
                      <input
                        type="text"
                        name="accountName"
                        value={newAccount.accountName}
                        onChange={handleNewAccountChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter account name"
                      />
                    </div>
                  </>
                )}

                {newAccount.accountType === "crypto" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cryptocurrency Type
                      </label>
                      <select
                        name="cryptoType"
                        value={newAccount.cryptoType}
                        onChange={handleNewAccountChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Select cryptocurrency</option>
                        <option value="Bitcoin">Bitcoin (BTC)</option>
                        <option value="Ethereum">Ethereum (ETH)</option>
                        <option value="USDT">USDT (Tether)</option>
                        <option value="USDC">USDC</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Wallet Address
                      </label>
                      <input
                        type="text"
                        name="cryptoAddress"
                        value={newAccount.cryptoAddress}
                        onChange={handleNewAccountChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter wallet address"
                      />
                    </div>
                  </>
                )}

                {newAccount.accountType === "paypal" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PayPal Email
                    </label>
                    <input
                      type="email"
                      name="paypalEmail"
                      value={newAccount.paypalEmail}
                      onChange={handleNewAccountChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter PayPal email"
                    />
                  </div>
                )}

                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    id="isDefault"
                    name="isDefault"
                    checked={newAccount.isDefault}
                    onChange={handleNewAccountChange}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="isDefault"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Set as default withdrawal method
                  </label>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setIsAddAccountModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  onClick={saveNewAccount}
                  disabled={loading}
                  whileHover={{ scale: !loading ? 1.02 : 1 }}
                  whileTap={{ scale: !loading ? 0.98 : 1 }}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    loading
                      ? "bg-purple-400 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700"
                  } text-white`}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <Spinner className="w-4 h-4" />
                      <span>Saving...</span>
                    </div>
                  ) : (
                    "Save Payment Method"
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default AgentProfile;
