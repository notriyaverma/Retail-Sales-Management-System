export default function Pagination({ totalPages, page, setPage }) {
  return (
    <div className="flex gap-2 mt-4">
      <button 
        className="px-4 py-2 bg-gray-200 rounded"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Prev
      </button>

      <button 
        className="px-4 py-2 bg-gray-200 rounded"
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
