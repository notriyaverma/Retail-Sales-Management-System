import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Sale, SaleResponse } from "../types/sale";

export function useSales(filters: any) {
  const [sales, setSales] = useState<Sale[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  async function fetchSales(pageNum = 1) {
    const params: any = {
      page: pageNum,
      page_size: 10,
    };

    if (filters?.regions?.length) params.region = filters.regions.join(",");
    if (filters?.genders?.length) params.gender = filters.genders.join(",");
    if (filters?.categories?.length) params.category = filters.categories.join(",");
    if (filters?.payments?.length) params.payment = filters.payments.join(",");
    if (filters?.tags?.length) params.tags = filters.tags.join(",");

    try {
      setLoading(true);
      const res = await api.get<SaleResponse>("/sales", { params });
      setSales(res.data.data);
      setTotalPages(res.data.total_pages);
      setPage(pageNum);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setPage(1);
    fetchSales(1);
  }, [JSON.stringify(filters)]);

  return {
    sales,
    page,
    totalPages,
    loading,
    fetchSales,
  };
}
