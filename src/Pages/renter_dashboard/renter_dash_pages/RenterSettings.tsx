import { Input, Tabs } from "@mantine/core";
import {
	IconBell,
	IconBookmark,
	IconEdit,
	IconLock,
	IconSearch,
} from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import RenterBookings from "../renter_dash_comps/RenterBookings";

const RenterSettings = () => {
	const [activeTab, setActiveTab] = useState<string | null>("first");
	return (
		<div>
			<div className="h-20 border-b w-full flex px-2">
				<div className="flex items-center mr-auto w-full max-w-[500px]">
					<Input
						leftSection={<IconSearch />}
						className="] w-full"
					/>
				</div>
				<div className="flex items-center gap-4">
					<Link to="/">Saved</Link>
					<Link to="/">Listing</Link>
					<Link to="/">
						<IconBell />
					</Link>
				</div>
			</div>

			<div className="p-2 flex gap-4 ">
				<div className="max-w-[200px] w-full flex flex-col gap-1 sticky top-0 bg-red-400  items-center pt-2 h-fit">
					<div className="h-24 w-24 rounded-full bg-red-200"></div>
					<div>Name</div>
					<div>Emails</div>
				</div>
				<div className="w-full p-2 flex flex-col ">
					<h2>Profile</h2>
					<div className="mt-4 max-w-[500px]">
						<Tabs
							value={activeTab}
							onChange={setActiveTab}
						>
							<Tabs.List>
								<Tabs.Tab
									leftSection={<IconEdit />}
									value="first"
								>
									Edit Profile
								</Tabs.Tab>
								<Tabs.Tab
									leftSection={<IconBookmark />}
									value="second"
								>
									Bookings
								</Tabs.Tab>
								<Tabs.Tab
									leftSection={<IconLock />}
									value="third"
								>
									Change Password
								</Tabs.Tab>
							</Tabs.List>

							<Tabs.Panel value="first">
								<div className="flex flex-col">
									<h2 className="mt-4">Edit Profile</h2>
									<div className="mt-4 flex flex-col gap-3">
										<div className="">
											<p className="text-gray-700 mb-2 text-sm ">
												First Name
											</p>
											<Input placeholder="First Name" />
										</div>
										<div className="">
											<p className="text-gray-700 mb-2 text-sm">
												Last Name
											</p>
											<Input placeholder="Last Name" />
										</div>
										<div className="">
											<p className="text-gray-700 mb-2 text-sm">
												Email
											</p>
											<Input
												type="email"
												placeholder="Email"
											/>
										</div>
										<div className="">
											<p className="text-gray-700 mb-2 text-sm">
												Mobile Number
											</p>
											<Input placeholder="Mobile Number" />
										</div>
									</div>
								</div>
							</Tabs.Panel>
							<Tabs.Panel value="second">
								<RenterBookings />
							</Tabs.Panel>
							<Tabs.Panel value="third">
								<h2 className="mt-4">Change Password</h2>
								<div className="mt-4 flex flex-col gap-4">
									<div>
										<p className="text-gray-600 mb-2 text-sm">
											Current Password
										</p>
										<Input placeholder="Current Password" />
									</div>
									<div>
										<p className="text-gray-600 mb-2 text-sm">
											New Password
										</p>
										<Input placeholder="New Password" />
									</div>
									<div>
										<p className="text-gray-600 mb-2 text-sm">
											Confirm Password
										</p>
										<Input placeholder="Confirm  Password" />
									</div>
								</div>
							</Tabs.Panel>
						</Tabs>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RenterSettings;
