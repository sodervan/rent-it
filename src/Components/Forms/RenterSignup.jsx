import { NavLink } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { Input } from "@material-tailwind/react";

const RenterSignup = () => {
  return (
    <>
      <div className="mt-20 flex flex-col lg:flex-row px-6 gap-3">
        <div className="w-full lg:w-[50%] flex items-center">
          <div className="lg:px-20 w-full">
            <div className="flex items-center justify-center mb-6">
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString(
                      '<strong style="font-size: 16px; font-weight: 400">WELCOME! TO <span style="color: #6941C6;">RentIT</span></strong>',
                    )
                    .pauseFor(2500)
                    .start();
                }}
              />
            </div>
            <p className="font-semibold text-center">Create a New Account</p>
            <div className="flex flex-col gap-5 my-5">
              <div className="w-full">
                <div className="flex items-center gap-3 px-3 w-full rounded-[10px]">
                  <div>
                    <i className="fi fi-rr-user text-primaryPurple"></i>
                  </div>
                  <div className="w-full">
                    <Input label="First Name" />
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="flex items-center gap-3 px-3 w-full rounded-[10px]">
                  <div>
                    <i className="fi fi-rr-user text-primaryPurple"></i>
                  </div>
                  <div className="w-full">
                    <Input label="Last Name" />
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="flex items-center gap-3 px-3 w-full rounded-[10px]">
                  <div>
                    <i className="fi fi-rr-mailbox text-primaryPurple"></i>
                  </div>
                  <div className="w-full">
                    <Input label="Email Address" />
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="flex items-center gap-3 px-3 w-full rounded-[10px]">
                  <div>
                    <i className="fi fi-rr-phone-call text-primaryPurple"></i>
                  </div>
                  <div className="w-full">
                    <Input label="Mobile Number" />
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="flex items-center gap-3 px-3 w-full rounded-[10px]">
                  <div>
                    <i className="fi fi-rr-lock text-primaryPurple"></i>
                  </div>
                  <div className="w-full">
                    <Input label="Password" type="password"/>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="flex items-center gap-3 px-3 w-full rounded-[10px]">
                  <div>
                    <i className="fi fi-rr-lock text-primaryPurple"></i>
                  </div>
                  <div className="w-full">
                    <Input label="Confirm Password" type="password"/>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-700">
                  Have an account with Us?{" "}
                  <span>
                    <NavLink
                      to="/renter-login"
                      className="underline text-primaryPurple"
                    >
                      Login
                    </NavLink>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RenterSignup;
