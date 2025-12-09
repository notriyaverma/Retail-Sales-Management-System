import type { Sale } from "../types/sale";

export default function SalesTable({ sales }: { sales: Sale[] }) {
  return (
    <div className="bg-white p-4 shadow rounded mt-4 overflow-x-auto">
      <table className="min-w-max w-full border-collapse text-base">
        <thead>
          <tr className="bg-gray-100 text-left">
            {[
              "Transaction ID",
              "Date",
              "Customer ID",
              "Customer Name",
              "Phone Number",
              "Gender",
              "Age",
              "Product Category",
              "Quantity",
              "Total Amount",
              "Customer Region",
              "Product ID",
              "Employee Name",
            ].map((col) => (
              <th
                key={col}
                className="px-4 py-2 font-semibold text-gray-700 whitespace-nowrap"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {sales.map((s) => (
            <tr
              key={s.transaction_id}
              className="border-b hover:bg-gray-50"
            >
              <td className="px-4 py-2 whitespace-nowrap">{s.transaction_id}</td>
              <td className="px-4 py-2 whitespace-nowrap">{s.date}</td>
              <td className="px-4 py-2 whitespace-nowrap">{s.customer_id}</td>
              <td className="px-4 py-2 whitespace-nowrap">{s.customer_name}</td>
              <td className="px-4 py-2 whitespace-nowrap">{s.phone_number}</td>
              <td className="px-4 py-2 whitespace-nowrap">{s.gender}</td>
              <td className="px-4 py-2 whitespace-nowrap">{s.age}</td>
              <td className="px-4 py-2 whitespace-nowrap">{s.product_category}</td>
              <td className="px-4 py-2 whitespace-nowrap">{s.quantity}</td>
              <td className="px-4 py-2 whitespace-nowrap">
                ₹{s.total_amount.toLocaleString()}
              </td>
              <td className="px-4 py-2 whitespace-nowrap">{s.customer_region}</td>
              <td className="px-4 py-2 whitespace-nowrap">{s.product_id}</td>
              <td className="px-4 py-2 whitespace-nowrap">{s.employee_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
