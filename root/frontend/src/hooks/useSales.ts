import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Sale, SaleResponse } from "../types/sale";
import type { FiltersState } from "../pages/Dashboard";

function parseAgeRange(ageRange: string | null) {
  if (!ageRange) return {};
  if (ageRange === "60+") return { age_min: 60 };

  const [min, max] = ageRange.split("-").map(Number);
  return Number.isFinite(min) && Number.isFinite(max)
    ? { age_min: min, age_max: max }
    : {};
}

export function useSales(filters: FiltersState) {
  const [sales, setSales] = useState<Sale[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  async function fetchSales(pageNum = 1) {
    const params: any = {
      page: pageNum,
      page_size: 10,
      search: filters.search,
      sort_by: filters.sortBy,
      sort_dir: filters.sortDir,
    };

    if (filters.regions.length) params.customer_region = filters.regions;
    if (filters.genders.length) params.gender = filters.genders;
    if (filters.categories.length) params.product_category = filters.categories;
    if (filters.payments.length) params.payment_method = filters.payments;
    if (filters.tags.length) params.tags = filters.tags;

    if (filters.dateFrom) params.date_from = filters.dateFrom;
    if (filters.dateTo) params.date_to = filters.dateTo;

    Object.assign(params, parseAgeRange(filters.ageRange));

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
    fetchSales(1);
  }, [JSON.stringify(filters)]);

  return { sales, page, totalPages, loading, fetchSales };
}
