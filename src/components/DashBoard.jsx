import { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const navigate = useNavigate();
  const [agentData, setAgentData] = useState(null); // Use null initially
  const [accessToken, setAccessToken] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAgentDetails = async (token) => {
    try {
      setLoading(true); // Start loading
      const response = await fetch(
        "https://rent-it-api.onrender.com/api/v1/agents",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Pass token here
          },
        },
      );

      const result = await response.json();
      console.log("API result:", result); // Log the full result for debugging
      if (response.ok) {
        setAgentData(result);
        console.log(agentData);
      } else {
        console.log("Failed to fetch agent details");
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
      fetchAgentDetails(token); // Fetch agent details only after token is set
    }
  }, []); // Empty dependency array to run only once on mount

  return (
    <>
      <div className="mt-20 flex items-center gap-5 flex-col justify-center px-6">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div>
              <img
                src="https://res.cloudinary.com/dmlgns85e/image/upload/v1728321466/Vector-3_s9b0ni.png"
                alt="#"
              />
            </div>
            <div>
              {agentData && agentData.payload ? ( // Safely check agentData
                <p className="text-center">
                  <span className="font-semibold">
                    {agentData.payload.firstname},
                  </span>{" "}
                  Welcome to RentIT! We’re thrilled to have you on board. Your
                  information has been successfully submitted.
                </p>
              ) : (
                <p className="text-center">Loading agent data...</p>
              )}
            </div>
            <div>
              <button
                onClick={() => {
                  navigate("/agent/agentdashboard");
                }}
                className="px-4 py-3 rounded-lg bg-primaryPurple text-white hover:shadow-lg transition-all duration-300"
              >
                Go to Dashboard
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DashBoard;
