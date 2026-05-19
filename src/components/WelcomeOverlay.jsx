import { motion } from 'framer-motion';
import FlowerOrnament from './FlowerOrnament';
import Logo from './Logo';

const WelcomeOverlay = ({ onEnter, guestName }) => {

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      style={styles.overlay}
    >
      <div style={styles.bgCircle1}></div>
      <div style={styles.bgCircle2}></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={styles.card}
      >
        {/* Full Card Frame */}
        <FlowerOrnament />

        <div style={styles.borderTop}></div>
        
        <div style={styles.content}>
          <div style={styles.logoWrapper}>
            <Logo size="medium" color="rgb(141, 110, 99)" />
          </div>

          <p style={styles.subTitle}>THE WEDDING OF</p>
          <h1 style={styles.title}>Asob & Yola</h1>

          <div style={styles.divider}></div>

          <div style={styles.guestBox}>
            <p style={styles.toText}>Special Invitation To:</p>
            <h2 style={styles.guestName}>{guestName}</h2>
          </div>

          <p style={styles.bottomText}>Tanpa Mengurangi Rasa Hormat, Kami Mengundang Bapak/Ibu/Saudara/i Untuk Hadir Di Hari Bahagia Kami.</p>

          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#5D4037' }}
            whileTap={{ scale: 0.95 }}
            onClick={onEnter}
            style={styles.button}
          >
            <span style={styles.buttonText}>BUKA UNDANGAN</span>
            <motion.div 
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={styles.arrow}
            >
              →
            </motion.div>
          </motion.button>
        </div>

        <div style={styles.borderBottom}></div>
      </motion.div>
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
    backgroundColor: '#EFEBE9',
    zIndex: 2000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: '20px',
  },
  bgCircle1: {
    position: 'absolute',
    top: '-10%',
    right: '-10%',
    width: '40vw',
    height: '40vw',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(141, 110, 99, 0.2) 0%, rgba(255,255,255,0) 70%)',
    zIndex: -1,
  },
  bgCircle2: {
    position: 'absolute',
    bottom: '-10%',
    left: '-10%',
    width: '50vw',
    height: '50vw',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(215, 204, 200, 0.3) 0%, rgba(255,255,255,0) 70%)',
    zIndex: -1,
  },
  card: {
    width: '100%',
    maxWidth: '450px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(20px)',
    borderRadius: '30px',
    boxShadow: '0 20px 50px rgba(62, 39, 35, 0.15)',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    position: 'relative',
    overflow: 'hidden',
    padding: '60px 20px',
  },
  borderTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '8px',
    background: 'linear-gradient(90deg, #D7CCC8 0%, #8D6E63 50%, #D7CCC8 100%)',
    zIndex: 2,
  },
  borderBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '8px',
    background: 'linear-gradient(90deg, #D7CCC8 0%, #8D6E63 50%, #D7CCC8 100%)',
    zIndex: 2,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    position: 'relative',
    zIndex: 2,
  },
  logoWrapper: {
    marginBottom: '20px',
  },
  subTitle: {
    fontSize: '0.75rem',
    letterSpacing: '5px',
    color: '#A1887F',
    marginBottom: '10px',
    fontWeight: '500',
  },
  title: {
    fontSize: '2.5rem',
    fontFamily: '"Playfair Display", serif',
    color: '#3E2723',
    marginBottom: '20px',
  },
  divider: {
    width: '40px',
    height: '1px',
    backgroundColor: '#D7CCC8',
    marginBottom: '30px',
  },
  guestBox: {
    padding: '20px 30px',
    borderRadius: '20px',
    backgroundColor: 'rgba(253, 251, 249, 0.8)',
    border: '1px solid #EFEBE9',
    width: '100%',
    marginBottom: '30px',
  },
  toText: {
    fontSize: '0.85rem',
    color: '#8D6E63',
    marginBottom: '8px',
    fontStyle: 'italic',
  },
  guestName: {
    fontSize: '1.5rem',
    color: '#3E2723',
    fontFamily: '"Playfair Display", serif',
    margin: 0,
  },
  bottomText: {
    fontSize: '0.8rem',
    lineHeight: '1.6',
    color: '#6D4C41',
    marginBottom: '40px',
    padding: '0 10px',
  },
  button: {
    backgroundColor: 'rgb(141, 110, 99)',
    color: '#fff',
    padding: '16px 40px',
    borderRadius: '40px',
    fontSize: '0.9rem',
    fontWeight: '600',
    letterSpacing: '2px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    boxShadow: '0 10px 25px rgba(62, 39, 35, 0.3)',
  },
  buttonText: {
    marginTop: '2px',
  },
  arrow: {
    fontSize: '1.2rem',
  }
};

export default WelcomeOverlay;
