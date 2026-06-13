import { motion } from 'framer-motion';
import FlowerOrnament from './FlowerOrnament';

const Quote = () => {
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
            The Quote
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
              وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةً ۗاِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ
            </motion.p>

            <motion.p
              initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.8 }}
              style={styles.verse}
            >
              "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."
            </motion.p>

            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1.5, type: 'spring' }}
              style={styles.source}
            >
              - Q.S. Ar-Rum: 21 -
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
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(3px)',
    borderRadius: '50px',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
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
    color: '#FFFFFF',
    textShadow: '0 0 20px rgba(255,255,255,0.2)',
  },
  verse: {
    fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
    fontStyle: 'italic',
    lineHeight: '1.8',
    marginBottom: '2rem',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  source: {
    fontSize: '0.9rem',
    fontWeight: '600',
    letterSpacing: '3px',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
};

export default Quote;
