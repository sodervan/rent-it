import { NavLink } from "react-router-dom";

const SignupChoice = () => {
  return (
    <div className="h-screen flex flex-col gap-4 items-center justify-center w-[60%] mx-auto">
      <div>
        <i className="fi fi-rr-user text-7xl text-primaryPurple"></i>
      </div>
      <div>
        <p className="text-lg text-center">
          Welcome! Please select your role to continue
        </p>
      </div>
      <div className=" flex flex-col gap-3">
        <NavLink className=" bg-primaryPurple px-4 py-2 rounded-lg flex justify-center">
          <p className="text-white">Agent/Landlord Sign up</p>
        </NavLink>

        <NavLink
          className=" bg-secondaryPurple border border-primaryPurple px-4 py-2 rounded-lg flex justify-center"
          to="/renter-signup"
        >
          <p className="text-primaryPurple">Renter Sign up</p>
        </NavLink>
      </div>
    </div>
  );
};

export default SignupChoice;
