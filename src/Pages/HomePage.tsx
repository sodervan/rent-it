import General from "../components/General";
import WhoWeAre from "../components/WhoWeAre";
import DiscoverSection from "@/components/HomeComponents/ProcessTimeline";
import { useEffect, useState } from "react";
import Body from "@/components/Body";
import Footer from "@/components/Footer";
import ContactSection from "@/components/HomeComponents/ContactSection";
import ContinuousTestimonials from "@/components/HomeComponents/ContinuousTestimonials";
import UserRolesShowcase from "@/components/HomeComponents/UserRolesShowcase";
import RenterOrAgent from "@/components/HomeComponents/RenterOrAgent";
import RecentSearches from "@/components/RecentSearches";
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
      <RecentSearches />
      <UserRolesShowcase />
      <WhoWeAre />
      <General />
      <ContinuousTestimonials />
      <RenterOrAgent />
      <DiscoverSection />
      <ContactSection />
      <Footer />
    </>
  );
};

export default HomePage;
