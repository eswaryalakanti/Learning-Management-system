import axios from "axios";

const base_url = "https://learning-management-system-1-yu9w.onrender.com/api/v1";

const axiosInstance = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
  withCredentials: true,
});


axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve token from localStorage
    const token = localStorage.getItem('token');

    if (token) {
      // Attach JWT token to Authorization header
      config.headers['Authorization'] = `${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.defaults.baseURL = base_url;
axiosInstance.defaults.timeout = 15000;

export default axiosInstance;
