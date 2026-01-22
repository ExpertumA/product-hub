import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import diagramImage from "@/assets/installation-diagram.jpg";

interface InstallationDiagramProps {
  isOpen: boolean;
  onClose: () => void;
  model: string;
}

export function InstallationDiagram({
  isOpen,
  onClose,
  model,
}: InstallationDiagramProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full max-w-lg bg-surface rounded-lg border border-stroke shadow-deep overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-divider">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                  <ZoomIn className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-base font-bold uppercase tracking-wide">
                    Схема встраивания
                  </h2>
                  <p className="text-xs text-muted-foreground">{model}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-accent transition-smooth"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Diagram Image */}
            <div className="p-4">
              <div className="rounded-md overflow-hidden bg-white">
                <img
                  src={diagramImage}
                  alt={`Схема встраивания ${model}`}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="px-5 pb-5">
              <Button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = diagramImage;
                  link.download = `schema-${model.replace(/\s+/g, "-")}.jpg`;
                  link.click();
                }}
                variant="outline"
                className="w-full h-12 bg-surface hover:bg-accent border-stroke text-foreground rounded-lg transition-smooth"
              >
                <Download className="w-4 h-4 mr-2" />
                <span className="uppercase tracking-wide text-sm">Скачать схему</span>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
