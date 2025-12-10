import axios from "axios";
const BASE_URL = "http://localhost:8000";

export async function fetchSales(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}/sales?${query}`);
  return res.json();
}


export const api = axios.create({
  baseURL: "https://retail-sales-backend-ufwa.onrender.com", // FastAPI backend
});

