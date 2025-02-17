import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Check, Menu, X, ChevronRight } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";

const Sidebar = ({ activeStep, steps, onStepClick, completedSteps = {} }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const encodedItemId = searchParams.get("itemId");

  // Close mobile menu when step changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activeStep]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        !event.target.closest(".mobile-menu") &&
        !event.target.closest(".menu-button")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Calculate if a step should be accessible
  const isStepAccessible = (stepId) => {
    if (stepId === 1) return true;
    return completedSteps[stepId - 1] || stepId === activeStep;
  };

  // Handle step navigation
  const handleStepNavigation = (stepId) => {
    // if (!isStepAccessible(stepId)) return;

    const baseUrl = `/agent/addlisting/${stepId}`;
    const url = encodedItemId ? `${baseUrl}?itemId=${encodedItemId}` : baseUrl;

    navigate(url);
    onStepClick(stepId);
  };

  const StepsList = ({ isMobile = false }) => (
    <ul className={`space-y-2 ${isMobile ? "p-4" : "p-4"}`}>
      {steps.map((step, index) => {
        const isActive = step.id === activeStep;
        const isCompleted = completedSteps[step.id];
        const isAccessible = isStepAccessible(step.id);

        return (
          <li key={index}>
            <button
              onClick={() => handleStepNavigation(step.id)}
              // disabled={!isAccessible}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-300 group
                ${isActive ? "bg-white shadow-md" : "hover:bg-white/50"}
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
              <div className="ml-4 text-left flex-1">
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

              {isMobile && isAccessible && (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );

  const ProgressIndicator = () => (
    <div className="px-6 py-4 border-t border-purple-100">
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
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-1/4 bg-gradient-to-br from-purple-50 to-[#F4EBFF] rounded-r-lg h-full flex flex-col fixed pb-20 shadow-lg">
        {/* Header */}
        <div className="px-6 py-4 border-b border-purple-100">
          <h2 className="text-lg font-semibold text-purple-900">
            Create Listing
          </h2>
          <p className="text-sm text-purple-600">
            Complete all steps to publish
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto rounded-r-lg h-full pb-24">
          <StepsList />
        </nav>

        {/* Progress indicator */}
        <ProgressIndicator />
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="md:hidden fixed bottom-4 right-4 bg-purple-600 text-white p-3 rounded-full shadow-lg menu-button z-50 hover:bg-purple-700 active:bg-purple-800 transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-black/50 z-50 transition-opacity duration-300
          ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Slide-out Menu */}
      <div
        className={`md:hidden fixed inset-y-0 right-0 w-full max-w-[300px] bg-gradient-to-br from-purple-50 to-[#F4EBFF] 
          shadow-lg z-50 transition-transform duration-300 mobile-menu
          ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="px-6 py-4 border-b border-purple-100 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-purple-900">
                Create Listing
              </h2>
              <p className="text-sm text-purple-600">
                Complete all steps to publish
              </p>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-purple-900" />
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex-1 overflow-y-auto">
            <StepsList isMobile />
          </nav>

          {/* Mobile Progress Indicator */}
          <ProgressIndicator />
        </div>
      </div>
    </>
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
