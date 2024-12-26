import { NavLink } from "react-router-dom";

const WhoWeAre = () => {
  return (
      <div className="container mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* First Feature */}
          <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-center w-full h-[150px] mb-6">
              <img
                  src="../../public/assets/search-vector.png"
                  alt="Find your next home"
                  className="max-w-[150px] max-h-[150px] object-contain"
              />
            </div>
            <h3 className="text-xl font-semibold">Find Your Next Home</h3>
            <p className="text-sm text-gray-600 my-3">
              With powerful search filters and personalized recommendations, our
              platform makes it easy to discover a home or apartment that
              perfectly suits your needs.
            </p>
            <NavLink
                to="/"
                className="py-2 px-6 bg-primaryPurple text-white text-sm font-medium rounded-full hover:bg-purple-700 transition-colors duration-300"
            >
              Find an Apartment Near You
            </NavLink>
          </div>

          {/* Second Feature */}
          <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-center w-full h-[150px] mb-6">
              <img
                  src="../../public/assets/list-vector.png"
                  alt="List Your Property"
                  className="max-w-[150px] max-h-[150px] object-contain"
              />
            </div>
            <h3 className="text-xl font-semibold">List Your Property</h3>
            <p className="text-sm text-gray-600 my-3">
              Whether you’re an agent or landlord, our intuitive tools let you
              manage and showcase your properties with ease, reaching a wider
              audience of potential renters.
            </p>
            <NavLink
                to="/"
                className="py-2 px-6 bg-primaryPurple text-white text-sm font-medium rounded-full hover:bg-purple-700 transition-colors duration-300"
            >
              List a Property
            </NavLink>
          </div>

          {/* Third Feature */}
          <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-center w-full h-[150px] mb-6">
              <img
                  src="../../public/assets/explore.png"
                  alt="Explore Neighborhoods"
                  className="max-w-[150px] max-h-[150px] object-contain"
              />
            </div>
            <h3 className="text-xl font-semibold">Explore Neighborhoods</h3>
            <p className="text-sm text-gray-600 my-3">
              Get in-depth insights on communities near you. From schools and
              transport to nearby attractions, discover what makes each
              neighborhood unique.
            </p>
            <NavLink
                to="/"
                className="py-2 px-6 bg-primaryPurple text-white text-sm font-medium rounded-full hover:bg-purple-700 transition-colors duration-300"
            >
              Start Your Search
            </NavLink>
          </div>
        </div>
      </div>
  );
};

export default WhoWeAre;