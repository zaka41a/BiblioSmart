import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:5001/api",
  withCredentials: true
});

export const fetchBooks = async (params?: Record<string, string | number>) => {
  const response = await api.get("/books", { params });
  return response.data;
};

export const fetchBook = async (id: string) => {
  const response = await api.get(`/books/${id}`);
  return response.data;
};

export const fetchRecommendations = async (userId: string) => {
  const response = await api.get(`/users/${userId}/recommendations`);
  return response.data;
};
