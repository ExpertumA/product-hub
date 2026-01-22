import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function PromoBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="py-6"
    >
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 via-background-secondary to-background-secondary border border-primary/20 p-6">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
        
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-wider text-primary mb-2">
            Специальное предложение
          </p>
          <h3 className="font-display text-xl font-semibold mb-2">
            Комплект техники со скидкой
          </h3>
          <p className="text-sm text-muted-foreground mb-4 max-w-xs">
            Соберите свой идеальный гарнитур и получите до 15% скидки
          </p>
          <button className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover transition-smooth group">
            Подробнее
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.section>
  );
}
