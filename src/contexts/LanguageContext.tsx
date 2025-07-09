import React, { createContext, useState, useEffect, useRef } from "react";
import type {
  Language,
  LanguageContextType,
  TranslationValue,
} from "../types/language";

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mbti-language");

      // Only return saved language if it's explicitly "ko" or "en"
      if (saved === "ko" || saved === "en") {
        return saved;
      }

      // Clear any invalid value and default to English
      if (saved && saved !== "ko" && saved !== "en") {
        localStorage.removeItem("mbti-language");
      }

      return "en";
    }
    return "en";
  });

  const [isLoading, setIsLoading] = useState(true);
  const translationsRef = useRef<Record<Language, TranslationValue>>({
    en: {},
    ko: {},
  });

  // Load translations
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        setIsLoading(true);

        // Load English translations
        const enResponse = await fetch("/translations/en.json");
        const enData = await enResponse.json();

        // Load Korean translations
        const koResponse = await fetch("/translations/ko.json");
        const koData = await koResponse.json();

        translationsRef.current = {
          en: enData,
          ko: koData,
        };
      } catch (error) {
        console.error("Failed to load translations:", error);
        // Fallback translations
        translationsRef.current = {
          en: {
            "home.hero.title": "Discover Your",
            "home.hero.titleHighlight": "Travel Personality",
          },
          ko: {
            "home.hero.title": "당신만의",
            "home.hero.titleHighlight": "여행 성격을 발견하세요",
          },
        };
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, []);

  // Translation function
  const t = (key: string, fallback?: string): string => {
    const translations = translationsRef.current[language] || {};

    // Navigate nested object path
    const keys = key.split(".");
    let current: TranslationValue | string = translations;

    for (const k of keys) {
      if (current && typeof current === "object" && k in current) {
        current = current[k];
      } else {
        return fallback || key;
      }
    }

    return typeof current === "string" ? current : fallback || key;
  };

  // Set language and persist to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("mbti-language", lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
};
