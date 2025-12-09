import { useState } from "react";
import { useSales } from "../hooks/useSales";
import SalesTable from "../components/Table";
import Pagination from "../components/Pagination";
import Filters from "../components/Filters";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header"; // You will create this next

export interface FiltersState {
  regions: string[];
  genders: string[];
  categories: string[];
  payments: string[];
  tags: string[];
  search: string;
  ageRange: string | null;
  dateFrom: string | null;
  dateTo: string | null;
  sortBy: "date" | "quantity" | "name";
  sortDir: "asc" | "desc";
}

const initialFilters: FiltersState = {
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
};

export default function Dashboard() {
  const [filters, setFilters] = useState<FiltersState>(initialFilters);

  const { sales, page, totalPages, loading, fetchSales } = useSales(filters);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6">

        <Header
          search={filters.search}
          sortBy={filters.sortBy}
          sortDir={filters.sortDir}
          onSearch={(v) => setFilters({ ...filters, search: v })}
          onSortBy={(v) => setFilters({ ...filters, sortBy: v })}
          onSortDir={(v) => setFilters({ ...filters, sortDir: v })}
        />

        <Filters filters={filters} setFilters={setFilters} />

        {loading ? (
          <p className="text-center py-10 text-gray-600">Loading...</p>
        ) : (
          <SalesTable sales={sales} />
        )}

        <Pagination page={page} totalPages={totalPages} onChange={fetchSales} />
      </main>
    </div>
  );
}
