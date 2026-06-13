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
        <p style={styles.hashtag}>#AsobLockedInYola</p>
        <div style={styles.divider}></div>
        <p style={styles.date}>Saturday, 3 October 2026</p>

        {/* Tombol yang sudah diselaraskan dengan gaya premium InstagramFilter */}
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: '0 10px 25px rgba(255, 255, 255, 0.1)',
            borderColor: 'rgba(255, 255, 255, 0.7)'
          }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpen}
          style={styles.button}
        >
          {/* Ikon Surat Terbuka / Detail Acara SVG */}
          <svg
            style={styles.buttonIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          LIHAT DETAIL ACARA
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
    backgroundColor: 'transparent',
    border: 'none',
    backdropFilter: 'none',
  },
  subTitle: {
    letterSpacing: 'clamp(2px, 1vw, 5px)',
    fontSize: 'clamp(0.7rem, 2vw, 0.9rem)',
    fontWeight: '300',
    display: 'block',
    marginBottom: '1rem',
    color: '#C5A880', /* Changed from white to Gold */
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
    color: '#C5A880', /* Changed from white to Gold */
    letterSpacing: '3px',
    marginTop: '0.5rem',
    opacity: 0.9,
    fontWeight: '300',
  },
  divider: {
    width: '50px',
    height: '2px',
    backgroundColor: '#C5A880', /* Changed from white to Gold */
    margin: '1.5rem auto',
    boxShadow: '0 0 10px rgba(197, 168, 128, 0.5)',
  },
  date: {
    fontSize: 'clamp(1rem, 3vw, 1.3rem)',
    marginBottom: '2.5rem',
    fontWeight: '300',
    color: '#fff',
    textShadow: '0 2px 10px rgba(0,0,0,0.3)',
  },
  /* Samakan format & struktur styling dengan InstagramFilter */
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    maxWidth: '280px',
    width: '100%',
    padding: '14px 0',
    background: 'linear-gradient(135deg, rgba(35, 30, 25, 0.7) 0%, rgba(15, 12, 10, 0.85) 100%)',
    color: '#FFFFFF',
    borderRadius: '30px',
    fontWeight: '600',
    fontSize: '0.8rem',
    textDecoration: 'none',
    border: '1px solid rgba(255, 255, 255, 0.45)', // Menggunakan aksen border putih elegan agar serasi dengan teks Hero
    letterSpacing: '2px',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
    cursor: 'pointer',
  },
  buttonIcon: {
    width: '16px',
    height: '16px',
    color: '#ffffff', // Warna ikon mengikuti warna teks tombol utama
  }
};

export default Hero;