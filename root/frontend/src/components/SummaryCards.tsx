export default function SummaryCards({ sales }) {
  const totalUnits = sales.reduce((sum, s) => sum + s.quantity, 0);
  const totalAmount = sales.reduce((sum, s) => sum + s.final_amount, 0);
  const totalDiscount = sales.reduce((sum, s) => sum + (s.total_amount - s.final_amount), 0);

  return (
    <div className="flex gap-4 my-4">

      <div className="p-4 bg-white shadow rounded border w-64">
        <p className="text-sm text-gray-500">Total units sold</p>
        <p className="text-xl font-bold">{totalUnits}</p>
      </div>

      <div className="p-4 bg-white shadow rounded border w-64">
        <p className="text-sm text-gray-500">Total Amount</p>
        <p className="text-xl font-bold">₹{totalAmount.toLocaleString()}</p>
      </div>

      <div className="p-4 bg-white shadow rounded border w-64">
        <p className="text-sm text-gray-500">Total Discount</p>
        <p className="text-xl font-bold">₹{totalDiscount.toLocaleString()}</p>
      </div>
    </div>
  );
}
