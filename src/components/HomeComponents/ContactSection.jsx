import { MessageCircle, Phone, Mail, MessageSquare } from "lucide-react";

const ContactSection = () => {
  const contactOptions = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      label: "Live Chat",
      description: "2 Mins Reply",
      color: "bg-purple-50",
      hoverColor: "hover:bg-purple-100",
      iconColor: "text-purple-600",
      borderColor: "border-purple-200",
      gradient: "from-purple-500/20 to-purple-500/20",
      delay: "0",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      label: "Chat on WhatsApp",
      description: "3 Mins Reply",
      color: "bg-teal-50",
      hoverColor: "hover:bg-teal-100",
      iconColor: "text-teal-600",
      borderColor: "border-teal-200",
      gradient: "from-teal-500/20 to-emerald-500/20",
      delay: "100",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email Us",
      description: "radsteam01@gmail.com",
      color: "bg-indigo-50",
      hoverColor: "hover:bg-indigo-100",
      iconColor: "text-indigo-600",
      borderColor: "border-indigo-200",
      gradient: "from-indigo-500/20 to-blue-500/20",
      delay: "200",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Call Us",
      description: "+91 8035735724",
      color: "bg-blue-50", // Light blue background
      hoverColor: "hover:bg-blue-100", // Slightly darker blue on hover
      iconColor: "text-blue-600", // Blue icon
      borderColor: "border-blue-200", // Light blue border
      gradient: "from-blue-500/20 to-cyan-500/20", // Blue gradient
      delay: "300",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-50/50 to-sky-50/50 rounded-3xl -z-10" />

      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-gray-700 mb-3  inline-block bg-clip-text">
          Need help? Let's connect
        </h2>
        <p className="text-gray-600 text-lg">
          If you have any queries, feel free to contact us
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {contactOptions.map((option, index) => (
          <div
            key={index}
            className={`
              relative overflow-hidden rounded-xl border ${option.borderColor}
              backdrop-blur-sm bg-white/80
              transition-all duration-500 cursor-pointer
              group hover:-translate-y-1 hover:shadow-xl
              hover:border-transparent hover:shadow-${option.iconColor}/20
            `}
            style={{
              animation: `slideUp 0.6s ease-out forwards ${option.delay}ms`,
              opacity: 0,
            }}
          >
            <div className="p-6 relative z-10">
              {/* Icon container with animated background */}
              <div
                className={`
                relative w-14 h-14 rounded-xl 
                ${option.color} ${option.iconColor}
                flex items-center justify-center mb-4
                group-hover:scale-110 transition-transform duration-500
              `}
              >
                {option.icon}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-800">
                {option.label}
              </h3>
              <p className="text-sm text-gray-600">{option.description}</p>

              {/* Animated gradient background */}
              <div
                className={`
                absolute -right-12 -bottom-12 w-32 h-32 
                rounded-full bg-gradient-to-r ${option.gradient}
                opacity-0 group-hover:opacity-100
                transition-all duration-500 ease-in-out
                group-hover:scale-150
              `}
              />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
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

export default ContactSection;
