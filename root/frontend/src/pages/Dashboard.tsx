import { useState } from "react";
import { useSales } from "../hooks/useSales";
import SalesTable from "../components/Table";
import Pagination from "../components/Pagination";
import Filters from "../components/Filters";
import Sidebar from "../components/Sidebar";
import StatsCards from "../components/StatsCards";

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
  pageSize: number;
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
  pageSize: 10,
};

export default function Dashboard() {
  const [filters, setFilters] = useState<FiltersState>(initialFilters);

  // FIXED: now pulling stats properly
  const { sales, page, totalPages, loading, fetchSales, stats } = useSales(filters);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6">
        <header className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Sales Management System</h1>
        </header>

        {/* STATS CARDS */}
        <StatsCards
          totalUnits={stats.totalUnits}
          totalAmount={stats.totalAmount}
          totalDiscount={stats.totalDiscount}
        />

        {/* FILTERS */}
        <Filters filters={filters} setFilters={setFilters} />

        {/* TABLE */}
        {loading ? (
          <p className="text-center py-10 text-gray-600">Loading...</p>
        ) : (
          <SalesTable sales={sales} />
        )}

        {/* PAGINATION */}
        <Pagination page={page} totalPages={totalPages} onChange={fetchSales} />
      </main>
    </div>
  );
}
