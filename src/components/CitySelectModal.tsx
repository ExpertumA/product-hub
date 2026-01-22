import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const CITIES = [
  "Москва",
  "Санкт-Петербург",
  "Новосибирск",
  "Екатеринбург",
  "Казань",
  "Нижний Новгород",
  "Челябинск",
  "Самара",
  "Омск",
  "Ростов-на-Дону",
  "Уфа",
  "Красноярск",
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
    if (selected) {
      onSelect(selected);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full max-w-md mx-4 bg-surface rounded-lg border border-stroke shadow-deep overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 border-b border-divider">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-base font-bold uppercase tracking-wide">
                    Выберите город
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Для отображения сервисных центров
                  </p>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="px-5 py-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Поиск города..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-background rounded-md border border-stroke text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-smooth text-sm"
                />
              </div>
            </div>

            {/* City List */}
            <div className="px-5 max-h-64 overflow-y-auto">
              <div className="grid grid-cols-2 gap-2 pb-4">
                {filteredCities.map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelected(city)}
                    className={`px-4 py-3 rounded-md text-left text-sm transition-smooth ${
                      selected === city
                        ? "bg-primary text-white font-medium"
                        : "bg-background hover:bg-accent text-foreground"
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-divider">
              <Button
                onClick={handleConfirm}
                disabled={!selected}
                className="w-full h-12 bg-primary hover:bg-primary-hover active:bg-primary-pressed text-white font-medium rounded-lg transition-smooth disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span className="uppercase tracking-wide text-sm">Подтвердить</span>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
