import { motion } from 'framer-motion';

const StoryAnimation = ({ onComplete }) => {
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
      <div style={styles.darkOverlay} />

      {/* Partikel Debu Emas */}
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

        {/* --- ANIMASI LOGO YANG TERBENTUK --- */}
        <motion.div
          style={styles.logoWrapper}
          initial={{
            opacity: 0,
            scale: 0.5,
            rotateY: -180,
            filter: 'blur(20px)'
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotateY: 0,
            filter: 'blur(0px)'
          }}
          transition={{
            duration: 2.5,
            ease: [0.16, 1, 0.3, 1] // Custom out-expo ease
          }}
        >
          <svg width="180" height="180" viewBox="0 0 500 500">
            <defs>
              {/* Filter untuk memproses PNG menjadi satu warna (Masking) */}
              <filter id="maskFilterStory">
                <feColorMatrix
                  type="matrix"
                  values="-10 0 0 0 9
                          -10 0 0 0 9
                          -10 0 0 0 9
                          1 0 0 0 0"
                />
              </filter>

              <mask id="logoMaskStory">
                <image
                  href="/logo1.png"
                  width="500"
                  height="500"
                  style={{ filter: 'url(#maskFilterStory)' }}
                />
              </mask>

              {/* Efek Kilauan (Shine) */}
              <linearGradient id="shineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.8)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
            </defs>

            {/* Background Logo (Warna Putih/Emas) */}
            <rect
              width="500"
              height="500"
              fill="#FFFFFF"
              mask="url(#logoMaskStory)"
            />

            {/* Efek Cahaya Lewat di Atas Logo */}
            <motion.rect
              width="500"
              height="500"
              fill="url(#shineGradient)"
              mask="url(#logoMaskStory)"
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: '100%', opacity: 0.5 }}
              transition={{ delay: 2, duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
            />
          </svg>
        </motion.div>
        {/* --- END LOGO --- */}

        {/* Cinematic Letter Reveal */}
        <div style={styles.textWrapper}>
          {characters.map((char, i) => (
            <motion.span
              key={i}
              initial={{
                opacity: 0,
                y: 20,
                rotateY: 90,
                filter: 'blur(10px)'
              }}
              animate={{
                opacity: 1,
                y: 0,
                rotateY: 0,
                filter: 'blur(0px)'
              }}
              transition={{
                delay: 1.5 + (i * 0.1), // Delay disesuaikan agar logo muncul duluan
                duration: 1,
                ease: "easeOut"
              }}
              style={styles.char}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>

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
    background: 'radial-gradient(circle, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)',
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
    perspective: '1000px',
  },
  logoWrapper: {
    marginBottom: '10px',
    filter: 'drop-shadow(0 0 25px rgba(255,255,255,0.5))',
    transformStyle: 'preserve-3d',
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
    textShadow: '0 0 30px rgba(255,255,255,0.5)',
  },
  line: {
    height: '1px',
    background: 'linear-gradient(90deg, transparent, #FFFFFF, transparent)',
    marginTop: '10px',
    width: '250px',
  },
  tagline: {
    marginTop: '15px',
    fontSize: '0.75rem',
    color: '#FFFFFF',
    fontWeight: '300',
    letterSpacing: '4px',
    fontFamily: '"Inter", sans-serif',
  }
};

export default StoryAnimation;