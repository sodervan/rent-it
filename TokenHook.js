import { jwtVerify } from "jose";
import { useState, useEffect, useCallback } from "react";

// Create a custom hook to get token data
const useTokenData = () => {
  const [tokenData, setTokenData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTokenData = async () => {
      try {
        // Get token from cookies
        const cookies = document.cookie.split(";");
        const tokenCookie = cookies.find(
          (cookie) => cookie.trim().startsWith("the_token="), // Fixed cookie name
        );

        if (!tokenCookie) {
          setIsLoading(false);
          return;
        }

        const token = tokenCookie.split("=")[1];
        const secret = new TextEncoder().encode(
          import.meta.env.VITE_SECRET_KEY,
        );

        // Verify and decode the token
        const { payload } = await jwtVerify(token, secret);
        setTokenData(payload);
      } catch (error) {
        console.error("Error decoding token:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getTokenData();
  }, []);

  // Function to clear the token data and cookie
  const clearToken = useCallback(() => {
    // Clear the cookie by setting it with an expired date
    document.cookie =
      "the_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; SameSite=None";

    // Clear the state
    setTokenData(null);
  }, []);

  return { tokenData, isLoading, clearToken };
};

export default useTokenData;
