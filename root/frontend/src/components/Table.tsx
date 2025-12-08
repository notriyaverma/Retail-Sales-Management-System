import type { Sale } from "../types/sale";

export default function SalesTable({ sales }: { sales: Sale[] }) {
  return (
    <div className="bg-white p-4 shadow rounded mt-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Customer</th>
            <th className="p-2">Product</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Payment</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>

        <tbody>
          {sales.map((s) => (
            <tr key={s.transaction_id} className="border-b">
              <td className="p-2">{s.customer_name}</td>
              <td className="p-2">{s.product_name}</td>
              <td className="p-2">₹{s.final_amount.toLocaleString()}</td>
              <td className="p-2">{s.payment_method}</td>
              <td className="p-2">{s.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
