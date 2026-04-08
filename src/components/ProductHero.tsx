import { motion } from "framer-motion";
import { Shield, ChevronRight, BadgeCheck, FileText, Ruler, Download } from "lucide-react";
import { useState } from "react";
import { InstallationDiagram } from "./InstallationDiagram";
import ovenImage from "@/assets/hf-608-b-01.png";

interface Manual {
  title: string;
  onClick: () => void;
}

interface ProductHeroProps {
  model: string;
  serialNumber: string;
  onOrderInstallation: () => void;
  onRegisterWarranty: () => void;
  onDownloadManual: () => void;
  isWarrantyRegistered?: boolean;
  warrantyEndDate?: string;
  warrantyPurchaseDate?: string;
  manuals?: Manual[];
}

export function ProductHero({
  model,
  serialNumber,
  onOrderInstallation,
  onRegisterWarranty,
  onDownloadManual,
  isWarrantyRegistered = false,
  warrantyEndDate,
  warrantyPurchaseDate,
  manuals,
}: ProductHeroProps) {
  const [showDiagram, setShowDiagram] = useState(false);

  // Default manuals if none provided
  const defaultManuals: Manual[] = manuals || [
    { title: "Инструкция по эксплуатации", onClick: onDownloadManual },
    { title: "Инструкция по установке", onClick: onDownloadManual },
  ];

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
        {/* Original Product Badge */}
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
        {/* Warranty Block */}
        {isWarrantyRegistered ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-stroke overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary px-4 py-3 flex items-center gap-3">
              <Shield className="w-5 h-5 text-white" />
              <span className="text-sm font-semibold uppercase tracking-wide text-white">
                Гарантия активна
              </span>
            </div>
            {/* Details */}
            <div className="bg-surface p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                    Дата покупки
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {warrantyPurchaseDate || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                    Действует до
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {warrantyEndDate || "—"}
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-divider">
                <p className="text-[11px] text-muted-foreground">
                  Стандартная гарантия 2 года + 1 год дополнительно
                </p>
              </div>
            </div>
          </motion.div>
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

        {/* Instructions Block — visually prominent */}
        <div className="rounded-lg border border-stroke bg-surface overflow-hidden">
          <div className="px-4 py-3 border-b border-divider">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Документация
            </p>
          </div>
          <div className="divide-y divide-divider">
            {defaultManuals.map((manual, index) => (
              <button
                key={index}
                onClick={manual.onClick}
                className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-accent transition-smooth text-left"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{manual.title}</span>
                </div>
                <Download className="w-4 h-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>

        {/* Diagram button */}
        <button
          onClick={() => setShowDiagram(true)}
          className="w-full bg-surface border border-stroke hover:bg-accent rounded-lg transition-smooth p-4 text-left"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Ruler className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Схема встраивания</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </button>
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
