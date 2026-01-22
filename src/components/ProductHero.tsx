import { motion } from "framer-motion";
import { FileText, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductHeroProps {
  model: string;
  serialNumber: string;
  imageUrl: string;
  onRegisterWarranty: () => void;
  onDownloadManual: () => void;
  warrantyRegistered: boolean;
  warrantyEndDate?: string;
}

export function ProductHero({
  model,
  serialNumber,
  imageUrl,
  onRegisterWarranty,
  onDownloadManual,
  warrantyRegistered,
  warrantyEndDate,
}: ProductHeroProps) {
  return (
    <section className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <p className="text-muted-foreground mb-2">Добро пожаловать!</p>
        <h1 className="font-display text-3xl md:text-4xl font-semibold mb-1">
          {model}
        </h1>
        <p className="text-muted-foreground text-sm">
          Серийный номер: <span className="text-foreground">{serialNumber}</span>
        </p>
      </motion.div>

      {/* Product Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative max-w-sm mx-auto mb-8"
      >
        <div className="aspect-square rounded-xl bg-background-secondary p-8 flex items-center justify-center border border-stroke">
          <img
            src={imageUrl}
            alt={model}
            className="w-full h-full object-contain"
          />
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-3 max-w-sm mx-auto"
      >
        {/* Manual Button */}
        <Button
          onClick={onDownloadManual}
          variant="outline"
          className="w-full h-14 bg-surface border-stroke hover:bg-accent text-foreground rounded-md transition-smooth group"
        >
          <FileText className="w-5 h-5 mr-3 text-muted-foreground group-hover:text-foreground transition-smooth" />
          <span>Скачать инструкцию</span>
        </Button>

        {/* Warranty Section */}
        {warrantyRegistered ? (
          <div className="glass-surface rounded-md p-5 border border-success/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-success/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-success" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-success">
                  Дополнительная гарантия активна
                </p>
                <p className="text-xs text-muted-foreground">
                  Действует до: {warrantyEndDate}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <Button
            onClick={onRegisterWarranty}
            className="w-full h-14 bg-primary hover:bg-primary-hover active:bg-primary-pressed text-primary-foreground font-medium rounded-md transition-smooth glow-accent"
          >
            <Shield className="w-5 h-5 mr-3" />
            <span>Зарегистрировать гарантию</span>
          </Button>
        )}
      </motion.div>
    </section>
  );
}
