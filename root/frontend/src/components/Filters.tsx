import Dropdown from "./Dropdown";

export default function Filters({ filters, setFilters }: { filters: any; setFilters: any }) {
  const update = (key: string, value: string[]) =>
    setFilters((prev: any) => ({ ...prev, [key]: value }));

  return (
    <div className="flex gap-3 flex-wrap bg-white p-4 rounded-lg shadow mb-6">
      <Dropdown
        label="Customer Region"
        options={["North", "South", "East", "West", "Central"]}
        selected={filters.regions}
        onChange={(v) => update("regions", v)}
      />

      <Dropdown
        label="Gender"
        options={["Male", "Female"]}
        selected={filters.genders}
        onChange={(v) => update("genders", v)}
      />

      <Dropdown
        label="Age Range"
        options={["18-25", "26-35", "36-45", "46-60", "60+"]}
        selected={filters.ageRange ? [filters.ageRange] : []}
        onChange={(v) =>
          setFilters((prev: any) => ({
            ...prev,
            ageRange: v[0] || null,
          }))
        }
      />

      <Dropdown
        label="Product Category"
        options={["Beauty", "Electronics", "Clothing"]}
        selected={filters.categories}
        onChange={(v) => update("categories", v)}
      />

      <Dropdown
        label="Tags"
        options={["organic", "beauty", "gadgets", "skincare", "wireless"]}
        selected={filters.tags}
        onChange={(v) => update("tags", v)}
      />

      <Dropdown
        label="Payment Method"
        options={["Cash", "UPI", "Net Banking", "Wallet"]}
        selected={filters.payments}
        onChange={(v) => update("payments", v)}
      />

      {/* SORT */} 
      <Dropdown
        label="Sort: Customer Name (A-Z)"
        options={["Date (Newest first)", "Quantity", "Customer Name (A-Z)", "Customer Name (Z-A)"]}
        selected={[filters.sortBy + " " + filters.sortDir]}
        onChange={(v) => {
          const choice = v[0];
          if (choice === "Date (Newest first)")
            setFilters((prev: any) => ({ ...prev, sortBy: "date", sortDir: "desc" }));
          if (choice === "Quantity")
            setFilters((prev: any) => ({ ...prev, sortBy: "quantity", sortDir: "asc" }));
          if (choice === "Customer Name (A-Z)")
            setFilters((prev: any) => ({ ...prev, sortBy: "name", sortDir: "asc" }));
          if (choice === "Customer Name (Z-A)")
            setFilters((prev: any) => ({ ...prev, sortBy: "name", sortDir: "desc" }));
        }}
      />
    </div>
  );
}
