import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ChevronDown, Search } from "lucide-react";
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full max-w-md mx-4 bg-[#1a1a1a] rounded-xl border border-white/10 shadow-deep overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-md bg-primary/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-semibold text-white">
                    Выберите город
                  </h2>
                  <p className="text-sm text-white/60">
                    Для отображения сервисных центров
                  </p>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="px-6 py-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Поиск города..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/50 rounded-md border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-primary transition-smooth"
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
                    className={`px-4 py-3 rounded-md text-left text-sm transition-smooth ${
                      selected === city
                        ? "bg-primary text-white"
                        : "bg-white/5 hover:bg-white/10 text-white"
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 pt-4 border-t border-white/10">
              <Button
                onClick={handleConfirm}
                disabled={!selected}
                className="w-full h-12 bg-primary hover:bg-primary-hover active:bg-primary-pressed text-white font-medium rounded-md transition-smooth disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Подтвердить
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
