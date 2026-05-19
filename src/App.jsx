import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import WelcomeOverlay from './components/WelcomeOverlay';
import Hero from './components/Hero';
import EventDetails from './components/EventDetails';
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
import './App.css';

function App() {
  const [step, setStep] = useState('welcome');
  const [showStory, setShowStory] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);
  const [showHero, setShowHero] = useState(true);
  const [showSkip, setShowSkip] = useState(false);
  const [guestName, setGuestName] = useState('Tamu Undangan');
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
        // Special support for iOS Safari
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

        // Strategy: Triple-Poke for iOS stability
        const attempts = [100, 500, 1000];
        attempts.forEach(delay => {
          setTimeout(() => {
            if (video.paused) {
              video.play().catch(e => {
                console.log(`Attempt at ${delay}ms failed:`, e);
                // If it still fails, try playing muted as a last resort to keep visual running
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
          zIndex: step === 'cinematic' ? 3000 : -1,
          backgroundColor: '#000',
          display: step === 'welcome' ? 'none' : 'block'
        }}
      >
        <video
          ref={videoRef}
          loop
          playsInline
          onEnded={() => {
            if (step === 'cinematic') handleSkipOrComplete();
          }}
          style={styles.video}
        >
          <source src="/prewed2.mp4" type="video/mp4" />
        </video>

        {step === 'invitation' && !showMainContent && <div style={styles.overlay}></div>}

        <AnimatePresence>
          {step === 'cinematic' && (
            <>
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFullscreen}
                style={styles.fullscreenBtn}
              >
                <span style={{ marginRight: '0px' }}>⛶</span>
              </motion.button>

              {showSkip && (
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSkipOrComplete}
                  style={styles.skipButton}
                >
                  Lewati Video <span style={styles.arrow}>→</span>
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
              <Logo size="small" />
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
    backgroundColor: 'rgba(62, 39, 35, 0.4)',
    zIndex: 1,
  },
  muteBtn: {
    position: 'fixed',
    top: '30px',
    right: '30px',
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    color: '#fff',
    fontSize: '1.2rem',
    cursor: 'pointer',
    zIndex: 4000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullscreenBtn: {
    position: 'absolute',
    bottom: '40px',
    left: '40px',
    padding: '12px 24px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '30px',
    color: '#fff',
    fontSize: '0.8rem',
    fontWeight: '500',
    letterSpacing: '1px',
    cursor: 'pointer',
    zIndex: 3001,
  },
  skipButton: {
    position: 'absolute',
    bottom: '40px',
    right: '40px',
    padding: '12px 24px',
    backgroundColor: 'rgb(141, 110, 99)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '30px',
    color: '#fff',
    fontSize: '0.8rem',
    fontWeight: '500',
    letterSpacing: '1px',
    cursor: 'pointer',
    zIndex: 3001,
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
