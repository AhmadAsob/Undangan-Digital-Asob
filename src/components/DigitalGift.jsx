import { useState } from 'react';
import { motion } from 'framer-motion';
import FlowerOrnament from './FlowerOrnament';

const DigitalGift = () => {
  const [copied, setCopied] = useState(null);

  // Menambahkan properti logoUrl ke masing-masing objek bank
  const bankAccounts = [
    {
      name: 'Ahmad Shobari',
      bank: 'BCA',
      number: '7145112214',
      // Menggunakan logo putih/transparan agar serasi dengan desain tema Anda
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
            <h2 className="font-script" style={styles.title}>Wedding Gift</h2>
            <p style={styles.subtitle}>Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Anda ingin memberikan tanda kasih, Anda dapat memberikannya melalui:</p>
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
                {/* MENGGANTI TEKS MENJADI LOGO IMAGE */}
                <div style={styles.logoContainer}>
                  <img
                    src={acc.logoUrl}
                    alt={`Logo ${acc.bank}`}
                    style={styles.bankLogo}
                  />
                </div>

                <div style={styles.accountNumber}>{acc.number}</div>
                <div style={styles.accountHolder}>{acc.name}</div>

                <button
                  onClick={() => copyToClipboard(acc.number, acc.number)}
                  style={styles.copyBtn}
                >
                  {copied === acc.number ? 'Tersalin!' : 'Salin No. Rekening'}
                </button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={styles.addressBox}
          >
            <p style={styles.addressLabel}>Atau Kirim Kado Fisik Ke:</p>
            <p style={styles.addressText}>Jl. Ampera Komplek Kampung Baru Indah Blok BB.14, Lubuk begalung</p>

            <button
              onClick={() => copyToClipboard('Jl. Ampera Komplek Kampung Baru Indah Blok BB.14, Lubuk begalung', 'alamat')}
              style={{ ...styles.copyBtn, marginTop: '20px' }}
            >
              {copied === 'alamat' ? 'Tersalin!' : 'Salin Alamat'}
            </button>
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
    color: '#FFFFFF',
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
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(3px)',
    borderRadius: '50px',
    boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  giftCard: {
    padding: '30px',
    borderRadius: '25px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
    minWidth: '280px',
  },
  /* --- STYLING BARU UNTUK KONTEN LOGO BANK --- */
  logoContainer: {
    height: '45px', // Menjaga ketinggian area logo agar seimbang
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '5px',
  },
  bankLogo: {
    maxHeight: '100%',
    maxWidth: '140px',
    objectFit: 'contain',
    // Menggunakan filter brightness agar logo berwarna gelap bawaan terlihat jelas dan elegan di background transparan-gelap
    filter: 'brightness(0) invert(1)',
  },
  /* ------------------------------------------ */
  accountNumber: {
    fontSize: '1.6rem',
    fontWeight: '700',
    color: '#FFFFFF',
    margin: '10px 0',
    fontFamily: 'monospace',
  },
  accountHolder: {
    fontSize: '1rem',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  copyBtn: {
    padding: '12px 25px',
    backgroundColor: 'rgb(141, 110, 99)',
    color: '#FFFFFF',
    borderRadius: '30px',
    fontSize: '0.85rem',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '10px',
    boxShadow: '0 5px 15px rgba(141, 110, 99, 0.2)',
  },
  addressBox: {
    marginTop: '40px',
    padding: '30px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '20px',
    maxWidth: '500px',
    margin: '40px auto 0',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  addressLabel: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: '10px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  addressText: {
    color: '#FFFFFF',
    lineHeight: '1.6',
    opacity: 0.9,
  }
};

export default DigitalGift;