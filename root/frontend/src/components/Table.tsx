import type { Sale } from "../types/sale";

export default function SalesTable({ sales }: { sales: Sale[] }) {
  return (
    <div className="bg-white p-4 shadow rounded mt-4 overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Transaction ID</th>
            <th className="p-2">Date</th>
            <th className="p-2">Customer ID</th>
            <th className="p-2">Customer Name</th>
            <th className="p-2">Phone Number</th>
            <th className="p-2">Gender</th>
            <th className="p-2">Age</th>
            <th className="p-2">Product Category</th>
            <th className="p-2">Quantity</th>
            <th className="p-2">Total Amount</th>
            <th className="p-2">Customer Region</th>
            <th className="p-2">Product ID</th>
            <th className="p-2">Employee Name</th>
          </tr>
        </thead>

        <tbody>
          {sales.map((s) => (
            <tr key={s.transaction_id} className="border-b hover:bg-gray-50">
              <td className="p-2">{s.transaction_id}</td>
              <td className="p-2">{s.date}</td>
              <td className="p-2">{s.customer_id}</td>
              <td className="p-2">{s.customer_name}</td>
              <td className="p-2">{s.phone_number}</td>
              <td className="p-2">{s.gender}</td>
              <td className="p-2">{s.age}</td>
              <td className="p-2">{s.product_category}</td>
              <td className="p-2">{s.quantity}</td>
              <td className="p-2">₹{s.total_amount.toLocaleString()}</td>
              <td className="p-2">{s.customer_region}</td>
              <td className="p-2">{s.product_id}</td>
              <td className="p-2">{s.employee_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
