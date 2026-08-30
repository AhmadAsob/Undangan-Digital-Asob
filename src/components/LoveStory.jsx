import { motion } from 'framer-motion';
import FlowerOrnament from './FlowerOrnament';
import { useLanguage } from '../context/LanguageContext';

const LoveStory = () => {
  const { t } = useLanguage();
  const stories = [
    {
      period: t('story.meetPeriod'),
      title: t('story.meetTitle'),
      desc: t('story.meetDesc')
    },
    {
      period: t('story.startPeriod'),
      title: t('story.startTitle'),
      desc: t('story.startDesc')
    },
    {
      period: t('story.chapterPeriod'),
      title: t('story.chapterTitle'),
      desc: t('story.chapterDesc')
    },
    {
      period: t('story.foundPeriod'),
      title: t('story.foundTitle'),
      desc: t('story.foundDesc')
    },
    {
      period: t('story.restartPeriod'),
      title: t('story.restartTitle'),
      desc: t('story.restartDesc')
    },
    {
      period: t('story.foreverPeriod'),
      title: t('story.foreverTitle'),
      desc: t('story.foreverDesc')
    }
  ];

  return (
    <section className="section-padding" style={styles.section}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, scale: 1.08 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={styles.card}
        >
          <FlowerOrnament />
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
            style={styles.header}
          >
            <h2 className="font-script" style={styles.title}>{t('story.title')}</h2>
            <p style={styles.subtitle}>{t('story.subtitle')}</p>
          </motion.div>

          <div style={styles.timeline}>
            {stories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40, rotate: index % 2 === 0 ? -3 : 3 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ type: 'spring', stiffness: 100, damping: 14, delay: index * 0.15 }}
                style={styles.storyItem}
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 300, damping: 12, delay: index * 0.15 + 0.15 }}
                  style={styles.yearBadge}
                >
                  {story.period}
                </motion.div>
                <h3 style={styles.storyTitle}>{story.title}</h3>
                <p style={{ ...styles.storyDesc, whiteSpace: 'pre-line' }}>{story.desc}</p>
                {index !== stories.length - 1 && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 + 0.35, ease: "easeOut" }}
                    style={{ ...styles.connector, transformOrigin: 'top' }}
                  ></motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    backgroundColor: 'transparent',
    position: 'relative',
    overflow: 'hidden',
  },
  card: {
    padding: 'clamp(40px, 8vw, 80px)',
    textAlign: 'center',
    maxWidth: '900px',
    margin: '0 auto',
    backgroundColor: 'var(--card-bg)',
    backdropFilter: 'blur(3px)',
    border: '1px solid var(--border-color)',
    borderRadius: '50px',
    boxShadow: 'var(--shadow)',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.5s ease',
  },
  header: {
    maxWidth: '600px',
    margin: '0 auto 60px',
    position: 'relative',
    zIndex: 1,
  },
  title: {
    fontSize: '4.5rem',
    color: '#C5A880',
    marginBottom: '2rem',
  },
  subtitle: {
    color: 'var(--text-card-main)',
    lineHeight: '1.6',
    transition: 'all 0.5s ease',
  },
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '40px',
    position: 'relative',
    zIndex: 1,
  },
  storyItem: {
    maxWidth: '500px',
    position: 'relative',
    padding: '20px',
  },
  yearBadge: {
    backgroundColor: 'var(--glass)',
    color: 'var(--text-card-main)',
    padding: '5px 20px',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: '700',
    display: 'inline-block',
    marginBottom: '15px',
    letterSpacing: '2px',
    border: '1px solid var(--border-color)',
    transition: 'all 0.5s ease',
  },
  storyTitle: {
    fontFamily: '"Playfair Display", serif',
    fontSize: '1.8rem',
    color: 'var(--text-card-main)',
    marginBottom: '10px',
    transition: 'all 0.5s ease',
  },
  storyDesc: {
    color: 'var(--text-card-main)',
    lineHeight: '1.7',
    fontSize: '0.95rem',
    opacity: 0.9,
    transition: 'all 0.5s ease',
  },
  connector: {
    width: '1px',
    height: '40px',
    backgroundColor: 'var(--border-color)',
    margin: '20px auto 0',
    transition: 'all 0.5s ease',
  }
};

export default LoveStory;
