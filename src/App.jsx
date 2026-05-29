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
import WaterTracker from './pages/WaterTracker'
import BMITracker from './pages/BMITracker'
import SleepTracker from './pages/SleepTracker'
import PainRelief from './pages/PainRelief'
import HormoneTracker from './pages/HormoneTracker'
import PCODInfo from './pages/PCODInfo'
import Dashboard from './pages/Dashboard'
import Onboarding from './pages/Onboarding'
import LoginPage from './pages/LoginPage'
import { auth, saveUserData, getUserData } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
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

const PETALS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  delay: Math.random() * 8,
  duration: 8 + Math.random() * 6,
  size: 12 + Math.random() * 16,
  emoji: ['🌸', '🌺', '✨', '🌷', '💮'][Math.floor(Math.random() * 5)],
}))

function FloatingPetals() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {PETALS.map(p => (
        <motion.div
          key={p.id}
          style={{ position: 'absolute', top: -40, left: p.left, fontSize: p.size, opacity: 0.3 }}
          animate={{ y: ['0vh', '110vh'], rotate: [0, 360], opacity: [0, 0.4, 0.2, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  )
}

function SplashScreen({ onDone }) {
  useEffect(() => { setTimeout(onDone, 3000) }, [])
  return (
    <motion.div
      key="splash"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
      style={{ position: 'fixed', inset: 0, background: 'linear-gradient(135deg, #FBEAF0 0%, #EEEDFE 50%, #FDF6F9 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}
    >
      {/* Floating petals */}
      {['🌸','🌺','🌷','💮','✨'].map((p, i) => (
        <motion.div
          key={i}
          style={{ position: 'absolute', fontSize: 20 + i * 5, opacity: 0.3 }}
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -40, 40, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
          initial={{
            top: `${10 + i * 18}%`,
            left: `${5 + i * 20}%`,
          }}
        >
          {p}
        </motion.div>
      ))}

      {/* Main flower */}
      <motion.div
        animate={{
          scale: [0.5, 1.3, 1],
          rotate: [0, 15, -15, 0],
        }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{ fontSize: 100, marginBottom: 24, filter: 'drop-shadow(0 8px 24px rgba(212,83,126,0.4))' }}
      >
        🌸
      </motion.div>

      {/* App name with shine */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="shine"
        style={{ fontFamily: 'Georgia, serif', fontSize: 42, fontWeight: 700, marginBottom: 8 }}
      >
        BloomCycle
      </motion.div>

      {/* Tagline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{ fontSize: 15, color: '#D4537E', marginTop: 4, letterSpacing: 1, textAlign: 'center', padding: '0 40px' }}
      >
        Your PCOD Wellness Companion 🌺
      </motion.div>

      {/* Animated loading bar */}
      <motion.div
        style={{ width: 250, height: 4, background: 'rgba(212,83,126,0.2)', borderRadius: 99, marginTop: 40, overflow: 'hidden' }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 1, duration: 1.8, ease: 'easeInOut' }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #D4537E, #7F77DD, #D4537E)', borderRadius: 99 }}
        />
      </motion.div>

      {/* Bottom text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ fontSize: 12, color: '#D4537E', marginTop: 16, opacity: 0.7 }}
      >
        🇮🇳 Made for Indian Women
      </motion.div>
    </motion.div>
  )
}

export default function App() {
 const [activeTab, setActiveTab] = useState('dashboard')
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
  const [user, setUser] = useState(null)
const [showLogin, setShowLogin] = useState(true)

const [lang, setLang] = useState(() => {
    return localStorage.getItem('bloomcycle_lang') || 'en'
  })

  useEffect(() => {
  onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      setUser(firebaseUser)
      setShowLogin(false)
      const userData = await getUserData(firebaseUser.uid)
      if (userData) {
        if (userData.logs) setLogs(userData.logs)
        if (userData.reminders) setReminders(userData.reminders)
        if (userData.periodStart) setPeriodStart(userData.periodStart)
        if (userData.lang) setLang(userData.lang)
      }
    }
  })
}, [])
  useEffect(() => {
    localStorage.setItem('bloomcycle_reminders', JSON.stringify(reminders))
    if (user) saveUserData(user.uid, { reminders })
  }, [reminders])

  useEffect(() => {
    localStorage.setItem('bloomcycle_logs', JSON.stringify(logs))
    if (user) saveUserData(user.uid, { logs })
  }, [logs])

  useEffect(() => {
    localStorage.setItem('bloomcycle_period', periodStart)
    if (user) saveUserData(user.uid, { periodStart })
  }, [periodStart])

  useEffect(() => {
    localStorage.setItem('bloomcycle_lang', lang)
    if (user) saveUserData(user.uid, { lang })
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
      case 'cycle':      return <CyclePage cycleData={cycleData} setPeriodStart={setPeriodStart} lang={lang} />
      case 'symptoms':   return <SymptomsPage logs={logs} setLogs={setLogs} lang={lang} />
      case 'reminders':  return <RemindersPage reminders={reminders} setReminders={setReminders} lang={lang} />
      case 'tips':       return <TipsPage lang={lang} />
      case 'ai':         return <AIInsightsPage cycleData={cycleData} lang={lang} />
      case 'journal':    return <MoodJournal lang={lang} />
      case 'recipes':    return <RecipesPage lang={lang} />
      case 'yoga':       return <YogaPage lang={lang} />
      case 'report':     return <DoctorReport cycleData={cycleData} logs={logs} lang={lang} />
      case 'community':  return <CommunityPage lang={lang} />
      case 'score':      return <PCODScore lang={lang} />
      case 'ayurvedic':  return <AyurvedicPage lang={lang} />
      case 'water':      return <WaterTracker lang={lang} />
      case 'bmi':        return <BMITracker lang={lang} />
      case 'sleep':      return <SleepTracker lang={lang} />
      case 'pain':       return <PainRelief lang={lang} />
      case 'hormone':    return <HormoneTracker lang={lang} />
      case 'info':       return <PCODInfo lang={lang} />
      case 'dashboard':  return <Dashboard cycleData={cycleData} logs={logs} setActiveTab={setActiveTab} lang={lang} />
      default:           return <Dashboard cycleData={cycleData} logs={logs} setActiveTab={setActiveTab} lang={lang} />
    }
  }

  return (
    <AnimatePresence mode="wait">
      {showSplash ? (
        <SplashScreen key="splash" onDone={() => setShowSplash(false)} />
      ) : showLogin ? (
  <LoginPage key="login" onLogin={(user) => { setUser(user); setShowLogin(false) }} lang={lang} />
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
           <Header activeTab={activeTab} cycleData={cycleData} lang={lang} setLang={setLang} user={user} onLogout={() => { auth.signOut(); setUser(null); setShowLogin(true) }} />
            <main style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
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