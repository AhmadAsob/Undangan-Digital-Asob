import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import WelcomeOverlay from './components/WelcomeOverlay';
import Hero from './components/Hero';
import EventDetails from './components/EventDetails';
import InstagramFilter from './components/InstagramFilter';
import Gallery from './components/Gallery';
import Logo from './components/Logo';
import Quote from './components/Quote';
import BrideGroom from './components/BrideGroom';
import Countdown from './components/Countdown';
import DigitalGift from './components/DigitalGift';
import GuestBook from './components/GuestBook';
import FloatingParticles from './components/FloatingParticles';
import StoryAnimation from './components/StoryAnimation';
import LoveStory from './components/LoveStory';
import Closing from './components/Closing';
import FloatingMenu from './components/FloatingMenu';
import ThemeLanguageSelector from './components/ThemeLanguageSelector';
import { useLanguage } from './context/LanguageContext';
import './App.css';

function App() {
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll();
  const bgParallaxScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const [step, setStep] = useState('welcome');
  const [showStory, setShowStory] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);
  const [showHero, setShowHero] = useState(true);
  const [showSkip, setShowSkip] = useState(false);
  const [guestName, setGuestName] = useState('');
  const videoRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to');
    if (to) {
      setGuestName(to);
    }
  }, []);

  const handleStart = () => {
    setStep('cinematic');
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = false;
      videoRef.current.play().catch(e => console.log("Playback failed:", e));
    }
  };

  const handleSkipOrComplete = () => {
    setStep('invitation');
  };

  const handleOpenDetails = () => {
    setShowHero(false);
    setTimeout(() => {
      setShowStory(true);
    }, 600);
  };

  const handleStoryComplete = () => {
    setShowStory(false);
    setShowMainContent(true);
  };

  useEffect(() => {
    if (step === 'cinematic') {
      const timer = setTimeout(() => {
        setShowSkip(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleFullscreen = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitEnterFullscreen) {
        video.webkitEnterFullscreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      }
    }
  };

  useEffect(() => {
    const resumeVideo = () => {
      if (videoRef.current) {
        const video = videoRef.current;
        const attempts = [100, 500, 1000];
        attempts.forEach(delay => {
          setTimeout(() => {
            if (video.paused) {
              video.play().catch(e => {
                console.log(`Attempt at ${delay}ms failed:`, e);
                if (delay === 1000) {
                  video.muted = true;
                  video.play().catch(err => console.log("Final attempt failed:", err));
                }
              });
            }
          }, delay);
        });
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        resumeVideo();
      }
    };

    const handleWebkitEndFullscreen = () => {
      resumeVideo();
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('webkitendfullscreen', handleWebkitEndFullscreen);
    }

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      if (videoElement) {
        videoElement.removeEventListener('webkitendfullscreen', handleWebkitEndFullscreen);
      }
    };
  }, []);

  return (
    <div className="App">
      <ThemeLanguageSelector />
      <AnimatePresence mode="wait">
        {step === 'welcome' && (
          <WelcomeOverlay key="welcome" onEnter={handleStart} guestName={guestName} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showStory && (
          <StoryAnimation key="story" onComplete={handleStoryComplete} />
        )}
      </AnimatePresence>

      <div
        style={{
          ...styles.videoContainer,
          zIndex: step === 'cinematic' ? 3000 : 0,
          backgroundColor: '#120e0b',
          display: step === 'welcome' ? 'none' : 'block'
        }}
      >
        <motion.video
          ref={videoRef}
          loop
          playsInline
          onEnded={() => {
            if (step === 'cinematic') handleSkipOrComplete();
          }}
          style={{ ...styles.video, scale: step === 'invitation' ? bgParallaxScale : 1 }}
        >
          <source src="/assets/prewed-video.mp4" type="video/mp4" />
        </motion.video>

        {step === 'invitation' && <div style={styles.overlay}></div>}

        <AnimatePresence>
          {step === 'cinematic' && (
            <>
              {/* Tombol Fullscreen Premium */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 10px 25px rgba(255, 255, 255, 0.1)',
                  borderColor: 'rgba(255, 255, 255, 0.7)'
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFullscreen}
                style={styles.fullscreenBtn}
              >
                <span style={{ fontSize: '1rem', lineHeight: '1' }}>⛶</span>
              </motion.button>

              {/* Tombol Lewati Video Premium */}
              {showSkip && (
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 10px 25px rgba(255, 255, 255, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.7)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSkipOrComplete}
                  style={styles.skipButton}
                >
                  {t('hero.skip')} <span style={styles.arrow}>→</span>
                </motion.button>
              )}
            </>
          )}
        </AnimatePresence>
      </div>

      {step === 'invitation' && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={styles.mainContent}
        >
          {showMainContent && (
            <div style={styles.stickyHeader}>
              <Logo size="small" color="var(--gold)" variant="spin" />
            </div>
          )}

          <div className="container">
            <AnimatePresence mode="wait">
              {!showMainContent && showHero ? (
                <motion.div
                  key="hero-section"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                  transition={{ duration: 0.5 }}
                >
                  <Hero onOpen={handleOpenDetails} />
                </motion.div>
              ) : showMainContent ? (
                <motion.div
                  key="main-details"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <div id="hero"></div>
                  <div id="quote"><Quote /></div>
                  <div id="couple"><BrideGroom /></div>
                  <div id="story"><LoveStory /></div>
                  <div id="countdown"><Countdown /></div>
                  <div id="event"><EventDetails /></div>
                  <div id="instagram-filter"><InstagramFilter /></div>
                  <div id="gallery"><Gallery /></div>
                  <div id="gift"><DigitalGift /></div>
                  <div id="guestbook"><GuestBook /></div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {showMainContent && (
            <Closing />
          )}
        </motion.main>
      )}
      {step === 'invitation' && (
        <>
          <FloatingParticles />
          <FloatingMenu />
        </>
      )}
    </div>
  );
}

const styles = {
  videoContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transition: 'opacity 1s ease-in-out',
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'var(--video-overlay)',
    zIndex: 1,
  },
  /* Penyelarasan format dengan gaya premium InstagramFilter, Hero, & BrideGroom */
  fullscreenBtn: {
    position: 'absolute',
    bottom: 'calc(40px + env(safe-area-inset-bottom))',
    left: 'calc(40px + env(safe-area-inset-left))',
    width: '45px',
    height: '45px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, rgba(35, 30, 25, 0.7) 0%, rgba(15, 12, 10, 0.85) 100%)',
    color: '#FFFFFF',
    border: '1px solid rgba(255, 255, 255, 0.45)',
    borderRadius: '50%',
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
    cursor: 'pointer',
    zIndex: 3001,
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
  },
  skipButton: {
    position: 'absolute',
    bottom: 'calc(40px + env(safe-area-inset-bottom))',
    right: 'calc(40px + env(safe-area-inset-right))',
    padding: '0 24px',
    height: '45px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, rgba(35, 30, 25, 0.7) 0%, rgba(15, 12, 10, 0.85) 100%)',
    color: '#FFFFFF',
    border: '1px solid rgba(255, 255, 255, 0.45)',
    borderRadius: '30px',
    fontWeight: '600',
    fontSize: '0.8rem',
    letterSpacing: '2px',
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
    cursor: 'pointer',
    zIndex: 3001,
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
  },
  arrow: {
    marginLeft: '8px',
  },
  mainContent: {
    position: 'relative',
    zIndex: 1,
    minHeight: '100vh',
  },
  stickyHeader: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backgroundColor: 'transparent',
    padding: '1rem',
    textAlign: 'center',
  },
  footer: {
    padding: '40px',
    backgroundColor: 'rgba(62, 39, 35, 0.9)',
    color: '#D7CCC8',
    textAlign: 'center',
    fontSize: '0.9rem',
  }
};

export default App;