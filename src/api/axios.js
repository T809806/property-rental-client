import axios from "axios";

const api = axios.create({
  baseURL: "https://property-rental-server-k9q1.onrender.com/api",
});

export default api;