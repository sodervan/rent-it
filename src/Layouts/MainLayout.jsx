import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";
import TheFooter from "../Components/TheFooter.jsx";

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <TheFooter />
    </>
  );
};

export default MainLayout;
