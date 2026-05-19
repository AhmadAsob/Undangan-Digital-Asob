import { motion } from 'framer-motion';
import FlowerOrnament from './FlowerOrnament';

const LoveStory = () => {
  const stories = [
    {
      year: "2020",
      title: "Pertama Bertemu",
      desc: "Berawal dari pertemuan tak sengaja di sebuah perpustakaan kota, kami mulai mengenal satu sama lain."
    },
    {
      year: "2022",
      title: "Menjalin Kedekatan",
      desc: "Setelah dua tahun berteman baik, kami memutuskan untuk melangkah ke jenjang yang lebih serius."
    },
    {
      year: "2025",
      title: "Lamaran",
      desc: "Di depan keluarga besar, kami mengikat janji untuk saling menjaga dan melengkapi selamanya."
    }
  ];

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
            <h2 className="font-script" style={styles.title}>The Story</h2>
            <p style={styles.subtitle}>Perjalanan indah bagaimana Tuhan mempertemukan kami hingga ke titik ini.</p>
          </div>

          <div style={styles.timeline}>
            {stories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                style={styles.storyItem}
              >
                <div style={styles.yearBadge}>{story.year}</div>
                <h3 style={styles.storyTitle}>{story.title}</h3>
                <p style={styles.storyDesc}>{story.desc}</p>
                {index !== stories.length - 1 && <div style={styles.connector}></div>}
              </motion.div>
            ))}
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
    overflow: 'hidden',
  },
  card: {
    padding: 'clamp(40px, 8vw, 80px)',
    textAlign: 'center',
    maxWidth: '900px',
    margin: '0 auto',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(3px)',
    borderRadius: '50px',
    boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  header: {
    maxWidth: '600px',
    margin: '0 auto 60px',
    position: 'relative',
    zIndex: 1,
  },
  title: {
    fontSize: '4.5rem',
    color: '#FFFFFF',
    marginBottom: '2rem',
  },
  subtitle: {
    color: '#FFFFFF',
    lineHeight: '1.6',
  },
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '40px',
    position: 'relative',
    zIndex: 1,
  },
  storyItem: {
    maxWidth: '500px',
    position: 'relative',
    padding: '20px',
  },
  yearBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#FFFFFF',
    padding: '5px 20px',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: '700',
    display: 'inline-block',
    marginBottom: '15px',
    letterSpacing: '2px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  storyTitle: {
    fontFamily: '"Playfair Display", serif',
    fontSize: '1.8rem',
    color: '#FFFFFF',
    marginBottom: '10px',
  },
  storyDesc: {
    color: '#FFFFFF',
    lineHeight: '1.7',
    fontSize: '0.95rem',
    opacity: 0.9,
  },
  connector: {
    width: '1px',
    height: '40px',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    margin: '20px auto 0',
  }
};

export default LoveStory;
