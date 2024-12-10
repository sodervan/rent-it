import btn from "../../assets/btn.png";
import icon from "../../assets/icon.png";
import icon1 from "../../assets/icon1.png";
import icon2 from "../../assets/icon2.png";

const Sidebar = () => {
  return (
    <div className="sidebar hidden lg:block fixed top-0 left-0 h-screen mt-20">
      <nav className="bg-[#F4EBFF] p-8 rounded-r-lg h-screen w-[370px] border">
        <div className="flex items-center justify-between">
          <h6>Hi, Adewale Williams</h6>
          <button>
            <img src={btn} alt="Settings" />
          </button>
        </div>
        <ul className="mt-10 flex flex-col space-y-6">
          <SidebarItem icon={icon} label="My Listings" link="#home" />
          <SidebarItem icon={icon1} label="Booking Requests" link="#services" />
          <SidebarItem icon={icon2} label="Profile" link="#clients" />
        </ul>
      </nav>
    </div>
  );
};

const SidebarItem = ({ icon, label, link }) => (
  <li className="flex items-center gap-10">
    <button>
      <img src={icon} alt={`${label} Icon`} />
    </button>
    <a href={link}>{label}</a>
  </li>
);

export default Sidebar;
