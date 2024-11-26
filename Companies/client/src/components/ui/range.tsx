import * as React from "react";
import * as Slider from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Range = React.forwardRef<
  React.ElementRef<typeof Slider.Root>,
  React.ComponentPropsWithoutRef<typeof Slider.Root>
>(({ className, ...props }, ref) => (
  <Slider.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <Slider.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <Slider.Range className="absolute h-full bg-primary" />
    </Slider.Track>
    <Slider.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    <Slider.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </Slider.Root>
));

export { Range };
