import { motion } from "framer-motion";
import { MapPin, Phone, MessageCircle, Star, Wrench } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="py-8"
    >
      <motion.h2
        variants={itemVariants}
        className="font-display text-2xl font-semibold mb-6 text-center"
      >
        Сервис и поддержка
      </motion.h2>

      {/* Installation CTA */}
      <motion.div variants={itemVariants} className="mb-6">
        <GlassCard hover={false} className="border-primary/20">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                <Wrench className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Профессиональная установка</p>
                <p className="text-xs text-muted-foreground">Мастер приедет в удобное время</p>
              </div>
            </div>
            <Button
              onClick={onOrderInstallation}
              className="bg-primary hover:bg-primary-hover text-primary-foreground rounded-md transition-smooth shrink-0"
            >
              Заказать
            </Button>
          </div>
        </GlassCard>
      </motion.div>

      {/* Service Centers */}
      <motion.div variants={itemVariants} className="mb-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Сервисные центры в г. {city}
        </h3>
        <div className="space-y-3">
          {centers.map((center, index) => (
            <GlassCard key={index} className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-sm">{center.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{center.address}</p>
                </div>
                <a
                  href={`tel:${center.phone.replace(/\D/g, "")}`}
                  className="flex items-center gap-2 text-sm text-primary hover:text-primary-hover transition-smooth"
                >
                  <Phone className="w-4 h-4" />
                  <span className="hidden sm:inline">{center.phone}</span>
                </a>
              </div>
            </GlassCard>
          ))}
        </div>
      </motion.div>

      {/* Support Actions */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
        <button className="flex flex-col items-center gap-2 p-4 rounded-lg bg-surface border border-stroke hover:bg-accent transition-smooth group">
          <div className="w-10 h-10 rounded-md bg-background flex items-center justify-center group-hover:bg-primary/10 transition-smooth">
            <MessageCircle className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-smooth" />
          </div>
          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-smooth">
            Связаться
          </span>
        </button>
        <button className="flex flex-col items-center gap-2 p-4 rounded-lg bg-surface border border-stroke hover:bg-accent transition-smooth group">
          <div className="w-10 h-10 rounded-md bg-background flex items-center justify-center group-hover:bg-warning/10 transition-smooth">
            <Star className="w-5 h-5 text-muted-foreground group-hover:text-warning transition-smooth" />
          </div>
          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-smooth">
            Оставить отзыв
          </span>
        </button>
      </motion.div>
    </motion.section>
  );
}
