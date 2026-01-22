import { cn } from "@/lib/utils";

interface ChipProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Chip({ children, active, onClick, className }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-full transition-smooth",
        "bg-surface text-muted-foreground",
        "hover:bg-accent hover:text-foreground",
        active && "border border-primary text-foreground",
        className
      )}
    >
      {children}
    </button>
  );
}
