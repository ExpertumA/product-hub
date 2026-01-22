import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, Calendar, User, Phone, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { z } from "zod";

const warrantySchema = z.object({
  purchaseDate: z.string().min(1, "Укажите дату покупки"),
  name: z.string().min(2, "Имя должно содержать минимум 2 символа").max(100),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/, "Введите корректный номер телефона"),
});

interface WarrantyFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { purchaseDate: string; name: string; phone: string }) => void;
  model: string;
  serialNumber: string;
}

export function WarrantyForm({
  isOpen,
  onClose,
  onSubmit,
  model,
  serialNumber,
}: WarrantyFormProps) {
  const [formData, setFormData] = useState({
    purchaseDate: "",
    name: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    try {
      warrantySchema.parse(formData);
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      onSubmit(formData as { purchaseDate: string; name: string; phone: string });
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(17,17,17,0.92)] backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full max-w-md glass-surface rounded-xl border border-stroke shadow-deep overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-divider">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-semibold">
                    Регистрация гарантии
                  </h2>
                  <p className="text-xs text-muted-foreground">+3 года дополнительно</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-accent transition-smooth"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Pre-filled info */}
            <div className="px-6 py-4 bg-background/50 border-b border-divider">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs mb-1">Модель</p>
                  <p className="font-medium">{model}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs mb-1">Серийный номер</p>
                  <p className="font-medium">{serialNumber}</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Purchase Date */}
              <div>
                <label className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="w-4 h-4" />
                  Дата покупки
                </label>
                <input
                  type="date"
                  value={formData.purchaseDate}
                  onChange={(e) =>
                    setFormData({ ...formData, purchaseDate: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-background rounded-md border border-stroke text-foreground focus:outline-none focus:border-primary transition-smooth"
                />
                {errors.purchaseDate && (
                  <p className="text-xs text-destructive mt-1">{errors.purchaseDate}</p>
                )}
              </div>

              {/* Name */}
              <div>
                <label className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <User className="w-4 h-4" />
                  Ваше имя
                </label>
                <input
                  type="text"
                  placeholder="Иван Иванов"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-background rounded-md border border-stroke text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-smooth"
                />
                {errors.name && (
                  <p className="text-xs text-destructive mt-1">{errors.name}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Phone className="w-4 h-4" />
                  Телефон
                </label>
                <input
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-background rounded-md border border-stroke text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-smooth"
                />
                {errors.phone && (
                  <p className="text-xs text-destructive mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 mt-2 bg-primary hover:bg-primary-hover active:bg-primary-pressed text-primary-foreground font-medium rounded-md transition-smooth disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Отправка...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Зарегистрировать
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
