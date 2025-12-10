interface Sale {
  quantity: number;
  final_amount: number;
  total_amount: number;
}

export default function SummaryCards({ sales }: { sales: Sale[] }) {
  const totalUnits = sales.reduce((sum, s) => sum + s.quantity, 0);
  const totalAmount = sales.reduce((sum, s) => sum + s.final_amount, 0);
  const totalDiscount = sales.reduce((sum, s) => sum + (s.total_amount - s.final_amount), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
      <div className="bg-blue-50 p-2 rounded-lg">
        <div className="text-gray-600 text-xs">Total Units Sold</div>
        <div className="text-lg font-bold text-blue-600">{totalUnits}</div>
      </div>
      <div className="bg-green-50 p-2 rounded-lg">
        <div className="text-gray-600 text-xs">Total Sales Amount</div>
        <div className="text-lg font-bold text-green-600">${totalAmount.toFixed(2)}</div>
      </div>
      <div className="bg-orange-50 p-2 rounded-lg">
        <div className="text-gray-600 text-xs">Total Discount</div>
        <div className="text-lg font-bold text-orange-600">${totalDiscount.toFixed(2)}</div>
      </div>
    </div>
  );
}