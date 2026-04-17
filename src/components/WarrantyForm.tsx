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
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full max-w-md bg-surface rounded-2xl shadow-deep overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-start justify-between p-6 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-foreground leading-tight">
                    Регистрация гарантии
                  </h2>
                  <p className="text-xs text-primary mt-0.5">+1 год дополнительно</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-background-secondary transition-smooth"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Pre-filled info */}
            <div className="mx-6 mb-5 px-4 py-3 bg-background-secondary rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="label-style mb-1">Модель</p>
                  <p className="text-sm font-semibold">{model}</p>
                </div>
                <div>
                  <p className="label-style mb-1">S/N</p>
                  <p className="text-sm font-semibold">{serialNumber}</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-3">
              <FormField
                icon={<Calendar className="w-3.5 h-3.5" />}
                label="Дата покупки"
                error={errors.purchaseDate}
              >
                <input
                  type="date"
                  value={formData.purchaseDate}
                  onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                  className="w-full px-4 pt-5 pb-2 bg-surface rounded-lg border border-stroke text-foreground focus:outline-none focus:border-primary transition-smooth text-sm"
                />
              </FormField>

              <FormField
                icon={<User className="w-3.5 h-3.5" />}
                label="Ваше имя"
                error={errors.name}
              >
                <input
                  type="text"
                  placeholder=" "
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 pt-5 pb-2 bg-surface rounded-lg border border-stroke text-foreground focus:outline-none focus:border-primary transition-smooth text-sm"
                />
              </FormField>

              <FormField
                icon={<Phone className="w-3.5 h-3.5" />}
                label="Телефон"
                error={errors.phone}
              >
                <input
                  type="tel"
                  placeholder=" "
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 pt-5 pb-2 bg-surface rounded-lg border border-stroke text-foreground focus:outline-none focus:border-primary transition-smooth text-sm"
                />
              </FormField>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 mt-4 bg-cta hover:bg-cta-hover text-cta-foreground font-medium rounded-xl transition-smooth disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    <span className="text-sm">Отправка...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span className="text-sm">Зарегистрировать</span>
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

function FormField({
  icon,
  label,
  error,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="relative">
        <label className="absolute left-4 top-1.5 text-[10px] uppercase tracking-wider text-primary font-medium flex items-center gap-1 z-10 pointer-events-none">
          {icon}
          {label}
        </label>
        {children}
      </div>
      {error && <p className="text-xs text-destructive mt-1 ml-1">{error}</p>}
    </div>
  );
}
