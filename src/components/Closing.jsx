import { motion } from 'framer-motion';

const Closing = () => {
  return (
    <section className="section-padding" style={styles.section}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={styles.card}
        >
          <p style={styles.message}>
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir dan memberikan doa restunya untuk pernikahan kami.
          </p>

          <p style={styles.thankYouText}>
            Atas do'a & restunya,<br />kami ucapkan terima kasih.
          </p>

          <div style={styles.dividerContainer}>
            <div style={styles.line}></div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#C5A880" xmlns="http://www.w3.org/2000/svg" style={styles.heartIcon}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <div style={styles.line}></div>
          </div>

          <motion.h2
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-script"
            style={styles.coupleNames}
          >
            Asob & Yola
          </motion.h2>

          <p style={styles.hashtag}>#AsobLockedInYola</p>
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
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(5px)',
    borderRadius: '40px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  message: {
    fontSize: '0.9rem',
    lineHeight: '1.8',
    color: '#FFFFFF',
    opacity: 0.85,
    marginBottom: '30px',
    fontFamily: '"Signika Negative", sans-serif',
    padding: '0 20px',
  },
  thankYouText: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: '40px',
    lineHeight: '1.6',
    fontFamily: '"Signika Negative", sans-serif',
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
    color: '#FFFFFF',
    fontFamily: '"Playfair Display", serif',
    fontWeight: '50',
  }
};

export default Closing;
