import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FlowerOrnament from './FlowerOrnament';

const Gallery = () => {
  const [selectedImg, setSelectedImg] = useState(null);

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

  return (
    <section className="section-padding" style={styles.section}>
      <div className="container" style={styles.container}>
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

          {/* Menggunakan Masonry Layout murni (Foto utuh tidak akan terpotong) */}
          <div style={styles.masonryGrid}>
            {images.map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: (index % 4) * 0.15, duration: 0.8 }}
                whileHover="hover"
                onClick={() => setSelectedImg(src)}
                style={styles.frameWrapper}
              >
                {/* Frame Foto Utama */}
                <div style={styles.polaroidFrame}>
                  <div style={styles.imgContainer}>
                    <motion.img
                      variants={{
                        hover: { scale: 1.05 }
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      src={src}
                      alt={`Moment ${index + 1}`}
                      style={styles.img}
                      loading="lazy" // Tambahan: Optimasi loading gambar cloud
                    />

                    {/* Overlay halus saat kursor masuk */}
                    <motion.div
                      variants={{
                        hover: { opacity: 1 }
                      }}
                      transition={{ duration: 0.3 }}
                      style={styles.overlay}
                    >
                      <motion.span
                        variants={{
                          hover: { y: 0, opacity: 1 }
                        }}
                        initial={{ y: 10, opacity: 0 }}
                        style={styles.viewText}
                      >
                        LIHAT FOTO
                      </motion.span>
                    </motion.div>
                  </div>

                  {/* Kaki Bingkai */}
                  <div style={styles.frameFooter}>
                    {/* <span style={styles.frameDate}>MOMENT {String(index + 1).padStart(2, '0')}</span> */}
                  </div>
                </div>
              </motion.div>
            ))}
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

// Objek styles tetap sama seperti sebelumnya...
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
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    backdropFilter: 'blur(15px)',
    borderRadius: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative',
    border: '1px solid rgba(255,255,255,0.08)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '60px',
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
    color: 'rgba(255,255,255,0.6)',
    fontSize: '0.9rem',
    letterSpacing: '2px',
    maxWidth: '450px',
    margin: '0 auto',
    lineHeight: '1.6',
  },
  masonryGrid: {
    columnCount: 2,
    columnGap: '25px',
    width: '100%',
  },
  frameWrapper: {
    display: 'inline-block',
    width: '100%',
    marginBottom: '25px',
    breakInside: 'avoid',
    cursor: 'pointer',
  },
  polaroidFrame: {
    padding: '12px 12px 20px 12px',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    backdropFilter: 'blur(5px)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255,255,255,0.2)',
    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s',
  },
  imgContainer: {
    width: '100%',
    borderRadius: '10px',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  img: {
    width: '100%',
    height: 'auto',
    display: 'block',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to top, rgba(62, 39, 35, 0.4), rgba(141, 110, 99, 0.1))',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
  },
  viewText: {
    color: '#FFFFFF',
    fontSize: '0.75rem',
    fontWeight: '600',
    letterSpacing: '3px',
    borderBottom: '1px solid rgba(255,255,255,0.6)',
    paddingBottom: '4px',
  },
  frameFooter: {
    marginTop: '15px',
    textAlign: 'center',
  },
  frameDate: {
    fontSize: '0.7rem',
    color: 'rgba(255, 255, 255, 0.5)',
    letterSpacing: '4px',
    fontFamily: '"Inter", sans-serif',
    fontWeight: '400',
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