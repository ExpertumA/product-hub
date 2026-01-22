import { motion } from "framer-motion";
import { MapPin, Phone, MessageCircle, Star, Wrench } from "lucide-react";
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
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <div className="bg-surface rounded-lg p-4 border border-stroke">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                <Wrench className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide">Установка</p>
                <p className="text-xs text-muted-foreground">Мастер приедет в удобное время</p>
              </div>
            </div>
            <Button
              onClick={onOrderInstallation}
              className="bg-primary hover:bg-primary-hover text-white font-medium rounded-lg px-4 h-10 transition-smooth"
            >
              <span className="uppercase text-xs tracking-wide">Заказать</span>
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-lg font-bold uppercase tracking-wide mb-4"
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
              className="bg-surface rounded-lg p-4 border border-stroke flex items-start justify-between"
            >
              <div>
                <p className="text-sm font-medium">{center.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{center.address}</p>
              </div>
              <a
                href={`tel:${center.phone.replace(/\D/g, "")}`}
                className="flex items-center gap-1.5 text-primary hover:text-primary-hover transition-smooth"
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
        <button className="flex flex-col items-center gap-2 p-4 rounded-lg bg-surface border border-stroke hover:bg-accent transition-smooth group">
          <div className="w-10 h-10 rounded-md bg-background flex items-center justify-center group-hover:bg-primary/10 transition-smooth">
            <MessageCircle className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-smooth" />
          </div>
          <span className="text-xs uppercase tracking-wide text-muted-foreground group-hover:text-foreground transition-smooth">
            Связаться
          </span>
        </button>
        <button className="flex flex-col items-center gap-2 p-4 rounded-lg bg-surface border border-stroke hover:bg-accent transition-smooth group">
          <div className="w-10 h-10 rounded-md bg-background flex items-center justify-center group-hover:bg-warning/10 transition-smooth">
            <Star className="w-5 h-5 text-muted-foreground group-hover:text-warning transition-smooth" />
          </div>
          <span className="text-xs uppercase tracking-wide text-muted-foreground group-hover:text-foreground transition-smooth">
            Оставить отзыв
          </span>
        </button>
      </motion.div>
    </motion.section>
  );
}
