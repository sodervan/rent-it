import General from "../components/General";
import WhoWeAre from "../components/WhoWeAre";
import Footer from "../components/TheFooter.jsx";
import { useEffect, useState } from "react";
import Body from "@/components/Body";
// import { useOutletContext } from "react-router-dom";

const HomePage = () => {
	const [id, setId] = useState(null);

	useEffect(() => {
		setId(localStorage.getItem("userId"));
	}, []);
	// const { userId } = useOutletContext();
	return (
		<>
			{/* <Body userId={id} /> */}
			<Body userId={id} />
			<WhoWeAre />
			<General />
			<Footer />
		</>
	);
};

export default HomePage;
