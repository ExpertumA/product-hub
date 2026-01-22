import { MapPin, ChevronDown } from "lucide-react";
import logoSvg from "@/assets/kuppersberg-logo.svg";

interface HeaderProps {
  city: string;
  onChangeCity: () => void;
}

export function Header({ city, onChangeCity }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-background border-b border-divider">
      <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src={logoSvg} 
            alt="Kuppersberg" 
            className="h-4 w-auto"
          />
        </div>

        {/* City Selector */}
        <button
          onClick={onChangeCity}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth"
        >
          <MapPin className="w-4 h-4" />
          <span className="uppercase tracking-wide text-xs font-medium">{city}</span>
          <ChevronDown className="w-3 h-3" />
        </button>
      </div>
    </header>
  );
}
