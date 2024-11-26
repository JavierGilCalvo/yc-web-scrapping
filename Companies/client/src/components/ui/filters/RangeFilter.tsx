import { Range } from "@/components/ui/range";

export const RangeFilter = ({
  onValueChange,
  defaultValue,
  max,
  step,
}: {
  onValueChange: (value: number[]) => void;
  defaultValue: number[];
  max: number;
  step: number;
}) => {
  return (
    <Range
      defaultValue={defaultValue}
      max={max}
      step={step}
      onValueChange={onValueChange}
      minStepsBetweenThumbs={1}
    />
  );
};
