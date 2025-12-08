import { useEffect, useState } from "react";

export default function useSales() {
  const [data, setData] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);

    fetch(`http://127.0.0.1:8000/sales/?page=${page}`)
      .then(res => res.json())
      .then(json => setData(json))
      .catch(() => setError("Failed to load"))
      .finally(() => setLoading(false));
  }, [page]);

  return { data, loading, error, page, setPage };
}
