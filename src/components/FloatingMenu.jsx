import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const FloatingMenu = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsOpen(false); // Otomatis tutup jika kembali ke atas
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
      label: t('menu.home'), id: 'hero'
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.94-8.94 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>,
      label: t('menu.couple'), id: 'couple'
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>,
      label: t('menu.story'), id: 'story'
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
      label: t('menu.event'), id: 'event'
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>,
      label: t('menu.gallery'), id: 'gallery'
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>,
      label: t('menu.gift'), id: 'gift'
    }
  ];

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false); // Tutup menu setelah diklik
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div style={styles.wrapper}>
          {/* Menu List */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                style={styles.menuList}
              >
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => scrollTo(item.id)}
                    style={styles.menuItem}
                    whileHover={{ x: -5, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  >
                    <span style={styles.itemLabel}>{item.label}</span>
                    <span style={styles.itemIcon}>{item.icon}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            style={{
              ...styles.mainBtn,
              backgroundColor: isOpen ? '#8D6E63' : '#3E2723'
            }}
          >
            <motion.span
              animate={{ rotate: isOpen ? 135 : 0 }}
              style={styles.mainIcon}
            >
              {isOpen ? '✕' : '☰'}
            </motion.span>
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
};

const styles = {
  wrapper: {
    position: 'fixed',
    bottom: 'calc(30px + env(safe-area-inset-bottom))',
    right: 'calc(30px + env(safe-area-inset-right))',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '15px',
  },
  mainBtn: {
    width: '60px',
    height: '60px',
    borderRadius: '30px',
    border: 'none',
    color: '#fff',
    fontSize: '1.5rem',
    cursor: 'pointer',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'background-color 0.3s ease',
  },
  mainIcon: {
    display: 'block',
    lineHeight: 1,
  },
  menuList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    backgroundColor: 'rgba(62, 39, 35, 0.9)',
    backdropFilter: 'blur(15px)',
    padding: '15px',
    borderRadius: '25px',
    boxShadow: '0 15px 40px rgba(0,0,0,0.4)',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '15px',
    padding: '10px 15px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    borderRadius: '15px',
    whiteSpace: 'nowrap',
    width: '100%',
    transition: 'all 0.2s ease',
  },
  itemLabel: {
    fontSize: '0.85rem',
    fontWeight: '500',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  itemIcon: {
    fontSize: '1.2rem',
    width: '30px',
    textAlign: 'center',
  }
};

export default FloatingMenu;
