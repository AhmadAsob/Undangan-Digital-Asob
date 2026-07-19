import { motion } from 'framer-motion';
import FlowerOrnament from './FlowerOrnament';
import { useLanguage } from '../context/LanguageContext';

const EventDetails = () => {
  const { t } = useLanguage();
  return (
    <section className="section-padding" style={styles.section}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={styles.card}
        >
          {/* Flower Ornaments */}
          <FlowerOrnament className="flower-corner flower-top-left" />
          <FlowerOrnament className="flower-corner flower-bottom-right" />

          {/* Stylish Title & Restored Date Section */}
          <div style={styles.headerSection}>
            <h2 className="font-script" style={styles.heading}>{t('event.title')}</h2>
            <div style={styles.dateLarge}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                style={styles.dateDay}
              >
                {t('event.saturday')}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                style={styles.dateNum}
              >
                3
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                style={styles.dateMonth}
              >
                {t('event.october')}
              </motion.div>
            </div>
          </div>

          {/* Events Section - Minimalist White */}
          <div style={styles.eventsContainer}>
            {/* Akad Nikah */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              style={styles.eventRow}
            >
              <div style={styles.eventLabel}>{t('event.akad')}</div>
              <div style={styles.eventDivider}></div>
              <div style={styles.eventDetail}>
                <div style={styles.time}>08.00 - 10.00 WIB</div>
                <div style={styles.place}>Gedung Pertemuan SMKN 2 Padang</div>
              </div>
            </motion.div>

            {/* Resepsi */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={styles.eventRow}
            >
              <div style={styles.eventLabel}>{t('event.resepsi')}</div>
              <div style={styles.eventDivider}></div>
              <div style={styles.eventDetail}>
                <div style={styles.time}>11.00 - 16.00 WIB</div>
                <div style={styles.place}>Gedung Pertemuan SMKN 2 Padang</div>
              </div>
            </motion.div>
          </div>

          {/* Location & Action */}
          <div style={styles.footerSection}>
            <p style={styles.address}>Jl. dr. Sutomo No. 5 Simpang Haru, Padang</p>

            {/* Tombol Lihat Lokasi yang diselaraskan menjadi Premium */}
            <motion.a
              whileHover={{
                scale: 1.05,
                boxShadow: '0 10px 25px rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(255, 255, 255, 0.7)'
              }}
              whileTap={{ scale: 0.95 }}
              href="https://maps.app.goo.gl/ipVqnJgnB8e22bT46?g_st=iw"
              target="_blank"
              rel="noreferrer"
              style={styles.linkButton}
            >
              {/* Ikon Map Pin SVG */}
              <svg
                style={styles.buttonIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {t('event.locationBtn')}
            </motion.a>
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
  },
  card: {
    padding: 'clamp(60px, 10vw, 100px) 20px',
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: 'var(--card-bg)',
    backdropFilter: 'blur(5px)',
    borderRadius: '50px',
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid var(--border-color)',
    transition: 'all 0.5s ease',
  },
  headerSection: {
    marginBottom: '5rem',
  },
  heading: {
    fontSize: 'clamp(3.5rem, 12vw, 5.5rem)',
    color: '#C5A880',
    marginBottom: '1rem',
  },
  dateLarge: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    color: 'var(--text-card-main)',
    transition: 'all 0.5s ease',
  },
  dateDay: {
    fontSize: '1rem',
    letterSpacing: '5px',
    fontWeight: '300',
    opacity: 0.8,
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '5px',
    width: '100px',
    transition: 'all 0.5s ease',
  },
  dateNum: {
    fontSize: '4.5rem',
    fontFamily: '"Playfair Display", serif',
    fontWeight: '700',
    lineHeight: 1,
  },
  dateMonth: {
    fontSize: '1rem',
    letterSpacing: '5px',
    fontWeight: '300',
    opacity: 0.8,
    borderTop: '1px solid var(--border-color)',
    paddingTop: '5px',
    width: '130px',
    transition: 'all 0.5s ease',
  },
  eventsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
    maxWidth: '600px',
    margin: '0 auto 4rem',
  },
  eventRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    textAlign: 'left',
  },
  eventLabel: {
    fontSize: '0.85rem',
    fontWeight: '700',
    color: 'var(--text-card-main)',
    letterSpacing: '3px',
    width: '120px',
    flexShrink: 0,
    transition: 'all 0.5s ease',
  },
  eventDivider: {
    height: '40px',
    width: '1px',
    backgroundColor: 'var(--border-color)',
    transition: 'all 0.5s ease',
  },
  eventDetail: {
    flex: 1,
  },
  time: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: 'var(--text-card-main)',
    marginBottom: '5px',
    fontFamily: '"Playfair Display", serif',
    transition: 'all 0.5s ease',
  },
  place: {
    fontSize: '0.9rem',
    color: 'var(--text-card-muted)',
    opacity: 0.8,
    letterSpacing: '0.5px',
    transition: 'all 0.5s ease',
  },
  footerSection: {
    marginTop: '2rem',
  },
  address: {
    fontSize: '0.9rem',
    color: 'var(--text-card-main)',
    opacity: 0.8,
    marginBottom: '2rem',
    letterSpacing: '1px',
    transition: 'all 0.5s ease',
  },
  /* Format tombol diselaraskan penuh dengan gaya tombol komponen lainnya */
  linkButton: {
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
    border: '1px solid rgba(255, 255, 255, 0.45)',
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
    color: '#ffffff',
  }
};

export default EventDetails;