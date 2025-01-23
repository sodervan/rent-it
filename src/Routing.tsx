import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import useTokenData from "../TokenHook";

// Import your components
import RenterDashPage from "./Pages/renter_dashboard/RenterDashPage";
import MainLayout from "./Layouts/MainLayout";
import HomePage from "./Pages/HomePage";
import RenterLogin from "@/components/Forms/RenterLogin";
import RenterSignup from "@/components/Forms/RenterSignup";
import EnterEmail from "@/components/ForgotPassword/EnterEmail";
import PasswordReset from "@/components/ForgotPassword/PasswordReset";
import AgentSignup from "./components/Forms/AgentSignup";
import AboutUs from "./components/NavLinksComponents/AboutUs";
import Blog from "./components/NavLinksComponents/Blog";
import ListingDetailsPage from "@/Pages/ListingDetailsPage";
import AgentsLogin from "@/components/Forms/AgentsLogin";
import AgentDashboard from "@/components/AgentDashboard/AgentDashboard";
import AgentProfile from "@/components/AgentDashboard/AgentProfile";
import AgentRegistration from "@/components/Forms/AgentRegistration";
import BookingListing from "./components/AgentDashboard/BookingListing";
import AllSteps from "@/components/AddListings/AllSteps";
import VerifyEmail from "@/components/VerifyEmail";
import RenterVerificationEmail from "@/components/RenterVerificationEmail";
import SessionExpiredModal from "../SessionExpiryModal";

// Protected Route Components
const ProtectedRoute = ({ children, allowedRoles, redirectPath }) => {
  const { tokenData, isLoading } = useTokenData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!tokenData || !allowedRoles.includes(tokenData?.role)) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

const AgentRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={["agent"]} redirectPath="/agent/login">
    {children}
  </ProtectedRoute>
);

const RenterRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={["user"]} redirectPath="/renter/login">
    {children}
  </ProtectedRoute>
);

function Routing() {
  const { tokenData, isLoading, clearToken } = useTokenData();
  const [showExpiredModal, setShowExpiredModal] = useState(false);

  useEffect(() => {
    const checkTokenExpiry = () => {
      if (tokenData?.exp) {
        const expiryDate = new Date(tokenData.exp * 1000);
        const currentDate = new Date();

        if (expiryDate <= currentDate) {
          setShowExpiredModal(true);
        }
      }
    };

    checkTokenExpiry();
    const interval = setInterval(checkTokenExpiry, 60000);
    return () => clearInterval(interval);
  }, [tokenData, clearToken]);

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SessionExpiredModal
        isOpen={showExpiredModal}
        onConfirm={() => {
          setShowExpiredModal(false);
          clearToken();
          // Redirect to login based on role
          const loginPath =
            tokenData?.role === "agent" ? "/agent/login" : "/renter/login";
          window.location.href = loginPath;
        }}
        userRole={tokenData?.role}
      />

      <BrowserRouter>
        <Routes>
          {/* Home Route with Role-based Redirect */}
          <Route path="/" element={<MainLayout />}>
            <Route
              index
              element={
                tokenData?.role === "agent" ? (
                  <Navigate to="/agent/dashboard" replace />
                ) : tokenData?.role === "renter" ? (
                  <Navigate to="/renter/dashboard/home" replace />
                ) : (
                  <HomePage />
                )
              }
            />

            {/* Public Routes */}
            <Route path="/renter/login" element={<RenterLogin />} />
            <Route path="/renter/forgotpassword" element={<EnterEmail />} />
            <Route path="/renter/resetpassword" element={<PasswordReset />} />
            <Route path="/renter/signup" element={<RenterSignup />} />
            <Route path="/agent/signup" element={<AgentSignup />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/blog" element={<Blog />} />
            <Route
              path="/listing-details-page/:id/:index"
              element={<ListingDetailsPage />}
            />
            <Route path="/agent/login" element={<AgentsLogin />} />

            {/* Verification Routes */}
            <Route
              path="/renter/signup/verifyemail"
              element={<VerifyEmail />}
            />
            <Route path="/agent/signup/verifyemail" element={<VerifyEmail />} />
            <Route
              path="/user/verificationemail"
              element={<RenterVerificationEmail />}
            />
            <Route
              path="/agent/agentregistration/:step"
              element={<AgentRegistration />}
            />

            {/* Protected Agent Routes */}
            <Route
              path="/agent/dashboard"
              element={
                <AgentRoute>
                  <AgentDashboard />
                </AgentRoute>
              }
            />
            <Route
              path="/agent/dashboard/listings"
              element={
                <AgentRoute>
                  <AgentDashboard />
                </AgentRoute>
              }
            />
            <Route
              path="agent/dashboard/profile"
              element={
                <AgentRoute>
                  <AgentProfile />
                </AgentRoute>
              }
            />
            <Route
              path="agent/dashboard/booking"
              element={
                <AgentRoute>
                  <BookingListing />
                </AgentRoute>
              }
            />
            <Route
              path="/agent/addlisting/:step"
              element={
                <AgentRoute>
                  <AllSteps />
                </AgentRoute>
              }
            />

            {/* Protected Renter Routes */}
            <Route
              path="/renter/dashboard/*"
              element={
                <RenterRoute>
                  <RenterDashPage />
                </RenterRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Routing;
{
  /* <Route
                                                        path="/search-results"
                                                        element={<SearchResultsPage />}
                                                    /> */
}
{
  /*
                                
                                
                                
                                
                                                    <Route
                                                        path="/agent/profile"
                                                        element={<AgentProfilePage />}
                                                    />
                                                    <Route
                                                        path="/renter/profile"
                                                        element={<RenterProfilePage />}
                                                    />
                                
                                
                                
                                                    <Route
                                                        path="/agent/agentdashboard"
                                                        element={<AgentDashboard />}
                                                    />
                                
                                 */
}
