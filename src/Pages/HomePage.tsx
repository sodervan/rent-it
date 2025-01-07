import General from "../components/General";
import WhoWeAre from "../components/WhoWeAre";
import { useEffect, useState } from "react";
import Body from "@/components/Body";
import Footer from "@/components/Footer";
// import { useOutletContext } from "react-router-dom";

const HomePage = () => {
  const [id, setId] = useState<string | null>(null);

  const getItem = () => {
    setId(localStorage.getItem("userId"));
  };
  useEffect(() => {
    getItem();
  }, []);
  // const { userId } = useOutletContext();
  return (
    <>
      <Body userId={id} />
      <div className="h-40 "></div>
      <WhoWeAre />

      <General />
      <Footer />
    </>
  );
};

export default HomePage;
