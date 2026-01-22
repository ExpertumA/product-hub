import { motion } from "framer-motion";
import { AlertTriangle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  onContactSupport: () => void;
}

export function ErrorState({ onContactSupport }: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen flex items-center justify-center p-6"
    >
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 rounded-xl bg-destructive/10 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-destructive" />
        </div>
        <h1 className="font-display text-2xl font-semibold mb-2">
          Устройство не найдено
        </h1>
        <p className="text-muted-foreground mb-6">
          Не удалось найти информацию по данному QR-коду. Пожалуйста, свяжитесь с
          поддержкой и предоставьте чек, модель и серийный номер.
        </p>
        <Button
          onClick={onContactSupport}
          className="bg-primary hover:bg-primary-hover text-primary-foreground rounded-md transition-smooth"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Написать в Telegram
        </Button>
      </div>
    </motion.div>
  );
}
