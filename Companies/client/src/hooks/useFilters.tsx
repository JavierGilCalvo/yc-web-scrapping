// hooks/useCompanies.js
import { useState } from "react";
import { industryFilterList } from "@/lib/utils";

export const useFilters = () => {
  const [filters, setFilters] = useState({
    Industries: industryFilterList,
    lastFundingType: {
      Seed: false,
      "Series A": false,
      "Series B": false,
    },
    lastFundingAmount: [0, 500000000],
    numberOfEmployees: {
      "11-50": false,
      "51-100": false,
    },
    numberOfCompetitors: [0, 9999],
    foundedDate: {
      initial: false,
      final: false,
    },
  });
  return {
    filters,
    setFilters,
  };
};
