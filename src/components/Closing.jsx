import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Closing = () => {
  const { t } = useLanguage();
  return (
    <section className="section-padding" style={styles.section}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 60, damping: 15 }}
          style={styles.card}
        >
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            style={styles.message}
          >
            {t('closing.message')}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            style={{ ...styles.thankYouText, whiteSpace: 'pre-line' }}
          >
            {t('closing.thanks')}
          </motion.p>

          <div style={styles.dividerContainer}>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{ ...styles.line, transformOrigin: 'right' }}
            ></motion.div>
            <motion.svg
              width="24" height="24" viewBox="0 0 24 24" fill="#C5A880" xmlns="http://www.w3.org/2000/svg"
              initial={{ scale: 0, rotate: -30 }}
              whileInView={{
                scale: [0, 1.3, 1, 1.15, 1],
                rotate: 0,
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.5, times: [0, 0.4, 0.55, 0.75, 1] }}
              style={styles.heartIcon}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </motion.svg>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{ ...styles.line, transformOrigin: 'left' }}
            ></motion.div>
          </div>

          <motion.h2
            initial={{ scale: 0.7, opacity: 0, rotate: -3 }}
            whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 110, damping: 12, delay: 0.7 }}
            className="font-script"
            style={styles.coupleNames}
          >
            Asob & Yola
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.6 }}
            style={styles.hashtag}
          >
            #AsobLockedInYola
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    backgroundColor: 'transparent',
    position: 'relative',
    textAlign: 'center',
    paddingBottom: '120px', // Extra space for floating menu
  },
  card: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '60px 20px',
    backgroundColor: 'var(--card-bg)',
    backdropFilter: 'blur(5px)',
    borderRadius: '40px',
    border: '1px solid var(--border-color)',
    transition: 'all 0.5s ease',
  },
  message: {
    fontSize: '0.9rem',
    lineHeight: '1.8',
    color: 'var(--text-card-main)',
    opacity: 0.85,
    marginBottom: '30px',
    fontFamily: '"Signika Negative", sans-serif',
    padding: '0 20px',
    transition: 'all 0.5s ease',
  },
  thankYouText: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: 'var(--text-card-main)',
    marginBottom: '40px',
    lineHeight: '1.6',
    fontFamily: '"Signika Negative", sans-serif',
    transition: 'all 0.5s ease',
  },
  dividerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    marginBottom: '40px',
  },
  line: {
    height: '1px',
    width: '60px',
    backgroundColor: '#C5A880',
    opacity: 0.5,
  },
  heartIcon: {
    opacity: 0.9,
  },
  coupleNames: {
    fontSize: 'clamp(3.5rem, 12vw, 5.5rem)',
    color: '#E6C387',
    marginBottom: '20px',
    textShadow: '0 4px 20px rgba(0,0,0,0.4)',
  },
  hashtag: {
    fontSize: '1.3rem',
    color: 'var(--text-card-muted)',
    fontFamily: '"Playfair Display", serif',
    fontWeight: '50',
    transition: 'all 0.5s ease',
  }
};

export default Closing;
