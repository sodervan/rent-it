import { NavLink } from "react-router-dom";

const SignupChoice = () => {
  return (
    <div className="h-screen flex flex-col gap-4 items-center justify-center w-[60%] mx-auto">
      <div>
        <i className="fi fi-rr-user text-7xl text-primaryPurple"></i>
      </div>
      <div>
        <p className="text-xl">Welcome! Please select your role to continue</p>
      </div>
      <div>
        <p className="text-center text-gray-600">
          We’ve sent a verification link to [user's email address]. Please check
          your inbox and click the link to verify your email.
        </p>
      </div>
      <div className=" flex gap-3">
        <NavLink className=" bg-primaryPurple px-4 py-2 rounded-lg">
          <p className="text-white">Sign up as an Agent/Landlord</p>
        </NavLink>

        <NavLink
          className=" bg-secondaryPurple border border-primaryPurple px-4 py-2 rounded-lg"
          to="/renter-signup"
        >
          <p className="text-primaryPurple">Sign up as a Renter</p>
        </NavLink>
      </div>
    </div>
  );
};

export default SignupChoice;
