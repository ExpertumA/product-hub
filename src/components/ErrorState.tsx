import { motion } from "framer-motion";
import { AlertTriangle, Send, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "./Header";

interface ErrorStateProps {
  onContactSupport: () => void;
  city?: string;
  onChangeCity?: () => void;
}

const SERVICE_CENTERS = [
  { name: "Сервис-центр №1", address: "ул. Тверская, 10", phone: "+7 (495) 123-45-67" },
  { name: "Сервис-центр №2", address: "Ленинградский пр-т, 25", phone: "+7 (495) 765-43-21" },
];

export function ErrorState({ onContactSupport, city, onChangeCity }: ErrorStateProps) {
  return (
    <div className="min-h-screen bg-background">
      {city && onChangeCity && <Header city={city} onChangeCity={onChangeCity} />}

      <main className="max-w-md mx-auto px-4 pb-8">
        {/* Error Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="py-8"
        >
          <div className="bg-surface rounded-2xl p-7 shadow-soft text-center">
            <div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-5">
              <AlertTriangle className="w-7 h-7 text-warning" />
            </div>
            <h1 className="font-serif text-2xl text-foreground mb-3 leading-tight">
              Устройство не найдено
            </h1>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Для регистрации дополнительной гарантии пришлите чек, модель и серийный номер
            </p>
            <Button
              onClick={onContactSupport}
              className="w-full h-12 bg-cta hover:bg-cta-hover text-cta-foreground font-medium rounded-xl transition-smooth"
            >
              <Send className="w-4 h-4 mr-2" />
              <span className="text-sm">Отправить чек</span>
            </Button>
          </div>
        </motion.div>

        {/* Service & Support */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h2 className="font-serif text-2xl text-foreground mb-5">
            Сервис и поддержка
          </h2>

          <div className="mb-6">
            <p className="label-style mb-3 flex items-center gap-2">
              <MapPin className="w-3 h-3" />
              Сервисные центры
            </p>
            <div className="space-y-2">
              {SERVICE_CENTERS.map((center, index) => (
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
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="border-t border-divider py-6 mt-8">
          <div className="text-center">
            <p className="font-serif italic text-base text-foreground mb-2">
              Kuppersberg
            </p>
            <p className="text-xs text-muted-foreground">
              © 2024 Kuppersberg. Все права защищены.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
