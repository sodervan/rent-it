import React from "react";
import { useState } from "react";
import { useRef } from "react";

const AgentProfile = () => {
  const filePickerRef = useRef();
  const [toggle, setToggleState] = useState(1);
  const [imageFile, setImageFile] = useState(null);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  return (
    <div className="flex flex-col lg:flex-row mt-[5rem] max-w-[1100px] w-[95%] mx-auto md:mx-16 gap-10  min-h-screen p-4">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 p-4 bg-white rounded-lg mb-4 lg:mb-0">
        <div className="flex flex-col  items-center text-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={filePickerRef}
            hidden
          />
          <div
            className="relative  self-center cursor-pointer w-32 h-32 shadow-md overflow-hidden rounded-full"
            onClick={() => filePickerRef.current.click()}
          >
            <img
              src="https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ="
              alt="Profile"
              className=" object-cover border-8 border-[lightgray] w-full h-full rounded-full"
            />
          </div>

          <h2 className="mt-2 font-semibold text-lg">Adesina Adebayo</h2>
          <p className="text-sm text-gray-500">adesinabayo@yahoo.com</p>
        </div>
        <div className="mt-6">
          <button className="w-full py-2 mb-4 text-white bg-purple-500 rounded hover:bg-purple-600">
            Dashboard
          </button>
          <button className="w-full py-2 bg-[#FEF3F2] text-[#B42318] rounded hover:text-white hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4  rounded-lg ">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-xl font-semibold">Profile</h1>
        </div>

        {/* Tab */}
        <div className="my-2">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
            <button onClick={() => toggleTab(1)} className="me-2 ">
              <a
                href="#"
                className={`${
                  toggle === 1
                    ? "inline-flex gap-2 text-lg items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                    : "inline-flex gap-2 text-lg items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
                }  `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <g clip-path="url(#clip0_2311_2305)">
                    <path
                      d="M9.16602 3.33332H3.33268C2.89065 3.33332 2.46673 3.50891 2.15417 3.82147C1.84161 4.13403 1.66602 4.55796 1.66602 4.99999V16.6667C1.66602 17.1087 1.84161 17.5326 2.15417 17.8452C2.46673 18.1577 2.89065 18.3333 3.33268 18.3333H14.9993C15.4414 18.3333 15.8653 18.1577 16.1779 17.8452C16.4904 17.5326 16.666 17.1087 16.666 16.6667V10.8333M15.416 2.08332C15.7475 1.7518 16.1972 1.56555 16.666 1.56555C17.1349 1.56555 17.5845 1.7518 17.916 2.08332C18.2475 2.41484 18.4338 2.86448 18.4338 3.33332C18.4338 3.80216 18.2475 4.2518 17.916 4.58332L9.99935 12.5L6.66602 13.3333L7.49935 9.99999L15.416 2.08332Z"
                      stroke="#475467"
                      stroke-width="1.67"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2311_2305">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Profile
              </a>
            </button>
            <button onClick={() => toggleTab(2)} className="me-2">
              <a
                href="#"
                className={`${
                  toggle === 2
                    ? "inline-flex gap-2 text-lg items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                    : "inline-flex gap-2 text-lg items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
                }  `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M5.83333 9.16663V5.83329C5.83333 4.72822 6.27232 3.66842 7.05372 2.88701C7.83512 2.10561 8.89493 1.66663 10 1.66663C11.1051 1.66663 12.1649 2.10561 12.9463 2.88701C13.7277 3.66842 14.1667 4.72822 14.1667 5.83329V9.16663M4.16667 9.16663H15.8333C16.7538 9.16663 17.5 9.91282 17.5 10.8333V16.6666C17.5 17.5871 16.7538 18.3333 15.8333 18.3333H4.16667C3.24619 18.3333 2.5 17.5871 2.5 16.6666V10.8333C2.5 9.91282 3.24619 9.16663 4.16667 9.16663Z"
                    stroke="#475467"
                    stroke-width="1.67"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Password
              </a>
            </button>
          </ul>
        </div>

        <div className={`${toggle === 1 ? "block" : "hidden"}`}>
          <form className="space-y-6">
            <div className="grid grid-cols-1  gap-4">
              <h2 className="my-2 font-semibold ">Basic Details</h2>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Adesina"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Adebayo"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1  gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="adesinabayo@yahoo.com"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Mobile Number
                </label>
                <input
                  type="text"
                  placeholder="08023242526"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Office Address */}
            <div>
              <h2 className="text-base font-semibold mb-2">Office Address</h2>
              <div className="grid grid-cols-1  gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    placeholder="Address Line 1"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    LGA
                  </label>
                  <input
                    type="text"
                    placeholder="LGA"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    State
                  </label>
                  <input
                    type="text"
                    placeholder="State"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 text-white bg-purple-500 rounded hover:bg-purple-600"
            >
              Save Changes
            </button>
          </form>
        </div>

        {/* Change Password */}

        <div className={`${toggle === 2 ? "block" : "hidden"}`}>
          <form className="space-y-6">
            <div className="grid grid-cols-1  gap-4">
              <h2 className="text-base font-semibold my-2">Change Password</h2>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Change Password
                </label>
                <input
                  type="password"
                  placeholder="Password123"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder=""
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  placeholder=""
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 text-white bg-purple-500 rounded hover:bg-purple-600"
            >
              Rest Password
            </button>

            <button
              type="submit"
              className="w-full py-2 text-black bg-white rounded hover:bg-purple-600"
            >
              Forget Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;