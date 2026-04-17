import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import diagramImage from "@/assets/installation-diagram.jpg";

interface InstallationDiagramProps {
  isOpen: boolean;
  onClose: () => void;
  model: string;
}

export function InstallationDiagram({ isOpen, onClose, model }: InstallationDiagramProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full max-w-lg bg-surface rounded-2xl shadow-deep overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between p-6 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center">
                  <Ruler className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-foreground leading-tight">
                    Схема встраивания
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">{model}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-background-secondary transition-smooth"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="px-6">
              <div className="rounded-xl overflow-hidden bg-background-secondary p-4">
                <img
                  src={diagramImage}
                  alt={`Схема встраивания ${model}`}
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div className="p-6">
              <Button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = diagramImage;
                  link.download = `schema-${model.replace(/\s+/g, "-")}.jpg`;
                  link.click();
                }}
                className="w-full h-12 bg-cta hover:bg-cta-hover text-cta-foreground rounded-xl transition-smooth"
              >
                <Download className="w-4 h-4 mr-2" />
                <span className="text-sm">Скачать схему</span>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
