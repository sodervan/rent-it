import { NavLink } from "react-router-dom";

const WhoWeAre = () => {
  return (
    <div className="my-5 container mx-auto px-16 sm:my-20 sm:px-32">
      <div className="flex flex-col  md:flex-row justify-center items-center gap-2">
        <div className="flex flex-col justify-center gap-3 items-center">
          <div>
            <img
              src="https://res.cloudinary.com/dmlgns85e/image/upload/v1726676819/House_searching-bro_1_1_pdxvng.png"
              alt=""
            />
          </div>
          <div>
            <p className="text-xl text-center font-semibold">
              Find your next home
            </p>
          </div>
          <div>
            <p className="text-sm text-center">
              With powerful search filters and personalized recommendations, our
              platform makes it easy to discover a home or apartment that
              perfectly suits your needs.
            </p>
          </div>
          <NavLink
            to="/"
            className="py-2 px-4 bg-primaryPurple rounded-lg whitespace-nowrap"
          >
            <p className="text-white text-center">Find an apartment near you</p>
          </NavLink>
        </div>

        <div className="flex flex-col justify-center gap-3 items-center">
          <div>
            <img
              src="https://res.cloudinary.com/dmlgns85e/image/upload/v1726676820/Realtor-rafiki_1_kihxqx.png"
              alt=""
            />
          </div>
          <div>
            <p className="text-xl text-center font-semibold">
              List Your property
            </p>
          </div>
          <div>
            <p className="text-sm text-center">
              Whether you’re an agent or landlord, our intuitive tools let you
              manage and showcase your properties with ease, reaching a wider
              audience of potential renters.
            </p>
          </div>
          <NavLink
            to="/"
            className="py-2 px-4 bg-primaryPurple rounded-lg whitespace-nowrap"
          >
            <p className="text-white">List a property</p>
          </NavLink>
        </div>

        <div className="flex flex-col justify-center gap-3 items-center">
          <div>
            <img
              src="https://res.cloudinary.com/dmlgns85e/image/upload/v1726676819/Location_search-pana_1_ywdzgk.png"
              alt=""
            />
          </div>
          <div>
            <p className="text-xl text-center font-semibold">
              Explore Neighbourhoods
            </p>
          </div>
          <div>
            <p className="text-sm text-center">
              Get in-depth insights on communities near you. From schools and
              transport to nearby attractions, discover what makes each
              neighborhood unique.
            </p>
          </div>
          <NavLink
            to="/"
            className="py-2 px-4 bg-primaryPurple rounded-lg whitespace-nowrap"
          >
            <p className="text-white">Start your search</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
