import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Wrench, MapPin, Calendar, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { z } from "zod";

const installationSchema = z.object({
  address: z.string().min(5, "Укажите полный адрес").max(200),
  date: z.string().min(1, "Выберите дату"),
});

interface InstallationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { address: string; date: string }) => void;
  city: string;
  model: string;
}

export function InstallationForm({
  isOpen,
  onClose,
  onSubmit,
  city,
  model,
}: InstallationFormProps) {
  const [formData, setFormData] = useState({
    address: "",
    date: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    try {
      installationSchema.parse(formData);
      setIsSubmitting(true);
      
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      onSubmit(formData as { address: string; date: string });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            fieldErrors[error.path[0] as string] = error.message;
          }
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full max-w-md bg-surface rounded-lg border border-stroke shadow-deep overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-divider">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-base font-bold uppercase tracking-wide">
                    Заказать установку
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

            {/* City info */}
            <div className="px-5 py-3 bg-background border-b border-divider">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Город:</span>
                <span className="font-medium">{city}</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {/* Address */}
              <div>
                <label className="label-style mb-2 flex items-center gap-2">
                  <MapPin className="w-3 h-3" />
                  Адрес установки
                </label>
                <input
                  type="text"
                  placeholder="ул. Примерная, д. 1, кв. 1"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-background rounded-md border border-stroke text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-smooth text-sm"
                />
                {errors.address && (
                  <p className="text-xs text-destructive mt-1">{errors.address}</p>
                )}
              </div>

              {/* Date */}
              <div>
                <label className="label-style mb-2 flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  Желаемая дата
                </label>
                <input
                  type="date"
                  min={getMinDate()}
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-background rounded-md border border-stroke text-foreground focus:outline-none focus:border-primary transition-smooth text-sm"
                />
                {errors.date && (
                  <p className="text-xs text-destructive mt-1">{errors.date}</p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 mt-2 bg-primary hover:bg-primary-hover active:bg-primary-pressed text-white font-medium rounded-lg transition-smooth disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    <span className="uppercase tracking-wide text-sm">Отправка...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span className="uppercase tracking-wide text-sm">Оформить заявку</span>
                  </span>
                )}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
