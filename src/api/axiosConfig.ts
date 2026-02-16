import axios from "axios";

const axiosRiksiri = axios.create({
  baseURL: "https://api.riksiri.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosRiksiri.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosRiksiri;
