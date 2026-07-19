import { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../locales/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Cek apakah ada query param ?lang=id|en|ko, fallback ke localStorage, atau default 'id'
  const getInitialLanguage = () => {
    const params = new URLSearchParams(window.location.search);
    const langParam = params.get('lang');
    if (langParam && translations[langParam]) {
      localStorage.setItem('invitation_lang', langParam);
      return langParam;
    }
    const saved = localStorage.getItem('invitation_lang');
    if (saved && translations[saved]) {
      return saved;
    }
    return 'id';
  };

  const [language, setLanguageState] = useState(getInitialLanguage);

  const setLanguage = (lang) => {
    if (translations[lang]) {
      setLanguageState(lang);
      localStorage.setItem('invitation_lang', lang);
      
      // Update URL query param secara halus tanpa reload halaman
      const url = new URL(window.location);
      url.searchParams.set('lang', lang);
      window.history.pushState({}, '', url);
    }
  };

  const t = (path) => {
    const keys = path.split('.');
    let value = translations[language];
    
    for (const key of keys) {
      if (value && value[key] !== undefined) {
        value = value[key];
      } else {
        // Fallback ke bahasa Indonesia jika key tidak ditemukan
        let fallbackValue = translations['id'];
        for (const fallbackKey of keys) {
          if (fallbackValue && fallbackValue[fallbackKey] !== undefined) {
            fallbackValue = fallbackValue[fallbackKey];
          } else {
            fallbackValue = path;
            break;
          }
        }
        return fallbackValue;
      }
    }
    return value;
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
