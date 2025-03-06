import React, { useEffect } from "react";
import { AppShell, Drawer, Divider, Title, Burger } from "@mantine/core";
import {
  IconHome,
  IconHistory,
  IconHeart,
  IconSearch,
  IconSettings,
  IconLogout,
  IconTrendingUp,
  IconBuildingStore,
  IconReceipt2,
} from "@tabler/icons-react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useAtom } from "jotai";
import { drawerOpenedAtom, sideBarAtom } from "@/store/store";
import useTokenData from "../../../TokenHook";

// Pages
import RenterHomePage from "./renter_dash_pages/RenterHomePage";
import Popular from "./renter_dash_pages/Popular";
import RenterSettings from "./renter_dash_pages/RenterSettings";
import TransactionHistory from "./renter_dash_pages/TransactionHistory";
import RenterFavorites from "./renter_dash_pages/RenterFavorites";
import SearchPage from "./renter_dash_pages/SearchPage";

function RenterDashPage() {
  const { tokenData, isLoading } = useTokenData();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading) {
      if (!tokenData || tokenData.role !== "user") {
        navigate("/renter/login");
      } else {
        navigate("/renter/dashboard/home", { replace: true });
      }
    }
  }, [tokenData, isLoading, navigate]);

  const [opened, setOpened] = useAtom(sideBarAtom);
  const [drawer, setDrawer] = useAtom(drawerOpenedAtom);

  const close = () => setDrawer(false);

  const handleLogout = () => {
    // Implement logout functionality here
    // For example:
    // localStorage.removeItem("token");
    navigate("/renter/login");
  };

  const navigationLinks = [
    {
      label: "Home",
      icon: IconHome,
      path: "/renter/dashboard/home",
    },
    {
      label: "Popular Listings",
      icon: IconTrendingUp,
      path: "/renter/dashboard/popular",
    },
    {
      label: "Search Properties",
      icon: IconSearch,
      path: "/renter/dashboard/search",
    },
    {
      label: "My Favorites",
      icon: IconHeart,
      path: "/renter/dashboard/favourites",
    },
    {
      label: "Transactions",
      icon: IconHistory,
      path: "/renter/dashboard/transactions",
    },
    {
      label: "Bookings",
      icon: IconBuildingStore,
      path: "/renter/dashboard/bookings",
    },
    {
      label: "Invoices",
      icon: IconReceipt2,
      path: "/renter/dashboard/invoices",
    },
    {
      label: "Settings",
      icon: IconSettings,
      path: "/renter/dashboard/settings",
    },
  ];

  const SidebarNavigation = () => (
    <div className="flex flex-col h-full">
      <div className="flex-grow p-4 space-y-1">
        {navigationLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <button
              key={link.path}
              className={`w-full text-left py-3 px-4 rounded-lg transition-colors flex items-center ${
                isActive
                  ? "bg-primary text-primaryPurple shadow-md shadow-primary/20 dark:shadow-primary/10"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => navigate(link.path)}
            >
              <link.icon
                size={20}
                className={isActive ? "text-purple-600" : "text-gray-500"}
              />
              <span className="ml-3 font-medium text-sm">{link.label}</span>
              {isActive && (
                <span className="absolute right-7 w-1.5 h-1.5 rounded-full bg-primaryPurple" />
              )}
              {link.label === "Transactions" && (
                <span className="ml-auto bg-red-100 text-red-600 text-xs py-1 px-2 rounded-full">
                  New
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="p-4 mt-auto">
        <Divider className="mb-4" />
        <button
          onClick={handleLogout}
          className="w-full text-left py-3 px-4 rounded-lg transition-colors flex items-center text-red-600 hover:bg-red-50"
        >
          <IconLogout size={20} />
          <span className="ml-3 font-medium text-sm">Logout</span>
        </button>
      </div>
    </div>
  );

  const MobileNavigation = () => (
    <div className="p-4 space-y-1">
      {navigationLinks.map((link) => {
        const isActive = location.pathname === link.path;
        return (
          <button
            key={link.path}
            className={`w-full text-left py-3 px-4 rounded-lg transition-colors flex items-center ${
              isActive
                ? "bg-purple-100 text-purple-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => {
              navigate(link.path);
              close();
            }}
          >
            <link.icon
              size={20}
              className={isActive ? "text-purple-600" : "text-gray-500"}
            />
            <span className="ml-3 font-medium text-sm">{link.label}</span>
          </button>
        );
      })}

      <Divider className="my-4" />

      <button
        onClick={() => {
          handleLogout();
          close();
        }}
        className="w-full text-left py-3 px-4 rounded-lg transition-colors flex items-center text-red-600 hover:bg-red-50"
      >
        <IconLogout size={20} />
        <span className="ml-3 font-medium text-sm">Logout</span>
      </button>
    </div>
  );

  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
    >
      <Drawer onClose={close} opened={drawer} position="right">
        <MobileNavigation />
      </Drawer>

      <AppShell.Navbar className="bg-white">
        <div className="flex items-center p-5">
          <Title
            order={1}
            className="text-purple-600 flex items-center text-xl"
          >
            RentIT
          </Title>
          <div className="ml-auto md:hidden">
            <Burger opened={opened} onClick={() => setOpened(!opened)} />
          </div>
        </div>
        <Divider />
        <SidebarNavigation />
      </AppShell.Navbar>

      <AppShell.Main>
        <Routes>
          <Route path="/home" element={<RenterHomePage />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/settings" element={<RenterSettings />} />
          <Route path="/transactions" element={<TransactionHistory />} />
          <Route path="/favourites" element={<RenterFavorites />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/bookings" element={<div>Bookings Page</div>} />
          <Route path="/invoices" element={<div>Invoices Page</div>} />
        </Routes>
      </AppShell.Main>
    </AppShell>
  );
}

export default RenterDashPage;
