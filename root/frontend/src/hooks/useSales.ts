import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Sale, SaleResponse } from "../types/sale";

export function useSales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  async function fetchSales(pageNum = 1) {
    try {
      setLoading(true);
      const res = await api.get<SaleResponse>("/sales", {
        params: { page: pageNum, page_size: 10 },
      });
      setSales(res.data.data);
      setTotalPages(res.data.total_pages);
      setPage(pageNum);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSales(1);
  }, []);

  return {
    sales,
    page,
    totalPages,
    loading,
    fetchSales,
  };
}
