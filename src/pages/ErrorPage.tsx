import { useState } from "react";
import { Header } from "@/components/Header";
import { ErrorState } from "@/components/ErrorState";
import { CitySelectModal } from "@/components/CitySelectModal";

const TELEGRAM_SUPPORT_URL = "https://t.me/kuppersberg_support";

export default function ErrorPage() {
  const [city, setCity] = useState("Москва");
  const [showCityModal, setShowCityModal] = useState(false);

  const handleContactSupport = () => {
    window.open(TELEGRAM_SUPPORT_URL, "_blank");
  };

  const handleCitySelect = (selectedCity: string) => {
    setCity(selectedCity);
    setShowCityModal(false);
  };

  return (
    <>
      <ErrorState
        onContactSupport={handleContactSupport}
        city={city}
        onChangeCity={() => setShowCityModal(true)}
      />

      <CitySelectModal
        isOpen={showCityModal}
        onSelect={handleCitySelect}
      />
    </>
  );
}
