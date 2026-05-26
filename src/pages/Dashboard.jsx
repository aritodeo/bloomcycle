import { useMemo } from 'react'
import { motion } from 'framer-motion'

const QUOTES = [
  { en: "You are stronger than your PCOD. Every small step counts! 🌸", hi: "आप PCOD से ज़्यादा मज़बूत हैं। हर छोटा कदम मायने रखता है! 🌸" },
  { en: "Healing is not linear. Be patient and kind to yourself. 💕", hi: "उपचार रैखिक नहीं है। अपने साथ धैर्य और दयालु रहें। 💕" },
  { en: "Your body is not broken. It just needs extra love and care. 🌺", hi: "आपका शरीर टूटा नहीं है। इसे बस अतिरिक्त प्यार और देखभाल चाहिए। 🌺" },
  { en: "Every woman with PCOD is a warrior. You are not alone! 💪", hi: "PCOD वाली हर महिला एक योद्धा है। आप अकेली नहीं हैं! 💪" },
  { en: "Small consistent actions create big transformations. Keep going! ✨", hi: "छोटी निरंतर क्रियाएं बड़े बदलाव बनाती हैं। जारी रखें! ✨" },
  { en: "Your cycle is not your enemy. Learn to work with your body. 🌙", hi: "आपका चक्र आपका दुश्मन नहीं है। अपने शरीर के साथ काम करना सीखें। 🌙" },
  { en: "Today is a new opportunity to take care of yourself. 🌸", hi: "आज अपना ख्याल रखने का एक नया अवसर है। 🌸" },
]

const ACHIEVEMENTS = [
  { id: 1, emoji: '🌸', title: 'First Log', hindi: 'पहला लॉग', condition: (logs) => logs.length >= 1 },
  { id: 2, emoji: '💧', title: 'Hydration Hero', hindi: 'हाइड्रेशन हीरो', condition: () => false },
  { id: 3, emoji: '🧘', title: 'Yoga Starter', hindi: 'योग शुरुआत', condition: () => false },
  { id: 4, emoji: '📊', title: 'Data Queen', hindi: 'डेटा क्वीन', condition: (logs) => logs.length >= 5 },
  { id: 5, emoji: '🌟', title: 'PCOD Warrior', hindi: 'PCOD योद्धा', condition: () => false },
  { id: 6, emoji: '🎯', title: 'Test Taker', hindi: 'टेस्ट लेने वाली', condition: () => false },
]

const GREETINGS = {
  morning: { en: 'Good Morning', hi: 'सुप्रभात', emoji: '🌅' },
  afternoon: { en: 'Good Afternoon', hi: 'शुभ दोपहर', emoji: '☀️' },
  evening: { en: 'Good Evening', hi: 'शुभ संध्या', emoji: '🌸' },
  night: { en: 'Good Night', hi: 'शुभ रात्रि', emoji: '🌙' },
}

export default function Dashboard({ cycleData, logs, setActiveTab, lang }) {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? GREETINGS.morning : hour < 17 ? GREETINGS.afternoon : hour < 20 ? GREETINGS.evening : GREETINGS.night

  const quote = QUOTES[new Date().getDate() % QUOTES.length]

  const score = useMemo(() => {
    let s = 40
    if (logs.length > 0) s += 20
    if (logs.length >= 3) s += 15
    if (cycleData.today > 0) s += 15
    s += 8
    return Math.min(s, 100)
  }, [logs.length, cycleData.today])

  const QUICK_ACTIONS = [
    { id: 'symptoms', label: lang === 'en' ? 'Log Today' : 'आज लॉग करें', icon: '🌸', color: '#D4537E', bg: '#FBEAF0' },
    { id: 'water', label: lang === 'en' ? 'Water' : 'पानी', icon: '💧', color: '#534AB7', bg: '#EEEDFE' },
    { id: 'ai', label: lang === 'en' ? 'Ask AI' : 'AI पूछें', icon: '✨', color: '#7F77DD', bg: '#EEEDFE' },
    { id: 'score', label: lang === 'en' ? 'PCOD Test' : 'PCOD टेस्ट', icon: '🎯', color: '#1D9E75', bg: '#E1F5EE' },
    { id: 'info', label: lang === 'en' ? 'Learn' : 'सीखें', icon: '📚', color: '#BA7517', bg: '#FAEEDA' },
    { id: 'community', label: lang === 'en' ? 'Community' : 'समुदाय', icon: '💬', color: '#993556', bg: '#FBEAF0' },
  ]

  return (
    <div style={{ padding: '20px 16px' }}>

      {/* Greeting */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 24, marginBottom: 4 }}>{greeting.emoji}</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, background: 'linear-gradient(135deg, #D4537E, #7F77DD)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {lang === 'en' ? greeting.en : greeting.hi}!
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
          {lang === 'en' ? `Cycle Day ${cycleData.today} · Next period in ${cycleData.daysUntilNext} days` : `चक्र दिन ${cycleData.today} · अगला मासिक ${cycleData.daysUntilNext} दिन में`}
        </div>
      </motion.div>

      {/* Wellness Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="card-hover"
        style={{ background: 'linear-gradient(135deg, #D4537E, #7F77DD)', borderRadius: 'var(--radius-xl)', padding: '24px', marginBottom: 16, color: 'white', boxShadow: '0 8px 32px rgba(212,83,126,0.3)', position: 'relative', overflow: 'hidden' }}
      >
          <div style={{ position: 'absolute', top: -30, right: -30, fontSize: 120, opacity: 0.08 }}>🌸</div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 13, opacity: 0.9, marginBottom: 8 }}>✨ {lang === 'en' ? "Today's Wellness Score" : 'आज का वेलनेस स्कोर'}</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginBottom: 16 }}>
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 150, delay: 0.3 }}
              style={{ fontFamily: 'var(--font-display)', fontSize: 64, fontWeight: 700, lineHeight: 1 }}
            >
              {score}
            </motion.div>
            <div style={{ fontSize: 20, opacity: 0.8, marginBottom: 8 }}>/100</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 99, height: 8, overflow: 'hidden', marginBottom: 8 }}>
            <motion.div
              initial={{ width: 0 }} animate={{ width: `${score}%` }}
              transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
              style={{ height: '100%', background: 'white', borderRadius: 99 }}
            />
          </div>
          <div style={{ fontSize: 12, opacity: 0.9 }}>
            {score >= 80 ? (lang === 'en' ? '🌟 Excellent! Keep it up!' : '🌟 शानदार! जारी रखें!') :
             score >= 60 ? (lang === 'en' ? '💪 Good progress!' : '💪 अच्छी प्रगति!') :
             (lang === 'en' ? '🌸 Start logging to improve!' : '🌸 स्कोर बेहतर करने के लिए लॉग करें!')}
          </div>
        </div>
      </motion.div>

      {/* Quick stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 16 }}
      >
        {[
          { label: lang === 'en' ? 'Cycle Day' : 'चक्र दिन', value: cycleData.today, icon: '📅', color: '#D4537E', bg: '#FBEAF0' },
          { label: lang === 'en' ? 'Logs' : 'लॉग', value: logs.length, icon: '📝', color: '#7F77DD', bg: '#EEEDFE' },
          { label: lang === 'en' ? 'Days left' : 'दिन बचे', value: cycleData.daysUntilNext, icon: '⏰', color: '#1D9E75', bg: '#E1F5EE' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            style={{ background: stat.bg, borderRadius: 'var(--radius-lg)', padding: '14px 10px', textAlign: 'center', border: `1px solid ${stat.color}20` }}
          >
            <div style={{ fontSize: 22, marginBottom: 4 }}>{stat.icon}</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: stat.color, fontFamily: 'var(--font-display)' }}>{stat.value}</div>
            <div style={{ fontSize: 10, color: stat.color, opacity: 0.8, marginTop: 2 }}>{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Daily Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        style={{ background: 'linear-gradient(135deg, #FBEAF0, #EEEDFE)', borderRadius: 'var(--radius-xl)', padding: '20px', marginBottom: 16, border: '1px solid var(--pink-200)', position: 'relative', overflow: 'hidden' }}
      >
        <div style={{ position: 'absolute', top: -10, left: -10, fontSize: 60, opacity: 0.1 }}>💝</div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--pink-400)', marginBottom: 8, letterSpacing: 1 }}>
            💝 {lang === 'en' ? 'QUOTE OF THE DAY' : 'आज का विचार'}
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--pink-600)', lineHeight: 1.7, fontStyle: 'italic' }}>
            "{lang === 'en' ? quote.en : quote.hi}"
          </div>
        </div>
      </motion.div>

      {/* Quick actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        style={{ marginBottom: 16 }}
      >
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12 }}>
          ⚡ {lang === 'en' ? 'Quick actions' : 'त्वरित क्रियाएं'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {QUICK_ACTIONS.map((action, i) => (
            <motion.button
              key={action.id}
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.05 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setActiveTab(action.id)}
              style={{ background: action.bg, borderRadius: 'var(--radius-lg)', padding: '14px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, border: `1px solid ${action.color}20`, cursor: 'pointer', fontFamily: 'var(--font-body)' }}
            >
              <span style={{ fontSize: 26 }}>{action.icon}</span>
              <span style={{ fontSize: 11, color: action.color, fontWeight: 500, textAlign: 'center', lineHeight: 1.2 }}>{action.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        style={{ background: 'white', borderRadius: 'var(--radius-xl)', padding: '20px', marginBottom: 20, boxShadow: 'var(--shadow-card)' }}
      >
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 14 }}>
          ⭐ {lang === 'en' ? 'Your achievements' : 'आपकी उपलब्धियां'}
        </div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
          {ACHIEVEMENTS.map((achievement, i) => {
            const unlocked = achievement.condition(logs)
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.05 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, minWidth: 70, padding: '12px 8px', borderRadius: 'var(--radius-md)', background: unlocked ? 'var(--pink-100)' : '#F9F7F4', border: unlocked ? '1.5px solid var(--pink-400)' : '1px solid #D3D1C7', opacity: unlocked ? 1 : 0.5 }}
              >
                <div style={{ fontSize: 28, filter: unlocked ? 'none' : 'grayscale(100%)' }}>{achievement.emoji}</div>
                <div style={{ fontSize: 9, fontWeight: 600, color: unlocked ? 'var(--pink-600)' : '#9a9a9a', textAlign: 'center', lineHeight: 1.2 }}>
                  {lang === 'en' ? achievement.title : achievement.hindi}
                </div>
                {unlocked && (
                  <div style={{ fontSize: 8, background: 'var(--pink-400)', color: 'white', padding: '1px 6px', borderRadius: 99 }}>
                    {lang === 'en' ? 'Unlocked!' : 'अनलॉक!'}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}