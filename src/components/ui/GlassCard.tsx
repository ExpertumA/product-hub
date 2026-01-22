import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className, hover = true, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "glass-surface rounded-xl p-5 border border-stroke transition-smooth",
          hover && "hover:shadow-soft hover:-translate-y-0.5",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = "GlassCard";
