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
      {/* Product Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <p className="label-style mb-3">ДУХОВОЙ ШКАФ</p>
        <h1 className="text-2xl font-bold tracking-tight mb-1">
          {model}
        </h1>
        <p className="text-muted-foreground text-sm">
          S/N: <span className="text-foreground">{serialNumber}</span>
        </p>
      </motion.div>

      {/* Product Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="relative mb-4"
      >
        <div className="aspect-square rounded-lg bg-surface p-6 flex items-center justify-center">
          <img
            src={imageUrl}
            alt={model}
            className="w-full h-full object-contain"
          />
        </div>
      </motion.div>

      {/* Original Product Badge - Below image, left aligned */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="mb-6"
      >
        <div className="inline-flex items-center gap-2 bg-success/10 border border-success/30 px-3 py-2 rounded-md">
          <CheckCircle className="w-4 h-4 text-success" />
          <span className="text-xs font-medium text-success uppercase tracking-wider">
            Оригинальный товар
          </span>
        </div>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="space-y-3"
      >
        {/* Primary CTA - Warranty */}
        {warrantyRegistered ? (
          <div className="bg-surface rounded-lg p-4 border border-success/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-success/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm font-semibold text-success uppercase tracking-wide">
                  Гарантия активна
                </p>
                <p className="text-xs text-muted-foreground">
                  Действует до {warrantyEndDate}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <Button
              onClick={onRegisterWarranty}
              className="w-full h-12 bg-primary hover:bg-primary-hover active:bg-primary-pressed text-white font-medium rounded-lg transition-smooth"
            >
              <Shield className="w-4 h-4 mr-2" />
              <span className="uppercase tracking-wide text-sm">
                Зарегистрировать гарантию
              </span>
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              +1 год дополнительной гарантии бесплатно
            </p>
          </div>
        )}

        {/* Secondary Actions - Two columns */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={onDownloadManual}
            variant="outline"
            className="h-12 bg-surface hover:bg-accent border-stroke text-foreground rounded-lg transition-smooth"
          >
            <FileText className="w-4 h-4 mr-2 text-muted-foreground" />
            <span className="text-sm uppercase tracking-wide">Инструкция</span>
          </Button>

          <Button
            onClick={() => setShowDiagram(true)}
            variant="outline"
            className="h-12 bg-surface hover:bg-accent border-stroke text-foreground rounded-lg transition-smooth"
          >
            <Ruler className="w-4 h-4 mr-2 text-muted-foreground" />
            <span className="text-sm uppercase tracking-wide">Схема</span>
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
