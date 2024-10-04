import Body from "../Components/Body";
import General from "../Components/General";
import WhoWeAre from "../Components/WhoWeAre";
import Footer from "../Components/TheFooter.jsx";
import { useOutletContext } from "react-router-dom";

const HomePage = () => {
  const { userId } = useOutletContext();
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
