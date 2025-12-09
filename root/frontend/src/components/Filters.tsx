import Dropdown from "./Dropdown";
import type { FiltersState } from "../pages/Dashboard";

interface FiltersProps {
  filters: FiltersState;
  setFilters: React.Dispatch<React.SetStateAction<FiltersState>>;
}

const AGE_RANGES = ["18-25", "26-35", "36-50", "51-60", "60+"];

const SORT_OPTIONS = [
  {
    label: "Date (Newest first)",
    value: "date_desc",
    sortBy: "date" as const,
    sortDir: "desc" as const,
  },
  {
    label: "Quantity (High to low)",
    value: "quantity_desc",
    sortBy: "quantity" as const,
    sortDir: "desc" as const,
  },
  {
    label: "Customer Name (A–Z)",
    value: "name_asc",
    sortBy: "name" as const,
    sortDir: "asc" as const,
  },
];

export default function Filters({ filters, setFilters }: FiltersProps) {
  const regions = ["North", "South", "East", "West", "Central"];
  const genders = ["Male", "Female"];
  const categories = ["Beauty", "Electronics", "Clothing"];
  const payments = ["Cash", "UPI", "Net Banking", "Wallet"];
  const tags = ["organic", "skincare", "beauty", "gadgets", "wireless"];

  const toggleMulti = (key: keyof FiltersState, value: string) => {
    setFilters((prev) => {
      const current = prev[key] as string[];
      const exists = current.includes(value);
      return {
        ...prev,
        [key]: exists
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  const update = (key: keyof FiltersState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const renderTagGroup = (
    label: string,
    key: keyof FiltersState,
    options: string[]
  ) => {
    const selected = filters[key] as string[];

    return (
      <div>
        <p className="text-xs font-medium text-gray-600 mb-2">{label}</p>
        <div className="flex flex-wrap gap-2">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => toggleMulti(key, opt)}
              className={[
                "px-3 py-1 rounded-full border text-xs",
                selected.includes(opt)
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-100 text-gray-700 border-gray-300",
              ].join(" ")}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const currentSortKey = `${filters.sortBy}_${filters.sortDir}`;
  const sortDropdownValue = SORT_OPTIONS.find(
    (opt) => opt.value === currentSortKey
  )
    ? currentSortKey
    : "date_desc";

  return (
    <section className="bg-white shadow p-4 rounded-lg mb-6 space-y-4">
      {/* Top row: search, date range, age range, sorting */}
      <div className="flex flex-wrap gap-3 items-end">
        {/* Search */}
        <div className="flex-1 min-w-[220px]">
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Search
          </label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => update("search", e.target.value)}
            placeholder="Search by customer or phone"
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>

        {/* Date from */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            From
          </label>
          <input
            type="date"
            value={filters.dateFrom || ""}
            onChange={(e) =>
              update("dateFrom", e.target.value || null)
            }
            className="border rounded-md px-3 py-2 text-sm"
          />
        </div>

        {/* Date to */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            To
          </label>
          <input
            type="date"
            value={filters.dateTo || ""}
            onChange={(e) =>
              update("dateTo", e.target.value || null)
            }
            className="border rounded-md px-3 py-2 text-sm"
          />
        </div>

        {/* Age range dropdown */}
        <Dropdown
          label="Age Range"
          value={filters.ageRange}
          options={AGE_RANGES.map((r) => ({ label: r, value: r }))}
          onChange={(v) => update("ageRange", v || null)}
        />

        {/* Sorting dropdown */}
        <Dropdown
          label="Sort"
          value={sortDropdownValue}
          options={SORT_OPTIONS}
          onChange={(v) => {
            const option = SORT_OPTIONS.find((o) => o.value === v);
            if (!option) return;
            setFilters((prev) => ({
              ...prev,
              sortBy: option.sortBy,
              sortDir: option.sortDir,
            }));
          }}
        />

        {/* Clear all */}
        <button
          type="button"
          onClick={() =>
            setFilters((prev) => ({
              ...prev,
              regions: [],
              genders: [],
              categories: [],
              payments: [],
              tags: [],
              search: "",
              ageRange: null,
              dateFrom: null,
              dateTo: null,
              sortBy: "date",
              sortDir: "desc",
            }))
          }
          className="ml-auto px-3 py-2 border rounded-md text-xs text-gray-700 bg-gray-50"
        >
          Clear all
        </button>
      </div>

      {/* Multi-select chips */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {renderTagGroup("Customer Region", "regions", regions)}
        {renderTagGroup("Gender", "genders", genders)}
        {renderTagGroup("Product Category", "categories", categories)}
        {renderTagGroup("Payment Method", "payments", payments)}
        {renderTagGroup("Tags", "tags", tags)}
      </div>
    </section>
  );
}
