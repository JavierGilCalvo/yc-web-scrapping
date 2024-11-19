// hooks/useCompanies.js
import { useState, useEffect } from "react";
import { getCompanies } from "@/api/api";
import { industryFilterList } from "@/lib/utils";

export const useFilters = () => {
  const [filters, setFilters] = useState({
    Industries: industryFilterList,
    lastFundingType: {
      Seed: false,
      "Series A": false,
      "Series B": false,
    },
    lastFundingAmount: {
      min: 0,
      max: 999999999999,
    },
    numberOfEmployees: {
      "11-50": false,
      "51-100": false,
    },
    numberOfCompetitors: {
      min: 0,
      max: 9999,
    },
    foundedDate: {
      initial: false,
      final: false,
    },
  });
  const [loadingCompanies, setLoading] = useState(true);
  const [errorCompanies, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const response = await getCompanies(page);
        setCompanies(response.data.allTheCompanies);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        // @ts-expect-error cosas varias
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [page]);

  const nextPage = () =>
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  const prevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));
  const goToPage = (page: number) => setPage(page);

  return {
    companies,
    loadingCompanies,
    errorCompanies,
    page,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
  };
};
