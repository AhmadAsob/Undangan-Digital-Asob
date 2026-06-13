import React from 'react';

const CornerSVG = () => (
  <svg width="90" height="90" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer luxury border lines */}
    <path d="M 8 8 L 90 8" stroke="#C5A880" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
    <path d="M 8 8 L 8 90" stroke="#C5A880" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
    
    {/* Inner parallel accent line */}
    <path d="M 16 16 L 70 16" stroke="#C5A880" strokeWidth="0.8" opacity="0.5" />
    <path d="M 16 16 L 16 70" stroke="#C5A880" strokeWidth="0.8" opacity="0.5" />
    
    {/* Elegant Art Deco concentric arcs */}
    <path d="M 8 20 C 25 20 38 33 38 50" stroke="#C5A880" strokeWidth="0.8" opacity="0.6" />
    <path d="M 20 8 C 20 25 33 38 50 38" stroke="#C5A880" strokeWidth="0.8" opacity="0.6" />
    
    {/* Stylized geometric leaf/flower pointing to the center */}
    <path d="M 8 8 Q 32 18 36 36 Q 18 32 8 8 Z" fill="none" stroke="#C5A880" strokeWidth="1" opacity="0.85" />
    <path d="M 8 8 L 26 26" stroke="#C5A880" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
    
    {/* Small solid gold details */}
    <circle cx="8" cy="8" r="3" fill="#C5A880" />
    <circle cx="26" cy="26" r="2" fill="#C5A880" />
    <circle cx="42" cy="16" r="1.5" fill="#C5A880" opacity="0.7" />
    <circle cx="16" cy="42" r="1.5" fill="#C5A880" opacity="0.7" />
  </svg>
);

const FlowerOrnament = () => {
  return (
    <div style={styles.container}>
      {/* Top Left Corner */}
      <div style={{ ...styles.corner, top: 0, left: 0 }}>
        <CornerSVG />
      </div>
      
      {/* Top Right Corner */}
      <div style={{ ...styles.corner, top: 0, right: 0, transform: 'rotate(90deg)' }}>
        <CornerSVG />
      </div>
      
      {/* Bottom Right Corner */}
      <div style={{ ...styles.corner, bottom: 0, right: 0, transform: 'rotate(180deg)' }}>
        <CornerSVG />
      </div>
      
      {/* Bottom Left Corner */}
      <div style={{ ...styles.corner, bottom: 0, left: 0, transform: 'rotate(270deg)' }}>
        <CornerSVG />
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 0,
  },
  corner: {
    position: 'absolute',
    width: '90px',
    height: '90px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
};

export default FlowerOrnament;
