import { useFilters } from "@/hooks/useFilters";
import { RangeFilter } from "@/components/ui/filters/RangeFilter";

export const CompetitorsFilter = () => {
  const { filters, setFilters } = useFilters();
  const defaultValuies = {
    onValueChange: (value: number[]) => {
      setFilters({
        ...filters,
        numberOfCompetitors: value,
      });
    },
    defaultValue: [0, 9999], // 0 - 500,000,000
    max: 9999, // 500,000,000
    step: 10, // 100,000
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
