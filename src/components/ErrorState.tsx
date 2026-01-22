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
      {city && onChangeCity && (
        <Header city={city} onChangeCity={onChangeCity} />
      )}
      
      <main className="max-w-md mx-auto px-4 pb-8">
        {/* Error Message Block */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="py-8"
        >
          <div className="bg-surface rounded-lg p-6 border border-stroke text-center">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <AlertTriangle className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-lg font-bold uppercase tracking-wide mb-3">
              Устройство не найдено
            </h1>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Для регистрации дополнительной гарантии пришлите чек, модель и серийный номер
            </p>
            <Button
              onClick={onContactSupport}
              className="w-full h-12 bg-[#2AABEE] hover:bg-[#229ED9] text-white font-medium rounded-lg transition-smooth"
            >
              <Send className="w-4 h-4 mr-2" />
              <span className="uppercase tracking-wide text-sm">
                Отправить чек
              </span>
            </Button>
          </div>
        </motion.div>

        {/* Service and Support Block */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h2 className="text-lg font-bold uppercase tracking-wide mb-4">
            Сервис и поддержка
          </h2>

          {/* Service Centers */}
          <div className="mb-6">
            <p className="label-style mb-3 flex items-center gap-2">
              <MapPin className="w-3 h-3" />
              Сервисные центры
            </p>
            <div className="space-y-2">
              {SERVICE_CENTERS.map((center, index) => (
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
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="border-t border-divider py-6 mt-8">
          <div className="text-center">
            <p className="text-primary text-xs font-bold tracking-widest uppercase mb-2">
              KUPPERSBERG
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
