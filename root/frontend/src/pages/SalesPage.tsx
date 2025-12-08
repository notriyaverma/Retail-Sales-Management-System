import { useEffect, useState } from "react";
import { fetchSales } from "../services/api";

export default function SalesPage() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetchSales({ page: 1 }).then(data => setSales(data.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sales Dashboard</h1>

      <div className="grid gap-4">
        {sales.map((s, i) => (
          <div key={i} className="border rounded p-4 shadow">
            <div className="font-semibold">{s.customer_name}</div>
            <div>{s.product_name}</div>
            <div className="text-gray-500">{s.payment_method}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
