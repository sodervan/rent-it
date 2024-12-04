import { useEffect, useState } from "react";
import LoaderTwo from "../Components/Loaders/LoaderTwo.jsx";
import { useNavigate } from "react-router-dom"; // Importing the edit icon from react-icons
import EditProfile from "../Components/ProfileComponents/EditProfile.jsx";
import {IconBookmark, IconCreditCard, IconLock, IconUser}  from '@tabler/icons-react';
const RenterProfilePage = () => {
	const navigate = useNavigate();
	const [showEditProfile, setShowEditProfile] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [renterData, setRenterData] = useState([]);
	const [profilePic, setProfilePic] = useState(null);

	const logout = () => {
		localStorage.removeItem("userId");
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		localStorage.removeItem("accountType");
		localStorage.removeItem("profileImage");
		navigate("/");
		window.history.replaceState(null, "", "/");
		window.location.reload();
	};

	const removeProfileModal = () => {
		setShowEditProfile(false);
	};
	const fetchRenterDetails = async (accessToken: string) => {
		try {
			setIsLoading(true); // Start loading
			const response = await fetch(
				"https://rent-it-api.onrender.com/api/v1/users",
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			const result = await response.json();
			if (response.ok) {
				setRenterData(result);
				setProfilePic(result.payload?.profilePicLink); // Set profile picture
				console.log(result);
			} else {
				console.log("Failed to fetch renter details");
				setMessage("Error");
			}
		} catch (error) {
			console.log("Error:", error);
		} finally {
			setIsLoading(false); // End loading
		}
	};

	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			fetchRenterDetails(token);
		}
	}, []);

	return (
		<>
			<div>
				{isLoading ? (
					<div className="mt-20 px-6 flex justify-center w-full">
						<LoaderTwo />
					</div>
				) : (
					<div className="px-6 mt-20">
						<div className="flex flex-col h-full min-h-screen">
							<div>
								{/* Profile Section */}
								<div className="flex justify-center relative">
									<div className="relative border-4 border-white shadow-xl rounded-full">
										{/* <Avatar
											src={
												profilePic
													? profilePic
													: "https://res.cloudinary.com/dmlgns85e/image/upload/v1728420212/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8_xhafna.jpg"
											}
											alt="Profile"
											size="xxl"
										/> */}
									</div>
								</div>

								{/* Renter details */}
								<div className="flex flex-col items-center justify-center mt-2">
									<p className="font-medium text-[18px] mb-1">
										{renterData?.payload?.lastname}{" "}
										{renterData?.payload?.firstname}
									</p>
									<p className="text-[16px] text-gray-600">
										{renterData?.payload?.email}
									</p>
								</div>

								{/* Options Section */}
								<div className="flex flex-col gap-4 mt-10">
									<div
										onClick={() => {
											setShowEditProfile(true);
										}}
										className="flex gap-2 items-center w-full py-2 px-3 rounded-lg hover:bg-gray-200 transition-all duration-300 cursor-pointer"
									>
										<div className="text-gray-700">
											<FiEdit />
										</div>
										<div className="text-gray-700">
											<p>Edit Profile</p>
										</div>
									</div>

									<div className="flex gap-2 items-center w-full py-2 px-3 rounded-lg hover:bg-gray-200 transition-all duration-300 cursor-pointer">
										<div className="text-gray-700">
											<IconBookmark />
										</div>
										<div className="text-gray-700">
											<p>Booking History</p>
										</div>
									</div>

									<div className="flex gap-2 items-center w-full py-2 px-3 rounded-lg hover:bg-gray-200 transition-all duration-300 cursor-pointer">
										<div className="text-gray-700">
											<IconCreditCard />
										</div>
										<div className="text-gray-700">
											<p>Transaction History</p>
										</div>
									</div>

									<div className="flex gap-2 items-center w-full py-2 px-3 rounded-lg hover:bg-gray-200 transition-all duration-300 cursor-pointer">
										<div className="text-gray-700">
											<IconLock />
										</div>
										<div className="text-gray-700">
											<p>Change Password</p>
										</div>
									</div>
								</div>
							</div>

							{/* Button at the bottom */}
							<div className="mt-16 mb-5">
								<button
									onClick={logout}
									className="w-full bg-primaryPurple text-white rounded-lg p-3 hover:shadow-lg transition-all duration-300"
								>
									Logout
								</button>
							</div>
						</div>
						{showEditProfile && (
							<div className="w-full h-screen bg-black opacity-40 fixed z-30 left-0 top-0 transition-all duration-300"></div>
						)}
						<EditProfile
							cancel={removeProfileModal}
							isVisible={showEditProfile}
							fetchRenterDetails={fetchRenterDetails}
							profileImage={profilePic}
							firstName={renterData?.payload?.firstname}
							lastName={renterData?.payload?.lastname}
							email={renterData?.payload?.email}
							phoneNumber={renterData?.payload?.phoneNumber}
						/>
					</div>
				)}
			</div>
		</>
	);
};

export default RenterProfilePage;
