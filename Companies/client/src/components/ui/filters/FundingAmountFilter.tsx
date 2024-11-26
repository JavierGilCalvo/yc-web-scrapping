import { useFilters } from "@/hooks/useFilters";
import { RangeFilter } from "@/components/ui/filters/RangeFilter";

export const FundingAmountFilter = () => {
  const { filters, setFilters } = useFilters();
  const defaultValuies = {
    onValueChange: (value: number[]) => {
      setFilters({
        ...filters,
        lastFundingAmount: value,
      });
    },
    defaultValue: [0, 500000001], // 0 - 500,000,000
    max: 500000000, // 500,000,000
    step: 100000, // 100,000
  };

  return (
    <RangeFilter
      onValueChange={defaultValuies.onValueChange}
      defaultValue={defaultValuies.defaultValue}
      max={defaultValuies.max}
      step={defaultValuies.step}
    ></RangeFilter>
  );
};
