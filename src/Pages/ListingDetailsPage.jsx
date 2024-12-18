import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Avatar, Rating, Spinner } from "@material-tailwind/react";
import TheFooter from "../Components/TheFooter.jsx";
import BookMarkListingModal from "../Components/Modals/BookMarkListingModal.jsx";
import ChatAgentModal from "../Components/Modals/ChatAgentModal.jsx";
const firebaseUrl =
	"https://rentit-c3304-default-rtdb.firebaseio.com/locations.json";
const ListingDetailsPage = () => {
	const { id, index } = useParams();
	const [selected, setSelected] = useState(null);
	const [toggleBookListingModal, setToggleListingModal] = useState(false);
	const [toggleChat, setToggleChat] = useState(false);

	const updateChatAgentModal = () => {
		setToggleChat(true);
	};

	const closeChatModal = () => {
		setToggleChat(false);
	};
	const updateBookListingModal = () => {
		setToggleListingModal(true);
	};
	const closeModal = () => {
		setToggleListingModal(false);
	};

	const dateFormatter = (prop) => {
		const dateStr = prop;
		const dateObj = new Date(dateStr);
		const options = { year: "numeric", month: "long", day: "numeric" };

		return dateObj.toLocaleDateString("en-US", options);
	};

	const getDataFromFirebase = async () => {
		try {
			const response = await fetch(firebaseUrl, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				throw new Error("Failed to receive data from Firebase");
			}

			const result = await response.json();

			console.log("Data received successfully:", result);

			if (result.length > 0) {
				const foundDetail = result.find(
					(item) => item.id === Number(id)
				);

				if (
					foundDetail &&
					foundDetail.accommodations &&
					foundDetail.accommodations[index]
				) {
					setSelected(foundDetail.accommodations[index]);
				} else {
					console.error("Accommodation not found");

				}
			}
		} catch (error) {
      
			console.error("Error receiving data:", error);
		}
	};

	useEffect(() => {
		getDataFromFirebase();
	}, []);

	useEffect(() => {
		console.log(selected);
	}, [selected]);

	return (
		<>
			{selected ? (
				<div className="container mx-auto">
					<div className="mt-20 px-6 flex items-center justify-center ">
						<div className="flex flex-col h-[350px] rounded-lg shadow-lg w-[280px] min-w-full">
							<div className="h-[60%] rounded-t-[15px] rounded-b-[20px] overflow-hidden relative">
								<div className="flex items-center justify-between absolute top-2 left-3 w-full z-[100]">
									<div className="bg-[#F4EBFF] p-2 rounded-xl">
										<p className="text-[12px] font-[600] text-[#1D2939]">
											{selected.type}
										</p>
									</div>
									<div className="flex gap-1 mr-5">
										<div className="h-8 w-8 bg-[#F4EBFF] rounded-full flex items-center justify-center">
											<i className="fi fi-rr-heart text-[12px]"></i>
										</div>
										<div className="h-8 w-8 bg-[#F4EBFF] rounded-full flex items-center justify-center">
											<i className="fi fi-rr-share text-[12px]"></i>
										</div>
									</div>
								</div>
								<div className="bg-[#F4EBFF] px-2 py-1 rounded-full mx-auto absolute z-[100] bottom-2 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
									<div>
										<p className="text-[12px] text-primaryPurple whitespace-nowrap">
											<span className="text-sm font-semibold">
												{selected.rentersBooked + " "}
											</span>
											renters have booked this listing
										</p>
									</div>
								</div>
								<img
									src={selected.poster}
									alt="#"
									className={`w-full h-full object-cover transition-transform duration-500`}
								/>
							</div>

							<div className="h-[40%] p-2 flex flex-col gap-2 justify-center">
								<p className="text-sm font-bold">
									{selected.name}
								</p>
								<div className="flex gap-1 items-center">
									<p className="text-[15px] text-gray-600">
										{`N ${selected.price.toLocaleString()}`}
									</p>
									<p className=" text-xs bg-[#D7D6FD] font-light px-2 rounded-full">
										{selected.frequency}
									</p>
								</div>
								<div className="flex items-center gap-1">
									<i className="fi fi-rr-text-box text-[#FF3D3D]"></i>
									<p className="text-xs">
										Units Available:{" "}
										{selected.unitsAvailable}
									</p>
								</div>
								<div className="flex items-center gap-1">
									<i className="fi fi-rr-marker text-[#FF3D3D]"></i>
									<p className="text-xs">
										{selected.address}
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="px-6 my-4 flex items-center gap-3">
						<button className="flex gap-2 bg-secondaryPurple font-semibold items-center px-4 py-3 mb-4 text-primaryPurple text-[14px] rounded-lg button hover:bg-primaryPurple hover:text-white hover:shadow-lg transition-all duration-300">
							<img
								src="https://res.cloudinary.com/dmlgns85e/image/upload/v1727450643/Icon_qtwzhu.png"
								alt="#"
							/>
							Virtual Tour
						</button>
						<button className="flex gap-2 bg-secondaryPurple items-center font-semibold px-4 py-3 mb-4 text-primaryPurple text-[14px] rounded-lg button hover:bg-primaryPurple hover:text-white hover:shadow-lg transition-all duration-300">
							<i className="fi fi-rr-images"></i>
							View Images
						</button>
					</div>
					<div className="px-6 my-10">
						<div>
							<p className="font-semibold">Listing Agent</p>
						</div>
						<div className="my-4 flex gap-2 items-center">
							<div className="border-2 border-white shadow-xl rounded-full">
								<Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" />
							</div>
							<div>
								<div className="mb-2">
									<p className="underline underline-offset-2">
										{selected.agentName}
									</p>
								</div>
								<div className="flex gap-1 rounded-sm border border-gray-200 items-center my-1">
									<div className="bg-gray-200 px-2">
										<Rating
											value={Math.floor(selected.rating)}
											readonly
											ratedColor="amber"
										/>
									</div>
									<div className="py-1 px-2">
										<p>{selected.rating}</p>
									</div>
								</div>
							</div>
						</div>
						<div className="flex flex-col items-start">
							<button
								onClick={updateChatAgentModal}
								className="flex gap-2 bg-secondaryPurple px-3 py-2 rounded-lg items-center mb-4 hover:shadow-lg transition-all duration-300"
							>
								<div>
									<img
										src="https://res.cloudinary.com/dmlgns85e/image/upload/v1727450644/message-circle_idlcwx.png"
										alt="#"
									/>
								</div>
								<div>
									<p className="text-primaryPurple font-semibold text-[14px]">
										Chat with Agent
									</p>
								</div>
							</button>

							<button
								onClick={updateBookListingModal}
								className="flex gap-2 bg-primaryPurple px-3 py-2 rounded-lg items-center hover:shadow-lg transition-all duration-300"
							>
								<div>
									<img
										src="https://res.cloudinary.com/dmlgns85e/image/upload/v1727450643/Iconn_wh7ixj.png"
										alt="#"
									/>
								</div>
								<div>
									<p className="text-white font-semibold text-[14px]">
										Book Listing
									</p>
								</div>
							</button>
						</div>
					</div>
					<div className="px-6">
						<div>
							<p className="font-semibold mb-4">Cost Breakdown</p>
						</div>
						<div className="flex flex-col w-full rounded-[20px] border-2 border-[#E9D7FE] mb-7">
							<div className="px-4 py-5 flex items-center rounded-t-[20px] justify-between bg-[#E9D7FE]">
								<div>
									<p className="font-semibold text-[14px]">
										Base Cost
									</p>
								</div>
								<div>
									<p className="text-[14px]">
										N {selected.price}
									</p>
								</div>
							</div>

							<div className="px-4 py-5 flex items-center justify-between">
								<div>
									<p className="font-semibold text-[14px]">
										Agent's Fee
									</p>
								</div>
								<div>
									<p className="text-[14px]">N 10,000</p>
								</div>
							</div>

							<div className="px-4 py-5 flex items-center justify-between bg-[#E9D7FE]">
								<div>
									<p className="font-semibold text-[14px]">
										Agreement Fee
									</p>
								</div>
								<div>
									<p className="text-[14px]">N 25,000</p>
								</div>
							</div>

							<div className="px-4 py-5 flex items-center justify-between">
								<div>
									<p className="font-semibold text-[14px]">
										Caution Fee
									</p>
								</div>
								<div>
									<p className="text-[14px]">N 75,000</p>
								</div>
							</div>

							<div className="px-4 py-5 flex items-center justify-between rounded-b-[20px] bg-[#E9D7FE]">
								<div>
									<p className="font-semibold">TOTAL</p>
								</div>
								<div>
									<p className="font-semibold">
										N{" "}
										{Number(selected.price) +
											10000 +
											25000 +
											75000}
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className="px-6 my-6">
						<p className="font-semibold mt-6 mb-3">Description</p>
						<div className="text-[14px]">
							<p>{selected.description}</p>
						</div>
					</div>

					<div className="my-8 bg-[#E9D7FE] py-4">
						<div className="px-6">
							<div className="mb-3">
								<p className="font-semibold">Features</p>
							</div>
							<div className="flex flex-col gap-2">
								<div>
									<p className="font-semibold text-[14px]">
										Date Listed:{" "}
										<span className="font-normal">
											{dateFormatter(
												selected.features.dateListed
											)}
										</span>
									</p>
								</div>
								<div>
									<p className="font-semibold text-[14px]">
										Type:{" "}
										<span className="font-normal">
											{selected.features.type}
										</span>
									</p>
								</div>
								<div>
									<p className="font-semibold text-[14px]">
										Electricity:{" "}
										<span className="font-normal">
											{
												selected.features
													.electricityStatus
											}
										</span>
									</p>
								</div>
							</div>
						</div>
					</div>
					{/*Bills Included*/}
					<div className="my-8 bg-[#E9D7FE] py-4">
						<div className="px-6">
							<div className="mb-3">
								<p className="font-semibold">Bills Included</p>
							</div>
							<div className="flex flex-col gap-2">
								{selected.billsIncluded.map((item, index) => (
									<div
										key={index}
										className="flex gap-1 items-center"
									>
										<div className="h-2 w-2 rounded-full bg-[#475467]"></div>
										<p className="text-[14px]">{item}</p>
									</div>
								))}
							</div>
						</div>
					</div>
					{/*Property Rules*/}
					<div className="my-8 bg-[#E9D7FE] py-4">
						<div className="px-6">
							<div className="mb-3">
								<p className="font-semibold">Property Rules</p>
							</div>
							<div className="flex flex-col gap-2">
								{selected.propertyRules.map((item, index) => (
									<div
										key={index}
										className="flex gap-1 items-center"
									>
										<div className="h-2 w-2 rounded-full bg-[#475467]"></div>
										<p className="text-[14px]">{item}</p>
									</div>
								))}
							</div>
							<p className="text-primaryPurple text-[14px] cursor-pointer mt-2 underline">
								Check Tenancy Agreement for more Info
							</p>
						</div>
					</div>
					{/*Landmarks*/}
					<div className="my-8 bg-[#E9D7FE] py-4">
						<div className="px-6">
							<div className="mb-3">
								<p className="font-semibold">Landmarks</p>
							</div>
							<div className="flex flex-col gap-2">
								{selected.landmarks.map((item, index) => (
									<div
										key={index}
										className="flex gap-1 items-center"
									>
										<div className="h-2 w-2 rounded-full bg-[#475467]"></div>
										<p className="text-[14px]">{item}</p>
									</div>
								))}
							</div>
							<p className="text-primaryPurple text-[14px] cursor-pointer mt-2 underline">
								View map to check out other places of interest
							</p>
						</div>
					</div>
					<button className="px-2 py-2 bg-[#D92D20] text-white mx-6 rounded-lg mb-10 text-[14px]">
						Report Listing
					</button>

					<p className="px-6 font-semibold mb-5 text-center">
						Listings Nearby
					</p>
					<div className="w-full overflow-x-auto mb-10">
						<div className="px-6 flex items-center gap-4">
							<div className="flex flex-col h-[350px] rounded-lg shadow-lg w-[280px] min-w-[280px]">
								<div className="h-[60%] rounded-t-[15px] rounded-b-[20px] overflow-hidden relative">
									<div className="flex items-center justify-between absolute top-2 left-3 w-full z-[100]">
										<div className="bg-[#F4EBFF] p-2 rounded-xl">
											<p className="text-[12px] font-[600] text-[#1D2939]">
												{selected.type}
											</p>
										</div>
										<div className="flex gap-1 mr-5">
											<div className="h-8 w-8 bg-[#F4EBFF] rounded-full flex items-center justify-center">
												<i className="fi fi-rr-heart text-[12px]"></i>
											</div>
											<div className="h-8 w-8 bg-[#F4EBFF] rounded-full flex items-center justify-center">
												<i className="fi fi-rr-share text-[12px]"></i>
											</div>
										</div>
									</div>
									<div className="bg-[#F4EBFF] px-2 py-1 rounded-full mx-auto absolute z-[100] bottom-2 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
										<div>
											<p className="text-[12px] text-primaryPurple whitespace-nowrap">
												<span className="text-sm font-semibold">
													{selected.rentersBooked +
														" "}
												</span>
												renters have booked this listing
											</p>
										</div>
									</div>
									<img
										src={selected.poster}
										alt="#"
										className={`w-full h-full object-cover transition-transform duration-500`}
									/>
								</div>

								<div className="h-[40%] p-2 flex flex-col gap-2 justify-center">
									<p className="text-sm font-bold">
										{selected.name}
									</p>
									<div className="flex gap-1 items-center">
										<p className="text-[15px] text-gray-600">
											{`N ${selected.price.toLocaleString()}`}
										</p>
										<p className=" text-xs bg-[#D7D6FD] font-light px-2 rounded-full">
											{selected.frequency}
										</p>
									</div>
									<div className="flex items-center gap-1">
										<i className="fi fi-rr-text-box text-[#FF3D3D]"></i>
										<p className="text-xs">
											Units Available:{" "}
											{selected.unitsAvailable}
										</p>
									</div>
									<div className="flex items-center gap-1">
										<i className="fi fi-rr-marker text-[#FF3D3D]"></i>
										<p className="text-xs">
											{selected.address}
										</p>
									</div>
								</div>
							</div>

							<div className="flex flex-col h-[350px] rounded-lg shadow-lg w-[280px] min-w-[280px]">
								<div className="h-[60%] rounded-t-[15px] rounded-b-[20px] overflow-hidden relative">
									<div className="flex items-center justify-between absolute top-2 left-3 w-full z-[100]">
										<div className="bg-[#F4EBFF] p-2 rounded-xl">
											<p className="text-[12px] font-[600] text-[#1D2939]">
												{selected.type}
											</p>
										</div>
										<div className="flex gap-1 mr-5">
											<div className="h-8 w-8 bg-[#F4EBFF] rounded-full flex items-center justify-center">
												<i className="fi fi-rr-heart text-[12px]"></i>
											</div>
											<div className="h-8 w-8 bg-[#F4EBFF] rounded-full flex items-center justify-center">
												<i className="fi fi-rr-share text-[12px]"></i>
											</div>
										</div>
									</div>
									<div className="bg-[#F4EBFF] px-2 py-1 rounded-full mx-auto absolute z-[100] bottom-2 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
										<div>
											<p className="text-[12px] text-primaryPurple whitespace-nowrap">
												<span className="text-sm font-semibold">
													{selected.rentersBooked +
														" "}
												</span>
												renters have booked this listing
											</p>
										</div>
									</div>
									<img
										src={selected.poster}
										alt="#"
										className={`w-full h-full object-cover transition-transform duration-500`}
									/>
								</div>

								<div className="h-[40%] p-2 flex flex-col gap-2 justify-center">
									<p className="text-sm font-bold">
										{selected.name}
									</p>
									<div className="flex gap-1 items-center">
										<p className="text-[15px] text-gray-600">
											{`N ${selected.price.toLocaleString()}`}
										</p>
										<p className=" text-xs bg-[#D7D6FD] font-light px-2 rounded-full">
											{selected.frequency}
										</p>
									</div>
									<div className="flex items-center gap-1">
										<i className="fi fi-rr-text-box text-[#FF3D3D]"></i>
										<p className="text-xs">
											Units Available:{" "}
											{selected.unitsAvailable}
										</p>
									</div>
									<div className="flex items-center gap-1">
										<i className="fi fi-rr-marker text-[#FF3D3D]"></i>
										<p className="text-xs">
											{selected.address}
										</p>
									</div>
								</div>
							</div>

							<div className="flex flex-col h-[350px] rounded-lg shadow-lg w-[280px] min-w-[280px]">
								<div className="h-[60%] rounded-t-[15px] rounded-b-[20px] overflow-hidden relative">
									<div className="flex items-center justify-between absolute top-2 left-3 w-full z-[100]">
										<div className="bg-[#F4EBFF] p-2 rounded-xl">
											<p className="text-[12px] font-[600] text-[#1D2939]">
												{selected.type}
											</p>
										</div>
										<div className="flex gap-1 mr-5">
											<div className="h-8 w-8 bg-[#F4EBFF] rounded-full flex items-center justify-center">
												<i className="fi fi-rr-heart text-[12px]"></i>
											</div>
											<div className="h-8 w-8 bg-[#F4EBFF] rounded-full flex items-center justify-center">
												<i className="fi fi-rr-share text-[12px]"></i>
											</div>
										</div>
									</div>
									<div className="bg-[#F4EBFF] px-2 py-1 rounded-full mx-auto absolute z-[100] bottom-2 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
										<div>
											<p className="text-[12px] text-primaryPurple whitespace-nowrap">
												<span className="text-sm font-semibold">
													{selected.rentersBooked +
														" "}
												</span>
												renters have booked this listing
											</p>
										</div>
									</div>
									<img
										src={selected.poster}
										alt="#"
										className={`w-full h-full object-cover transition-transform duration-500`}
									/>
								</div>

								<div className="h-[40%] p-2 flex flex-col gap-2 justify-center">
									<p className="text-sm font-bold">
										{selected.name}
									</p>
									<div className="flex gap-1 items-center">
										<p className="text-[15px] text-gray-600">
											{`N ${selected.price.toLocaleString()}`}
										</p>
										<p className=" text-xs bg-[#D7D6FD] font-light px-2 rounded-full">
											{selected.frequency}
										</p>
									</div>
									<div className="flex items-center gap-1">
										<i className="fi fi-rr-text-box text-[#FF3D3D]"></i>
										<p className="text-xs">
											Units Available:{" "}
											{selected.unitsAvailable}
										</p>
									</div>
									<div className="flex items-center gap-1">
										<i className="fi fi-rr-marker text-[#FF3D3D]"></i>
										<p className="text-xs">
											{selected.address}
										</p>
									</div>
								</div>
							</div>

							<div className="flex flex-col h-[350px] rounded-lg shadow-lg w-[280px] min-w-[280px]">
								<div className="h-[60%] rounded-t-[15px] rounded-b-[20px] overflow-hidden relative">
									<div className="flex items-center justify-between absolute top-2 left-3 w-full z-[100]">
										<div className="bg-[#F4EBFF] p-2 rounded-xl">
											<p className="text-[12px] font-[600] text-[#1D2939]">
												{selected.type}
											</p>
										</div>
										<div className="flex gap-1 mr-5">
											<div className="h-8 w-8 bg-[#F4EBFF] rounded-full flex items-center justify-center">
												<i className="fi fi-rr-heart text-[12px]"></i>
											</div>
											<div className="h-8 w-8 bg-[#F4EBFF] rounded-full flex items-center justify-center">
												<i className="fi fi-rr-share text-[12px]"></i>
											</div>
										</div>
									</div>
									<div className="bg-[#F4EBFF] px-2 py-1 rounded-full mx-auto absolute z-[100] bottom-2 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
										<div>
											<p className="text-[12px] text-primaryPurple whitespace-nowrap">
												<span className="text-sm font-semibold">
													{selected.rentersBooked +
														" "}
												</span>
												renters have booked this listing
											</p>
										</div>
									</div>
									<img
										src={selected.poster}
										alt="#"
										className={`w-full h-full object-cover transition-transform duration-500`}
									/>
								</div>

								<div className="h-[40%] p-2 flex flex-col gap-2 justify-center">
									<p className="text-sm font-bold">
										{selected.name}
									</p>
									<div className="flex gap-1 items-center">
										<p className="text-[15px] text-gray-600">
											{`N ${selected.price.toLocaleString()}`}
										</p>
										<p className=" text-xs bg-[#D7D6FD] font-light px-2 rounded-full">
											{selected.frequency}
										</p>
									</div>
									<div className="flex items-center gap-1">
										<i className="fi fi-rr-text-box text-[#FF3D3D]"></i>
										<p className="text-xs">
											Units Available:{" "}
											{selected.unitsAvailable}
										</p>
									</div>
									<div className="flex items-center gap-1">
										<i className="fi fi-rr-marker text-[#FF3D3D]"></i>
										<p className="text-xs">
											{selected.address}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<TheFooter />
					{toggleBookListingModal && (
						<BookMarkListingModal
							closeModal={closeModal}
							unitsAvailable={selected.unitsAvailable}
						/>
					)}
					{toggleChat && (
						<ChatAgentModal
							closeModal={closeChatModal}
							agentName={selected.agentName}
						/>
					)}
				</div>
			) : (
				<div className="w-full h-screen flex items-center justify-center">
					<Spinner className="w-10 h-10" />
				</div>
			)}
		</>
	);
};

export default ListingDetailsPage;
