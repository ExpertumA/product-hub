import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = true, ...props }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "glass-surface rounded-lg p-5 border border-stroke transition-smooth",
        hover && "hover:shadow-soft hover:-translate-y-0.5",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
