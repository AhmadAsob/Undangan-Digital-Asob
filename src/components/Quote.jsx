import { motion } from 'framer-motion';
import FlowerOrnament from './FlowerOrnament';
import { useLanguage } from '../context/LanguageContext';

const Quote = () => {
  const { t } = useLanguage();
  return (
    <section className="section-padding" style={styles.section}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", damping: 20, stiffness: 80 }}
          style={styles.container}
        >
          {/* Efek Kilau Kaca (Modern Shine) */}
          <motion.div
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut"
            }}
            style={styles.shine}
          />

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-script"
            style={styles.sectionTitle}
          >
            {t('quote.title')}
          </motion.h2>

          <FlowerOrnament />

          <div style={styles.content}>
            <motion.p
              initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.2 }}
              style={styles.arabic}
            >
              وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةًۗ اِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ ۝٢١            </motion.p>

            <motion.p
              initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.8 }}
              style={styles.verse}
            >
              "{t('quote.verse')}"
            </motion.p>

            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1.5, type: 'spring' }}
              style={styles.source}
            >
              {t('quote.source')}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '80px 40px',
    backgroundColor: 'var(--card-bg)',
    backdropFilter: 'blur(3px)',
    border: '1px solid var(--border-color)',
    borderRadius: '50px',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: 'var(--shadow)',
    transition: 'all 0.5s ease',
  },
  shine: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '50%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
    transform: 'skewX(-20deg)',
    zIndex: 1,
    pointerEvents: 'none',
  },
  sectionTitle: {
    fontSize: '4.5rem',
    color: '#C5A880',
    marginBottom: '2rem',
    position: 'relative',
    zIndex: 2,
  },
  content: {
    position: 'relative',
    zIndex: 2,
  },
  arabic: {
    fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
    fontFamily: 'serif',
    lineHeight: '2',
    marginBottom: '2.5rem',
    color: 'var(--text-card-main)',
    textShadow: '0 0 20px rgba(255,255,255,0.2)',
    transition: 'all 0.5s ease',
  },
  verse: {
    fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
    fontStyle: 'italic',
    lineHeight: '1.8',
    marginBottom: '2rem',
    color: 'var(--text-card-main)',
    opacity: 0.9,
    transition: 'all 0.5s ease',
  },
  source: {
    fontSize: '0.9rem',
    fontWeight: '600',
    letterSpacing: '3px',
    color: 'var(--text-card-muted)',
    textTransform: 'uppercase',
    transition: 'all 0.5s ease',
  },
};

export default Quote;
