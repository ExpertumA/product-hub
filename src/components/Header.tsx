import { MapPin, ChevronDown, Heart, Search } from "lucide-react";

interface HeaderProps {
  city: string;
  onChangeCity: () => void;
}

export function Header({ city, onChangeCity }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-divider">
      <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo - Serif Kuppersberg style */}
        <div className="flex items-center">
          <span className="font-serif text-xl italic font-medium text-foreground tracking-tight">
            Kuppersberg
          </span>
        </div>

        {/* City Selector */}
        <button
          onClick={onChangeCity}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-smooth"
        >
          <MapPin className="w-3.5 h-3.5" />
          <span className="font-medium">{city}</span>
          <ChevronDown className="w-3 h-3" />
        </button>
      </div>
    </header>
  );
}
