import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const ThemeLanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem('invitation_theme') || 'dark';
  });

  useEffect(() => {
    // Set tema saat inisialisasi
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('invitation_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleLanguage = () => {
    setLanguage(language === 'id' ? 'en' : 'id');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      style={styles.container}
    >
      {/* Tombol Toggle Bahasa Tunggal */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleLanguage}
        style={styles.langBtnToggle}
        aria-label="Toggle Language"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: 'var(--gold)' }}
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={language}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={styles.langLabel}
          >
            {language.toUpperCase()}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* Pembatas Vertikal */}
      <div style={styles.divider}></div>

      {/* Tombol Toggle Tema */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme}
        style={styles.themeBtn}
        aria-label="Toggle Theme"
      >
        <AnimatePresence mode="wait" initial={false}>
          {theme === 'dark' ? (
            <motion.svg
              key="moon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: 'var(--gold)' }}
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </motion.svg>
          ) : (
            <motion.svg
              key="sun"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: 'var(--primary)' }}
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    top: '20px',
    left: '20px',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: 'var(--card-bg)',
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    border: '1px solid var(--border-color)',
    padding: '6px 12px',
    borderRadius: '30px',
    boxShadow: 'var(--shadow)',
    transition: 'all 0.5s ease',
  },
  langBtnToggle: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 10px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--text-main)',
    cursor: 'pointer',
    outline: 'none',
  },
  langLabel: {
    fontSize: '0.8rem',
    fontWeight: '700',
    letterSpacing: '0.5px',
    width: '20px',
    textAlign: 'center',
    color: 'var(--text-main)',
  },
  divider: {
    width: '1px',
    height: '18px',
    backgroundColor: 'var(--border-color)',
  },
  themeBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    transition: 'background-color 0.3s ease',
  }
};

export default ThemeLanguageSelector;
