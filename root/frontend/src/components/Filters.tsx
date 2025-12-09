import Dropdown from "./Dropdown";

export default function Filters({ filters, setFilters }) {
  const update = (key: string, value: any) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="bg-white p-4 shadow rounded-lg mb-6 flex flex-wrap gap-4 items-end">

      {/* Search Bar */}
      <div className="flex flex-col flex-1 min-w-[200px]">
        <label className="text-sm text-gray-600 mb-1">Search</label>
        <input
          type="text"
          value={filters.search}
          onChange={(e) => update("search", e.target.value)}
          className="border rounded px-3 py-2 text-sm"
          placeholder="Name, Phone no."
        />
      </div>

      {/* Region */}
      <Dropdown
        label="Customer Region"
        value={filters.regions[0] || ""}
        options={[
          { value: "North", label: "North" },
          { value: "South", label: "South" },
          { value: "East", label: "East" },
          { value: "West", label: "West" },
          { value: "Central", label: "Central" },
        ]}
        onChange={(v) => update("regions", v ? [v] : [])}
      />

      {/* Gender */}
      <Dropdown
        label="Gender"
        value={filters.genders[0] || ""}
        options={[
          { value: "Male", label: "Male" },
          { value: "Female", label: "Female" },
        ]}
        onChange={(v) => update("genders", v ? [v] : [])}
      />

      {/* Age Range */}
      <Dropdown
        label="Age Range"
        value={filters.ageRange}
        options={[
          { value: "18-25", label: "18-25" },
          { value: "26-35", label: "26-35" },
          { value: "36-50", label: "36-50" },
          { value: "51-100", label: "51+" },
        ]}
        onChange={(v) => update("ageRange", v)}
      />

      {/* Category */}
      <Dropdown
        label="Product Category"
        value={filters.categories[0] || ""}
        options={[
          { value: "Beauty", label: "Beauty" },
          { value: "Electronics", label: "Electronics" },
          { value: "Clothing", label: "Clothing" },
        ]}
        onChange={(v) => update("categories", v ? [v] : [])}
      />

      {/* Tags */}
      <Dropdown
        label="Tags"
        value={filters.tags[0] || ""}
        options={[
          { value: "organic", label: "organic" },
          { value: "skincare", label: "skincare" },
          { value: "beauty", label: "beauty" },
          { value: "gadgets", label: "gadgets" },
          { value: "wireless", label: "wireless" },
        ]}
        onChange={(v) => update("tags", v ? [v] : [])}
      />

      {/* Payment */}
      <Dropdown
        label="Payment Method"
        value={filters.payments[0] || ""}
        options={[
          { value: "Cash", label: "Cash" },
          { value: "UPI", label: "UPI" },
          { value: "Net Banking", label: "Net Banking" },
          { value: "Wallet", label: "Wallet" },
        ]}
        onChange={(v) => update("payments", v ? [v] : [])}
      />

      {/* Date */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">Date</label>
        <input
          type="date"
          value={filters.dateFrom || ""}
          onChange={(e) => update("dateFrom", e.target.value || null)}
          className="border rounded px-3 py-2 text-sm"
        />
      </div>

      {/* Sorting */}
      <Dropdown
        label="Sort by"
        value={filters.sortBy}
        options={[
          { value: "customer_name", label: "Customer Name (A–Z)" },
          { value: "date", label: "Date (Newest)" },
          { value: "final_amount", label: "Amount" },
        ]}
        onChange={(v) => update("sortBy", v)}
      />
    </div>
  );
}
