import { motion } from "framer-motion";
import { ArrowRight, Gift } from "lucide-react";

export function PromoBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="py-6"
    >
      <div className="bg-surface rounded-lg border border-stroke p-5 relative overflow-hidden">
        {/* Subtle accent line */}
        <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
        
        <div className="pl-3">
          <div className="flex items-center gap-2 mb-2">
            <Gift className="w-4 h-4 text-primary" />
            <span className="label-style text-primary">Специальное предложение</span>
          </div>
          <h3 className="text-lg font-bold uppercase tracking-wide mb-2">
            Комплект техники со скидкой
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Соберите свой идеальный гарнитур и получите до 15% скидки
          </p>
          <button className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover transition-smooth group uppercase tracking-wide">
            Подробнее
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.section>
  );
}
