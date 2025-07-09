export type Language = "en" | "ko";

export interface TranslationValue {
  [key: string]: string | TranslationValue;
}

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
  isLoading: boolean;
}
