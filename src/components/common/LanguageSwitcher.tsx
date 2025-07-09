import React from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { Button } from "../ui";

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ko" : "en");
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={toggleLanguage}
        className="min-w-[60px]"
      >
        {language === "en" ? "한국어" : "English"}
      </Button>
    </div>
  );
};
