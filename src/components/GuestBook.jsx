import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FlowerOrnament from './FlowerOrnament';
import { supabase } from '../supabaseClient';
import { useLanguage } from '../context/LanguageContext';

const GuestBook = () => {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState({ name: '', text: '' });
  const [loading, setLoading] = useState(false);

  const getLocaleString = () => {
    switch (language) {
      case 'en': return 'en-US';
      case 'ko': return 'ko-KR';
      default: return 'id-ID';
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [language]); // Fetch ulang jika bahasa berubah untuk memperbarui format tanggal

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error fetching messages:', error);
    } else {
      const formattedMessages = data.map(msg => ({
        id: msg.id,
        name: msg.name,
        text: msg.text,
        date: new Date(msg.created_at).toLocaleDateString(getLocaleString(), {
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
          date: new Date(newMsg.created_at).toLocaleDateString(getLocaleString(), {
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
            <h2 className="font-script" style={styles.title}>{t('guestbook.title')}</h2>
            <p style={styles.subtitle}>{t('guestbook.subtitle')}</p>
          </div>

          <div style={styles.content}>
            <form onSubmit={handleSubmit} style={styles.form}>
              <input
                type="text"
                placeholder={t('guestbook.placeholderName')}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={styles.input}
              />
              <textarea
                placeholder={t('guestbook.placeholderMsg')}
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                style={{ ...styles.input, height: '120px', resize: 'none' }}
              ></textarea>

              {/* Mengubah button biasa menjadi motion.button premium */}
              <motion.button
                whileHover={loading ? {} : {
                  scale: 1.03,
                  boxShadow: '0 10px 25px rgba(255, 255, 255, 0.1)',
                  borderColor: 'rgba(255, 255, 255, 0.7)'
                }}
                whileTap={loading ? {} : { scale: 0.97 }}
                type="submit"
                style={{ ...styles.submitBtn, opacity: loading ? 0.6 : 1 }}
                disabled={loading}
              >
                {/* Ikon Paper Plane SVG */}
                <svg
                  style={styles.buttonIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
                {loading ? t('guestbook.sending') : t('guestbook.sendBtn')}
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
                      <span style={styles.msgDate}>{msg.date}</span>
                      <p style={styles.msgText}>{msg.text}</p>
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
    backgroundColor: 'var(--card-bg)',
    backdropFilter: 'blur(3px)',
    border: '1px solid var(--border-color)',
    borderRadius: '50px',
    boxShadow: 'var(--shadow)',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.5s ease',
  },
  header: {
    marginBottom: '3rem',
    position: 'relative',
    zIndex: 1,
  },
  title: {
    fontSize: '4.5rem',
    color: '#C5A880',
    marginBottom: '1rem',
  },
  subtitle: {
    color: 'var(--text-card-main)',
    fontSize: '1rem',
    lineHeight: '1.6',
    transition: 'all 0.5s ease',
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
    alignItems: 'center', // Membantu memusatkan tombol
  },
  input: {
    width: '100%',
    padding: '15px 20px',
    borderRadius: '15px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Sedikit lebih solid dari sebelumnya untuk visibilitas ketikan teks gelap
    fontSize: '1rem',
    outline: 'none',
    color: '#231E19',
    fontFamily: 'inherit',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
  },
  /* Perubahan gaya tombol menjadi Premium Dark Glassmorphic */
  submitBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    width: '100%',
    maxWidth: '280px',
    padding: '14px 0',
    background: 'linear-gradient(135deg, rgba(35, 30, 25, 0.7) 0%, rgba(15, 12, 10, 0.85) 100%)',
    color: '#FFFFFF',
    borderRadius: '30px',
    fontSize: '0.8rem',
    fontWeight: '600',
    border: '1px solid rgba(255, 255, 255, 0.45)',
    letterSpacing: '2px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
    marginTop: '10px',
  },
  buttonIcon: {
    width: '14px',
    height: '14px',
    color: '#ffffff',
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
    backgroundColor: 'var(--glass)',
    border: '1px solid var(--border-color)',
    textAlign: 'left',
    transition: 'all 0.5s ease',
  },
  msgName: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: 'var(--text-card-main)',
    marginBottom: '2px',
    display: 'block',
    transition: 'all 0.5s ease',
  },
  msgDate: {
    fontSize: '0.75rem',
    color: 'var(--text-card-muted)',
    marginBottom: '12px',
    display: 'block',
    transition: 'all 0.5s ease',
  },
  msgText: {
    fontSize: '0.95rem',
    color: 'var(--text-card-main)',
    lineHeight: '1.6',
    opacity: 0.9,
    transition: 'all 0.5s ease',
  },
};

export default GuestBook;