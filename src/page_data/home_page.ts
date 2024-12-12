import { IHighLight } from "../lib/types";

const carousel_data = {
	header: " Find Your Perfect Home, Hassle Free",
	pills: [
		" No Unnecessary Fees",
		" Renter protection",
		"Student Accommodation",
	],
	images: [
		"https://res.cloudinary.com/dmlgns85e/image/upload/v1724857270/pexels-binyaminmellish-106399_ana2ff.jpg",
		"https://res.cloudinary.com/dmlgns85e/image/upload/v1724858745/ultimate-guide-to-home-exterior-design_leq7ty.jpg",
		"https://res.cloudinary.com/dmlgns85e/image/upload/v1724858656/white-house-a-frame-section-c0a4a3b3-e722202f114e4aeea4370af6dbb4312b_rzafww.jpg",
	],
};

const highlight_data: IHighLight[] = [
	{
		image: "https://res.cloudinary.com/dmlgns85e/image/upload/v1726676819/House_searching-bro_1_1_pdxvng.png",
		title: "Find your next home",
		subtitle:
			"With powerful search filters and personalized recommendations, our platform makes it easy to discover a home or apartment that perfectly suits your needs.",
		button: "Find an apartment near You",
	},
	{
		image: "https://res.cloudinary.com/dmlgns85e/image/upload/v1726676820/Realtor-rafiki_1_kihxqx.png",
		title: "List Your property",
		subtitle:
			"Whether you’re an agent or landlord, our intuitive tools let you manage and showcase your properties with ease, reaching a wider audience of potential renters.",
		button: "List a Property",
	},
	{
		image: "https://res.cloudinary.com/dmlgns85e/image/upload/v1726676819/Location_search-pana_1_ywdzgk.png",
		subtitle:
			"Get in-depth insights on communities near you. From schools and transport to nearby attractions, discover what makes each neighborhood unique.",
		title: "Explore Neighbourhoods",
		button: "Start Your Search",
	},
];

export { carousel_data, highlight_data };
