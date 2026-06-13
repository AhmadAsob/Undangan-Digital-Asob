import React from 'react';
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
          {/* Flower Ornaments - Sama persis dengan EventDetails */}
          <FlowerOrnament className="flower-corner flower-top-left" />
          <FlowerOrnament className="flower-corner flower-bottom-right" />

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-script"
            style={styles.sectionTitle}
          >
            Bride & Groom
          </motion.h2>

          <div style={styles.header}>
            <h2 style={styles.arabicSalam}>اَلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ</h2>
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

              {/* Tombol Instagram Groom */}
              <motion.a
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 10px 25px rgba(255, 255, 255, 0.1)',
                  borderColor: 'rgba(255, 255, 255, 0.7)'
                }}
                whileTap={{ scale: 0.95 }}
                href="https://www.instagram.com/ahmad_asob/"
                target="_blank"
                rel="noreferrer"
                style={styles.igLink}
              >
                <svg
                  style={styles.igIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                @ahmad_asob
              </motion.a>
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

              {/* Tombol Instagram Bride */}
              <motion.a
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 10px 25px rgba(255, 255, 255, 0.1)',
                  borderColor: 'rgba(255, 255, 255, 0.7)'
                }}
                whileTap={{ scale: 0.95 }}
                href="https://www.instagram.com/yolandaazzahraa/"
                target="_blank"
                rel="noreferrer"
                style={styles.igLink}
              >
                <svg
                  style={styles.igIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                @yolandaazzahraa
              </motion.a>
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
    backdropFilter: 'blur(5px)',
    borderRadius: '50px',
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  header: {
    maxWidth: '700px',
    margin: '0 auto 60px',
  },
  sectionTitle: {
    fontSize: '4.5rem',
    color: '#C5A880',
    marginBottom: '3rem',
  },
  arabicSalam: {
    fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
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
    color: '#C5A880',
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
    border: '2px solid #C5A880',
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
    marginBottom: '1.5rem',
    fontSize: '0.9rem',
  },
  /* Styling tombol disamakan dengan format premium InstagramFilter & Hero */
  igLink: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    maxWidth: '240px',
    width: '100%',
    padding: '12px 0',
    background: 'linear-gradient(135deg, rgba(35, 30, 25, 0.7) 0%, rgba(15, 12, 10, 0.85) 100%)',
    color: '#FFFFFF',
    borderRadius: '30px',
    fontWeight: '600',
    fontSize: '0.8rem',
    textDecoration: 'none',
    border: '1px solid rgba(255, 255, 255, 0.45)',
    letterSpacing: '1.5px',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
    cursor: 'pointer',
  },
  igIcon: {
    width: '16px',
    height: '16px',
    color: '#ffffff',
  },
  ampersand: {
    fontSize: '4rem',
    fontFamily: '"Playfair Display", serif',
    color: '#BCAAA4',
    fontStyle: 'italic',
    padding: '20px',
    alignSelf: 'center', // Memastikan simbol & sejajar vertikal di tengah foto
  }
};

export default BrideGroom;