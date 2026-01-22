import { motion } from "framer-motion";
import { FileText, Shield, CheckCircle, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { InstallationDiagram } from "./InstallationDiagram";

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
  const [showDiagram, setShowDiagram] = useState(false);

  return (
    <section className="py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <p className="text-muted-foreground mb-2 text-sm">Добро пожаловать!</p>
        <h1 className="font-display text-2xl md:text-3xl font-semibold mb-1">
          {model}
        </h1>
        <p className="text-muted-foreground text-sm">
          Серийный номер: <span className="text-foreground font-medium">{serialNumber}</span>
        </p>
      </motion.div>

      {/* Product Image with Original Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative max-w-sm mx-auto mb-6"
      >
        {/* Original Product Badge */}
        <div className="absolute top-3 left-3 z-10">
          <div className="flex items-center gap-1.5 bg-success/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <CheckCircle className="w-3.5 h-3.5 text-white" />
            <span className="text-xs font-medium text-white uppercase tracking-wide">
              Оригинальный товар
            </span>
          </div>
        </div>

        <div className="aspect-square rounded-xl bg-background-secondary p-6 flex items-center justify-center">
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
        {/* Warranty Section */}
        {warrantyRegistered ? (
          <div className="glass-surface rounded-xl p-5 bg-success/5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-success" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-success">
                  Дополнительная гарантия активна
                </p>
                <p className="text-xs text-muted-foreground">
                  Действует до: {warrantyEndDate}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <Button
              onClick={onRegisterWarranty}
              className="w-full h-14 bg-primary hover:bg-primary-hover active:bg-primary-pressed text-primary-foreground font-semibold rounded-xl transition-smooth uppercase tracking-wider text-sm"
            >
              <Shield className="w-5 h-5 mr-3" />
              Зарегистрировать гарантию
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Получите +1 год дополнительной гарантии бесплатно
            </p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button
            onClick={onDownloadManual}
            variant="outline"
            className="h-12 bg-surface hover:bg-accent text-foreground rounded-xl transition-smooth group flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-smooth" />
            <span className="text-sm uppercase tracking-wide font-medium">Инструкция</span>
          </Button>

          <Button
            onClick={() => setShowDiagram(true)}
            variant="outline"
            className="h-12 bg-surface hover:bg-accent text-foreground rounded-xl transition-smooth group flex items-center justify-center gap-2"
          >
            <Ruler className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-smooth" />
            <span className="text-sm uppercase tracking-wide font-medium">Схема</span>
          </Button>
        </div>
      </motion.div>

      {/* Installation Diagram Modal */}
      <InstallationDiagram
        isOpen={showDiagram}
        onClose={() => setShowDiagram(false)}
        model={model}
      />
    </section>
  );
}
