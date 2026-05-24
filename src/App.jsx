import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CyclePage from './pages/CyclePage'
import SymptomsPage from './pages/SymptomsPage'
import RemindersPage from './pages/RemindersPage'
import TipsPage from './pages/TipsPage'
import AIInsightsPage from './pages/AIInsightsPage'
import MoodJournal from './pages/MoodJournal'
import RecipesPage from './pages/RecipesPage'
import YogaPage from './pages/YogaPage'
import DoctorReport from './pages/DoctorReport'
import CommunityPage from './pages/CommunityPage'
import PCODScore from './pages/PCODScore'
import AyurvedicPage from './pages/AyurvedicPage'
import Onboarding from './pages/Onboarding'
import WaterTracker from './pages/WaterTracker'
import BMITracker from './pages/BMITracker'
import SleepTracker from './pages/SleepTracker'
import PainRelief from './pages/PainRelief'
import BottomNav from './components/BottomNav'
import Header from './components/Header'

const INITIAL_REMINDERS = [
  { id: 1, name: 'Metformin', time: '08:00', type: 'pill', active: true },
  { id: 2, name: 'Vitamin D', time: '09:00', type: 'heart', active: true },
  { id: 3, name: 'Water reminder', time: 'Hourly', type: 'droplet', active: false },
  { id: 4, name: 'Gynaecologist appt', time: 'Jun 5, 10:30 AM', type: 'stethoscope', active: true },
]

const INITIAL_LOGS = [
  { date: '2026-05-14', mood: 'Low', symptoms: ['Cramps', 'Bloating'], pain: 6, notes: 'Period started' },
  { date: '2026-05-15', mood: 'Okay', symptoms: ['Fatigue', 'Bloating'], pain: 4, notes: '' },
]

const PETALS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  delay: Math.random() * 8,
  duration: 6 + Math.random() * 6,
  size: 14 + Math.random() * 18,
  emoji: ['🌸', '🌺', '✨', '🌷', '💮'][Math.floor(Math.random() * 5)],
}))

function FloatingPetals() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {PETALS.map(p => (
        <motion.div
          key={p.id}
          style={{ position: 'absolute', top: -40, left: p.left, fontSize: p.size, opacity: 0.4 }}
          animate={{ y: ['0vh', '110vh'], rotate: [0, 360], opacity: [0, 0.5, 0.3, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  )
}

function SplashScreen({ onDone }) {
  useEffect(() => { setTimeout(onDone, 2800) }, [])
  return (
    <motion.div
      key="splash"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.6 }}
      style={{ position: 'fixed', inset: 0, background: 'linear-gradient(135deg, #FBEAF0 0%, #EEEDFE 50%, #FDF6F9 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}
    >
      <motion.div
        animate={{ scale: [0.5, 1.2, 1], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{ fontSize: 80, marginBottom: 20 }}
      >
        🌸
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        style={{ fontFamily: 'Georgia, serif', fontSize: 36, color: '#993556', fontWeight: 500 }}
      >
        BloomCycle
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{ fontSize: 14, color: '#D4537E', marginTop: 8 }}
      >
        Your PCOD wellness companion 🌺
      </motion.div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 200 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{ height: 3, background: 'linear-gradient(90deg, #D4537E, #7F77DD)', borderRadius: 99, marginTop: 30 }}
      />
    </motion.div>
  )
}

export default function App() {
  const [activeTab, setActiveTab] = useState('cycle')
  const [reminders, setReminders] = useState(() => {
    const saved = localStorage.getItem('bloomcycle_reminders')
    return saved ? JSON.parse(saved) : INITIAL_REMINDERS
  })
  const [logs, setLogs] = useState(() => {
    const saved = localStorage.getItem('bloomcycle_logs')
    return saved ? JSON.parse(saved) : INITIAL_LOGS
  })
  const [periodStart, setPeriodStart] = useState(() => {
    return localStorage.getItem('bloomcycle_period') || '2026-05-14'
  })
  const [showSplash, setShowSplash] = useState(true)
  const [showOnboarding, setShowOnboarding] = useState(() => {
    return !localStorage.getItem('bloomcycle_onboarded')
  })
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('bloomcycle_lang') || 'en'
  })


  useEffect(() => {
    localStorage.setItem('bloomcycle_reminders', JSON.stringify(reminders))
  }, [reminders])

  useEffect(() => {
    localStorage.setItem('bloomcycle_logs', JSON.stringify(logs))
  }, [logs])

  useEffect(() => {
    localStorage.setItem('bloomcycle_period', periodStart)
  }, [periodStart])

  useEffect(() => {
    localStorage.setItem('bloomcycle_lang', lang)
  }, [lang])

  const cycleData = {
    avgLength: 31, periodLength: 5, periodStart,
    periodDays: [14, 15, 16, 17, 18],
    ovulationDay: 26,
    fertileDays: [22, 23, 24, 25, 26, 27],
    today: 16, daysUntilNext: 14,
  }

  const renderPage = () => {
    switch (activeTab) {
      case 'cycle':     return <CyclePage cycleData={cycleData} setPeriodStart={setPeriodStart} lang={lang} />
      case 'symptoms':  return <SymptomsPage logs={logs} setLogs={setLogs} lang={lang} />
      case 'reminders': return <RemindersPage reminders={reminders} setReminders={setReminders} lang={lang} />
      case 'tips':      return <TipsPage lang={lang} />
      case 'ai':        return <AIInsightsPage cycleData={cycleData} lang={lang} />
      case 'journal':   return <MoodJournal lang={lang} />
      case 'recipes':   return <RecipesPage lang={lang} />
      case 'yoga':      return <YogaPage lang={lang} />
      case 'report':    return <DoctorReport cycleData={cycleData} logs={logs} lang={lang} />
      case 'community': return <CommunityPage lang={lang} />
      case 'score':     return <PCODScore lang={lang} />
      case 'ayurvedic': return <AyurvedicPage lang={lang} />
      case 'water':     return <WaterTracker lang={lang} />
      case 'bmi':       return <BMITracker lang={lang} />
      case 'sleep':     return <SleepTracker lang={lang} />
      case 'pain':      return <PainRelief lang={lang} />
      default:          return <CyclePage cycleData={cycleData} setPeriodStart={setPeriodStart} lang={lang} />
    }
  }

  return (
    <AnimatePresence mode="wait">
      {showSplash ? (
        <SplashScreen key="splash" onDone={() => setShowSplash(false)} />
      ) : showOnboarding ? (
       <Onboarding key="onboarding" onDone={() => {
    setShowOnboarding(false)
    localStorage.setItem('bloomcycle_onboarded', 'true')
  }} lang={lang} />
      ) : (
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'rgba(255,255,255,0.95)', position: 'relative' }}
        >
          <FloatingPetals />
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header activeTab={activeTab} cycleData={cycleData} lang={lang} setLang={setLang} />
            <main style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                >
                  {renderPage()}
                </motion.div>
              </AnimatePresence>
            </main>
            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} lang={lang} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}