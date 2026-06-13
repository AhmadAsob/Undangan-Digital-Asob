import React from 'react';

const FlowerOrnament = ({ className }) => (
  <div className={className} style={styles.container}>
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 450 600" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={styles.svg}
      preserveAspectRatio="none"
    >
      {/* Garis Bingkai Utama di Pinggir Luar */}
      <g stroke="#C5A880" strokeWidth="1.5" opacity="0.75" fill="none">
        {/* Kiri Atas */}
        <path d="M5 120 L5 80 C5 30 30 5 80 5 L120 5" />
        <path d="M15 15 Q40 -5 65 20 Q90 45 65 70 Q40 95 15 70 Q-10 45 15 15" />
        
        {/* Kanan Atas */}
        <path d="M330 5 L370 5 C420 5 445 30 445 80 L445 120" />
        <path d="M435 15 Q410 -5 385 20 Q360 45 385 70 Q410 95 435 70 Q460 45 435 15" />
        
        {/* Kiri Bawah */}
        <path d="M5 480 L5 520 C5 570 30 595 80 595 L120 595" />
        <path d="M15 585 Q40 605 65 580 Q90 555 65 530 Q40 505 15 530 Q-10 555 15 585" />
        
        {/* Kanan Bawah */}
        <path d="M330 595 L370 595 C420 595 445 570 445 520 L445 480" />
        <path d="M435 585 Q410 605 385 580 Q360 555 385 530 Q410 505 435 530 Q460 555 435 585" />
      </g>

      {/* Garis Hubung Tipis di Sisi */}
      <path d="M120 5 L330 5 M120 595 L330 595 M5 120 L5 480 M445 120 L445 480" stroke="#C5A880" strokeWidth="0.5" opacity="0.4" />

      {/* Titik Dekoratif Utama */}
      <circle cx="225" cy="5" r="4" fill="#C5A880" opacity="0.8" />
      <circle cx="225" cy="595" r="4" fill="#C5A880" opacity="0.8" />
      <circle cx="5" cy="300" r="3" fill="#C5A880" opacity="0.6" />
      <circle cx="445" cy="300" r="3" fill="#C5A880" opacity="0.6" />
    </svg>
  </div>
);

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    pointerEvents: 'none',
  },
  svg: {
    width: '100%',
    height: '100%',
  }
};

export default FlowerOrnament;
