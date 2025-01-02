// authService.js
const API_URL = import.meta.env.VITE_API_URL;
const TOKEN_REFRESH_INTERVAL = 30 * 60 * 1000;

class AuthService {
  static refreshTimer = null;

  static startRefreshTimer() {
    // Clear any existing timer
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
    }

    // Set up new timer
    this.refreshTimer = setInterval(async () => {
      try {
        await this.refreshToken();
      } catch (error) {
        console.error('Token refresh failed:', error);
        this.clearTokens();
        window.location.href = '/login';
      }
    }, TOKEN_REFRESH_INTERVAL);
  }

  static stopRefreshTimer() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
      this.refreshTimer = null;
    }
  }

  static async refreshToken() {
    try {
      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        throw new Error('No refresh token found');
      }

      const response = await fetch(`${API_URL}/api/v1/users/refreshToken`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${refreshToken}`
        }
      });

      if (!response.ok) {
        this.clearTokens();
        window.location.href = '/login';
        throw new Error('Token refresh failed');
      }

      const data = await response.json();
      localStorage.setItem('accessToken', data.accessToken);

      if (data.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken);
      }

      return data.accessToken;
    } catch (error) {
      console.error('Error refreshing token:', error);
      this.clearTokens();
      window.location.href = '/';
      throw error;
    }
  }

  static clearTokens() {
    this.stopRefreshTimer();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  // Utility method to check if access token is expired
  static isTokenExpired(token) {
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expiryTime = payload.exp * 1000; // Convert to milliseconds
      return Date.now() >= expiryTime;
    } catch {
      return true;
    }
  }

  // Method to get a valid access token
  static async getValidToken() {
    const currentToken = localStorage.getItem("accessToken");

    if (!currentToken || this.isTokenExpired(currentToken)) {
      // Token is missing or expired, try to refresh
      return await this.refreshToken();
    }

    return currentToken;
  }

  // Utility method to create an authenticated fetch request
  static async authenticatedFetch(url, options = {}) {
    try {
      const token = await this.getValidToken();

      const authOptions = {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(url, authOptions);

      // If we get a 401, try to refresh token and retry the request once
      if (response.status === 401) {
        const newToken = await this.refreshToken();

        authOptions.headers["Authorization"] = `Bearer ${newToken}`;
        return await fetch(url, authOptions);
      }

      return response;
    } catch (error) {
      console.error("Authentication error:", error);
      throw error;
    }
  }
}

export default AuthService;
