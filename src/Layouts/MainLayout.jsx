import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";
import { useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();
  const { userId } = location.state || {};
  return (
    <>
      <NavBar userId={userId} />
      <Outlet context={{ userId }} />
    </>
  );
};

export default MainLayout;
