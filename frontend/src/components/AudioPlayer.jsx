import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AudioPlayer({ playlist }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const synthRef = useRef(window.speechSynthesis);
  const utteranceRef = useRef(null);
  const progressTimerRef = useRef(null);
  const startTimeRef = useRef(null);
  const estimatedDurationRef = useRef(20000); // 20s default

  const currentStory = playlist[currentIndex];

  useEffect(() => {
    return () => {
      synthRef.current.cancel();
      clearInterval(progressTimerRef.current);
    };
  }, []);

  const stopProgress = () => {
    clearInterval(progressTimerRef.current);
  };

  const startProgress = (durationMs) => {
    stopProgress();
    startTimeRef.current = Date.now();
    progressTimerRef.current = setInterval(() => {
      const spent = Date.now() - startTimeRef.current;
      const pct = Math.min((spent / durationMs) * 100, 100);
      setProgress(pct);
      setElapsed(Math.floor(spent / 1000));
    }, 100);
  };

  const speakStory = useCallback((story) => {
    synthRef.current.cancel();
    stopProgress();
    setProgress(0);
    setElapsed(0);

    const text = `${story.category}. ${story.title}. ${story.description}`;
    const estimatedMs = Math.max((text.length / 700) * 60 * 1000, 10000);
    estimatedDurationRef.current = estimatedMs;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    
    const voices = synthRef.current.getVoices();
    const preferred = voices.find(v =>
      v.name.includes('Google UK English Female') ||
      v.name.includes('Samantha') ||
      v.name.includes('Female')
    ) || voices[0];
    if (preferred) utterance.voice = preferred;

    utterance.onstart = () => {
      setIsPlaying(true);
      startProgress(estimatedMs);
    };

    utterance.onend = () => {
      stopProgress();
      setProgress(100);
      setIsPlaying(false);
      setTimeout(() => {
        if (currentIndex < playlist.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          setProgress(0);
          setElapsed(0);
        }
      }, 800);
    };

    utterance.onerror = () => {
      stopProgress();
      setIsPlaying(false);
    };

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
  }, [currentIndex, playlist.length]);

  const wasPlayingRef = useRef(false);
  useEffect(() => {
    if (wasPlayingRef.current) {
      speakStory(playlist[currentIndex]);
    }
  }, [currentIndex]);

  const handlePlayPause = (e) => {
    e.stopPropagation(); // prevent expanding when clicking play
    if (isPlaying) {
      synthRef.current.pause();
      stopProgress();
      setIsPlaying(false);
    } else if (synthRef.current.paused) {
      synthRef.current.resume();
      setIsPlaying(true);
      startProgress(estimatedDurationRef.current * (1 - progress / 100));
    } else {
      wasPlayingRef.current = true;
      speakStory(currentStory);
    }
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    wasPlayingRef.current = isPlaying;
    synthRef.current.cancel();
    stopProgress();
    if (currentIndex < playlist.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    wasPlayingRef.current = isPlaying;
    synthRef.current.cancel();
    stopProgress();
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  if (!currentStory) return null;

  const categoryColors = {
    'AI & Technology': '#a855f7',
    'Financial Markets': '#00B4D8',
    'Indian Business': '#f59e0b',
    'Climate & Energy': '#10B981',
    'Startups': '#f97316',
  };
  const accentColor = categoryColors[currentStory.category] || '#7c3aed';

  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 100, pointerEvents: 'none' }}>
      <AnimatePresence>
        {!isExpanded ? (
          /* MINIMIZED PLAYER */
          <motion.div
            key="minimized"
            layoutId="player-container"
            onClick={() => setIsExpanded(true)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              bottom: '96px', // Just above BottomNavigation
              left: '16px',
              right: '16px',
              pointerEvents: 'auto',
              background: 'rgba(25, 25, 25, 0.95)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              padding: '12px 16px',
              backdropFilter: 'blur(20px)',
              boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 20px ${accentColor}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            {/* Background tint */}
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(90deg, ${accentColor}10, transparent)`, pointerEvents: 'none' }} />
            
            {/* Progress line at bottom of mini player */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, height: '2px', background: accentColor, width: `${progress}%`, transition: 'width 0.1s linear' }} />

            <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', flex: 1, marginRight: '16px', zIndex: 1 }}>
              <span style={{ fontSize: '10px', color: accentColor, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>
                {currentStory.category}
              </span>
              <span style={{ fontSize: '14px', color: '#fff', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {currentStory.title}
              </span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', zIndex: 1 }}>
              <button onClick={handlePlayPause} style={{ background: 'none', border: 'none', color: '#fff', padding: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {isPlaying ? <MiniPauseIcon /> : <MiniPlayIcon />}
              </button>
            </div>
          </motion.div>
        ) : (
          /* EXPANDED PLAYER */
          <motion.div
            key="expanded"
            layoutId="player-container"
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0,
              height: '100vh',
              pointerEvents: 'auto',
              background: '#050505',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 200,
            }}
          >
            {/* Background ambient gradient */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', background: `radial-gradient(ellipse at top, ${accentColor}25 0%, transparent 70%)`, pointerEvents: 'none' }} />
            
            {/* Header (Collapse Button) */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px', paddingTop: '16px', position: 'relative', zIndex: 1 }}>
              <button onClick={() => setIsExpanded(false)} style={{ background: 'none', border: 'none', padding: '8px', cursor: 'pointer', color: '#9ca3af' }}>
                <ChevronDownIcon />
              </button>
            </div>

            {/* Artwork / Hero Area */}
            <div style={{ 
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '40px', position: 'relative', zIndex: 1
            }}>
              <div style={{
                width: '100%', aspectRatio: '1/1', maxWidth: '320px',
                borderRadius: '32px',
                background: `linear-gradient(135deg, ${accentColor}44, #111)`,
                border: `1px solid ${accentColor}33`,
                boxShadow: `0 20px 60px ${accentColor}20`,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <span style={{ fontSize: '64px' }}>
                  {currentStory.category.includes('Tech') ? '🤖' : 
                   currentStory.category.includes('Market') ? '📊' : 
                   currentStory.category.includes('Climate') ? '⚡' : '📰'}
                </span>
              </div>
            </div>

            {/* Content & Controls Container */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '12px', color: accentColor, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>
                    {currentStory.category}
                  </span>
                  <h2 style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'Georgia, serif', color: '#fff', margin: 0, lineHeight: 1.2 }}>
                    {currentStory.title}
                  </h2>
                </div>
              </div>
              
              <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '32px', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {currentStory.description}
              </p>

              {/* Progress */}
              <div style={{ marginBottom: '40px' }}>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', position: 'relative' }}>
                  <div style={{ height: '100%', borderRadius: '3px', background: accentColor, width: `${progress}%`, transition: 'width 0.1s linear' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
                  <span style={{ fontSize: '12px', color: '#6b7280', fontVariantNumeric: 'tabular-nums' }}>{formatTime(elapsed)}</span>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>~{currentStory.duration}</span>
                </div>
              </div>

              {/* Transport Controls */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px', paddingBottom: '32px' }}>
                <button onClick={handlePrev} disabled={currentIndex === 0} style={{ background: 'none', border: 'none', color: currentIndex === 0 ? '#374151' : '#fff', cursor: currentIndex === 0 ? 'not-allowed' : 'pointer' }}>
                  <PrevIcon />
                </button>

                <button onClick={handlePlayPause} style={{
                  width: '80px', height: '80px', borderRadius: '50%',
                  background: accentColor, border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 12px 32px ${accentColor}66`
                }}>
                  {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>

                <button onClick={handleNext} disabled={currentIndex === playlist.length - 1} style={{ background: 'none', border: 'none', color: currentIndex === playlist.length - 1 ? '#374151' : '#fff', cursor: currentIndex === playlist.length - 1 ? 'not-allowed' : 'pointer' }}>
                  <NextIcon />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Icons
function MiniPlayIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21" /></svg>;
}
function MiniPauseIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>;
}
function PlayIcon() {
  return <svg width="32" height="32" viewBox="0 0 24 24" fill="white"><polygon points="6,4 20,12 6,20" /></svg>;
}
function PauseIcon() {
  return <svg width="32" height="32" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>;
}
function PrevIcon() {
  return <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><polygon points="19,20 9,12 19,4" /><rect x="5" y="4" width="3" height="16" rx="1.5" /></svg>;
}
function NextIcon() {
  return <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,4 15,12 5,20" /><rect x="16" y="4" width="3" height="16" rx="1.5" /></svg>;
}
function ChevronDownIcon() {
  return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>;
}
