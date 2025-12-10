import { useState } from "react";

interface FilterPanelProps {
  onFilterChange: (filters: any) => void;
}

export default function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");

  const handleFilter = () => {
    onFilterChange({
      search: search || undefined,
      customer_region: region ? [region] : undefined,
      gender: gender ? [gender] : undefined,
      product_category: category ? [category] : undefined,
      page: 1,
    });
  };

  return (
    <div className="bg-gray-50 p-2 rounded-lg mb-2">
      <h2 className="text-xs font-semibold mb-2">Filters</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-2 py-1 text-xs"
        />
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="border rounded px-2 py-1 text-xs"
        >
          <option value="">Region</option>
          <option value="East">East</option>
          <option value="West">West</option>
          <option value="North">North</option>
          <option value="South">South</option>
        </select>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="border rounded px-2 py-1 text-xs"
        >
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded px-2 py-1 text-xs"
        >
          <option value="">Category</option>
          <option value="Clothing">Clothing</option>
          <option value="Electronics">Electronics</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>
      <button
        onClick={handleFilter}
        className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
      >
        Apply Filters
      </button>
    </div>
  );
}