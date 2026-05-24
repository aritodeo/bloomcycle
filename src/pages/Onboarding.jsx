import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SLIDES = [
  {
    emoji: '🌸',
    title: 'Welcome to BloomCycle',
    hindi: 'BloomCycle में आपका स्वागत है',
    subtitle: 'The #1 PCOD wellness app made for Indian women',
    hindiSub: 'भारतीय महिलाओं के लिए बनाया गया #1 PCOD वेलनेस ऐप',
    bg: 'linear-gradient(135deg, #FBEAF0 0%, #EEEDFE 100%)',
    color: '#993556',
  },
  {
    emoji: '📅',
    title: 'Track Your Cycle',
    hindi: 'अपना चक्र ट्रैक करें',
    subtitle: 'Monitor your period, fertile window and ovulation with AI accuracy',
    hindiSub: 'AI सटीकता के साथ अपने मासिक धर्म और ओव्यूलेशन की निगरानी करें',
    bg: 'linear-gradient(135deg, #FBEAF0 0%, #F4C0D1 100%)',
    color: '#D4537E',
  },
  {
    emoji: '✨',
    title: 'AI Powered Insights',
    hindi: 'AI संचालित अंतर्दृष्टि',
    subtitle: 'Get personalized PCOD advice powered by advanced AI technology',
    hindiSub: 'उन्नत AI तकनीक द्वारा संचालित व्यक्तिगत PCOD सलाह प्राप्त करें',
    bg: 'linear-gradient(135deg, #EEEDFE 0%, #CECBF6 100%)',
    color: '#534AB7',
  },
  {
    emoji: '🌿',
    title: 'Ayurvedic + Modern',
    hindi: 'आयुर्वेदिक + आधुनिक',
    subtitle: 'Combining ancient Indian wisdom with modern medical science',
    hindiSub: 'प्राचीन भारतीय ज्ञान को आधुनिक चिकित्सा विज्ञान के साथ जोड़ना',
    bg: 'linear-gradient(135deg, #E1F5EE 0%, #EEEDFE 100%)',
    color: '#1D9E75',
  },
  {
    emoji: '💬',
    title: 'You Are Not Alone',
    hindi: 'आप अकेली नहीं हैं',
    subtitle: 'Join thousands of Indian women supporting each other through PCOD',
    hindiSub: 'PCOD में एक दूसरे का समर्थन करने वाली हजारों भारतीय महिलाओं से जुड़ें',
    bg: 'linear-gradient(135deg, #FAEEDA 0%, #FBEAF0 100%)',
    color: '#BA7517',
  },
]

export default function Onboarding({ onDone, lang }) {
  const [current, setCurrent] = useState(0)

  const handleNext = () => {
    if (current < SLIDES.length - 1) {
      setCurrent(current + 1)
    } else {
      onDone()
    }
  }

  const slide = SLIDES[current]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, zIndex: 998, display: 'flex', flexDirection: 'column' }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          style={{ flex: 1, background: slide.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 30px', textAlign: 'center' }}
        >
          {/* Skip button */}
          <button
            onClick={onDone}
            style={{ position: 'absolute', top: 50, right: 20, fontSize: 14, color: '#999', background: 'rgba(255,255,255,0.8)', padding: '6px 14px', borderRadius: '999px', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)' }}
          >
            Skip
          </button>

          {/* Emoji */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ fontSize: 100, marginBottom: 30 }}
          >
            {slide.emoji}
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 600, color: slide.color, marginBottom: 10, lineHeight: 1.3 }}
          >
            {lang === 'en' ? slide.title : slide.hindi}
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ fontSize: 15, color: '#666', lineHeight: 1.7, maxWidth: 320 }}
          >
            {lang === 'en' ? slide.subtitle : slide.hindiSub}
          </motion.div>

          {/* Dots */}
          <div style={{ display: 'flex', gap: 8, marginTop: 40 }}>
            {SLIDES.map((_, i) => (
              <motion.div
                key={i}
                animate={{ width: i === current ? 24 : 8 }}
                style={{ height: 8, borderRadius: 99, background: i === current ? slide.color : '#ddd' }}
              />
            ))}
          </div>

          {/* Next button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            style={{ marginTop: 40, padding: '16px 48px', background: slide.color, color: 'white', borderRadius: '999px', fontSize: 16, fontWeight: 600, cursor: 'pointer', border: 'none', fontFamily: 'var(--font-body)', boxShadow: `0 8px 24px ${slide.color}40` }}
          >
            {current === SLIDES.length - 1
              ? (lang === 'en' ? "Let's Start! 🌸" : "शुरू करें! 🌸")
              : (lang === 'en' ? 'Next →' : 'अगला →')
            }
          </motion.button>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}