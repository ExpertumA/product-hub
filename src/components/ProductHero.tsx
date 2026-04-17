import { motion } from "framer-motion";
import { Shield, ChevronRight, BadgeCheck, FileText, Ruler } from "lucide-react";
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
      {/* Product Title */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-2"
      >
        <h1 className="font-serif text-3xl text-foreground leading-tight mb-3">
          Духовой шкаф {model}
        </h1>
        <p className="text-xs text-muted-foreground">
          S/N: <span className="text-foreground font-medium">{serialNumber}</span>
        </p>
      </motion.div>

      {/* Product Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="relative mb-6 mt-5"
      >
        <div className="aspect-square rounded-xl bg-background-secondary p-8 flex items-center justify-center">
          <img
            src={ovenImage}
            alt={model}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-full shadow-soft">
          <BadgeCheck className="w-3 h-3 text-primary" />
          <span className="text-[10px] font-medium uppercase tracking-wider text-foreground">
            Оригинал
          </span>
        </div>
      </motion.div>
        <span>Главная</span>
        <span className="text-primary">•</span>
        <span>Духовые шкафы</span>
        <span className="text-primary">•</span>
        <span className="text-foreground">{model}</span>
      </motion.div>

      {/* Product Title - Serif */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-2"
      >
        <h1 className="font-serif text-3xl text-foreground leading-tight mb-3">
          Духовой шкаф {model}
        </h1>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-warning text-warning" />
            <span className="font-medium">5</span>
            <span className="text-muted-foreground">/ 15 отзывов</span>
          </div>
          <span className="text-muted-foreground">
            Артикул: <span className="text-foreground">{serialNumber}</span>
          </span>
        </div>
      </motion.div>

      {/* Product Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="relative mb-6 mt-5"
      >
        <div className="aspect-square rounded-xl bg-background-secondary p-8 flex items-center justify-center">
          <img
            src={ovenImage}
            alt={model}
            className="w-full h-full object-contain"
          />
        </div>
        {/* Original Product Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-full shadow-soft">
          <BadgeCheck className="w-3 h-3 text-primary" />
          <span className="text-[10px] font-medium uppercase tracking-wider text-foreground">
            Оригинал
          </span>
        </div>
      </motion.div>

      {/* Specs - dotted style like reference */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="bg-surface rounded-xl p-5 mb-6 shadow-soft"
      >
        <p className="label-style mb-3">Характеристики</p>
        <div className="space-y-1">
          <div className="spec-row text-sm">
            <span className="text-muted-foreground">Ширина, см</span>
            <span className="font-medium text-foreground">59.5</span>
          </div>
          <div className="spec-row text-sm">
            <span className="text-muted-foreground">Высота, см</span>
            <span className="font-medium text-foreground">59.5</span>
          </div>
          <div className="spec-row text-sm">
            <span className="text-muted-foreground">Глубина, см</span>
            <span className="font-medium text-foreground">56.7</span>
          </div>
          <div className="spec-row text-sm">
            <span className="text-muted-foreground">Объём, л</span>
            <span className="font-medium text-foreground">77</span>
          </div>
          <div className="spec-row text-sm">
            <span className="text-muted-foreground">Технологии</span>
            <span className="font-medium text-foreground">Smart</span>
          </div>
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
          <div className="bg-surface rounded-xl p-4 shadow-soft border border-primary/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Расширенная гарантия активна
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Действует до {warrantyEndDate}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={onRegisterWarranty}
            className="w-full bg-cta hover:bg-cta-hover rounded-xl transition-smooth p-4 text-left shadow-soft group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-cta-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-cta-foreground">
                    Зарегистрировать гарантию
                  </p>
                  <p className="text-[11px] text-cta-foreground/85 mt-0.5">
                    +1 год бесплатно. Всего 20 секунд.
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-cta-foreground/80 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>
        )}

        {/* Secondary Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={onDownloadManual}
            variant="outline"
            className="h-12 bg-surface hover:bg-background-secondary border-stroke text-foreground rounded-xl transition-smooth shadow-soft"
          >
            <FileText className="w-4 h-4 mr-2 text-primary" />
            <span className="text-xs font-medium">Инструкция</span>
          </Button>

          <Button
            onClick={() => setShowDiagram(true)}
            variant="outline"
            className="h-12 bg-surface hover:bg-background-secondary border-stroke text-foreground rounded-xl transition-smooth shadow-soft"
          >
            <Ruler className="w-4 h-4 mr-2 text-primary" />
            <span className="text-xs font-medium">Схема встраивания</span>
          </Button>
        </div>
      </motion.div>

      <InstallationDiagram
        isOpen={showDiagram}
        onClose={() => setShowDiagram(false)}
        model={model}
      />
    </section>
  );
}
