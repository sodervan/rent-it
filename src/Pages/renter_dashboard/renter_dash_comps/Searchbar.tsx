import { getUserData, USERDETAILSPAYLOAD } from "@/lib/api";
import { drawerOpenedAtom, sideBarAtom } from "@/store/store";
import {
  Burger,
  Flex,
  Menu,
  TextInput,
  Avatar,
  Transition,
  Slider,
  RangeSlider,
  Checkbox,
  NumberInput,
  Group,
  Drawer,
} from "@mantine/core";
import {
  IconFilter,
  IconInbox,
  IconLogout,
  IconSearch,
  IconSettings,
  IconUser,
  IconHome,
  IconBuildingSkyscraper,
  IconBuilding,
  IconX,
  IconCheck,
  IconAdjustmentsHorizontal,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useAtom, useSetAtom } from "jotai";
import { FormEvent, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Filter types
type FilterState = {
  propertyType: string[];
  priceRange: [number, number];
  rooms: number | null;
  amenities: {
    furnished: boolean;
    petAllowed: boolean;
    sharedAccommodation: boolean;
  };
};

function Searchbar() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    propertyType: [],
    priceRange: [126, 4000],
    rooms: null,
    amenities: {
      furnished: false,
      petAllowed: false,
      sharedAccommodation: false,
    },
  });

  let { data: userInfo, isFetching: userFetching } =
    useQuery<USERDETAILSPAYLOAD>({
      queryKey: ["userData"],
      queryFn: async () => await getUserData(),
    });
  const [opened, setOpened] = useAtom(sideBarAtom);
  let navigate = useNavigate();
  let setDrawer = useSetAtom(drawerOpenedAtom);

  const propertyTypes = [
    { id: "house", label: "House", count: 23, icon: <IconHome size={18} /> },
    {
      id: "commercial",
      label: "Commercial",
      count: 3,
      icon: <IconBuildingSkyscraper size={18} />,
    },
    {
      id: "apartment",
      label: "Apartment",
      count: 13,
      icon: <IconBuilding size={18} />,
    },
  ];

  const roomOptions = [1, 2, 3, 4, "5+"];

  // Handle property type selection
  const togglePropertyType = (type: string) => {
    setFilters((prev) => {
      if (prev.propertyType.includes(type)) {
        return {
          ...prev,
          propertyType: prev.propertyType.filter((t) => t !== type),
        };
      } else {
        return { ...prev, propertyType: [...prev.propertyType, type] };
      }
    });
  };

  // Handle room selection
  const selectRoom = (room: string | number) => {
    setFilters((prev) => ({
      ...prev,
      rooms: prev.rooms === room ? null : (room as number),
    }));
  };

  // Handle search submission
  const navigateTo = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    let form = new FormData(e.target as HTMLFormElement);
    let queryString = form.get("search") as string;
    if (queryString.length < 1) {
      return;
    }
    navigate(`/renter/dashboard/search?query=${queryString}`);
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      propertyType: [],
      priceRange: [126, 4000],
      rooms: null,
      amenities: {
        furnished: false,
        petAllowed: false,
        sharedAccommodation: false,
      },
    });
  };

  // Apply filters
  const applyFilters = () => {
    // Build query string from filters
    const params = new URLSearchParams();

    if (filters.propertyType.length) {
      params.append("propertyType", filters.propertyType.join(","));
    }

    params.append("minPrice", filters.priceRange[0].toString());
    params.append("maxPrice", filters.priceRange[1].toString());

    if (filters.rooms) {
      params.append("rooms", filters.rooms.toString());
    }

    if (filters.amenities.furnished) {
      params.append("furnished", "true");
    }

    if (filters.amenities.petAllowed) {
      params.append("petAllowed", "true");
    }

    if (filters.amenities.sharedAccommodation) {
      params.append("sharedAccommodation", "true");
    }

    // Close filter panel
    setFilterOpen(false);

    // Navigate with filters
    navigate(`/renter/dashboard/search?${params.toString()}`);
  };

  // Format price for display
  const formatPrice = (value: number) => {
    return `$${value}`;
  };

  return (
    <div className="relative">
      <Flex
        component="form"
        onSubmit={navigateTo}
        className="bg-white shadow-sm px-6 py-3 gap-4 items-center justify-between"
      >
        {/* Mobile Burger Menu */}
        <div className="md:hidden">
          <Burger
            opened={opened}
            onClick={() => setOpened(!opened)}
            size="sm"
          />
        </div>

        {/* Search Input */}
        <div className="flex-grow max-w-2xl mx-4">
          <TextInput
            radius="xl"
            name="search"
            size="md"
            leftSection={<IconSearch className="text-gray-500" />}
            placeholder="Search properties, locations..."
            className="w-full"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          {/* Filter Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setFilterOpen(!filterOpen);
            }}
            className={`flex items-center gap-2 py-2 px-4 rounded-lg transition-colors ${
              filterOpen
                ? "bg-purple-200 text-purple-700"
                : "hover:bg-purple-100 text-purple-600"
            }`}
          >
            <IconFilter size={20} />
            <span className="hidden sm:inline font-medium">Filter</span>
          </button>

          {/* Inbox Button */}
          <button className="p-2 hover:bg-purple-100 rounded-full transition-colors">
            <IconInbox className="text-gray-600" />
          </button>

          {/* Vertical Divider */}
          <div className="w-[1px] h-6 bg-gray-300 mx-2"></div>

          {/* User Menu */}
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <button className="flex items-center gap-2 hover:bg-purple-50 p-1 rounded-lg transition-colors">
                <Avatar
                  size="md"
                  radius="xl"
                  src={userInfo?.payload.profilePicLink}
                  alt="User Profile"
                  color="purple"
                >
                  {userInfo?.payload.firstname?.[0] || <IconUser />}
                </Avatar>
                <div className="text-left hidden md:block">
                  <p className="font-semibold text-sm text-gray-800">
                    {userInfo?.payload.firstname} {userInfo?.payload.lastname}
                  </p>
                  <p className="text-xs text-gray-500">Renter</p>
                </div>
              </button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconSettings size={14} />}
                component={Link}
                to="/renter/dashboard/settings"
              >
                Account Settings
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item leftSection={<IconLogout size={14} />} color="red">
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </Flex>

      {/* Filter Drawer - Side Panel */}
      <Drawer
        opened={filterOpen}
        onClose={() => setFilterOpen(false)}
        position="left"
        size="md"
        title={
          <div className="flex justify-between items-center py-2">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <IconAdjustmentsHorizontal
                size={22}
                className="text-purple-600"
              />
              Property Filters
            </h3>
            <button
              onClick={() => setFilterOpen(false)}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <IconX size={18} className="text-gray-500" />
            </button>
          </div>
        }
        classNames={{
          header: "border-b border-gray-200 px-6 py-4",
          body: "px-6",
        }}
        overlayProps={{
          opacity: 0.3,
          blur: 3,
        }}
        withCloseButton={false}
      >
        <div className="space-y-8 py-4">
          {/* Property Type Section */}
          <div>
            <h4 className="text-base font-medium text-gray-700 mb-4 flex items-center gap-2">
              <IconHome size={18} />
              Property Type
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {propertyTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => togglePropertyType(type.id)}
                  className={`flex items-center gap-3 p-4 rounded-lg border ${
                    filters.propertyType.includes(type.id)
                      ? "border-purple-300 bg-purple-50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`${
                      filters.propertyType.includes(type.id)
                        ? "text-purple-600"
                        : "text-gray-600"
                    }`}
                  >
                    {type.icon}
                  </div>
                  <div className="flex flex-col text-left">
                    <span
                      className={`text-sm font-medium ${
                        filters.propertyType.includes(type.id)
                          ? "text-purple-700"
                          : "text-gray-700"
                      }`}
                    >
                      {type.label}
                    </span>
                    <span className="text-xs text-gray-500">
                      {type.count} listings
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200"></div>

          {/* Budget Section */}
          <div>
            <h4 className="text-base font-medium text-gray-700 mb-4 flex items-center gap-2">
              <IconInbox size={18} />
              Monthly Budget
            </h4>
            <div className="px-2 pt-6 pb-2">
              <div className="flex justify-between mb-1 text-sm text-gray-600">
                <span>Min: {formatPrice(filters.priceRange[0])}</span>
                <span>Max: {formatPrice(filters.priceRange[1])}</span>
              </div>
              <RangeSlider
                min={100}
                max={5000}
                step={50}
                value={filters.priceRange}
                onChange={(value) =>
                  setFilters({
                    ...filters,
                    priceRange: value as [number, number],
                  })
                }
                labelAlwaysOn
                minRange={100}
                color="grape"
                label={formatPrice}
                classNames={{
                  root: "mt-4",
                }}
              />
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200"></div>

          {/* Room Count Section */}
          <div>
            <h4 className="text-base font-medium text-gray-700 mb-4 flex items-center gap-2">
              <IconBuildingSkyscraper size={18} />
              Bedrooms
            </h4>
            <div className="grid grid-cols-5 gap-2">
              {roomOptions.map((room) => (
                <button
                  key={room}
                  onClick={() => selectRoom(room)}
                  className={`py-3 rounded-lg ${
                    filters.rooms === room
                      ? "bg-purple-100 text-purple-700 font-medium"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {room}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200"></div>

          {/* Amenities Section */}
          <div>
            <h4 className="text-base font-medium text-gray-700 mb-4 flex items-center gap-2">
              <IconCheck size={18} />
              Amenities
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="furnished"
                  checked={filters.amenities.furnished}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      amenities: {
                        ...filters.amenities,
                        furnished: e.currentTarget.checked,
                      },
                    })
                  }
                  color="grape"
                  radius="md"
                  size="md"
                />
                <label
                  htmlFor="furnished"
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  Furnished Property
                </label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox
                  id="petAllowed"
                  checked={filters.amenities.petAllowed}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      amenities: {
                        ...filters.amenities,
                        petAllowed: e.currentTarget.checked,
                      },
                    })
                  }
                  color="grape"
                  radius="md"
                  size="md"
                />
                <label
                  htmlFor="petAllowed"
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  Pet Friendly
                </label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox
                  id="sharedAccommodation"
                  checked={filters.amenities.sharedAccommodation}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      amenities: {
                        ...filters.amenities,
                        sharedAccommodation: e.currentTarget.checked,
                      },
                    })
                  }
                  color="grape"
                  radius="md"
                  size="md"
                />
                <label
                  htmlFor="sharedAccommodation"
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  Shared Accommodation
                </label>
              </div>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="sticky bottom-0 pt-4 pb-2 bg-white flex justify-between gap-3 border-t border-gray-200">
            <button
              onClick={resetFilters}
              className="px-4 py-3 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 w-1/3"
            >
              Reset
            </button>
            <button
              onClick={applyFilters}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-colors w-2/3"
            >
              <IconCheck size={16} />
              Apply Filters
            </button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default Searchbar;
