import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MAIN_TABS = {
  en: [
    { id: 'home',     label: 'Home',     icon: '🌸' },
    { id: 'track',    label: 'Track',    icon: '📊' },
    { id: 'ai',       label: 'AI',       icon: '✨' },
    { id: 'wellness', label: 'Wellness', icon: '🌿' },
    { id: 'more',     label: 'More',     icon: '⚡' },
  ],
  hi: [
    { id: 'home',     label: 'होम',      icon: '🌸' },
    { id: 'track',    label: 'ट्रैक',    icon: '📊' },
    { id: 'ai',       label: 'AI',       icon: '✨' },
    { id: 'wellness', label: 'वेलनेस',   icon: '🌿' },
    { id: 'more',     label: 'और',       icon: '⚡' },
  ],
}

const MORE_MENU = {
  en: [
    { id: 'score',     label: 'PCOD Test',  icon: '🎯' },
    { id: 'ayurvedic', label: 'Ayurveda',   icon: '🌿' },
    { id: 'water',     label: 'Water',      icon: '💧' },
    { id: 'bmi',       label: 'BMI',        icon: '⚖️' },
    { id: 'sleep',     label: 'Sleep',      icon: '😴' },
    { id: 'pain',      label: 'Pain Relief', icon: '🌙' },
    { id: 'report',    label: 'Dr Report',  icon: '🩺' },
    { id: 'reminders', label: 'Reminders',  icon: '🔔' },
    { id: 'info',      label: 'PCOD Info',  icon: '📚' },
    { id: 'hormone',   label: 'Hormones',   icon: '🧬' },
  ],
  hi: [
    { id: 'score',     label: 'PCOD टेस्ट', icon: '🎯' },
    { id: 'ayurvedic', label: 'आयुर्वेद',   icon: '🌿' },
    { id: 'water',     label: 'पानी',       icon: '💧' },
    { id: 'bmi',       label: 'BMI',        icon: '⚖️' },
    { id: 'sleep',     label: 'नींद',       icon: '😴' },
    { id: 'pain',      label: 'दर्द राहत',  icon: '🌙' },
    { id: 'report',    label: 'डॉ रिपोर्ट', icon: '🩺' },
    { id: 'reminders', label: 'रिमाइंडर',   icon: '🔔' },
    { id: 'info',      label: 'PCOD जानकारी', icon: '📚' },
    { id: 'hormone',   label: 'हार्मोन',    icon: '🧬' },
  ],
}

const HOME_TABS = ['cycle', 'ai', 'journal', 'dashboard']
const TRACK_TABS = ['symptoms', 'water', 'bmi', 'sleep']
const WELLNESS_TABS = ['tips', 'recipes', 'yoga', 'ayurvedic', 'pain']

const getMainTab = (activeTab) => {
  if (HOME_TABS.includes(activeTab)) return 'home'
  if (activeTab === 'ai') return 'ai'
  if (TRACK_TABS.includes(activeTab)) return 'track'
  if (WELLNESS_TABS.includes(activeTab)) return 'wellness'
  if (activeTab === 'community') return 'community'
  return 'more'
}

export default function BottomNav({ activeTab, setActiveTab, lang }) {
  const [showMore, setShowMore] = useState(false)
  const mainTabs = MAIN_TABS[lang]
  const moreMenu = MORE_MENU[lang]
  const activeMain = getMainTab(activeTab)

  const handleMainTab = (id) => {
    setShowMore(false)
    if (id === 'more') {
      setShowMore(prev => !prev)
      return
    }
    if (id === 'home') setActiveTab('dashboard')
    else if (id === 'track') setActiveTab('symptoms')
    else if (id === 'ai') setActiveTab('ai')
    else if (id === 'wellness') setActiveTab('tips')
    else if (id === 'community') setActiveTab('community')
  }

  return (
    <>
      <AnimatePresence>
        {showMore && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMore(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 150 }}
            />
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              style={{ position: 'fixed', bottom: 70, left: 0, right: 0, background: 'white', borderRadius: '24px 24px 0 0', padding: '20px 16px', zIndex: 151, boxShadow: '0 -8px 32px rgba(212,83,126,0.15)' }}
            >
              <div style={{ width: 40, height: 4, background: 'var(--pink-200)', borderRadius: 99, margin: '0 auto 16px' }} />
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--pink-600)', marginBottom: 16, textAlign: 'center' }}>
                {lang === 'en' ? '⚡ More Features' : '⚡ और फीचर्स'}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                {moreMenu.map(item => (
                  <motion.button
                    key={item.id}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => { setActiveTab(item.id); setShowMore(false) }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '12px 8px', borderRadius: 'var(--radius-md)', border: activeTab === item.id ? '1.5px solid var(--pink-400)' : '1px solid var(--pink-200)', background: activeTab === item.id ? 'var(--pink-100)' : 'var(--pink-50)', cursor: 'pointer', fontFamily: 'var(--font-body)' }}
                  >
                    <span style={{ fontSize: 24 }}>{item.icon}</span>
                    <span style={{ fontSize: 10, color: activeTab === item.id ? 'var(--pink-600)' : 'var(--text-muted)', textAlign: 'center', lineHeight: 1.2 }}>{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(10px)', borderTop: '1px solid var(--pink-200)', display: 'flex', zIndex: 200, boxShadow: '0 -4px 20px rgba(212,83,126,0.1)' }}>
        {mainTabs.map(item => {
          const isActive = activeMain === item.id
          return (
            <motion.button
              key={item.id}
              onClick={() => handleMainTab(item.id)}
              whileTap={{ scale: 0.9 }}
              style={{ flex: 1, padding: '10px 4px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, background: 'transparent', borderTop: isActive ? '2.5px solid var(--pink-400)' : '2.5px solid transparent', color: isActive ? 'var(--pink-600)' : 'var(--text-muted)', fontSize: 10, fontWeight: isActive ? 600 : 400, cursor: 'pointer', transition: 'color 0.15s', fontFamily: 'var(--font-body)' }}
            >
              <motion.span
                animate={{ scale: isActive ? 1.2 : 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                style={{ fontSize: 22 }}
              >
                {item.id === 'more' && showMore ? '✕' : item.icon}
              </motion.span>
              {item.label}
            </motion.button>
          )
        })}
      </nav>
    </>
  )
}