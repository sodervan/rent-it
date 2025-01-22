import recentSearches from "../Data/recent_searches.json";

const RecentSearches = () => {
  return (
    <>
      <div className="w-full whitespace-nowrap">
        <div className="bg-[#FCFAFF] w-full px-6 py-8 sm:px-20">
          <div className="mb-3 text-[20px] sm:text-xl">
            <p>Recent Searches</p>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar">
            {recentSearches.map((search, index) => (
              <div
                key={index}
                className="p-4 rounded-lg shadow-lg mb-4 flex flex-col gap-2 cursor-pointer transition-transform transform hover:scale-105 duration-300 ease-in-out"
              >
                <div className="flex items-center justify-center bg-[#F9F5FF] w-12 h-12 rounded-full sm:w-16 sm:h-16">
                  <div className="bg-[#F4EBFF] w-[75%] h-[75%] rounded-full flex items-center justify-center">
                    <i className="fi fi-rr-search text-[#7F56D9]"></i>
                  </div>
                </div>
                <p className="text-[1rem] sm:text-lg font-normal">
                  {search.landmark}
                </p>
                <p className="text-sm text-gray-600">
                  Category: {search.category}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentSearches;
