import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import AgentNavbar from "@/components/AgentNavbar";
import { Outlet } from "react-router-dom";
import AgentRegistrationNavBar from "@/components/AgentRegistrationNavBar.jsx";

const MainLayout = () => {
  const [accountType, setAccountType] = useState(null);
  const location = useLocation();

  // Check if current path matches specific conditions
  const isVerificationPage = location.pathname.includes(
      "/user/verificationemail"
  );
  const isAgentRegistration = location.pathname.includes(
      "/agent/agentregistration"
  );

  useEffect(() => {
    const accountTypeFromStorage = localStorage.getItem("accountType");
    setAccountType(accountTypeFromStorage);
  }, [location.pathname]);

  return (
      <>
        {/* Render the appropriate navbar */}
        {!isVerificationPage && (
            isAgentRegistration ? (
                <AgentRegistrationNavBar />
            ) : accountType === "agent" ? (
                <AgentNavbar />
            ) : (
                <Navbar />
            )
        )}
        <Outlet />
      </>
  );
};

export default MainLayout;
