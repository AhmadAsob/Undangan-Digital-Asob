import { motion } from 'framer-motion';

// Menggunakan prop 'variant' untuk menentukan gaya animasi
const Logo = ({ size = 'medium', color = '#FFFFFF', variant = 'floating' }) => {
  const sizes = {
    small: { width: '70px' },
    medium: { width: '150px' },
    large: { width: '250px' }
  };

  const currentSize = sizes[size] || sizes.medium;
  const isSpinning = variant === 'spin';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 10, rotateY: 0 }}
      animate={{
        opacity: 1,
        scale: [1, 1.04, 1],
        y: [0, -6, 0],
        // Berputar ke 360 derajat hanya jika variant-nya 'spin'
        rotateY: isSpinning ? 360 : 0
      }}
      transition={{
        opacity: { duration: 1.2, ease: "easeOut" },
        scale: {
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut"
        },
        y: {
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut"
        },
        // Transisi putaran koin
        rotateY: {
          repeat: isSpinning ? Infinity : 0,
          duration: 3,
          ease: "linear"
        }
      }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: currentSize.width,
        height: currentSize.width,
        perspective: 800,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 500 500"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="maskFilter">
            <feColorMatrix
              type="matrix"
              values="-10 0 0 0 9
                      -10 0 0 0 9
                      -10 0 0 0 9
                      1 0 0 0 0"
            />
            <feComponentTransfer>
              <feFuncR type="discrete" tableValues="0 1" />
              <feFuncG type="discrete" tableValues="0 1" />
              <feFuncB type="discrete" tableValues="0 1" />
            </feComponentTransfer>
          </filter>

          <mask id="logoMask">
            <image
              href="/logo1.png"
              width="500"
              height="500"
              style={{ filter: 'url(#maskFilter)' }}
            />
          </mask>
        </defs>

        <rect
          width="500"
          height="500"
          fill={color}
          mask="url(#logoMask)"
        />
      </svg>
    </motion.div>
  );
};

export default Logo;