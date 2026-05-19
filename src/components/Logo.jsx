import { motion } from 'framer-motion';

const Logo = ({ size = 'medium', color = '#FFFFFF' }) => {
  const sizes = {
    small: { width: '70px' },
    medium: { width: '150px' },
    large: { width: '250px' }
  };

  const currentSize = sizes[size] || sizes.medium;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: currentSize.width,
        height: currentSize.width,
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
