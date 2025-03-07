import axios from "axios";

const api = axios.create({
  baseURL: "https://json-placeholder.mock.beeceptor.com", // ✅ Set base URL here
  timeout: 5000, // Optional: Set a timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
