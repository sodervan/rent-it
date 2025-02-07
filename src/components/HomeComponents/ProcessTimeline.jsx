import React from "react";
import { Check, Search, FileText, Home } from "lucide-react";

const ProcessTimeline = () => {
  const steps = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "Discover and Choose",
      description:
        "Browse through our curated selection of verified student accommodations",
      delay: "0",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Simple Documentation",
      description: "Quick and hassle-free paperwork process with our guidance",
      delay: "150",
    },
    {
      icon: <Home className="w-6 h-6" />,
      title: "Welcome Home!",
      description: "Start your new chapter in your perfect student home",
      delay: "300",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 my-20">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        {steps.map((step, index) => (
          <div key={index} className="group relative flex-1 min-w-[250px]">
            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-8 left-[50%] w-full border-t-2 border-dashed border-gray-200" />
            )}

            {/* Card */}
            <div
              className="relative flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
              style={{
                animation: `fadeIn 0.5s ease-out forwards ${step.delay}ms`,
                opacity: 0,
              }}
            >
              {/* Icon Circle */}
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>

              {/* Step Number */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                {index + 1}
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
                {step.title}
              </h3>
              <p className="text-gray-600 text-center text-sm">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ProcessTimeline;
