import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';

const WelcomeOverlay = ({ onEnter, guestName }) => {
  const { t } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Daftar aset penting untuk di-preload
    const assets = [
      '/logo1.png',
      '/assets/images/profile/groom.jpg',
      '/assets/images/profile/bride.jpg',
      '/assets/images/gallery/850_1569.JPG',
      '/assets/images/gallery/850_1607.JPG',
      '/assets/images/gallery/850_1644.JPG',
      '/assets/images/gallery/Z52_4966.JPG',
      '/assets/prewed-video.mp4',
    ];

    let loadedCount = 0;
    const totalAssets = assets.length;

    const updateProgress = () => {
      loadedCount++;
      const currentProgress = Math.min(Math.round((loadedCount / totalAssets) * 100), 100);
      setProgress(currentProgress);
      if (loadedCount >= totalAssets) {
        setTimeout(() => {
          setIsLoaded(true);
        }, 600); // Penundaan kecil agar transisi terasa halus
      }
    };

    // Fail-safe Timer (maksimum 12 detik loading untuk mencegah macet jika jaringan lambat)
    const failSafeTimer = setTimeout(() => {
      setProgress(100);
      setIsLoaded(true);
    }, 12000);

    assets.forEach((src) => {
      if (src.endsWith('.mp4')) {
        // Preload video menggunakan XMLHttpRequest untuk stabilitas cache browser
        const xhr = new XMLHttpRequest();
        xhr.open('GET', src, true);
        xhr.responseType = 'blob';
        xhr.onload = () => {
          updateProgress();
        };
        xhr.onerror = () => {
          updateProgress(); // Lanjutkan progres jika error agar tidak stuck
        };
        xhr.send();
      } else {
        // Preload gambar
        const img = new Image();
        img.src = src;
        img.onload = updateProgress;
        img.onerror = updateProgress;
      }
    });

    return () => clearTimeout(failSafeTimer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
      transition={{ duration: 1, ease: "easeInOut" }}
      style={styles.overlay}
    >
      {/* 1. Foto Latar Belakang dengan Efek Ken Burns Zoom & Gradasi Gelap Sinematik */}
      <motion.div 
        initial={{ scale: 1 }}
        animate={{ scale: 1.08 }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        style={styles.backgroundImage} 
      />
      <div style={styles.darkOverlay} />

      {/* 2. Kontainer Konten Utama (Mengalir Proporsional dari Atas ke Bawah) */}
      <div style={styles.mainContainer}>

        {/* AREA LOGO (Polos & Bersih Dengan Animasi Pulse Saat Loading) */}
        <motion.div
          animate={!isLoaded ? { scale: [0.95, 1, 0.95] } : {}}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          style={styles.logoContainer}
        >
          <Logo size="large" color="var(--gold)" />
        </motion.div>

        {/* TEKS PEMBUKA & NAMA MEMPELAI (Cinematic Reveal) */}
        <div style={styles.textSection}>
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0px', y: -10 }}
            animate={{ opacity: 1, letterSpacing: '6px', y: 0 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            style={styles.subTitle}
          >
            {t('welcome.title')}
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 35, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={styles.title}
          >
            Asob & Yola
          </motion.h1>

          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '140px', opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
            style={styles.dividerContainer}
          >
            <div style={styles.dividerLine} />
            <span style={styles.dividerDot}>✦</span>
            <div style={styles.dividerLine} />
          </motion.div>
        </div>

        {/* KOTAK TAMU UNDANGAN (Glassmorphism Transparan) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={styles.guestCard}
        >
          <p style={styles.toText}>{t('welcome.dear')}</p>
          <h2 style={styles.guestName}>{guestName || t('welcome.guest')}</h2>
        </motion.div>

        {/* AREA TOMBOL ATAU PROGRESS LOADING */}
        <AnimatePresence mode="wait">
          {!isLoaded ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={styles.loadingContainer}
            >
              <div style={styles.progressTrack}>
                <motion.div 
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.2 }}
                  style={styles.progressBar} 
                />
              </div>
              <p style={styles.loadingText}>Loading Assets... {progress}%</p>
            </motion.div>
          ) : (
            <motion.div
              key="button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
              style={styles.buttonWrapper}
            >
              <motion.button
                whileHover={{
                  scale: 1.03,
                  boxShadow: '0 15px 40px rgba(197, 168, 128, 0.35)',
                  borderColor: 'rgba(255, 255, 255, 0.9)'
                }}
                whileTap={{ scale: 0.98 }}
                onClick={onEnter}
                style={styles.button}
              >
                {/* Ikon Surat Kecil di Samping Teks */}
                <svg
                  style={styles.buttonIcon}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L22 8m-9 11h.01M21 16V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2z" />
                </svg>
                <span style={styles.buttonText}>{t('welcome.button')}</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  style={styles.arrow}
                >
                  →
                </motion.span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 2000,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    boxSizing: 'border-box',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    // Menggunakan file lokal dari folder assets
    backgroundImage: 'url("/assets/images/gallery/850_1569.JPG")',
    backgroundSize: 'cover',
    backgroundPosition: 'center 35%',
    zIndex: 1,
  },
  darkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.85) 100%)',
    zIndex: 2,
  },
  mainContainer: {
    position: 'relative',
    zIndex: 10,
    width: '100%',
    maxWidth: '400px',
    height: '100%',
    padding: '70px 30px 60px 30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
  },
  logoContainer: {
    width: '120px',
    height: '120px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10px',
    filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))',
  },
  textSection: {
    width: '100%',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: '1.05rem',
    letterSpacing: '7px',
    color: '#E6C387',
    opacity: 0.95,
    marginBottom: '14px',
    fontWeight: '400',
    fontFamily: '"Playfair Display", serif',
    textShadow: '0 2px 10px rgba(0,0,0,0.5)',
  },
  title: {
    fontSize: 'clamp(2.6rem, 8.5vw, 3.4rem)',
    fontFamily: '"Playfair Display", serif',
    color: '#E6C387',
    margin: 0,
    fontWeight: '400',
    textShadow: '0 4px 25px rgba(0,0,0,0.9), 0 0 10px rgba(0,0,0,0.7)',
  },
  dividerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    margin: '25px auto 0 auto',
    width: '150px',
  },
  dividerLine: {
    height: '1px',
    flex: 1,
    backgroundColor: 'rgba(197, 168, 128, 0.4)',
  },
  dividerDot: {
    color: '#C5A880',
    fontSize: '0.8rem',
    lineHeight: 1,
  },
  guestCard: {
    width: '100%',
    padding: '28px 20px',
    borderRadius: '24px',
    backgroundColor: 'var(--card-bg)',
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    border: '1px solid var(--border-color)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    boxSizing: 'border-box',
    transform: 'translateY(-10px)',
  },
  toText: {
    fontSize: '0.8rem',
    color: 'var(--text-card-main)',
    opacity: 0.7,
    margin: '0 0 10px 0',
    fontStyle: 'italic',
    fontFamily: '"Signika Negative", sans-serif',
    letterSpacing: '0.5px',
  },
  guestName: {
    fontSize: 'clamp(1.5rem, 5.5vw, 1.9rem)',
    fontFamily: '"Playfair Display", serif',
    color: '#E6C387',
    margin: 0,
    fontWeight: '600',
    letterSpacing: '0.5px',
    textShadow: '0 2px 12px rgba(0,0,0,0.4)',
  },
  buttonWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    background: 'linear-gradient(135deg, #C5A880 0%, #A1887F 100%)',
    color: '#120e0b',
    width: '100%',
    padding: '16px 30px',
    borderRadius: '40px',
    fontSize: '0.85rem',
    fontWeight: '700',
    letterSpacing: '3px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    boxShadow: '0 10px 30px rgba(197, 168, 128, 0.25)',
    cursor: 'pointer',
    fontFamily: '"Signika Negative", sans-serif',
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
    transition: 'all 0.3s ease',
  },
  buttonIcon: {
    width: '16px',
    height: '16px',
    opacity: 0.9,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  buttonText: {
    marginTop: '1px',
    textTransform: 'uppercase',
    textShadow: '0 0 8px rgba(255, 255, 255, 0.2)',
  },
  arrow: {
    fontSize: '1.1rem',
    color: 'rgba(255, 250, 250, 0.9)',
  },
  loadingContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },
  progressTrack: {
    width: '100%',
    height: '6px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.05)',
  },
  progressBar: {
    height: '100%',
    background: 'linear-gradient(90deg, #C5A880 0%, #E6C387 100%)',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(197, 168, 128, 0.5)',
  },
  loadingText: {
    fontSize: '0.8rem',
    color: 'var(--text-main)',
    letterSpacing: '2px',
    fontFamily: '"Signika Negative", sans-serif',
    opacity: 0.8,
  }
};

export default WelcomeOverlay;