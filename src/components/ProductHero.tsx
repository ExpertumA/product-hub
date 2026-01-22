import { motion } from "framer-motion";
import { Shield, Wrench, ChevronRight, BadgeCheck, FileText, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { InstallationDiagram } from "./InstallationDiagram";
import ovenImage from "@/assets/hf-608-b-01.png";

interface ProductHeroProps {
  model: string;
  serialNumber: string;
  onOrderInstallation: () => void;
  onRegisterWarranty: () => void;
  onDownloadManual: () => void;
  isWarrantyRegistered?: boolean;
  warrantyEndDate?: string;
}

export function ProductHero({
  model,
  serialNumber,
  onOrderInstallation,
  onRegisterWarranty,
  onDownloadManual,
  isWarrantyRegistered = false,
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

      {/* Product Image with Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="relative mb-6"
      >
        <div className="aspect-square rounded-lg bg-surface p-6 flex items-center justify-center">
          <img
            src={ovenImage}
            alt={model}
            className="w-full h-full object-contain"
          />
        </div>
        {/* Original Product Badge - bottom left, white, small */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white px-2 py-1 rounded">
          <BadgeCheck className="w-3 h-3 text-black" />
          <span className="text-[10px] font-semibold uppercase tracking-wide text-black">
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
        {/* Warranty CTA */}
        {isWarrantyRegistered ? (
          <div className="bg-surface rounded-lg p-4 border border-stroke">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide">
                  Гарантия активна
                </p>
                <p className="text-xs text-muted-foreground">
                  Действует до {warrantyEndDate}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={onRegisterWarranty}
            className="w-full bg-surface border border-stroke hover:bg-accent rounded-lg transition-smooth p-4 text-left"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide">
                    Зарегистрировать гарантию
                  </p>
                  <p className="text-xs text-muted-foreground">
                    +1 год дополнительно. Бесплатно. Всего 20 секунд.
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </button>
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
