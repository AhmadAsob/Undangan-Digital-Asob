import React from 'react';
import { motion } from 'framer-motion';
import FlowerOrnament from './FlowerOrnament'; // Menggunakan ornamen bunga yang sama
import { useLanguage } from '../context/LanguageContext';

const InstagramFilter = () => {
    const { t } = useLanguage();
    return (
        <section className="section-padding" style={styles.section}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    style={styles.card}
                >
                    {/* Flower Ornaments - Sama persis dengan EventDetails */}
                    <FlowerOrnament className="flower-corner flower-top-left" />
                    <FlowerOrnament className="flower-corner flower-bottom-right" />

                    {/* Header Section */}
                    <div style={styles.headerSection}>
                        <h2 className="font-script" style={styles.heading}>{t('instagram.title')}</h2>
                    </div>

                    {/* Content / Description Section */}
                    <div style={styles.eventsContainer}>
                        <div style={styles.eventRow}>
                            <div style={styles.eventLabel}>{t('instagram.label')}</div>
                            <div style={styles.eventDivider}></div>
                            <div style={styles.eventDetail}>
                                <div style={styles.description}>
                                    {t('instagram.desc')}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Button Section */}
                    <div style={styles.footerSection}>
                        <div style={styles.buttonGroup}>
                            <motion.a
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: '0 10px 25px rgba(212, 175, 55, 0.15)',
                                    borderColor: 'rgba(252, 252, 252, 0.7)'
                                }}
                                whileTap={{ scale: 0.95 }}
                                href="https://www.instagram.com/s/aGlnaGxpZ2h0OjE4MTIzNDgyMDU2NTY5MDE2?story_media_id=3903322561644227008&igsh=ZGpzOW01cXdheG54" // <--- ⚠️ PASTE link Sorotan Instagram Anda di sini
                                target="_blank"
                                rel="noreferrer"
                                style={styles.instagramButton}
                            >
                                {/* Ikon Kamera Instagram SVG */}
                                <svg
                                    style={styles.instagramIcon}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                </svg>
                                {t('instagram.btn')}
                            </motion.a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const styles = {
    section: {
        backgroundColor: 'transparent',
        position: 'relative',
    },
    card: {
        padding: 'clamp(60px, 10vw, 100px) 20px',
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'var(--card-bg)',
        backdropFilter: 'blur(5px)',
        borderRadius: '50px',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid var(--border-color)',
        transition: 'all 0.5s ease',
    },
    headerSection: {
        marginBottom: '3rem',
    },
    heading: {
        fontSize: 'clamp(3.5rem, 12vw, 5.5rem)',
        color: '#C5A880',
        marginBottom: '1rem',
    },
    eventsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        maxWidth: '600px',
        margin: '0 auto 3rem',
    },
    eventRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        textAlign: 'left',
    },
    eventLabel: {
        fontSize: '0.85rem',
        fontWeight: '700',
        color: 'var(--text-card-main)',
        letterSpacing: '3px',
        width: '120px',
        flexShrink: 0,
        transition: 'all 0.5s ease',
    },
    eventDivider: {
        height: '50px',
        width: '1px',
        backgroundColor: 'var(--border-color)',
        transition: 'all 0.5s ease',
    },
    eventDetail: {
        flex: 1,
    },
    description: {
        fontSize: '0.9rem',
        color: 'var(--text-card-main)',
        opacity: 0.8,
        letterSpacing: '0.5px',
        lineHeight: '1.5',
        transition: 'all 0.5s ease',
    },
    footerSection: {
        marginTop: '1rem',
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '14px',
        maxWidth: '280px',
        margin: '0 auto',
    },
    instagramButton: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
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
    },
    instagramIcon: {
        width: '16px',
        height: '16px',
        color: '#ffffffff',
    }
};

export default InstagramFilter;