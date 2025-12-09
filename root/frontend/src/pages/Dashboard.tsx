import { useState } from "react";
import { useSales } from "../hooks/useSales";
import SalesTable from "../components/Table";
import Pagination from "../components/Pagination";
import Filters from "../components/Filters";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const [filters, setFilters] = useState({
    regions: [],
    genders: [],
    categories: [],
    payments: [],
    tags: [],
  });

  const { sales, page, totalPages, loading, fetchSales } = useSales(filters);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6">
        <Filters filters={filters} setFilters={setFilters} />

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
