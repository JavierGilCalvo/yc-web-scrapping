import { Checkbox } from "@/components/ui/checkbox";
import { useFilters } from "@/hooks/useFilters";

export const LastFundingTypeFilter = () => {
  const { filters, setFilters } = useFilters();
  return (
    <div className="flex flex-col items-start gap-2">
      {Object.entries(filters.lastFundingType).map(
        ([fundingType, isChecked]) => {
          return (
            <div className="flex flex-row items-center gap-2">
              <Checkbox
                id={fundingType}
                checked={isChecked}
                onCheckedChange={(checked) => {
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    lastFundingType: {
                      ...prevFilters.lastFundingType,
                      [fundingType]: checked,
                    },
                  }));
                }}
              />
              <label
                htmlFor={fundingType}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {fundingType}
              </label>
            </div>
          );
        }
      )}
    </div>
  );
};
