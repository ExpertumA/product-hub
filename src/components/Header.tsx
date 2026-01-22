import { MapPin, ChevronDown } from "lucide-react";

interface HeaderProps {
  city: string;
  onChangeCity: () => void;
}

export function Header({ city, onChangeCity }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 glass-surface border-b border-divider">
      <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="font-display text-lg font-semibold text-primary tracking-wide">
            KUPPERSBERG
          </span>
        </div>

        {/* City Selector */}
        <button
          onClick={onChangeCity}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth"
        >
          <MapPin className="w-4 h-4" />
          <span>{city}</span>
          <ChevronDown className="w-3 h-3" />
        </button>
      </div>
    </header>
  );
}
