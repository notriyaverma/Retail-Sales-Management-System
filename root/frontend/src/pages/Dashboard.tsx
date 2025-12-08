import Filters from "../components/Filters";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import useSales from "../hooks/useSales";

export default function Dashboard() {
  const { data, loading, error, page, setPage } = useSales();

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Sales Dashboard</h1>

      <Filters />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && <Table data={data?.data || []} />}

      <Pagination 
        totalPages={data?.total_pages || 1} 
        page={page} 
        setPage={setPage}
      />
    </div>
  );
}
