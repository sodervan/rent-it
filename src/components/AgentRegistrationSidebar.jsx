const AgentRegistrationSidebar = ({ activeStep }) => {
  const steps = [
    { id: 1, label: "Add Profile Picture" },
    { id: 2, label: "NIN Verification" },
    { id: 3, label: "Certification and License" },
    { id: 4, label: "Bank Details" },
  ];

  return (
    <div className="hidden md:block w-1/4 bg-purple-50 fixed md:left-6 rounded-lg h-full shadow-md p-6">
      <h2 className="text-lg font-semibold mb-8 text-gray-700">
        Agent Registration
      </h2>
      <ul className="space-y-10">
        {steps.map((step) => (
          <li key={step.id} className="flex items-center">
            <div
              className={`w-6 h-6 flex items-center justify-center rounded-full text-sm ${
                activeStep == step.id
                  ? "bg-purple-500 text-white"
                  : activeStep > step.id
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-700"
              }`}
            >
              {activeStep > step.id ? "✓" : step.id}
            </div>
            <span
              className={`ml-3 font-medium ${
                activeStep === step.id ? "text-purple-700" : "text-gray-800"
              }`}
            >
              {step.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgentRegistrationSidebar;
