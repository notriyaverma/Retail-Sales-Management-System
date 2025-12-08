const BASE_URL = "http://localhost:8000";

export async function fetchSales(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}/sales?${query}`);
  return res.json();
}
