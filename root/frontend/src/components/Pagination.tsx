export default function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}) {
  return (
    <div className="flex justify-center gap-4 mt-4">
      <button
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      >
        Prev
      </button>

      <span className="px-4 py-2">
        Page {page} of {totalPages}
      </span>

      <button
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
