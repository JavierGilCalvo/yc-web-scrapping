import { Slider } from "@/components/ui/slider";

export const slideFilter = ({
  onChange,
}: {
  onChange: React.FormEventHandler<HTMLDivElement> | undefined;
}) => {
  return <Slider defaultValue={[33]} max={100} step={1} onChange={onChange} />;
};
