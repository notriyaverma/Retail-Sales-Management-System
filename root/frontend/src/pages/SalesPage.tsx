import { useEffect, useState } from "react";
import { fetchSales } from "../services/api";
import SummaryCards from "../components/SummaryCards";
import FilterPanel from "../components/FilterPanel";

interface Sale {
  customer_name: string;
  product_name: string;
  payment_method: string;
  final_amount: number;
  quantity: number;
  total_amount: number;
  date?: string;
  transaction_id?: string;
  [key: string]: any;
}

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFilterChange = async (filters: any) => {
    setLoading(true);
    try {
      const data = await fetchSales(filters);
      setSales(data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFilterChange({ page: 1 });
  }, []);

  return (
    <div className="p-2">
      <h1 className="text-sm font-bold mb-2">Sales Dashboard</h1>

      <SummaryCards sales={sales} />

      <FilterPanel onFilterChange={handleFilterChange} />

      <div className="mt-2 overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="text-left p-1 font-semibold">Date</th>
              <th className="text-left p-1 font-semibold">Customer</th>
              <th className="text-left p-1 font-semibold">Product</th>
              <th className="text-left p-1 font-semibold">Category</th>
              <th className="text-left p-1 font-semibold">Qty</th>
              <th className="text-left p-1 font-semibold">Amount</th>
              <th className="text-left p-1 font-semibold">Payment</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((s: Sale, i: number) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-1">{s.date}</td>
                <td className="p-1">{s.customer_name}</td>
                <td className="p-1">{s.product_name}</td>
                <td className="p-1">{s.product_category}</td>
                <td className="p-1">{s.quantity}</td>
                <td className="p-1">${s.final_amount.toFixed(2)}</td>
                <td className="p-1">{s.payment_method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {loading && <div className="text-xs text-gray-500 mt-2">Loading...</div>}
    </div>
  );
}