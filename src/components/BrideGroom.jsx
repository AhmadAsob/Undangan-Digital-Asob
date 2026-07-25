import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import FlowerOrnament from './FlowerOrnament';
import { useLanguage } from '../context/LanguageContext';

const BrideGroom = () => {
  const { t } = useLanguage();
  const [selectedImg, setSelectedImg] = useState(null);
  
  // State untuk indeks foto
  const [groomIndex, setGroomIndex] = useState(0);
  const [brideIndex, setBrideIndex] = useState(0);
  
  // State untuk membedakan drag vs click
  const [isDraggingGroom, setIsDraggingGroom] = useState(false);
  const [isDraggingBride, setIsDraggingBride] = useState(false);

  // Parallax halus pada foto profil saat discroll
  const groomImgRef = useRef(null);
  const brideImgRef = useRef(null);
  const { scrollYProgress: groomScrollProgress } = useScroll({ target: groomImgRef, offset: ['start end', 'end start'] });
  const { scrollYProgress: brideScrollProgress } = useScroll({ target: brideImgRef, offset: ['start end', 'end start'] });
  const groomParallaxY = useTransform(groomScrollProgress, [0, 1], [-12, 12]);
  const brideParallaxY = useTransform(brideScrollProgress, [0, 1], [-12, 12]);

  // Autoplay slider dengan jeda waktu bergantian (offset) agar terkesan natural
  useEffect(() => {
    // Slider Groom berputar setiap 5 detik
    const groomTimer = setInterval(() => {
      setGroomIndex((prev) => (prev + 1) % 2);
    }, 5000);

    // Slider Bride berputar setiap 5 detik, tapi dimulai 2.5 detik setelah Groom
    let brideTimer;
    const brideStartTimeout = setTimeout(() => {
      brideTimer = setInterval(() => {
        setBrideIndex((prev) => (prev + 1) % 2);
      }, 5000);
    }, 2500);

    return () => {
      clearInterval(groomTimer);
      clearTimeout(brideStartTimeout);
      if (brideTimer) clearInterval(brideTimer);
    };
  }, []);

  // Daftar foto untuk masing-masing
  const groomImages = [
    "/assets/images/profile/groom.jpg",
    "/assets/images/gallery/850_1607.JPG"
  ];

  const brideImages = [
    "/assets/images/profile/bride.jpg",
    "/assets/images/gallery/850_1644.JPG"
  ];

  const handleGroomDragEnd = (event, info) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      setGroomIndex((prev) => (prev + 1) % groomImages.length);
    } else if (info.offset.x > swipeThreshold) {
      setGroomIndex((prev) => (prev - 1 + groomImages.length) % groomImages.length);
    }
    setTimeout(() => setIsDraggingGroom(false), 50);
  };

  const handleBrideDragEnd = (event, info) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      setBrideIndex((prev) => (prev + 1) % brideImages.length);
    } else if (info.offset.x > swipeThreshold) {
      setBrideIndex((prev) => (prev - 1 + brideImages.length) % brideImages.length);
    }
    setTimeout(() => setIsDraggingBride(false), 50);
  };

  return (
    <section className="section-padding" style={styles.section}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={styles.card}
        >
          {/* Flower Ornaments */}
          <FlowerOrnament className="flower-corner flower-top-left" />
          <FlowerOrnament className="flower-corner flower-bottom-right" />

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-script"
            style={styles.sectionTitle}
          >
            {t('bridegroom.title')}
          </motion.h2>

          <div style={styles.header}>
            <h2 style={styles.arabicSalam}>اَلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ</h2>
            <p style={styles.headerSubtitle}>{t('bridegroom.subtitle')}</p>
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
              <div
                ref={groomImgRef}
                style={{ ...styles.imageWrapper, cursor: 'zoom-in' }}
                onClick={() => {
                  if (!isDraggingGroom) {
                    setSelectedImg(groomImages[groomIndex]);
                  }
                }}
              >
                <div style={styles.imageFrame}></div>

                {/* Oval Container for sliding images (parallax scroll saat frame, Ken Burns pada foto di dalamnya) */}
                <motion.div style={{ ...styles.imageSliderContainer, y: groomParallaxY }}>
                  <motion.div
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                    style={styles.kenBurnsInner}
                  >
                  <AnimatePresence initial={false} mode="wait">
                    <motion.img
                      key={groomIndex}
                      src={groomImages[groomIndex]}
                      alt="Groom"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.4}
                      onDragStart={() => setIsDraggingGroom(true)}
                      onDragEnd={handleGroomDragEnd}
                      style={styles.image}
                    />
                  </AnimatePresence>
                  </motion.div>
                </motion.div>

                {/* Pagination Dots */}
                <div style={styles.dotsContainer}>
                  {groomImages.map((_, idx) => (
                    <div
                      key={idx}
                      style={{
                        ...styles.dot,
                        backgroundColor: idx === groomIndex ? '#E6C387' : 'rgba(255, 255, 255, 0.4)',
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setGroomIndex(idx);
                      }}
                    />
                  ))}
                </div>

                <div className="font-script" style={styles.nickname}>Asob</div>
              </div>
              <h3 style={styles.name}>Ahmad Shobari, S.Si</h3>
              <p style={styles.desc}>{t('bridegroom.groomParent')}</p>

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
              <div
                ref={brideImgRef}
                style={{ ...styles.imageWrapper, cursor: 'zoom-in' }}
                onClick={() => {
                  if (!isDraggingBride) {
                    setSelectedImg(brideImages[brideIndex]);
                  }
                }}
              >
                <div style={styles.imageFrame}></div>

                {/* Oval Container for sliding images (parallax scroll saat frame, Ken Burns pada foto di dalamnya) */}
                <motion.div style={{ ...styles.imageSliderContainer, y: brideParallaxY }}>
                  <motion.div
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                    style={styles.kenBurnsInner}
                  >
                  <AnimatePresence initial={false} mode="wait">
                    <motion.img
                      key={brideIndex}
                      src={brideImages[brideIndex]}
                      alt="Bride"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.4}
                      onDragStart={() => setIsDraggingBride(true)}
                      onDragEnd={handleBrideDragEnd}
                      style={styles.image}
                    />
                  </AnimatePresence>
                  </motion.div>
                </motion.div>

                {/* Pagination Dots */}
                <div style={styles.dotsContainer}>
                  {brideImages.map((_, idx) => (
                    <div
                      key={idx}
                      style={{
                        ...styles.dot,
                        backgroundColor: idx === brideIndex ? '#E6C387' : 'rgba(255, 255, 255, 0.4)',
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setBrideIndex(idx);
                      }}
                    />
                  ))}
                </div>

                <div className="font-script" style={styles.nickname}>Yola</div>
              </div>
              <h3 style={styles.name}>Yolanda Azzahra, M.Si</h3>
              <p style={styles.desc}>{t('bridegroom.brideParent')}</p>

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

      {/* Lightbox Pop-up untuk Foto Profil */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            style={styles.lightbox}
          >
            <motion.img
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              src={selectedImg}
              style={styles.fullImg}
            />
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              style={styles.closeBtn}
            >
              ×
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
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
    backgroundColor: 'var(--card-bg)',
    backdropFilter: 'blur(5px)',
    borderRadius: '50px',
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid var(--border-color)',
    transition: 'all 0.5s ease',
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
    color: 'var(--text-card-main)',
    marginBottom: '1.5rem',
    lineHeight: '1.8',
    transition: 'all 0.5s ease',
  },
  headerSubtitle: {
    color: 'var(--text-card-main)',
    lineHeight: '1.6',
    transition: 'all 0.5s ease',
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
    color: '#E6C387',
    textShadow: '0 4px 15px rgba(0, 0, 0, 0.95), 0 0 10px rgba(0, 0, 0, 0.8)',
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
    color: 'var(--text-card-main)',
    marginBottom: '0.5rem',
    transition: 'all 0.5s ease',
  },
  desc: {
    color: 'var(--text-card-main)',
    marginBottom: '1.5rem',
    fontSize: '0.9rem',
    transition: 'all 0.5s ease',
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
  },
  imageSliderContainer: {
    width: '100%',
    height: '100%',
    borderRadius: '150px',
    overflow: 'hidden',
    position: 'relative',
    zIndex: 2,
  },
  kenBurnsInner: {
    width: '100%',
    height: '100%',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: '15px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '8px',
    zIndex: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: '5px 10px',
    borderRadius: '10px',
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  lightbox: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(15, 11, 9, 0.95)',
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  fullImg: {
    maxWidth: '90%',
    maxHeight: '80vh',
    borderRadius: '24px',
    boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
    border: '2px solid #C5A880',
  },
  closeBtn: {
    position: 'absolute',
    top: '30px',
    right: '30px',
    fontSize: '3rem',
    color: 'rgba(255,255,255,0.7)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    lineHeight: 1,
  }
};

export default BrideGroom;