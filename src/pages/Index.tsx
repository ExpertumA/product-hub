import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { CitySelectModal } from "@/components/CitySelectModal";
import { ProductHero } from "@/components/ProductHero";
import { WarrantyForm } from "@/components/WarrantyForm";
import { InstallationForm } from "@/components/InstallationForm";
import { ServiceBlock } from "@/components/ServiceBlock";

// Simulated QR data (in real app, would come from URL params)
const MOCK_QR_DATA = {
  model: "HF 608 B",
  serialNumber: "434501834",
  isValid: true,
};

// Simulated warranty storage (in real app, would come from backend)
const getStoredWarranty = (serialNumber: string) => {
  const stored = localStorage.getItem(`warranty_${serialNumber}`);
  return stored ? JSON.parse(stored) : null;
};

const saveWarranty = (serialNumber: string, data: { purchaseDate: string; name: string; phone: string }) => {
  const endDate = new Date(data.purchaseDate);
  endDate.setFullYear(endDate.getFullYear() + 3);
  
  const warrantyData = {
    ...data,
    registeredAt: new Date().toISOString(),
    endDate: endDate.toISOString(),
  };
  
  localStorage.setItem(`warranty_${serialNumber}`, JSON.stringify(warrantyData));
  return warrantyData;
};

const Index = () => {
  const [city, setCity] = useState<string | null>(null);
  const [showCityModal, setShowCityModal] = useState(true);
  const [showWarrantyForm, setShowWarrantyForm] = useState(false);
  const [showInstallationForm, setShowInstallationForm] = useState(false);
  const [warrantyData, setWarrantyData] = useState<{
    endDate: string;
    purchaseDate: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    const storedCity = localStorage.getItem("kuppersberg_city");
    if (storedCity) {
      setCity(storedCity);
      setShowCityModal(false);
    }
  }, []);

  useEffect(() => {
    if (MOCK_QR_DATA.isValid) {
      const stored = getStoredWarranty(MOCK_QR_DATA.serialNumber);
      if (stored) {
        setWarrantyData({
          endDate: new Date(stored.endDate).toLocaleDateString("ru-RU"),
          purchaseDate: new Date(stored.purchaseDate).toLocaleDateString("ru-RU"),
          name: stored.name,
        });
      }
    }
  }, []);

  const handleCitySelect = (selectedCity: string) => {
    setCity(selectedCity);
    localStorage.setItem("kuppersberg_city", selectedCity);
    setShowCityModal(false);
    toast.success(`Город ${selectedCity} выбран`);
  };

  const handleChangeCity = () => {
    setShowCityModal(true);
  };

  const handleWarrantySubmit = (data: { purchaseDate: string; name: string; phone: string }) => {
    const saved = saveWarranty(MOCK_QR_DATA.serialNumber, data);
    setWarrantyData({
      endDate: new Date(saved.endDate).toLocaleDateString("ru-RU"),
      name: saved.name,
    });
    setShowWarrantyForm(false);
    toast.success("Гарантия успешно зарегистрирована!");
  };

  const handleInstallationSubmit = (data: { address: string; date: string }) => {
    setShowInstallationForm(false);
    toast.success("Заявка на установку оформлена!");
  };

  const handleDownloadManual = () => {
    toast.info("Загрузка инструкции...");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* City Selection Modal */}
      <CitySelectModal
        isOpen={showCityModal}
        onSelect={handleCitySelect}
      />

      {/* Warranty Registration Form */}
      <WarrantyForm
        isOpen={showWarrantyForm}
        onClose={() => setShowWarrantyForm(false)}
        onSubmit={handleWarrantySubmit}
        model={MOCK_QR_DATA.model}
        serialNumber={MOCK_QR_DATA.serialNumber}
      />

      {/* Installation Form */}
      <InstallationForm
        isOpen={showInstallationForm}
        onClose={() => setShowInstallationForm(false)}
        onSubmit={handleInstallationSubmit}
        city={city || ""}
        model={MOCK_QR_DATA.model}
      />

      {/* Main Content */}
      <AnimatePresence>
        {city && !showCityModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Header city={city} onChangeCity={handleChangeCity} />
            
            <main className="max-w-md mx-auto px-4 pb-8">
              <ProductHero
                model={MOCK_QR_DATA.model}
                serialNumber={MOCK_QR_DATA.serialNumber}
                onOrderInstallation={() => setShowInstallationForm(true)}
                onRegisterWarranty={() => setShowWarrantyForm(true)}
                onDownloadManual={handleDownloadManual}
                isWarrantyRegistered={!!warrantyData}
                warrantyEndDate={warrantyData?.endDate}
              />

              <ServiceBlock
                city={city}
                onOrderInstallation={() => setShowInstallationForm(true)}
              />
            </main>

            {/* Footer */}
            <footer className="border-t border-divider py-6">
              <div className="max-w-md mx-auto px-4 text-center">
                <p className="text-primary text-xs font-bold tracking-widest uppercase mb-2">
                  KUPPERSBERG
                </p>
                <p className="text-xs text-muted-foreground">
                  © 2024 Kuppersberg. Все права защищены.
                </p>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
