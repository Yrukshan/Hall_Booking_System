import axios from "axios";

const API = axios.create({
  baseURL: "http://203.94.72.18/trainee/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// GLOBAL ERROR HANDLING
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;

    // 401 Unauthorized (logout)
    if (status === 401) {
      alert("Session expired. Please login again.");
      localStorage.removeItem("token");
      window.location.href = "/";
    }

    // 403 Forbidden
    else if (status === 403) {
      alert("You don't have permission to access this.");
    }

    // 404 Not Found
    else if (status === 404) {
      alert("Requested data not found.");
    }

    // 500 Server error
    else if (status === 500) {
      alert("Server error. Please try again later.");
    }

    // 400 Bad request
    else if (status === 400) {
      alert("Invalid request. Please check your input.");
    }

    return Promise.reject(error);
  }
);

export default API;