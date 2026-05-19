import { motion } from 'framer-motion';

const Hero = ({ onOpen }) => {
  return (
    <section style={styles.hero}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={styles.content}
      >
        <span style={styles.subTitle}>THE WEDDING OF</span>
        <h1 style={styles.title}>Asob & Yola</h1>
        <p style={styles.hashtag}>#SahJadiAsobYola</p>
        <div style={styles.divider}></div>
        <p style={styles.date}>Sunday, 20 June 2026</p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpen}
          style={styles.button}
        >
          Lihat Detail Acara
        </motion.button>
      </motion.div>
    </section>
  );
};

const styles = {
  hero: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '20px',
  },
  content: {
    padding: 'clamp(2rem, 8vw, 4rem)',
    maxWidth: '600px',
    width: '100%',
    backgroundColor: 'transparent', // Tanpa bingkai kotak
    border: 'none',
    backdropFilter: 'none',
  },
  subTitle: {
    letterSpacing: 'clamp(2px, 1vw, 5px)',
    fontSize: 'clamp(0.7rem, 2vw, 0.9rem)',
    fontWeight: '300',
    display: 'block',
    marginBottom: '1rem',
    color: '#fff',
    textShadow: '0 2px 10px rgba(0,0,0,0.3)',
  },
  title: {
    fontSize: 'clamp(2.5rem, 10vw, 4.5rem)',
    fontFamily: '"Playfair Display", serif',
    marginBottom: '0.5rem',
    lineHeight: '1.2',
    color: '#fff',
    textShadow: '0 2px 15px rgba(0,0,0,0.4)',
  },
  hashtag: {
    fontSize: '0.9rem',
    color: '#fff',
    letterSpacing: '3px',
    marginTop: '0.5rem',
    opacity: 0.9,
    fontWeight: '300',
  },
  divider: {
    width: '50px',
    height: '2px',
    backgroundColor: '#fff',
    margin: '1.5rem auto',
    boxShadow: '0 0 10px rgba(255,255,255,0.5)',
  },
  date: {
    fontSize: 'clamp(1rem, 3vw, 1.3rem)',
    marginBottom: '2.5rem',
    fontWeight: '300',
    color: '#fff',
    textShadow: '0 2px 10px rgba(0,0,0,0.3)',
  },
  button: {
    padding: '14px 40px',
    fontSize: '1rem',
    backgroundColor: '#8D6E63',
    color: '#fff',
    borderRadius: '30px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
    fontWeight: '500',
    letterSpacing: '1px',
    border: 'none',
    cursor: 'pointer',
  }
};

export default Hero;
