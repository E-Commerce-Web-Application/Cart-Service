import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/cart"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const getCart = () => API.get("/");
export const addItem = (data) => API.post("/add", data);
export const removeItem = (productId) =>
  API.delete(`/remove/${productId}`);
export const clearCart = () => API.delete("/clear");