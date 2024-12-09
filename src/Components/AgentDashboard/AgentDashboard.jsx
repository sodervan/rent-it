import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Loaders/Loader.jsx";

const AgentDashboard = () => {
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
  }, []);
  return (
    <>
      <div>
        <div className="mt-20">
          {loading ? <Loader /> : <div>Welcome to Dashboard</div>}
        </div>
      </div>
    </>
  );
};
export default AgentDashboard;
