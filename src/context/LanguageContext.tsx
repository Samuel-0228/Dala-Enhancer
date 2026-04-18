import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '@/lib/types';
import { en } from '@/locale/en';
import { am } from '@/locale/am';
import { om } from '@/locale/om';

type Translations = typeof en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof Translations) => string;
}

const translations: Record<Language, Translations> = { en, am, om };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('dala_language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('dala_language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: keyof Translations): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};