import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TARGET_DATE = new Date('2026-10-03T08:00:00').getTime();

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = TARGET_DATE - now;

      if (distance < 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const items = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds }
  ];

  return (
    <div style={styles.container}>
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-script"
        style={styles.title}
      >
        Count The Date
      </motion.h2>

      <div style={styles.grid}>
        {items.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            style={styles.item}
          >
            <div style={styles.value}>{item.value < 10 ? `0${item.value}` : item.value}</div>
            <div style={styles.label}>{item.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Save to Calendar Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        style={styles.btnWrapper}
      >
        <motion.a
          whileHover={{
            scale: 1.05,
            boxShadow: '0 10px 25px rgba(255, 255, 255, 0.1)',
            borderColor: 'rgba(255, 255, 255, 0.7)'
          }}
          whileTap={{ scale: 0.95 }}
          href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+Asob+%26+Yola&dates=20261003T080000Z/20261003T140000Z&details=Selamat+datang+di+pernikahan+kami!&location=Gedung+Pertemuan+SMKN+2+Padang"
          target="_blank"
          rel="noreferrer"
          style={styles.linkButton}
        >
          {/* Ikon Kalender SVG */}
          <svg
            style={styles.buttonIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          SIMPAN KALENDER
        </motion.a>
      </motion.div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '30px',
  },
  title: {
    fontSize: '4.5rem',
    color: '#C5A880',
    marginBottom: '2rem',
  },
  grid: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    flexWrap: 'wrap',
  },
  item: {
    width: '75px',
    height: '95px',
    backgroundColor: 'rgba(197, 168, 128, 0.12)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(197, 168, 128, 0.35)',
  },
  value: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: '"Playfair Display", serif',
  },
  label: {
    fontSize: '0.65rem',
    color: '#C5A880',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginTop: '5px',
  },
  btnWrapper: {
    marginTop: '10px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
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

export default Countdown;