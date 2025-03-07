import { Loader } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

import { get_listing, LISTINGRESPONSE } from "@/lib/api";
import Searchbar from "../renter_dash_comps/Searchbar";
import QueryCard from "../renter_dash_comps/QueryCard";

function SearchPage() {
  const { data, isFetching, refetch } = useQuery<LISTINGRESPONSE>({
    queryKey: ["test"],
    queryFn: async () => await get_listing(),
  });
  return (
    <>
      <div className="sticky top-0 bg-white shadow-md z-30 px-4 md:px-8">
        <Searchbar />
      </div>
      <div className="isolate bg-gray-300 pt-10">
        <div className=" grid grid-cols-[repeat(auto-fit,300px)] gap-2 justify-center p-4 rounded-lg bg-white md:mx-8 shadow-xl">
          {isFetching ? (
            <div className="w-full flex items-center justify-center h-[calc(100dvh-100px)] bg-red-200">
              <Loader />
            </div>
          ) : (
            <>
              {data?.payload.data.map((e) => {
                return <QueryCard {...e} key={e.id} />;
              })}
            </>
          )}

          {/* <div className="text-wrap bg-rd-200">{JSON.stringify(data)}</div> */}
        </div>
      </div>
    </>
  );
}

export default SearchPage;
