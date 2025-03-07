import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Loader from "../Loaders/Loader.jsx";
import { Carousel } from "@material-tailwind/react";
import Sidebar from "./Sidebar.jsx";
import ShareModal from "../Modals/ShareModal.jsx";
import { toast } from "react-toastify";
import UnpublishedListingsOptionsMenu from "@/components/AgentDashboard/UnpublishedListingsOptionsMenu.jsx";
import useTokenData from "../../../TokenHook.js";
import ListingOptionsMenu from "@/components/AgentDashboard/ListingOptionsMenu.jsx";
import axios from "axios";
import { Building2, ListFilter, Plus, RefreshCw, Search } from "lucide-react";

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const AgentDashboard = () => {
  const [activeTab, setActiveTab] = useState("published");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [share, setShare] = useState(null);
  const { tokenData } = useTokenData();
  const [agentData, setAgentData] = useState(null);

  const [publishedListings, setPublishedListings] = useState([]);
  const [publishedLoading, setPublishedLoading] = useState(false);
  const [publishedError, setPublishedError] = useState(null);
  const [publishedCursor, setPublishedCursor] = useState("");
  const [publishedHasMore, setPublishedHasMore] = useState(false);

  const [unpublishedListings, setUnpublishedListings] = useState([]);
  const [unpublishedLoading, setUnpublishedLoading] = useState(false);
  const [unpublishedError, setUnpublishedError] = useState(null);
  const [unpublishedCursor, setUnpublishedCursor] = useState("");
  const [unpublishedHasMore, setUnpublishedHasMore] = useState(false);

  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;

  const encodeId = (id) => btoa(id.toString());
  const updateShareState = () => setShare(true);
  const closeShareModal = () => setShare(false);

  const getCachedData = (key) => {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(key);
      return null;
    }

    return data;
  };

  const setCachedData = (key, data) => {
    localStorage.setItem(
      key,
      JSON.stringify({
        data,
        timestamp: Date.now(),
      }),
    );
  };

  const fetchPublishedListings = async (forceRefresh = false) => {
    if (!forceRefresh) {
      const cached = getCachedData("publishedListings");
      if (cached) {
        setPublishedListings(cached.listings);
        setPublishedCursor(cached.cursor || "");
        setPublishedHasMore(cached.hasMore || false);
        return;
      }
    }

    setPublishedLoading(true);
    setPublishedError(null);

    try {
      const response = await axios.get(
        `${apiUrl}/api/v1/agents/listings/published`,
        {
          withCredentials: true,
          params: { limit: 10 },
        },
      );

      const listings = response.data.payload.data || [];
      const cursor = response.data.payload.pagination?.next_cursor;
      const hasMore = !!cursor;

      setPublishedListings(listings);
      setPublishedCursor(cursor || "");
      setPublishedHasMore(hasMore);

      setCachedData("publishedListings", {
        listings,
        cursor,
        hasMore,
      });
    } catch (error) {
      if (error?.response?.status === 404) {
        setPublishedListings([]);
      } else {
        setPublishedError(
          "Failed to fetch published listings. Please try again.",
        );
      }
    } finally {
      setPublishedLoading(false);
    }
  };

  const fetchUnpublishedListings = async (forceRefresh = false) => {
    if (!forceRefresh) {
      const cached = getCachedData("unpublishedListings");
      if (cached) {
        setUnpublishedListings(cached.listings);
        setUnpublishedCursor(cached.cursor || "");
        setUnpublishedHasMore(cached.hasMore || false);
        return;
      }
    }

    setUnpublishedLoading(true);
    setUnpublishedError(null);

    try {
      const response = await axios.get(
        `${apiUrl}/api/v1/agents/listings/unpublished`,
        {
          withCredentials: true,
          params: { limit: 10 },
        },
      );

      const listings = response.data.payload.data || [];
      const cursor = response.data.payload.pagination?.next_cursor;
      const hasMore = !!cursor;

      setUnpublishedListings(listings);
      setUnpublishedCursor(cursor || "");
      setUnpublishedHasMore(hasMore);

      setCachedData("unpublishedListings", {
        listings,
        cursor,
        hasMore,
      });
    } catch (error) {
      if (error?.response?.status === 404) {
        setUnpublishedListings([]);
      } else {
        setUnpublishedError(
          "Failed to fetch unpublished listings. Please try again.",
        );
      }
    } finally {
      setUnpublishedLoading(false);
    }
  };

  const fetchAgentDetails = async (forceRefresh = false) => {
    if (!forceRefresh) {
      const cached = getCachedData("agentData");
      if (cached) {
        setAgentData(cached);
        return;
      }
    }

    try {
      const response = await axios.get(`${apiUrl}/api/v1/agents`, {
        withCredentials: true,
      });
      setAgentData(response.data);
      setCachedData("agentData", response.data);
    } catch (error) {
      console.error("Error fetching agent details:", error);
    }
  };

  const handleDelist = async (listingId) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/agents/listings/${listingId}/delist`,
        null,
        { withCredentials: true },
      );

      if (response.data.status === "success") {
        toast.success("Listing delisted successfully!");

        const updatedListings = publishedListings.filter(
          (listing) => listing.id !== listingId,
        );
        setPublishedListings(updatedListings);

        const cached = getCachedData("publishedListings");
        if (cached) {
          setCachedData("publishedListings", {
            ...cached,
            listings: updatedListings,
          });
        }
      } else {
        toast.error(response.data.message || "Failed to delist listing.");
      }
    } catch (error) {
      console.error("Error delisting listing:", error);
      toast.error("Error delisting listing");
    }
  };

  const handleDelete = async (listingId) => {
    try {
      const response = await axios.delete(
        `${apiUrl}/api/v1/agents/listings/${listingId}`,
        { withCredentials: true },
      );

      if (response.data.status === "success") {
        toast.success("Listing deleted successfully!");

        if (activeTab === "published") {
          const updatedListings = publishedListings.filter(
            (listing) => listing.id !== listingId,
          );
          setPublishedListings(updatedListings);

          const cached = getCachedData("publishedListings");
          if (cached) {
            setCachedData("publishedListings", {
              ...cached,
              listings: updatedListings,
            });
          }
        } else {
          const updatedListings = unpublishedListings.filter(
            (listing) => listing.id !== listingId,
          );
          setUnpublishedListings(updatedListings);

          const cached = getCachedData("unpublishedListings");
          if (cached) {
            setCachedData("unpublishedListings", {
              ...cached,
              listings: updatedListings,
            });
          }
        }
      } else {
        toast.error(response.data.message || "Failed to delete listing.");
      }
    } catch (error) {
      console.error("Error deleting listing:", error);
      toast.error("Error deleting listing");
    }
  };

  const handleRepublish = async (listingId) => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/v1/agents/listings/${listingId}/publish`,
        { withCredentials: true },
      );

      if (response.data.status === "success") {
        toast.success("Listing re-Published successfully!");
        await Promise.all([
          fetchPublishedListings(true),
          fetchUnpublishedListings(true),
        ]);
      } else {
        toast.error(response.data.message || "Failed to re-Publish listing.");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to re-Publish listing.",
      );
      console.error("Error publishing listing:", error);
    }
  };

  const fetchMorePublished = async () => {
    if (!publishedHasMore || isFetchingMore) return;
    setIsFetchingMore(true);
    try {
      const response = await axios.get(
        `${apiUrl}/api/v1/agents/listings/published`,
        {
          withCredentials: true,
          params: {
            cursor: publishedCursor,
            limit: 10,
          },
        },
      );

      const newListings = response.data.payload.data || [];
      const updatedListings = [...publishedListings, ...newListings];
      setPublishedListings(updatedListings);

      if (response.data.payload.pagination?.next_cursor) {
        setPublishedCursor(response.data.payload.pagination.next_cursor);
        setPublishedHasMore(true);
      } else {
        setPublishedHasMore(false);
      }

      // Update cache with new data
      setCachedData("publishedListings", {
        listings: updatedListings,
        cursor: response.data.payload.pagination?.next_cursor || "",
        hasMore: !!response.data.payload.pagination?.next_cursor,
      });
    } catch (error) {
      console.error("Error fetching more published listings:", error);
    } finally {
      setIsFetchingMore(false);
    }
  };

  const fetchMoreUnpublished = async () => {
    if (!unpublishedHasMore || isFetchingMore) return;
    setIsFetchingMore(true);
    try {
      const response = await axios.get(
        `${apiUrl}/api/v1/agents/listings/unpublished`,
        {
          withCredentials: true,
          params: {
            cursor: unpublishedCursor,
            limit: 10,
          },
        },
      );

      const newListings = response.data.payload.data || [];
      const updatedListings = [...unpublishedListings, ...newListings];
      setUnpublishedListings(updatedListings);

      if (response.data.payload.pagination?.next_cursor) {
        setUnpublishedCursor(response.data.payload.pagination.next_cursor);
        setUnpublishedHasMore(true);
      } else {
        setUnpublishedHasMore(false);
      }

      // Update cache with new data
      setCachedData("unpublishedListings", {
        listings: updatedListings,
        cursor: response.data.payload.pagination?.next_cursor || "",
        hasMore: !!response.data.payload.pagination?.next_cursor,
      });
    } catch (error) {
      console.error("Error fetching more unpublished listings:", error);
    } finally {
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    fetchAgentDetails();
    fetchPublishedListings();
    fetchUnpublishedListings();

    const handleLogout = () => {
      localStorage.removeItem("publishedListings");
      localStorage.removeItem("unpublishedListings");
      // localStorage.removeItem("agentData");
    };

    window.addEventListener("logout", handleLogout);
    return () => window.removeEventListener("logout", handleLogout);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const currentListings =
    activeTab === "published" ? publishedListings : unpublishedListings;
  const currentLoading =
    activeTab === "published" ? publishedLoading : unpublishedLoading;
  const currentError =
    activeTab === "published" ? publishedError : unpublishedError;
  const currentHasMore =
    activeTab === "published" ? publishedHasMore : unpublishedHasMore;
  const fetchMoreListings =
    activeTab === "published" ? fetchMorePublished : fetchMoreUnpublished;

  const filteredListings = currentListings.filter((listing) => {
    const matchesSearch =
      listing.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location?.streetAddress
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesType =
      !filterType || listing.apartmentType?.name === filterType;

    const [minPrice, maxPrice] = priceRange.split("-").map(Number);
    const matchesPrice =
      !priceRange ||
      (listing.baseCost >= minPrice &&
        (!maxPrice || listing.baseCost <= maxPrice));

    return matchesSearch && matchesType && matchesPrice;
  });

  const activeListings = publishedListings.filter(
    (listing) => listing.status === "active",
  );

  const totalUnits = publishedListings.reduce(
    (acc, curr) => acc + (curr.unitsLeft || 0),
    0,
  );

  const totalUnit2 = unpublishedListings.reduce(
    (acc, curr) => acc + (curr.unitsLeft || 0),
    0,
  );

  const renderListings = () => {
    if (currentLoading) {
      return <Loader />;
    }

    if (currentError) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 py-12">
          <p className="text-red-500 text-center">{currentError}</p>
          <button
            onClick={
              activeTab === "published"
                ? () => fetchPublishedListings(true)
                : () => fetchUnpublishedListings(true)
            }
            className="px-4 py-2 text-sm bg-primaryPurple text-white rounded-lg hover:bg-purple-700 transition-all"
          >
            Try Again
          </button>
        </div>
      );
    }

    if (filteredListings.length === 0) {
      return (
        <div className="col-span-full text-center py-8">
          <p className="text-gray-500">
            No {activeTab} listings found matching your criteria.
            {activeTab === "published" && unpublishedListings.length > 0 && (
              <span> Check the unpublished tab for available listings.</span>
            )}
            {activeTab === "unpublished" && publishedListings.length > 0 && (
              <span> Check the published tab for available listings.</span>
            )}
          </p>
        </div>
      );
    }

    return (
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-6 w-full mt-6 max-w-[1200px] mx-auto py-10">
        {filteredListings.map((item, index) => (
          <div
            key={item.id}
            className="flex flex-col rounded-lg shadow-lg w-full h-[25rem] cursor-pointer hover:shadow-xl transition-shadow duration-300"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="h-[60%] rounded-t-[15px] rounded-b-[20px] overflow-hidden relative">
              <div className="flex items-center justify-between absolute top-2 left-3 w-full z-[100]">
                <div className="bg-[#F4EBFF] p-2 rounded-xl">
                  <p className="text-[12px] font-[600] text-primaryPurple">
                    {item.apartmentType?.name || "N/A"}
                  </p>
                </div>
                <div className="flex gap-1 mr-5">
                  {activeTab === "published" ? (
                    <ListingOptionsMenu
                      onDelist={() => handleDelist(item.id)}
                      onDelete={() => handleDelete(item.id)}
                      onBookings={() => {
                        console.log("Bookmark listing:", item.id);
                      }}
                    />
                  ) : (
                    <UnpublishedListingsOptionsMenu
                      onEdit={(stepId) => {
                        const encodedItemId = encodeId(item.id);
                        window.location.href = `/agent/addlisting/${stepId}?itemId=${encodedItemId}`;
                      }}
                      onDelete={() => handleDelete(item.id)}
                      onBookings={() => {
                        console.log("Bookmark listing:", item.id);
                      }}
                      onRepublish={() => handleRepublish(item.id)}
                    />
                  )}
                  <button
                    className="h-8 w-8 bg-[#F4EBFF] text-primaryPurple rounded-full flex items-center justify-center hover:bg-primaryPurple hover:text-white transition-all duration-300"
                    onClick={updateShareState}
                  >
                    <i className="fi fi-rr-share text-[12px]"></i>
                  </button>
                </div>
              </div>
              <div className="bg-[#F4EBFF] px-2 py-1 rounded-full mx-auto absolute z-[70] bottom-2 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                <div>
                  <p className="text-[12px] text-primaryPurple whitespace-nowrap">
                    Last updated{" "}
                    <span className="text-sm font-semibold">
                      {formatDate(item.updatedAt)}
                    </span>
                  </p>
                </div>
              </div>
              <Carousel
                className="rounded-xl"
                navigation={({ setActiveIndex, activeIndex, length }) => (
                  <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                    {new Array(length).fill("").map((_, i) => (
                      <span
                        key={i}
                        className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                          activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                        }`}
                        onClick={() => setActiveIndex(i)}
                      />
                    ))}
                  </div>
                )}
              >
                {item.pictures?.map((picture, idx) => (
                  <img
                    key={idx}
                    src={picture.imageUrl || "path/to/fallback/image.jpg"}
                    alt={`image ${idx + 1}`}
                    className="w-full h-[15rem] object-cover"
                  />
                ))}
              </Carousel>
            </div>

            <NavLink
              to={`/listing-details-page/${item.id}/${index}`}
              className="h-[40%] p-4 flex flex-col gap-2 justify-center"
            >
              <p className="text-sm font-bold">{item.title}</p>
              <div className="flex gap-1 items-center">
                <p className="text-[15px] text-gray-600">
                  {`₦ ${parseFloat(item.baseCost).toLocaleString() || "N/A"}`}
                </p>
                <p className="text-xs bg-[#D7D6FD] font-light px-2 rounded-full">
                  {item.paymentDuration || "N/A"}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <i className="fi fi-rr-text-box text-[#FF3D3D]"></i>
                <p className="text-xs">
                  Units Available: {item.unitsLeft || "N/A"}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <i className="fi fi-rr-marker text-[#FF3D3D]"></i>
                <p className="text-xs">
                  {item.location?.streetAddress || "N/A"}
                </p>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Sidebar
        firstname={agentData ? agentData.payload.firstname : ""}
        loading={currentLoading}
      />
      <div className="content lg:ml-64 xl:ml-64 mt-24">
        <div className="px-5">
          <div className="flex flex-col gap-6 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Building2 className="h-6 w-6 text-primaryPurple" />
                <h1 className="text-2xl font-semibold">My Listings</h1>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    fetchPublishedListings(true);
                    fetchUnpublishedListings(true);
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 transition-all w-full sm:w-auto"
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </button>
                <NavLink
                  to="/agent/addlisting/1"
                  className="flex items-center justify-center gap-2 px-4 py-2 text-sm bg-primaryPurple text-white rounded-lg hover:bg-purple-700 transition-all w-full sm:w-auto"
                >
                  <Plus className="h-4 w-4" />
                  Add New Listing
                </NavLink>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <p className="text-gray-500 text-sm">Total Listings</p>
                <p className="text-2xl font-semibold">
                  {publishedListings.length + unpublishedListings.length}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <p className="text-gray-500 text-sm">Active Listings</p>
                <p className="text-2xl font-semibold">
                  {activeListings.length}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <p className="text-gray-500 text-sm">Total Units Available</p>
                <p className="text-2xl font-semibold">
                  {totalUnits + totalUnit2}
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex flex-wrap items-center gap-2">
                <ListFilter className="h-5 w-5 text-gray-500" />
                <p className="text-sm text-gray-500">Filter by:</p>
                <select
                  className="border rounded-md px-3 py-1.5 text-sm"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="">All Types</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="room">Room</option>
                </select>
                <select
                  className="border rounded-md px-3 py-1.5 text-sm"
                  value={priceRange}
                  agent
                  onChange={(e) => setPriceRange(e.target.value)}
                >
                  <option value="">Price Range</option>
                  <option value="0-100000">₦0 - ₦100,000</option>
                  <option value="100001-500000">₦100,001 - ₦500,000</option>
                  <option value="500001">₦500,001+</option>
                </select>
              </div>
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search listings..."
                  className="border rounded-md pl-10 pr-3 py-1.5 text-sm w-full md:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="border-b border-gray-200">
              <div className="flex space-x-8">
                {["published", "unpublished"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
                      py-4 px-1 relative font-medium text-sm transition-colors duration-200
                      ${
                        activeTab === tab
                          ? "text-primaryPurple"
                          : "text-gray-500 hover:text-gray-700"
                      }
                    `}
                  >
                    <span className="capitalize">{tab} Listings</span>
                    {activeTab === tab && (
                      <span
                        className="absolute bottom-0 inset-x-0 h-0.5 bg-primaryPurple transform transition-transform duration-300"
                        style={{ transform: "scaleX(1)" }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div
              key={activeTab}
              className="transform transition-all duration-300 ease-in-out"
            >
              {renderListings()}
              {currentHasMore && filteredListings.length > 0 && (
                <div className="flex justify-center my-6">
                  <button
                    onClick={fetchMoreListings}
                    disabled={isFetchingMore}
                    className="bg-primaryPurple text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-all duration-300 disabled:opacity-50"
                  >
                    {isFetchingMore ? "Loading..." : "Load More"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {share && <ShareModal onClose={closeShareModal} />}
    </>
  );
};

export default AgentDashboard;
