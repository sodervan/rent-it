import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

const MainLayout = () => {
  // const [userId, setUserId] = useState(null);
  // const location = useLocation();

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default MainLayout;
