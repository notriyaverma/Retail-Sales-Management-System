import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Sale, SaleResponse } from "../types/sale";
import type { FiltersState } from "../pages/Dashboard";

// Convert "18-25" or "60+" into min/max ages
function parseAgeRange(ageRange: string | null) {
  if (!ageRange) return {};
  if (ageRange === "60+") return { age_min: 60 };

  const [minStr, maxStr] = ageRange.split("-");
  return {
    age_min: Number(minStr),
    age_max: Number(maxStr),
  };
}

export function useSales(filters: FiltersState) {
  const [sales, setSales] = useState<Sale[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [stats, setStats] = useState({
    totalUnits: 0,
    totalAmount: 0,
    totalDiscount: 0,
  });

  async function fetchSales(pageNum = 1) {
    const params: any = {
      page: pageNum,
      page_size: 13,
      sort_by: filters.sortBy,
      sort_dir: filters.sortDir,
    };

    // Search
    if (filters.search) params.search = filters.search;

    // Multi-select filters
    if (filters.regions.length) params.customer_region = filters.regions;
    if (filters.genders.length) params.gender = filters.genders;
    if (filters.categories.length) params.product_category = filters.categories;
    if (filters.payments.length) params.payment_method = filters.payments;
    if (filters.tags.length) params.tags = filters.tags;

    // Date Range
    if (filters.dateFrom) params.date_from = filters.dateFrom;
    if (filters.dateTo) params.date_to = filters.dateTo;

    // Age Range
    const { age_min, age_max } = parseAgeRange(filters.ageRange);
    if (age_min !== undefined) params.age_min = age_min;
    if (age_max !== undefined) params.age_max = age_max;

    try {
      setLoading(true);
      const res = await api.get<SaleResponse>("/sales", { params });

      setSales(res.data.data);
      setTotalPages(res.data.total_pages);
      setPage(pageNum);

      // Stats from backend
      setStats({
        totalUnits: res.data.total_units ?? 0,
        totalAmount: res.data.total_amount ?? 0,
        totalDiscount: res.data.total_discount ?? 0,
      });

    } finally {
      setLoading(false);
    }
  }

  // Fetch when filters change
  useEffect(() => {
    fetchSales(1);
  }, [JSON.stringify(filters)]);

  return {
    sales,
    page,
    totalPages,
    loading,
    fetchSales,
    stats,
  };
}
