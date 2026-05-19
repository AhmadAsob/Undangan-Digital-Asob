import { motion } from 'framer-motion';

const FloatingParticles = () => {
  // Membuat 15 partikel acak
  const particles = Array.from({ length: 15 });

  return (
    <div style={styles.container}>
      {particles.map((_, i) => (
        <motion.div
          key={i}
          style={{
            ...styles.particle,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 0.5, 0],
            scale: [0, Math.random() * 1.5, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 1,
    overflow: 'hidden',
  },
  particle: {
    position: 'absolute',
    width: '4px',
    height: '4px',
    backgroundColor: '#FFFFFF',
    borderRadius: '50%',
    filter: 'blur(1px)',
    boxShadow: '0 0 10px #FFFFFF',
  }
};

export default FloatingParticles;
