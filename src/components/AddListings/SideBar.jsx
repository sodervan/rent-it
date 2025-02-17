import React from "react";
import PropTypes from "prop-types";
import { Check } from "lucide-react";

const Sidebar = ({ activeStep, steps, onStepClick, completedSteps = {} }) => {
  // Calculate if a step should be accessible based on completed steps
  const isStepAccessible = (stepId) => {
    if (stepId === 1) return true;
    return completedSteps[stepId - 1] || stepId === activeStep;
  };

  return (
    <aside className="hidden md:block w-1/4 bg-gradient-to-br from-purple-50 to-[#F4EBFF] rounded-r-lg h-full flex flex-col fixed pb-20 shadow-lg">
      {/* Header */}
      <div className="px-6 py-4 border-b border-purple-100">
        <h2 className="text-lg font-semibold text-purple-900">
          Create Listing
        </h2>
        <p className="text-sm text-purple-600">Complete all steps to publish</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto rounded-r-lg h-full pb-24">
        <ul className="p-4 space-y-2">
          {steps.map((step, index) => {
            const isActive = step.id === activeStep;
            const isCompleted = completedSteps[step.id];
            const isAccessible = isStepAccessible(step.id);

            return (
              <li key={index}>
                <button
                  onClick={() => isAccessible && onStepClick(step.id)}
                  disabled={!isAccessible}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-300 group
                    ${isActive ? "bg-white shadow-md" : "hover:bg-white/50"}
                    ${!isAccessible ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                    ${isCompleted ? "bg-purple-50" : ""}`}
                >
                  {/* Step number/check circle */}
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300
                      ${isActive ? "bg-purple-600 text-white scale-110" : ""}
                      ${isCompleted ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"}
                      ${!isActive && !isCompleted && isAccessible ? "group-hover:bg-purple-200" : ""}`}
                  >
                    {isCompleted ? (
                      <Check size={16} />
                    ) : (
                      <span className="text-sm font-semibold">{step.id}</span>
                    )}
                  </div>

                  {/* Step content */}
                  <div className="ml-4 text-left">
                    <p
                      className={`text-sm font-semibold transition-colors duration-300
                      ${isActive ? "text-purple-900" : ""}
                      ${isCompleted ? "text-green-700" : "text-gray-700"}`}
                    >
                      {step.label}
                    </p>
                    {step.description && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        {step.description}
                      </p>
                    )}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Progress indicator */}
      <div className="px-6 py-4 mt-auto border-t border-purple-100">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${(Object.keys(completedSteps).length / steps.length) * 100}%`,
            }}
          />
        </div>
        <p className="text-xs text-purple-600 mt-2">
          {Object.keys(completedSteps).length} of {steps.length} steps completed
        </p>
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  activeStep: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      description: PropTypes.string,
    }),
  ).isRequired,
  onStepClick: PropTypes.func.isRequired,
  completedSteps: PropTypes.object,
};

export default Sidebar;
