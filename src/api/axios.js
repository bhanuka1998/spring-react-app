// src/api/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://35.86.111.124:8080", // Replace with your Spring Boot server URL
  timeout: 10000, // Optional: set timeout for requests
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
