import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import FlowerOrnament from './FlowerOrnament';
import { useLanguage } from '../context/LanguageContext';

const Gallery = () => {
  const { t } = useLanguage();
  const [selectedImg, setSelectedImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const thumbnailRefs = useRef([]);
  const thumbnailContainerRef = useRef(null);
  const frameRef = useRef(null);

  // Parallax halus pada frame foto saat discroll
  const { scrollYProgress: frameScrollProgress } = useScroll({ target: frameRef, offset: ['start end', 'end start'] });
  const frameParallaxY = useTransform(frameScrollProgress, [0, 1], [-16, 16]);

  // Base URL dari folder lokal assets Anda
  const BASE_URL = "/assets/images/gallery/";

  // Daftar nama file gambar yang ada di folder lokal (case-sensitive)
  const filenames = [
    "850_1569.JPG",
    "850_1607.JPG",
    "850_1644.JPG",
    "Z52_4966.JPG",
    "Z52_4986.JPG",
    "Z52_5015.JPG",
    "Z52_5105.JPG",
    "Z52_5119.JPG",
    "Z52_5186.JPG",
    "Z52_5191.JPG",
    "Z52_5209.JPG",
    "Z52_5271.JPG",
    "Z52_5278.JPG",
    "Z52_5303.JPG",
    "Z52_5346.JPG",
    "Z52_5377.JPG",
    "Z52_5399.JPG",
    "Z52_5413.JPG",
    "Z52_5425.JPG"
  ];

  // Menggabungkan base URL dengan nama file
  const images = filenames.map(name => `${BASE_URL}${name}`);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImg) return; // Disable slider keys when lightbox is active
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, selectedImg]);

  // Scroll active thumbnail into view inside its container (without scrolling the main page)
  useEffect(() => {
    const container = thumbnailContainerRef.current;
    const activeThumbnail = thumbnailRefs.current[currentIndex];
    
    if (currentIndex === 0 && container) {
      container.scrollLeft = 0;
      return;
    }

    if (container && activeThumbnail) {
      const containerLeft = container.getBoundingClientRect().left;
      const thumbnailLeft = activeThumbnail.getBoundingClientRect().left;
      const scrollOffset = thumbnailLeft - containerLeft - (container.clientWidth / 2) + (activeThumbnail.clientWidth / 2);
      
      container.scrollBy({
        left: scrollOffset,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 2,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.4 },
      },
    },
    exit: (dir) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
      zIndex: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.4 },
      },
    }),
  };

  // Decorative corners for the frame
  const CornerDecor = () => (
    <>
      <div style={{...styles.cornerLine, top: 12, left: 12, borderTop: '2px solid #E6C387', borderLeft: '2px solid #E6C387'}} />
      <div style={{...styles.cornerLine, top: 12, right: 12, borderTop: '2px solid #E6C387', borderRight: '2px solid #E6C387'}} />
      <div style={{...styles.cornerLine, bottom: 12, left: 12, borderBottom: '2px solid #E6C387', borderLeft: '2px solid #E6C387'}} />
      <div style={{...styles.cornerLine, bottom: 12, right: 12, borderBottom: '2px solid #E6C387', borderRight: '2px solid #E6C387'}} />
    </>
  );

  return (
    <section className="section-padding" style={styles.section}>
      <div className="container" style={styles.container}>
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={styles.card}
        >
          <FlowerOrnament />
          <div style={styles.header}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="font-script"
              style={styles.title}
            >
              {t('gallery.title')}
            </motion.h2>
            <div style={styles.line}></div>
            <p style={styles.subtitle}>{t('gallery.subtitle')}</p>
          </div>

          {/* Interactive Slider Container */}
          <div style={styles.sliderContainer}>
            {/* The gold-bordered frame wrapper (dengan efek parallax saat scroll) */}
            <motion.div ref={frameRef} style={{ ...styles.frameOuter, y: frameParallaxY }}>
              {/* Corner decorations */}
              <CornerDecor />

              <div style={styles.sliderWrapper}>
                {/* Blurred background image */}
                <AnimatePresence initial={false} custom={direction}>
                  <motion.img
                    key={`bg-${currentIndex}`}
                    src={images[currentIndex]}
                    style={styles.blurredBg}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>

                {/* Main Image (dengan animasi Ken Burns halus saat diam) */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                  style={styles.mainImgWrapper}
                >
                  <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.img
                      key={currentIndex}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.6}
                      onDragEnd={handleDragEnd}
                      onClick={() => setSelectedImg(images[currentIndex])}
                      src={images[currentIndex]}
                      alt={`Moment ${currentIndex + 1}`}
                      style={styles.mainImg}
                    />
                  </AnimatePresence>
                </motion.div>

                {/* Slide Counter */}
                <div style={styles.counterBadge}>
                  <span style={styles.counterCurrent}>{String(currentIndex + 1).padStart(2, '0')}</span>
                  <span style={styles.counterDivider}>/</span>
                  <span style={styles.counterTotal}>{String(images.length).padStart(2, '0')}</span>
                </div>

                {/* Navigation Buttons */}
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(18, 14, 11, 0.9)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrev}
                  style={{...styles.navButton, left: '15px'}}
                  aria-label="Previous slide"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E6C387" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(18, 14, 11, 0.9)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  style={{...styles.navButton, right: '15px'}}
                  aria-label="Next slide"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E6C387" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </motion.button>
              </div>
            </motion.div>

            {/* Thumbnail Scrollbar */}
            <div ref={thumbnailContainerRef} style={styles.thumbnailContainer} className="no-scrollbar">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  ref={el => thumbnailRefs.current[idx] = el}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  style={{
                    ...styles.thumbnailWrapper,
                    border: idx === currentIndex ? '2px solid #E6C387' : '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: idx === currentIndex ? '0 0 10px rgba(230, 195, 137, 0.4)' : 'none',
                    opacity: idx === currentIndex ? 1 : 0.4,
                    transform: idx === currentIndex ? 'scale(1.05)' : 'scale(1)',
                  }}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} style={styles.thumbnailImg} />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox Pop-up */}
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
    padding: '80px 0',
    backgroundColor: 'transparent',
    position: 'relative',
  },
  container: {
    padding: '0 15px',
  },
  card: {
    padding: 'clamp(40px, 6vw, 80px) clamp(15px, 4vw, 40px)',
    backgroundColor: 'var(--card-bg)',
    backdropFilter: 'blur(15px)',
    borderRadius: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative',
    border: '1px solid var(--border-color)',
    transition: 'all 0.5s ease',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  title: {
    fontSize: 'clamp(3.5rem, 7vw, 4.5rem)',
    color: '#C5A880',
    marginBottom: '10px',
  },
  line: {
    width: '60px',
    height: '1px',
    backgroundColor: 'rgba(141, 110, 99, 0.6)',
    margin: '0 auto 20px',
  },
  subtitle: {
    color: 'var(--text-card-muted)',
    fontSize: '0.9rem',
    letterSpacing: '2px',
    maxWidth: '450px',
    margin: '0 auto',
    lineHeight: '1.6',
    transition: 'all 0.5s ease',
  },
  sliderContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    width: '100%',
  },
  frameOuter: {
    position: 'relative',
    padding: '12px',
    borderRadius: '24px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--glass)',
    boxShadow: 'var(--shadow)',
    transition: 'all 0.5s ease',
  },
  cornerLine: {
    position: 'absolute',
    width: '16px',
    height: '16px',
    pointerEvents: 'none',
    zIndex: 3,
  },
  sliderWrapper: {
    position: 'relative',
    width: '100%',
    height: 'clamp(320px, 55vh, 480px)',
    borderRadius: '16px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0807',
    border: '1px solid rgba(230, 195, 135, 0.1)',
  },
  blurredBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'blur(20px) brightness(0.2)',
    transform: 'scale(1.15)',
    zIndex: 0,
    pointerEvents: 'none',
  },
  mainImgWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  mainImg: {
    position: 'absolute',
    maxWidth: '90%',
    maxHeight: '90%',
    objectFit: 'contain',
    cursor: 'zoom-in',
    userSelect: 'none',
    WebkitUserDrag: 'none',
  },
  counterBadge: {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    backgroundColor: 'rgba(18, 14, 11, 0.75)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(230, 195, 137, 0.3)',
    borderRadius: '30px',
    padding: '6px 14px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    zIndex: 10,
    fontFamily: '"Playfair Display", serif',
  },
  counterCurrent: {
    color: '#E6C387',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    letterSpacing: '1px',
  },
  counterDivider: {
    color: 'rgba(230, 195, 137, 0.4)',
    fontSize: '0.8rem',
  },
  counterTotal: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '0.8rem',
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    backgroundColor: 'rgba(18, 14, 11, 0.65)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(230, 195, 137, 0.35)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    zIndex: 10,
    outline: 'none',
  },
  thumbnailContainer: {
    display: 'flex',
    gap: '12px',
    overflowX: 'auto',
    padding: '12px 4px',
    marginTop: '20px',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    scrollBehavior: 'smooth',
  },
  thumbnailWrapper: {
    flexShrink: 0,
    width: '70px',
    height: '70px',
    borderRadius: '10px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  thumbnailImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  lightbox: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(15, 11, 9, 0.98)',
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  fullImg: {
    maxWidth: '95%',
    maxHeight: '85vh',
    borderRadius: '16px',
    boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
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

export default Gallery;