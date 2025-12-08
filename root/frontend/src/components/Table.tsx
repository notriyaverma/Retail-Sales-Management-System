export default function Table({ data }: { data: any[] }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Transaction</th>
            <th className="text-left p-2">Customer</th>
            <th className="text-left p-2">Product</th>
            <th className="text-left p-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row: any) => (
            <tr key={row.transaction_id} className="border-b">
              <td className="p-2">{row.transaction_id}</td>
              <td className="p-2">{row.customer_name}</td>
              <td className="p-2">{row.product_name}</td>
              <td className="p-2">₹{row.final_amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
