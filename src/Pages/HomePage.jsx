import Body from "../Components/Body";
import General from "../Components/General";
import WhoWeAre from "../Components/WhoWeAre";
import Footer from "../Components/TheFooter.jsx";
import { useEffect, useState } from "react";
// import { useOutletContext } from "react-router-dom";

const HomePage = () => {
	const [id, setId] = useState(null);

	useEffect(() => {
		setId(localStorage.getItem("userId"));
	}, []);
	// const { userId } = useOutletContext();
	return (
		<>
			<Body userId={id} />
			<WhoWeAre />
			<General />
			<Footer />
		</>
	);
};

export default HomePage;
