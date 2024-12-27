import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import AgentNavbar from "@/components/AgentNavbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [accountType, setAccountType] = useState(null); // State to hold the account type (agent or other)
  const location = useLocation(); // React Router hook to detect route changes

  useEffect(() => {
    // Fetch account type from localStorage on every route change
    const accountTypeFromStorage = localStorage.getItem("accountType"); // e.g., "agent" or "user"
    setAccountType(accountTypeFromStorage);
  }, [location.pathname]); // Trigger on route change

  return (
    <>
      {/* Conditionally render Navbar based on account type */}
      {accountType === "agent" ? <AgentNavbar /> : <Navbar />}

      {/* Render all nested/child routes */}
      <Outlet />
    </>
  );
};

export default MainLayout;
