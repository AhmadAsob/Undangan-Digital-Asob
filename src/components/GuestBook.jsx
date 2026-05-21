import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FlowerOrnament from './FlowerOrnament';
import { supabase } from '../supabaseClient';

const GuestBook = () => {
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState({ name: '', text: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching messages:', error);
    } else {
      const formattedMessages = data.map(msg => ({
        id: msg.id,
        name: msg.name,
        text: msg.text,
        date: new Date(msg.created_at).toLocaleDateString('id-ID', {
          year: 'numeric', month: 'long', day: 'numeric'
        })
      }));
      setMessages(formattedMessages);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name && formData.text) {
      setLoading(true);
      const { data, error } = await supabase
        .from('guestbook')
        .insert([{ name: formData.name, text: formData.text }])
        .select();

      if (error) {
        console.error('Error inserting message:', error);
      } else if (data && data.length > 0) {
        const newMsg = data[0];
        const formattedNewMsg = {
          id: newMsg.id,
          name: newMsg.name,
          text: newMsg.text,
          date: new Date(newMsg.created_at).toLocaleDateString('id-ID', {
            year: 'numeric', month: 'long', day: 'numeric'
          })
        };
        setMessages([formattedNewMsg, ...messages]);
        setFormData({ name: '', text: '' });
      }
      setLoading(false);
    }
  };

  return (
    <section className="section-padding" style={styles.section}>
      <div className="container">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          style={styles.card}
        >
          {/* Flower Ornaments aligned with RSVP style */}
          <FlowerOrnament className="flower-corner flower-top-left" />
          <FlowerOrnament className="flower-corner flower-bottom-right" />

          <div style={styles.header}>
            <h2 className="font-script" style={styles.title}>Ucapan & Doa</h2>
            <p style={styles.subtitle}>Berikan ucapan manis dan doa restu Anda untuk mengiringi langkah baru kami.</p>
          </div>

          <div style={styles.content}>
            <form onSubmit={handleSubmit} style={styles.form}>
              <input
                type="text"
                placeholder="Nama Anda"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={styles.input}
              />
              <textarea
                placeholder="Berikan ucapan & doa..."
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                style={{ ...styles.input, height: '120px', resize: 'none' }}
              ></textarea>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                style={{ ...styles.submitBtn, opacity: loading ? 0.7 : 1 }}
                disabled={loading}
              >
                {loading ? 'Mengirim...' : 'Kirim Ucapan'}
              </motion.button>
            </form>

            <div style={styles.listWrapper}>
              <div style={styles.scrollArea}>
                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      style={styles.msgCard}
                    >
                      <h4 style={styles.msgName}>{msg.name}</h4>
                      <p style={styles.msgText}>{msg.text}</p>
                      <span style={styles.msgDate}>{msg.date}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
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
  header: {
    marginBottom: '3rem',
    position: 'relative',
    zIndex: 1,
  },
  title: {
    fontSize: '4.5rem',
    color: '#FFFFFF',
    marginBottom: '1rem',
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: '1rem',
    lineHeight: '1.6',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
    position: 'relative',
    zIndex: 1,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
  },
  input: {
    width: '100%',
    padding: '15px 20px',
    borderRadius: '12px',
    border: '1px solid #D7CCC8',
    backgroundColor: 'rgba(255,255,255,0.8)',
    fontSize: '1rem',
    outline: 'none',
    color: '#3E2723',
    fontFamily: 'inherit',
    transition: 'border-color 0.3s',
  },
  submitBtn: {
    marginTop: '10px',
    padding: '16px',
    backgroundColor: '#8D6E63',
    color: '#fff',
    borderRadius: '12px',
    fontSize: '1.1rem',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 8px 25px rgba(141, 110, 99, 0.25)',
  },
  listWrapper: {
    width: '100%',
    marginTop: '20px',
  },
  scrollArea: {
    maxHeight: '400px',
    overflowY: 'auto',
    paddingRight: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  msgCard: {
    padding: '20px',
    borderRadius: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    textAlign: 'left',
  },
  msgName: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: '5px',
    display: 'block',
  },
  msgDate: {
    fontSize: '0.75rem',
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: '10px',
    display: 'block',
  },
  msgText: {
    fontSize: '0.95rem',
    color: '#FFFFFF',
    lineHeight: '1.6',
    opacity: 0.9,
  },
};

export default GuestBook;
