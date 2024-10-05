import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";
// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

const MainLayout = () => {
  // const [userId, setUserId] = useState(null);
  // const location = useLocation();

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default MainLayout;
