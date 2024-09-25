import { NavLink } from "react-router-dom";

const RenterLogin = () => {
  return (
    <div className="mt-20 flex flex-col lg:flex-row w-[90%] mx-auto border border-[#aaa] rounded-[20px] gap-3">
      <div className="w-full lg:w-[50%] bg-[#F3F2FF] rounded-[20px] flex items-center justify-center py-5 px-4">
        <img
          src="https://res.cloudinary.com/dmlgns85e/image/upload/v1725266163/Group_106_ltr5gs.png"
          alt="#"
        />
      </div>
      <div className="w-full lg:w-[50%] flex items-center">
        <div className="px-5 lg:px-20 w-full">
          <p className="font-semibold">
            LOGIN TO <span className="text-primaryPurple">RentIT</span>
          </p>
          <div className="w-full my-4">
            <div className="flex items-center gap-3 border border-[#939393] px-3 w-full rounded-[10px]">
              <div>
                <i className="fi fi-rr-envelope text-primaryPurple"></i>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter your e-mail address"
                  className="border-none w-full focus:ring-0"
                />
              </div>
            </div>
          </div>

          <div className="w-full my-4">
            <div className="flex items-center justify-between gap-3 border border-[#939393] px-3 w-full rounded-[10px]">
              <div className="flex items-center gap-3">
                <div>
                  <i className="fi fi-rr-lock text-primaryPurple"></i>
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    className="border-none w-full focus:ring-0"
                  />
                </div>
              </div>
              <div>
                <i className="fi fi-rr-eye"></i>
              </div>
            </div>

            <div className="my-4 w-full">
              <div className="flex flex-col md:flex-row items-center justify-between gap-2 w-full">
                <div className="flex items-center bg-primaryPurple py-3 px-6 rounded-[20px] justify-between flex-1 w-full md:w-auto">
                  <button className="text-white">Login</button>
                  <i className="fi fi-rr-sign-in-alt text-white"></i>
                </div>
                <div className="flex items-center justify-center w-full md:w-auto">
                  <p>OR</p>
                </div>
                <div className="flex items-center gap-2 whitespace-nowrap bg-[#F9F5FF] border border-primaryPurple py-3 px-8 rounded-[20px] flex-1 w-full md:w-auto">
                  <div className="w-4">
                    <img
                      src="https://res.cloudinary.com/dmlgns85e/image/upload/v1725270652/4520ddfc56208707045c56232e946f7f_ckvowu.jpg"
                      alt="#"
                    />
                  </div>
                  <div>
                    <p className="text-primaryPurple">Sign in with Google</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-700">
              Don't have an account?{" "}
              <span>
                <NavLink
                  to="/renter-signup"
                  className="underline text-primaryPurple"
                >
                  Signup
                </NavLink>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenterLogin;
