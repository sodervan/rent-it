import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import AgentNavbar from "@/components/AgentNavbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [accountType, setAccountType] = useState(null);
  const location = useLocation();

  // Check if current path is verification email page
  const isVerificationPage = location.pathname.includes(
    "/user/verificationemail",
  );

  useEffect(() => {
    const accountTypeFromStorage = localStorage.getItem("accountType");
    setAccountType(accountTypeFromStorage);
  }, [location.pathname]);

  return (
    <>
      {/* Only show navbar if not on verification page */}
      {!isVerificationPage &&
        (accountType === "agent" ? <AgentNavbar /> : <Navbar />)}
      <Outlet />
    </>
  );
};

export default MainLayout;
