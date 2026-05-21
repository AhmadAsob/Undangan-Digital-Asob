import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Countdown = () => {
  const targetDate = new Date('2026-10-03T08:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

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
  }, [targetDate]);

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
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+Asob+%26+Yola&dates=20261003T080000Z/20261003T140000Z&details=Selamat+datang+di+pernikahan+kami!&location=Gedung+Pertemuan+SMKN+2+Padang"
          target="_blank"
          rel="noreferrer"
          style={styles.linkButton}
        >
          Simpan Kalender
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
    color: '#FFFFFF',
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
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 25px rgba(0,0,0,0.05)',
    border: '1px solid rgba(141, 110, 99, 0.1)',
  },
  value: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#3E2723',
    fontFamily: '"Playfair Display", serif',
  },
  label: {
    fontSize: '0.65rem',
    color: '#8D6E63',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginTop: '5px',
  },
  btnWrapper: {
    marginTop: '10px',
  },
  linkButton: {
    padding: '12px 25px',
    backgroundColor: 'rgb(141, 110, 99)',
    color: '#fff',
    borderRadius: '30px',
    fontWeight: '600',
    fontSize: '0.85rem',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    minWidth: '160px',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
  }
};

export default Countdown;
