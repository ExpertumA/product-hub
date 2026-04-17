import { motion } from "framer-motion";
import { MapPin, Phone, MessageCircle, Star, Wrench, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceBlockProps {
  city: string;
  onOrderInstallation: () => void;
}

const SERVICE_CENTERS: Record<string, { name: string; address: string; phone: string }[]> = {
  "Москва": [
    { name: "Сервис-центр №1", address: "ул. Тверская, 10", phone: "+7 (495) 123-45-67" },
    { name: "Сервис-центр №2", address: "Ленинградский пр-т, 25", phone: "+7 (495) 765-43-21" },
  ],
  "Санкт-Петербург": [
    { name: "Сервис-центр СПб", address: "Невский пр-т, 100", phone: "+7 (812) 123-45-67" },
  ],
};

export function ServiceBlock({ city, onOrderInstallation }: ServiceBlockProps) {
  const centers = SERVICE_CENTERS[city] || [
    { name: "Центральный сервис", address: "Центральная ул., 1", phone: "+7 (800) 123-45-67" },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="py-8"
    >
      {/* Installation CTA */}
      <motion.button
        onClick={onOrderInstallation}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full bg-surface rounded-xl p-4 shadow-soft mb-8 hover:bg-background-secondary transition-smooth group"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Wrench className="w-5 h-5 text-primary" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-foreground">Установка</p>
              <p className="text-xs text-muted-foreground mt-0.5">Мастер приедет в удобное время</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-0.5 transition-transform" />
        </div>
      </motion.button>

      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="font-serif text-2xl text-foreground mb-5"
      >
        Сервис и поддержка
      </motion.h2>

      {/* Service Centers */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-6"
      >
        <p className="label-style mb-3 flex items-center gap-2">
          <MapPin className="w-3 h-3" />
          Сервисные центры в г. {city}
        </p>
        <div className="space-y-2">
          {centers.map((center, index) => (
            <div
              key={index}
              className="bg-surface rounded-xl p-4 shadow-soft flex items-start justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-foreground">{center.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{center.address}</p>
              </div>
              <a
                href={`tel:${center.phone.replace(/\D/g, "")}`}
                className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Support Actions */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="grid grid-cols-2 gap-3"
      >
        <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-surface shadow-soft hover:bg-background-secondary transition-smooth group">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-primary" />
          </div>
          <span className="text-xs font-medium text-foreground">
            Связаться
          </span>
        </button>
        <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-surface shadow-soft hover:bg-background-secondary transition-smooth group">
          <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
            <Star className="w-5 h-5 text-warning" />
          </div>
          <span className="text-xs font-medium text-foreground">
            Оставить отзыв
          </span>
        </button>
      </motion.div>
    </motion.section>
  );
}
