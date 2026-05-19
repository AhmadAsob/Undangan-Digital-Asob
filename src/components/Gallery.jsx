import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FlowerOrnament from './FlowerOrnament';

const Gallery = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  const images = [
    "/assets/images/gallery/850_1569.JPG",
    "/assets/images/gallery/850_1607.JPG",
    "/assets/images/gallery/850_1644.JPG",
    "/assets/images/gallery/Z52_4966.JPG",
    "/assets/images/gallery/Z52_4986.JPG",
    "/assets/images/gallery/Z52_5015.JPG",
    "/assets/images/gallery/Z52_5105.JPG",
    "/assets/images/gallery/Z52_5119.JPG",
    "/assets/images/gallery/Z52_5186.JPG",
    "/assets/images/gallery/Z52_5191.JPG",
    "/assets/images/gallery/Z52_5209.JPG",
    "/assets/images/gallery/Z52_5271.JPG",
    "/assets/images/gallery/Z52_5278.JPG",
    "/assets/images/gallery/Z52_5303.JPG",
    "/assets/images/gallery/Z52_5346.JPG",
    "/assets/images/gallery/Z52_5377.JPG",
    "/assets/images/gallery/Z52_5399.JPG",
    "/assets/images/gallery/Z52_5413.JPG",
    "/assets/images/gallery/Z52_5425.JPG"
  ];

  return (
    <section className="section-padding" style={styles.section}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
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
              Our Gallery
            </motion.h2>
            <div style={styles.line}></div>
            <p style={styles.subtitle}>Mengabadikan setiap detik kebersamaan dalam harmoni visual.</p>
          </div>

          <div style={styles.masonryGrid}>
            {images.map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 10) * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedImg(src)}
                style={styles.imgWrapper}
              >
                <img src={src} alt={`Moment ${index + 1}`} style={styles.img} />
                <div style={styles.overlay}>
                  <span style={styles.zoomIcon}>VIEW</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

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
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selectedImg}
              style={styles.fullImg}
            />
            <button style={styles.closeBtn}>×</button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const styles = {
  section: {
    padding: '60px 0',
    backgroundColor: 'transparent',
    position: 'relative',
  },
  card: {
    padding: '80px 15px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(10px)',
    borderRadius: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '50px',
  },
  title: {
    fontSize: '4.5rem',
    color: '#FFFFFF',
    marginBottom: '10px',
  },
  line: {
    width: '50px',
    height: '2px',
    backgroundColor: 'rgb(141, 110, 99)',
    margin: '0 auto 15px',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: '0.9rem',
    letterSpacing: '1px',
    maxWidth: '450px',
    margin: '0 auto',
  },
  masonryGrid: {
    columnCount: 2,
    columnGap: '15px',
    width: '100%',
  },
  imgWrapper: {
    display: 'inline-block',
    width: '100%',
    marginBottom: '15px',
    borderRadius: '15px',
    overflow: 'hidden',
    cursor: 'pointer',
    position: 'relative',
    border: '1px solid rgba(255,255,255,0.1)',
    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
    breakInside: 'avoid',
  },
  img: {
    width: '100%',
    height: 'auto',
    display: 'block',
    transition: 'transform 0.5s ease',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(141, 110, 99, 0.2)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  zoomIcon: {
    color: '#fff',
    fontSize: '0.7rem',
    fontWeight: '700',
    letterSpacing: '2px',
    border: '1px solid rgba(255,255,255,0.5)',
    padding: '6px 15px',
    borderRadius: '20px',
    backdropFilter: 'blur(3px)',
  },
  lightbox: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.95)',
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  fullImg: {
    maxWidth: '95%',
    maxHeight: '90vh',
    borderRadius: '8px',
  },
  closeBtn: {
    position: 'absolute',
    top: '30px',
    right: '30px',
    fontSize: '2.5rem',
    color: '#fff',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  }
};

export default Gallery;
