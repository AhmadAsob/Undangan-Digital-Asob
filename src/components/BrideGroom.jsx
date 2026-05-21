import { motion } from 'framer-motion';
import FlowerOrnament from './FlowerOrnament';

const BrideGroom = () => {
  return (
    <section className="section-padding" style={styles.section}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={styles.card}
        >
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-script"
            style={styles.sectionTitle}
          >
            Bride & Groom
          </motion.h2>
          <FlowerOrnament />
          <div style={styles.header}>
            <h2 style={styles.arabicSalam}>اَلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ</h2>
            <p style={styles.headerSubtitle}>Maha Suci Allah yang telah menciptakan mahluk-Nya berpasang-pasangan. Dengan memohon rahmat serta ridho-Nya, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:</p>
          </div>

          <div style={styles.grid}>
            {/* Groom */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              style={styles.profile}
            >
              <div style={styles.imageWrapper}>
                <div style={styles.imageFrame}></div>
                <img src="/assets/images/profile/groom.jpg" alt="Groom" style={styles.image} />
                <div className="font-script" style={styles.nickname}>Asob</div>
              </div>
              <h3 style={styles.name}>Ahmad Shobari, S.Si</h3>
              <p style={styles.desc}>Putra dari Bapak Sawir & Ibu Alm.Desnita</p>
              <a href="https://www.instagram.com/ahmad_asob/" target="_blank" rel="noreferrer" style={styles.igLink}>
                <span style={styles.igIcon}></span> @ahmad_asob
              </a>
            </motion.div>

            <div style={styles.ampersand}>&</div>

            {/* Bride */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              style={styles.profile}
            >
              <div style={styles.imageWrapper}>
                <div style={styles.imageFrame}></div>
                <img src="/assets/images/profile/bride.jpg" alt="Bride" style={styles.image} />
                <div className="font-script" style={styles.nickname}>Yola</div>
              </div>
              <h3 style={styles.name}>Yolanda Azzahra, M.Si</h3>
              <p style={styles.desc}>Putri dari Bapak Bustami & Ibu Yurmaini, A.Md</p>
              <a href="https://www.instagram.com/yolandaazzaahraa/" target="_blank" rel="noreferrer" style={styles.igLink}>
                <span style={styles.igIcon}></span> @yolandaazzaahraa
              </a>
            </motion.div>
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
    overflow: 'hidden',
    position: 'relative',
  },
  card: {
    padding: '60px 20px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(3px)',
    borderRadius: '50px',
    position: 'relative',
    overflow: 'hidden',
  },
  header: {
    maxWidth: '700px',
    margin: '0 auto 60px',
  },
  sectionTitle: {
    fontSize: '4.5rem',
    color: '#FFFFFF',
    marginBottom: '3rem',
  },
  arabicSalam: {
    fontSize: '2.2rem',
    fontFamily: 'serif',
    color: '#FFFFFF',
    marginBottom: '1.5rem',
    lineHeight: '1.8',
  },
  headerSubtitle: {
    color: '#FFFFFF',
    lineHeight: '1.6',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '40px',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  profile: {
    flex: '1',
    minWidth: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  imageWrapper: {
    position: 'relative',
    width: 'clamp(200px, 25vw, 280px)',
    height: 'clamp(280px, 35vw, 380px)',
    marginBottom: '40px',
  },
  nickname: {
    position: 'absolute',
    bottom: '-20px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: 'clamp(3rem, 8vw, 4.5rem)',
    color: '#fff',
    textShadow: '2px 2px 20px rgba(0,0,0,0.5)',
    zIndex: 10,
    width: '100%',
    textAlign: 'center',
    pointerEvents: 'none',
  },
  imageFrame: {
    position: 'absolute',
    top: '-10px',
    left: '-10px',
    right: '-10px',
    bottom: '-10px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '150px',
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '150px',
    position: 'relative',
    zIndex: 2,
    boxShadow: '0 15px 40px rgba(0,0,0,0.2)',
  },
  name: {
    fontSize: '1.8rem',
    fontFamily: '"Playfair Display", serif',
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: '0.5rem',
  },
  desc: {
    color: '#FFFFFF',
    marginBottom: '1rem',
    fontSize: '0.9rem',
  },
  igLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#FFFFFF',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '500',
    padding: '8px 16px',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    transition: 'all 0.3s ease',
  },
  ampersand: {
    fontSize: '4rem',
    fontFamily: '"Playfair Display", serif',
    color: '#BCAAA4',
    fontStyle: 'italic',
    padding: '20px',
  }
};

export default BrideGroom;
