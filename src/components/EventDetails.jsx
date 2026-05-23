import { motion } from 'framer-motion';
import FlowerOrnament from './FlowerOrnament';

const EventDetails = () => {
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
            <h2 className="font-script" style={styles.heading}>Save The Date</h2>
            <div style={styles.dateLarge}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                style={styles.dateDay}
              >
                SABTU
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
                Oktober 2026
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
              <div style={styles.eventLabel}>AKAD NIKAH</div>
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
              <div style={styles.eventLabel}>RESEPSI</div>
              <div style={styles.eventDivider}></div>
              <div style={styles.eventDetail}>
                <div style={styles.time}>11.00 - 14.00 WIB</div>
                <div style={styles.place}>Gedung Pertemuan SMKN 2 Padang</div>
              </div>
            </motion.div>
          </div>

          {/* Location & Action */}
          <div style={styles.footerSection}>
            <p style={styles.address}>Jl. dr. Sutomo No. 5 Simpang Haru, Padang</p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.google.com/maps/place/SMK+NEGERI+2+PADANG/@-0.9451118,100.3777069,494m/data=!3m1!1e3!4m6!3m5!1s0x2fd4b974b6b0e70d:0xb107e297c3a91055!8m2!3d-0.9452581!4d100.3782003!16s%2Fg%2F1hm3sq9v2?hl=id&entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noreferrer"
              style={styles.linkButton}
            >
              LIHAT LOKASI
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.instagram.com/s/aGlnaGxpZ2h0OjE4MTIzNDgyMDU2NTY5MDE2?story_media_id=3903322561644227008&igsh=ZGpzOW01cXdheG54"
              target="_blank"
              rel="noreferrer"
              style={styles.linkButton}
            >
              COBA FRAME INSTAGRAM
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
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(5px)',
    borderRadius: '50px',
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  headerSection: {
    marginBottom: '5rem',
  },
  heading: {
    fontSize: 'clamp(3.5rem, 12vw, 5.5rem)',
    color: '#FFFFFF',
    marginBottom: '1rem',
  },
  dateLarge: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    color: '#FFFFFF',
  },
  dateDay: {
    fontSize: '1rem',
    letterSpacing: '5px',
    fontWeight: '300',
    opacity: 0.8,
    borderBottom: '1px solid rgba(255,255,255,0.3)',
    paddingBottom: '5px',
    width: '100px',
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
    borderTop: '1px solid rgba(255,255,255,0.3)',
    paddingTop: '5px',
    width: '130px',
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
    color: '#FFFFFF',
    letterSpacing: '3px',
    width: '120px',
    flexShrink: 0,
  },
  eventDivider: {
    height: '40px',
    width: '1px',
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  eventDetail: {
    flex: 1,
  },
  time: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: '5px',
    fontFamily: '"Playfair Display", serif',
  },
  place: {
    fontSize: '0.9rem',
    color: '#FFFFFF',
    opacity: 0.7,
    letterSpacing: '0.5px',
  },
  footerSection: {
    marginTop: '2rem',
  },
  address: {
    fontSize: '0.9rem',
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: '2rem',
    letterSpacing: '1px',
  },
  linkButton: {
    display: 'inline-block',
    padding: '14px 40px',
    backgroundColor: 'transparent',
    color: '#fff',
    borderRadius: '30px',
    fontWeight: '600',
    fontSize: '0.8rem',
    textDecoration: 'none',
    border: '1px solid rgba(255,255,255,0.4)',
    letterSpacing: '2px',
    transition: 'all 0.3s ease',
  }
};

export default EventDetails;
