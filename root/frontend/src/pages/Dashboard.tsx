import { useState } from "react";
import { useSales } from "../hooks/useSales";
import SalesTable from "../components/Table";
import Pagination from "../components/Pagination";
import Filters from "../components/Filters";
import Sidebar from "../components/Sidebar";
import SummaryCards from "../components/SummaryCards";
import type { FiltersState } from "../types/filters";

export default function Dashboard() {
  const [filters, setFilters] = useState<FiltersState>({
    regions: [],
    genders: [],
    categories: [],
    payments: [],
    tags: [],
    search: "",
    ageRange: null,
    dateFrom: null,
    dateTo: null,
    sortBy: "customer_name",
    sortDir: "asc",
  });

  const { sales, page, totalPages, loading, fetchSales } = useSales(filters);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6 space-y-6">
          
        <h1 className="text-3xl font-semibold mb-6">
          Sales Management System
        </h1>

        <Filters filters={filters} setFilters={setFilters} />

        <SummaryCards sales={sales} />

        {loading ? (
          <p className="text-center py-10 text-gray-600">Loading...</p>
        ) : (
          <SalesTable sales={sales} />
        )}

        <Pagination page={page} totalPages={totalPages} onChange={fetchSales} />
      </div>
    </div>
  );
}
