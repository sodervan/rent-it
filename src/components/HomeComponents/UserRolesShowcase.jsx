import { Home, User, Building2, Key, ChevronRight, Users } from "lucide-react";

const UserRolesShowcase = () => {
  const roles = [
    {
      icon: <User className="w-6 h-6" />,
      title: "Students",
      description:
        "Find your perfect student home with verified listings and virtual tours",
      features: [
        "Verified Properties",
        "Virtual Tours",
        "Student Communities",
        "Flexible Leases",
      ],
      color: "blue",
      delay: "0",
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Landlords",
      description:
        "List your properties and connect with reliable, verified tenants",
      features: [
        "Smart Listing Tools",
        "Tenant Verification",
        "Automated Viewings",
        "Secure Payments",
      ],
      color: "green",
      delay: "150",
    },
    {
      icon: <Key className="w-6 h-6" />,
      title: "Agents",
      description:
        "Manage properties efficiently with our advanced tools and support",
      features: [
        "Portfolio Management",
        "Digital Contracts",
        "Client Dashboard",
        "Market Analytics",
      ],
      color: "purple",
      delay: "300",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Renters",
      description: "Discover your next home with confidence and convenience",
      features: [
        "Smart Search",
        "Neighborhood Guides",
        "Rent Calculator",
        "Move-in Support",
      ],
      color: "red",
      delay: "450",
    },
  ];

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Your Home-Finding Journey Starts Here
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're a student, an agent, a landlord or just a renter,
            we've got you covered with tailored solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role, index) => (
            <div
              key={index}
              className="group relative border border-gray-200 bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500"
              style={{
                animation: `fadeSlideUp 0.6s ease-out forwards ${role.delay}ms`,
                opacity: 0,
              }}
            >
              {/* Icon Container */}
              <div
                className={`
                w-14 h-14 rounded-xl bg-${role.color}-50 text-${role.color}-500
                flex items-center justify-center mb-6
                group-hover:scale-110 transition-transform duration-500
              `}
              >
                {role.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {role.title}
              </h3>
              <p className="text-gray-600 mb-6">{role.description}</p>

              {/* Features List */}
              <ul className="space-y-3">
                {role.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700">
                    <ChevronRight
                      className={`w-4 h-4 text-${role.color}-500`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Hover Effect Background */}
              {/*<div*/}
              {/*  className={`*/}
              {/*  absolute inset-0 rounded-2xl bg-gradient-to-br */}
              {/*  from-${role.color}-500/5 to-${role.color}-500/10*/}
              {/*  opacity-0 group-hover:opacity-100 transition-opacity duration-500*/}
              {/*  pointer-events-none*/}
              {/*`}*/}
              {/*/>*/}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeSlideUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default UserRolesShowcase;
