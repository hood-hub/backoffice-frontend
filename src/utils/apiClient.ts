import axios from "axios";

// Use the environment variable for the base API URL (via Vite's import.meta.env)
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://hoodhub-dmegabfra9fffqhz.canadacentral-01.azurewebsites.net/api/v1", // Fallback URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token in the Authorization header
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = ` ${token}`;
    } else {
      console.warn("No token found in localStorage");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
