import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const CITIES = [
  "Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург",
  "Казань", "Нижний Новгород", "Челябинск", "Самара",
  "Омск", "Ростов-на-Дону", "Уфа", "Красноярск",
];

interface CitySelectModalProps {
  isOpen: boolean;
  onSelect: (city: string) => void;
}

export function CitySelectModal({ isOpen, onSelect }: CitySelectModalProps) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const filteredCities = CITIES.filter((city) =>
    city.toLowerCase().includes(search.toLowerCase())
  );

  const handleConfirm = () => {
    if (selected) onSelect(selected);
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
            <div className="p-6 pb-4">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-foreground leading-tight">
                    Выберите город
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Для отображения сервисных центров
                  </p>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="px-6 pb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Поиск города..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-background-secondary rounded-lg border border-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:bg-surface transition-smooth text-sm"
                />
              </div>
            </div>

            {/* City List */}
            <div className="px-6 max-h-64 overflow-y-auto">
              <div className="grid grid-cols-2 gap-2 pb-4">
                {filteredCities.map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelected(city)}
                    className={`px-4 py-3 rounded-lg text-left text-sm transition-smooth ${
                      selected === city
                        ? "bg-primary text-primary-foreground font-medium"
                        : "bg-background-secondary hover:bg-background hover:text-primary text-foreground"
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 pt-2">
              <Button
                onClick={handleConfirm}
                disabled={!selected}
                className="w-full h-12 bg-cta hover:bg-cta-hover text-cta-foreground font-medium rounded-xl transition-smooth disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span className="text-sm">Подтвердить</span>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
