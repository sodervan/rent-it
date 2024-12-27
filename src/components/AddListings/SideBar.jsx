import PropTypes from "prop-types";

const Sidebar = ({ activeStep, steps, onStepClick }) => {
  return (
    <aside className="w-1/4 bg-[#F4EBFF] rounded-r-lg h-full flex flex-col fixed pb-20">
      <nav className="flex-1 overflow-y-auto rounded-r-lg">
        <ul>
          {steps.map((step, index) => (
            <li
              key={index}
              onClick={() => onStepClick(step.id)}
              className={`flex items-center cursor-pointer px-4 py-3 text-gray-400 transition-all ${
                step.id === activeStep ? "text-gray-800 font-semibold" : ""
              }`}
            >
              {/* Circle with step number */}
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm mr-4 ${
                  step.id === activeStep
                    ? "bg-purple-500 text-white font-bold"
                    : "bg-gray-300 text-gray-500"
                }`}
              >
                {step.id}
              </div>
              {/* Step label */}
              {step.label}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

Sidebar.propTypes = {
  activeStep: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onStepClick: PropTypes.func.isRequired,
};

export default Sidebar;
