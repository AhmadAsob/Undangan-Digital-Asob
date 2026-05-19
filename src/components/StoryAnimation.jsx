import { motion } from 'framer-motion';

const StoryAnimation = ({ onComplete }) => {
  // Kata yang akan dianimasikan per huruf
  const text = "Asob & Yola";
  const characters = text.split("");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
      style={styles.overlay}
      onAnimationComplete={() => {
        setTimeout(onComplete, 6500);
      }}
    >
      {/* Dark Subtle Overlay for Readability over Video */}
      <div style={styles.darkOverlay} />

      {/* Gold Dust Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            scale: 0,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
            y: "-=100",
            x: `+=${Math.sin(i) * 30}`
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
          style={styles.dust}
        />
      ))}

      <div style={styles.container}>
        {/* The Ethereal Heart */}
        <div style={styles.heartWrapper}>
          <svg width="200" height="200" viewBox="0 0 100 100">
            <defs>
              <filter id="gold-glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <motion.path
              d="M50 30 C50 10 10 10 10 40 C10 70 50 90 50 90 C50 90 90 70 90 40 C90 10 50 10 50 30"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 1, 0.3] }}
              transition={{ duration: 4, ease: "easeInOut" }}
            />
            <motion.path
              d="M50 30 C50 10 10 10 10 40 C10 70 50 90 50 90 C50 90 90 70 90 40 C90 10 50 10 50 30"
              fill="none"
              stroke="#FFF9C4"
              strokeWidth="2"
              filter="url(#gold-glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 3, delay: 0.5, ease: "circOut" }}
            />
          </svg>
        </div>

        {/* Cinematic Letter Reveal */}
        <div style={styles.textWrapper}>
          {characters.map((char, i) => (
            <motion.span
              key={i}
              initial={{
                opacity: 0,
                y: 40,
                rotateY: 90,
                scale: 0,
                filter: 'blur(20px)'
              }}
              animate={{
                opacity: 1,
                y: 0,
                rotateY: 0,
                scale: 1,
                filter: 'blur(0px)'
              }}
              transition={{
                delay: 1 + (i * 0.15),
                duration: 1.2,
                type: "spring",
                damping: 15,
                stiffness: 100
              }}
              style={styles.char}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>

        {/* Floating Line */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '100%', opacity: 1 }}
          transition={{ delay: 3, duration: 2 }}
          style={styles.line}
        />

        <motion.p
          initial={{ opacity: 0, letterSpacing: '20px' }}
          animate={{ opacity: 1, letterSpacing: '6px' }}
          transition={{ delay: 3.5, duration: 1.5 }}
          style={styles.tagline}
        >
          #AsobLockedInYola
        </motion.p>
      </div>
    </motion.div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  darkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.4)', // Subtle dark tint to show video behind
    zIndex: 1,
  },
  dust: {
    position: 'absolute',
    width: '2px',
    height: '2px',
    backgroundColor: '#FFFFFF',
    borderRadius: '50%',
    boxShadow: '0 0 10px #FFFFFF',
    pointerEvents: 'none',
    zIndex: 2,
  },
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 10,
  },
  heartWrapper: {
    marginBottom: '-20px',
    filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.4))',
  },
  textWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  char: {
    fontFamily: '"Alex Brush", cursive',
    fontSize: 'clamp(2.5rem, 8vw, 4rem)',
    color: '#FFFFFF',
    display: 'inline-block',
    textShadow: '0 0 30px rgba(255,255,255,0.6)',
    transformStyle: 'preserve-3d',
  },
  line: {
    height: '1px',
    background: 'linear-gradient(90deg, transparent, #FFFFFF, transparent)',
    marginTop: '20px',
    width: '250px',
  },
  tagline: {
    marginTop: '15px',
    fontSize: '0.7rem',
    color: '#FFFFFF',
    fontWeight: '300',
    opacity: 0.7,
    fontFamily: '"Inter", sans-serif',
  }
};

export default StoryAnimation;
