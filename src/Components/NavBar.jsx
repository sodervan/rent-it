import { NavLink } from "react-router-dom";
const NavBar = () => {
  return (
    <>
      <div className=" fixed z-20 top-0 left-0 w-full bg-white !border-b-2 border-primaryPurple py-3 px-5">
        <div className=" flex justify-between items-center">
          <div>
            <h1 className="text-2xl text-primaryPurple">RentIT</h1>
          </div>
          <div className="flex gap-6 items-center">
            <div>
              <NavLink>
                <p className=" font-light">Home</p>
              </NavLink>
            </div>

            <div>
              <NavLink>
                <p className="font-light">Blog</p>
              </NavLink>
            </div>

            <div>
              <NavLink>
                <p className="font-light">About us</p>
              </NavLink>
            </div>

            <div>
              <NavLink>
                <p className="font-light">For Landlords/Agents</p>
              </NavLink>
            </div>

            <NavLink
              className="bg-primaryPurple py-2 px-4 rounded-[10px]"
              to="/signup"
            >
              <p className="text-white">Sign up</p>
            </NavLink>

            <div className="!border border-primaryPurple py-2 px-4 rounded-[10px]">
              <NavLink>
                <p className="text-primaryPurple">Login</p>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default NavBar;
