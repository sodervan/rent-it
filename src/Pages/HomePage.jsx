import Body from "../Components/Body";
import General from "../Components/General";
import WhoWeAre from "../Components/WhoWeAre";
import Footer from "../Components/TheFooter.jsx";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const location = useLocation();
  const { userId } = location.state || {};
  return (
    <>
      <Body userId={userId} />
      <WhoWeAre />
      <General />
      <Footer />
    </>
  );
};

export default HomePage;
