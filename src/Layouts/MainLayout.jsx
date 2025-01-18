import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import AgentNavbar from "@/components/AgentNavbar";
import { Outlet } from "react-router-dom";
import AgentRegistrationNavBar from "@/components/AgentRegistrationNavBar.jsx";
import useTokenData from "../../TokenHook.js";

const MainLayout = () => {
  const location = useLocation();
  const { tokenData, isLoading } = useTokenData();

  // Check if current path matches specific conditions
  const isVerificationPage = location.pathname.includes(
    "/user/verificationemail",
  );
  const isAgentRegistration = location.pathname.includes(
    "/agent/agentregistration",
  );

  // Show loading or default navbar while token is being verified
  if (isLoading) {
    return (
      <>
        {!isVerificationPage && <Navbar />}
        <Outlet />
      </>
    );
  }

  // Determine which navbar to render based on verified token and path
  let navbar = null;
  if (!isVerificationPage) {
    if (isAgentRegistration) {
      navbar = <AgentRegistrationNavBar />;
    } else if (tokenData?.role === "agent") {
      navbar = <AgentNavbar />;
    } else {
      navbar = <Navbar />;
    }
  }

  return (
    <>
      {navbar}
      <Outlet />
    </>
  );
};

export default MainLayout;
