// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Loader from "./Loaders/Loader.jsx";
// import btn from "../assets/btn.png";
// import icon from "../assets/icon.png";
// import icon1 from "../assets/icon1.png";
// import icon2 from "../assets/icon2.png";

// const CarouselCustomNavigation = ({ images }) => {
//   return (
//     // <Carousel
//     //   className="rounded-xl"
//     //   navigation={({ setActiveIndex, activeIndex, length }) => (
//     //     <div className="absolute bottom-4 left-2/4 z-50  flex -translate-x-2/4 gap-2">
//     //       {new Array(length).fill("").map((_, i) => (
//     //         <span
//     //           key={i}
//     //           className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
//     //             activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
//     //           }`}
//     //           onClick={() => setActiveIndex(i)}
//     //         />
//     //       ))}
//     //     </div>
//     //   )}
//     // >
//       {images.map((image, index) => (
//         <img
//           key={index}
//           src={image}
//           alt={`image ${index + 1}`}

//           className="w-full h-[20rem] object-cover "
//         />
//       ))}
//     </Carousel>
//   );
// };

// const AgentDashboard = () => {
//   const rooms = [
//     {
//       title: "Single Room Near Unilag Akoka for students",
//       address: "112 University Road, Akoka, Yaba, Lagos",
//       price: "₦100,000/yr",
//       availability: "20 unit(s) available",
//       bookings: "15 renters have booked this listing",
//       communal: true,
//       extra_info: "362",
//       images: [
//         "https://res.cloudinary.com/dmlgns85e/image/upload/v1725052734/an_accommodation_interior_2_pf2qmg.jpg",
//         "https://res.cloudinary.com/dmlgns85e/image/upload/v1725052734/an_accommodation_interior_2_pf2qmg.jpg",
//       ],
//     },
//     {
//       title: "Shared Room Near FUTA Akure",
//       address: "2 Ondo Street, Akure, Ondo",
//       price: "₦60,000/yr",
//       availability: "12 unit(s) available",
//       bookings: "20 renters have booked this listing",
//       communal: true,
//       images: [
//         "https://res.cloudinary.com/dmlgns85e/image/upload/v1725052734/an_accommodation_interior_2_pf2qmg.jpg",
//         "https://res.cloudinary.com/dmlgns85e/image/upload/v1725052734/an_accommodation_interior_2_pf2qmg.jpg",
//       ],
//     },
//     {
//       title: "Single Room Near UI Ibadan for students",
//       address: "15 University Road, Ibadan, Oyo",
//       price: "₦80,000/yr",
//       availability: "10 unit(s) available",
//       bookings: "10 renters have booked this listing",
//       communal: true,
//       extra_info: "250",

//       images: [
//         "https://res.cloudinary.com/dmlgns85e/image/upload/v1725052734/an_accommodation_interior_2_pf2qmg.jpg",
//         "https://res.cloudinary.com/dmlgns85e/image/upload/v1725052734/an_accommodation_interior_2_pf2qmg.jpg",
//       ],
//     },
//     {
//       title: "Shared Room Near UNN Nsukka",
//       address: "3 University Road, Nsukka, Enugu",
//       price: "₦70,000/yr",
//       availability: "15 unit(s) available",
//       bookings: "18 renters have booked this listing",
//       communal: true,
//       images: [
//         "https://res.cloudinary.com/dmlgns85e/image/upload/v1725052734/an_accommodation_interior_2_pf2qmg.jpg",
//         "https://res.cloudinary.com/dmlgns85e/image/upload/v1725052734/an_accommodation_interior_2_pf2qmg.jpg",
//       ],
//     },
//   ];

//   const navigate = useNavigate();
//   const [agentData, setAgentData] = useState(null); // Use null initially
//   const [accessToken, setAccessToken] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   const fetchAgentDetails = async (token) => {
//     try {
//       setLoading(true); // Start loading
//       const response = await fetch(
//         "https://rent-it-api.onrender.com/api/v1/agents",
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`, // Pass token here
//           },
//         }
//       );

//       const result = await response.json();
//       console.log("API result:", result); // Log the full result for debugging
//       if (response.ok) {
//         setAgentData(result);
//         console.log(agentData);
//       } else {
//         console.log("Failed to fetch agent details");
//       }
//     } catch (error) {
//       console.log("Error:", error);
//     } finally {
//       setLoading(false); // End loading
//     }
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       setAccessToken(token);
//       fetchAgentDetails(token); // Fetch agent details only after token is set
//     }
//   }, []);
//   return (
//     <>
//       <div
//         className={`sidebar hidden lg:block fixed top-0 left-0 h-screen mt-20`}
//       >
//         <nav className=" bg-[#F4EBFF] p-[32px]  rounded-r-lg h-screen w-[370px] border">
//           <div className="flex items-center justify-between">
//             <div className="">
//               <h6>Hi, Adewale Williams</h6>
//             </div>

//             <button>
//               <img src={btn} />
//             </button>
//           </div>

//           <ul className=" mt-10 flex flex-col space-y-6">
//             <li className="flex items-center gap-10">
//               <button>
//                 <img src={icon} />
//               </button>
//               <a href="#home">My Listings</a>
//             </li>
//             <li className=" flex items-center gap-10">
//               <button>
//                 <img src={icon1} />
//               </button>
//               <a href="#services">Booking Requests</a>
//             </li>
//             <li className="flex items-center gap-10">
//               <button>
//                 <img src={icon2} />
//               </button>
//               <a href="#clients">Profile</a>
//             </li>
//           </ul>
//         </nav>
//       </div>
//       <div
//         className={`content mt-20 lg:ml-[23rem] xl:ml-[25rem] `}
//       >
//         <div className="">
//           {loading ? (
//             <Loader />
//           ) : (
//             <div className=" p-5 ">
//               <h2 className="font-bold text-lg">Dashboard - Listings</h2>

//               <div className="grid lg:grid-cols-2 gap-10 mt-7  max-w-[900px] grid-cols-1">
//                 {rooms.map((room) => (
//                   <div
//                     key={room.title}
//                     className="w-full   bg-white pb-3 shadow-sm rounded-b-lg"
//                   >
//                     <div className="relative">
//                     <CarouselCustomNavigation
//                       className="w-[30rem] rounded-t-lg h-[20rem]  "
//                       images={room.images}
//                     />

//                     <div className="absolute top-3">
//                      <div className="flex justify-between items-center">

//                      </div>
//                     </div>
//                     </div>
                   
//                     {/* <img
//                       src={room.image}
//                       className="w-[28rem] rounded-t-lg h-[22rem]  "
//                       alt="room image"
//                     /> */}
//                     <div className=" mt-3 p-2 rounded-b-lg">
//                       <h2 className="text-lg font-semibold">{room.title}</h2>

//                       <p className="text-sm">{room.address}</p>

//                       <div className="mt-2">
//                         <h1 className="text-2xl font-semibold">{room.price}</h1>

//                         <p className="text-sm mt-1">{room.availability}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };
// export default AgentDashboard;


import React from 'react'

function AgentDashboard() {
  return (
    <div>AgentDashboard</div>
  )
}

export default AgentDashboard