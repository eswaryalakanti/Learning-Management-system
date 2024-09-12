import axios from "axios";

const base_url = "https://learning-management-system-1-yu9w.onrender.com/api/v1";

const axiosInstance = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
  withCredentials: true,
});

axiosInstance.defaults.baseURL = base_url;
axiosInstance.defaults.timeout = 6500;

export default axiosInstance;
