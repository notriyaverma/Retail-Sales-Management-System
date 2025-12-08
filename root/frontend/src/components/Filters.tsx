export default function Filters({ filters, setFilters }) {
  const regions = ["North", "South", "East", "West", "Central"];
  const genders = ["Male", "Female"];
  const categories = ["Beauty", "Electronics", "Clothing"];
  const payments = ["Cash", "UPI", "Net Banking", "Wallet"];
  const tags = ["organic", "skincare", "beauty", "gadgets", "wireless"];

  const toggle = (key: string, value: string) => {
    setFilters((prev: any) => {
      const arr = prev[key];
      return arr.includes(value)
        ? { ...prev, [key]: arr.filter((v: string) => v !== value) }
        : { ...prev, [key]: [...arr, value] };
    });
  };

  const renderGroup = (label: string, key: string, options: string[]) => (
    <div className="mb-4">
      <p className="font-medium mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            className={`px-3 py-1 rounded-full border ${
              filters[key].includes(opt)
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-100 border-gray-300"
            }`}
            onClick={() => toggle(key, opt)}
            type="button"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white shadow p-4 rounded-lg mb-6">
      {renderGroup("Region", "regions", regions)}
      {renderGroup("Gender", "genders", genders)}
      {renderGroup("Category", "categories", categories)}
      {renderGroup("Payment Method", "payments", payments)}
      {renderGroup("Tags", "tags", tags)}
    </div>
  );
}
