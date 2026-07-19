import { useState } from 'react';
import { motion } from 'framer-motion';
import FlowerOrnament from './FlowerOrnament';
import { useLanguage } from '../context/LanguageContext';

const DigitalGift = () => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(null);

  const bankAccounts = [
    {
      name: 'Ahmad Shobari',
      bank: 'BCA',
      number: '7145112214',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg'
    },
    {
      name: 'Yolanda Azzahra',
      bank: 'Mandiri',
      number: '1110021433384',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg'
    }
  ];

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section className="section-padding" style={styles.section}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={styles.card}
        >
          <FlowerOrnament />
          <div style={styles.header}>
            <h2 className="font-script" style={styles.title}>{t('gift.title')}</h2>
            <p style={styles.subtitle}>
              {t('gift.subtitle')}
            </p>
          </div>

          <div style={styles.grid}>
            {bankAccounts.map((acc, index) => (
              <motion.div
                key={acc.number}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                style={styles.giftCard}
              >
                <div style={styles.logoContainer}>
                  <img
                    src={acc.logoUrl}
                    alt={`Logo ${acc.bank}`}
                    style={styles.bankLogo}
                  />
                </div>

                <div style={styles.accountNumber}>{acc.number}</div>
                <div style={styles.accountHolder}>{acc.name}</div>

                {/* Mengubah button biasa menjadi motion.button premium */}
                <motion.button
                  whileHover={{
                    scale: 1.03,
                    boxShadow: '0 10px 25px rgba(255, 255, 255, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.7)'
                  }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => copyToClipboard(acc.number, acc.number)}
                  style={styles.copyBtn}
                >
                  <svg
                    style={styles.buttonIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  {copied === acc.number ? t('gift.copied') : t('gift.copyBtn')}
                </motion.button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={styles.addressBox}
          >
            <p style={styles.addressLabel}>{t('gift.physical')}</p>
            <p style={styles.addressText}>Jl. Ampera Komplek Kampung Baru Indah Blok BB.14, Lubuk begalung</p>

            {/* Mengubah button alamat menjadi motion.button premium */}
            <motion.button
              whileHover={{
                scale: 1.03,
                boxShadow: '0 10px 25px rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(255, 255, 255, 0.7)'
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => copyToClipboard('Jl. Ampera Komplek Kampung Baru Indah Blok BB.14, Lubuk begalung', 'alamat')}
              style={styles.addressCopyBtn}
            >
              <svg
                style={styles.buttonIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              {copied === 'alamat' ? t('gift.copied') : t('gift.copyAddress')}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    position: 'relative',
  },
  header: {
    maxWidth: '600px',
    margin: '0 auto 50px',
  },
  title: {
    fontSize: '4.5rem',
    color: '#C5A880',
    marginBottom: '1rem',
  },
  subtitle: {
    color: '#FFFFFF',
    lineHeight: '1.6',
    opacity: 0.9,
  },
  grid: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    flexWrap: 'wrap',
    marginBottom: '50px',
  },
  card: {
    padding: 'clamp(40px, 8vw, 80px)',
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: 'var(--card-bg)',
    backdropFilter: 'blur(3px)',
    border: '1px solid var(--border-color)',
    borderRadius: '50px',
    boxShadow: 'var(--shadow)',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.5s ease',
  },
  giftCard: {
    padding: '30px',
    borderRadius: '25px',
    backgroundColor: 'var(--card-bg)',
    border: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
    minWidth: '280px',
    transition: 'all 0.5s ease',
  },
  logoContainer: {
    height: '45px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '5px',
  },
  bankLogo: {
    maxHeight: '100%',
    maxWidth: '140px',
    objectFit: 'contain',
    filter: 'var(--logo-filter)',
    transition: 'filter 0.5s ease',
  },
  accountNumber: {
    fontSize: '1.6rem',
    fontWeight: '700',
    color: 'var(--text-card-main)',
    margin: '10px 0',
    fontFamily: 'monospace',
    transition: 'all 0.5s ease',
  },
  accountHolder: {
    fontSize: '1rem',
    color: 'var(--text-card-main)',
    opacity: 0.9,
    transition: 'all 0.5s ease',
  },
  /* Perubahan gaya tombol utama biar serasi (Premium Dark Glassmorphic) */
  copyBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    maxWidth: '220px',
    padding: '12px 0',
    background: 'linear-gradient(135deg, rgba(35, 30, 25, 0.7) 0%, rgba(15, 12, 10, 0.85) 100%)',
    color: '#FFFFFF',
    borderRadius: '30px',
    fontSize: '0.8rem',
    fontWeight: '600',
    border: '1px solid rgba(255, 255, 255, 0.45)',
    letterSpacing: '1.5px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
    marginTop: '10px',
  },
  addressBox: {
    marginTop: '40px',
    padding: '30px',
    backgroundColor: 'var(--glass)',
    borderRadius: '20px',
    maxWidth: '500px',
    margin: '40px auto 0',
    border: '1px solid var(--border-color)',
    transition: 'all 0.5s ease',
  },
  addressLabel: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: 'var(--text-card-main)',
    marginBottom: '10px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    transition: 'all 0.5s ease',
  },
  addressText: {
    color: 'var(--text-card-main)',
    lineHeight: '1.6',
    opacity: 0.9,
    transition: 'all 0.5s ease',
  },
  /* Tombol salin alamat mewarisi style utama dengan tambahan margin atas */
  addressCopyBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    maxWidth: '220px',
    padding: '12px 0',
    background: 'linear-gradient(135deg, rgba(35, 30, 25, 0.7) 0%, rgba(15, 12, 10, 0.85) 100%)',
    color: '#FFFFFF',
    borderRadius: '30px',
    fontSize: '0.8rem',
    fontWeight: '600',
    border: '1px solid rgba(255, 255, 255, 0.45)',
    letterSpacing: '1.5px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
    marginTop: '20px',
  },
  buttonIcon: {
    width: '14px',
    height: '14px',
    color: '#ffffff',
  }
};

export default DigitalGift;