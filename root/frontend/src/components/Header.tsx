import { useState } from "react";

export default function Header({
  search,
  setSearch,
  sortBy,
  setSortBy,
  sortDir,
  setSortDir,
}: {
  search: string;
  setSearch: (v: string) => void;
  sortBy: string;
  setSortBy: (v: string) => void;
  sortDir: string;
  setSortDir: (v: string) => void;
}) {
  const [openSort, setOpenSort] = useState(false);

  return (
    <div className="flex items-center justify-between mb-6">
      {/* TITLE */}
      <h1 className="text-2xl font-bold">Sales Management System</h1>

      {/* SEARCH + SORT */}
      <div className="flex items-center gap-4">

        {/* SEARCH BAR */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search customer or phone..."
          className="px-4 py-2 w-72 bg-white border rounded-md shadow-sm"
        />

        {/* SORT DROPDOWN */}
        <div className="relative">
          <button
            onClick={() => setOpenSort(!openSort)}
            className="px-4 py-2 bg-white border rounded-md shadow-sm"
            type="button"
          >
            Sort: {sortBy} ({sortDir})
          </button>

          {openSort && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md z-10">
              <DropdownItem label="Date" value="date" onClick={setSortBy} />
              <DropdownItem label="Quantity" value="quantity" onClick={setSortBy} />
              <DropdownItem label="Customer Name" value="customer_name" onClick={setSortBy} />

              <hr />

              <DropdownItem label="Ascending" value="asc" onClick={setSortDir} />
              <DropdownItem label="Descending" value="desc" onClick={setSortDir} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DropdownItem({
  label,
  value,
  onClick,
}: {
  label: string;
  value: string;
  onClick: (v: string) => void;
}) {
  return (
    <div
      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
      onClick={() => onClick(value)}
    >
      {label}
    </div>
  );
}
