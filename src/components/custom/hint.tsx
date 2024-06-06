import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HintProps {
  label: string;
  children: React.ReactNode;
  asChild?: boolean;
  duration?: number;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  theme?: "light" | "dark";
}

export const Hint = ({
  label,
  children,
  side,
  align,
  duration = 0,
  theme,
  asChild,
}: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={duration}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <div className="absolute">
          <div className="relative">
            <TooltipContent
              side={side}
              align={align}
              className={
                theme === "dark" ? "text-background bg-foreground" : ""
              }
            >
              <p className="font-semibold text-sm capitalize">{label}</p>
            </TooltipContent>
          </div>
        </div>
      </Tooltip>
    </TooltipProvider>
  );
};
