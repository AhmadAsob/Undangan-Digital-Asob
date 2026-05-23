import { motion } from 'framer-motion';
import Logo from './Logo';

const WelcomeOverlay = ({ onEnter, guestName }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
      transition={{ duration: 1, ease: "easeInOut" }}
      style={styles.overlay}
    >
      {/* 1. Foto Latar Belakang dari Supabase & Efek Gradasi Gelap Sinematik */}
      <div style={styles.backgroundImage} />
      <div style={styles.darkOverlay} />

      {/* 2. Kontainer Konten Utama (Mengalir Proporsional dari Atas ke Bawah) */}
      <div style={styles.mainContainer}>

        {/* AREA LOGO (Polos & Bersih Tanpa Bingkai/Blur) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={styles.logoContainer}
        >
          <Logo size="large" color="#FFFFFF" />
        </motion.div>

        {/* TEKS PEMBUKA & NAMA MEMPELAI */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={styles.textSection}
        >
          <p style={styles.subTitle}>THE WEDDING OF</p>
          <h1 style={styles.title}>Asob & Yola</h1>
          <div style={styles.divider}></div>
        </motion.div>

        {/* KOTAK TAMU UNDANGAN (Glassmorphism Transparan) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={styles.guestCard}
        >
          <p style={styles.toText}>Kpd Yth. Bapak/Ibu/Saudara/i</p>
          <h2 style={styles.guestName}>{guestName || 'Tamu Undangan'}</h2>
        </motion.div>

        {/* TOMBOL BUKA UNDANGAN (Gaya Sinematik Gelap & Emas Premium) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          style={styles.buttonWrapper}
        >
          <motion.button
            whileHover={{
              scale: 1.03,
              boxShadow: '0 15px 40px rgba(212, 175, 55, 0.25)',
              borderColor: 'rgba(255, 255, 255, 0.8)'
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
            <span style={styles.buttonText}>BUKA UNDANGAN</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              style={styles.arrow}
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>

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
    // Menggunakan URL penuh dari Supabase Storage Anda
    backgroundImage: 'url("https://vqkeykmxnbkbsmtjmnsv.supabase.co/storage/v1/object/public/prewed/Z52_5105.JPG")',
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
    fontSize: '0.8rem',
    letterSpacing: '5px',
    color: '#FFFFFF',
    opacity: 0.85,
    marginBottom: '12px',
    fontWeight: '400',
    fontFamily: '"Inter", sans-serif',
  },
  title: {
    fontSize: 'clamp(2.6rem, 8.5vw, 3.4rem)',
    fontFamily: '"Playfair Display", serif',
    color: '#FFFFFF',
    margin: 0,
    fontWeight: '400',
    textShadow: '0 2px 20px rgba(0,0,0,0.6)',
  },
  divider: {
    width: '35px',
    height: '1px',
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    margin: '20px auto 0 auto',
  },
  guestCard: {
    width: '100%',
    padding: '28px 20px',
    borderRadius: '24px',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
    boxSizing: 'border-box',
    transform: 'translateY(-10px)',
  },
  toText: {
    fontSize: '0.8rem',
    color: '#FFFFFF',
    opacity: 0.7,
    margin: '0 0 10px 0',
    fontStyle: 'italic',
    fontFamily: '"Inter", sans-serif',
    letterSpacing: '0.5px',
  },
  guestName: {
    fontSize: 'clamp(1.5rem, 5.5vw, 1.9rem)',
    fontFamily: '"Playfair Display", serif',
    color: '#FFFFFF',
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
    background: 'linear-gradient(135deg, rgba(30, 25, 20, 0.85) 0%, rgba(15, 12, 10, 0.95) 100%)',
    color: '#FFFFFF',
    width: '100%',
    padding: '16px 30px',
    borderRadius: '40px',
    fontSize: '0.85rem',
    fontWeight: '600',
    letterSpacing: '3px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.5)',
    cursor: 'pointer',
    fontFamily: '"Inter", sans-serif',
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
  }
};

export default WelcomeOverlay;