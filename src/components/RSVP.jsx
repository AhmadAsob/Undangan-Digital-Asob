import { motion } from 'framer-motion';
import FlowerOrnament from './FlowerOrnament';

const RSVP = () => {
  return (
    <section className="section-padding" style={{backgroundColor: 'transparent'}}>
      <div className="container">
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          style={styles.card}
        >
          {/* Flower Ornaments */}
          <FlowerOrnament className="flower-corner flower-top-left" />
          <FlowerOrnament className="flower-corner flower-bottom-right" />

          <h2 style={styles.heading}>RSVP</h2>
          <p style={styles.text}>Kami sangat menantikan kehadiran Anda di hari bahagia kami.</p>
          
          <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
            <div style={styles.inputGroup}>
              <input type="text" placeholder="Nama Lengkap" style={styles.input} />
              <select style={styles.input}>
                <option value="">Konfirmasi Kehadiran</option>
                <option value="yes">Hadir</option>
                <option value="no">Tidak Hadir</option>
              </select>
            </div>
            <input type="number" placeholder="Jumlah Tamu" style={styles.input} />
            <textarea placeholder="Pesan & Doa" style={{...styles.input, height: '120px', resize: 'none'}}></textarea>
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={styles.button}
            >
              Kirim Konfirmasi
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

const styles = {
  card: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: 'clamp(40px, 8vw, 80px)',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(3px)',
    borderRadius: '50px',
    boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  heading: {
    fontSize: 'clamp(2rem, 5vw, 2.5rem)',
    color: '#FFFFFF',
    marginBottom: '1rem',
    position: 'relative',
    zIndex: 1,
  },
  text: {
    color: '#FFFFFF',
    marginBottom: '3rem',
    fontSize: '1rem',
    position: 'relative',
    zIndex: 1,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    position: 'relative',
    zIndex: 1,
  },
  inputGroup: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
  },
  input: {
    flex: 1,
    minWidth: '200px',
    padding: '15px 20px',
    borderRadius: '12px',
    border: '1px solid #D7CCC8',
    backgroundColor: 'rgba(255,255,255,0.8)',
    fontSize: '1rem',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.3s',
  },
  button: {
    marginTop: '10px',
    padding: '16px',
    backgroundColor: '#8D6E63',
    color: '#fff',
    borderRadius: '12px',
    fontSize: '1.1rem',
    fontWeight: '600',
    boxShadow: '0 8px 25px rgba(141, 110, 99, 0.25)',
  }
};

export default RSVP;
