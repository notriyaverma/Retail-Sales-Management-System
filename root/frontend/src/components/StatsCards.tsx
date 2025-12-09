interface StatsProps {
  totalUnits: number;
  totalAmount: number;
  totalDiscount: number;
}

export default function StatsCards({ totalUnits, totalAmount, totalDiscount }: StatsProps) {
  return (
    <div className="flex gap-6 my-4 flex-wrap">

      {/* Total Units */}
      <div className="border rounded-lg p-4 w-64 bg-white shadow-sm">
        <p className="text-gray-500 text-sm">Total units sold</p>
        <p className="text-2xl font-semibold mt-1">{totalUnits}</p>
      </div>

      {/* Total Amount */}
      <div className="border rounded-lg p-4 w-64 bg-white shadow-sm">
        <p className="text-gray-500 text-sm flex items-center gap-2">
          Total Amount
        </p>
        <p className="text-xl font-semibold mt-1">
          ₹{totalAmount.toLocaleString()}
        </p>
      </div>

      {/* Total Discount */}
      <div className="border rounded-lg p-4 w-64 bg-white shadow-sm">
        <p className="text-gray-500 text-sm flex items-center gap-2">
          Total Discount
        </p>
        <p className="text-xl font-semibold mt-1">
          ₹{totalDiscount.toLocaleString()}
        </p>
      </div>

    </div>
  );
}
