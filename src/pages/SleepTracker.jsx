import { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const SLEEP_QUALITY = [
  { emoji: '😴', label: 'Deep Sleep', hindi: 'गहरी नींद', score: 5 },
  { emoji: '😊', label: 'Good Sleep', hindi: 'अच्छी नींद', score: 4 },
  { emoji: '😐', label: 'Average', hindi: 'औसत नींद', score: 3 },
  { emoji: '😔', label: 'Poor Sleep', hindi: 'खराब नींद', score: 2 },
  { emoji: '😫', label: 'No Sleep', hindi: 'नींद नहीं', score: 1 },
]

const INITIAL_DATA = [
  { day: 'Mon', hours: 7, quality: 4 },
  { day: 'Tue', hours: 6, quality: 3 },
  { day: 'Wed', hours: 8, quality: 5 },
  { day: 'Thu', hours: 5, quality: 2 },
  { day: 'Fri', hours: 7, quality: 4 },
  { day: 'Sat', hours: 9, quality: 5 },
  { day: 'Sun', hours: 6, quality: 3 },
]

export default function SleepTracker({ lang }) {
  const [bedtime, setBedtime] = useState('22:00')
  const [waketime, setWaketime] = useState('06:00')
  const [quality, setQuality] = useState(null)
  const [logs, setLogs] = useState(INITIAL_DATA)
  const [saved, setSaved] = useState(false)

  const calculateHours = () => {
    const [bh, bm] = bedtime.split(':').map(Number)
    const [wh, wm] = waketime.split(':').map(Number)
    let hours = wh - bh + (wm - bm) / 60
    if (hours < 0) hours += 24
    return hours.toFixed(1)
  }

  const hours = calculateHours()

  const getSleepAdvice = () => {
    if (hours < 6) return { text: lang === 'en' ? 'Too little sleep worsens PCOD hormones. Aim for 7-9 hours!' : 'कम नींद PCOD हार्मोन को बिगाड़ती है। 7-9 घंटे का लक्ष्य रखें!', color: '#D4537E' }
    if (hours <= 9) return { text: lang === 'en' ? 'Perfect sleep duration for PCOD management! Keep it up! 🌸' : 'PCOD प्रबंधन के लिए सही नींद! इसे जारी रखें! 🌸', color: '#1D9E75' }
    return { text: lang === 'en' ? 'Sleeping too much can also affect hormones. Try to maintain 7-9 hours.' : 'ज्यादा सोना भी हार्मोन को प्रभावित कर सकता है। 7-9 घंटे बनाए रखें।', color: '#BA7517' }
  }

  const advice = getSleepAdvice()

  const handleSave = () => {
    const newLog = {
      day: 'Today',
      hours: parseFloat(hours),
      quality: quality || 3,
    }
    setLogs(prev => [...prev.slice(-6), newLog])
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div style={{ padding: '20px 16px' }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ background: 'linear-gradient(135deg, #3C3489, #7F77DD)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: 20, textAlign: 'center', color: 'white' }}
      >
        <div style={{ fontSize: 40, marginBottom: 8 }}>😴</div>
        <div style={{ fontSize: 18, fontWeight: 600 }}>{lang === 'en' ? 'Sleep Tracker' : 'नींद ट्रैकर'}</div>
        <div style={{ fontSize: 13, opacity: 0.9, marginTop: 4 }}>{lang === 'en' ? 'Good sleep = better hormones = better PCOD management' : 'अच्छी नींद = बेहतर हार्मोन = बेहतर PCOD प्रबंधन'}</div>
      </motion.div>

      {/* Sleep time input */}
      <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--pink-200)', padding: '16px', marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--pink-600)', marginBottom: 12 }}>🌙 {lang === 'en' ? 'Log Sleep' : 'नींद लॉग करें'}</div>
        <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>{lang === 'en' ? 'Bedtime' : 'सोने का समय'}</div>
            <input
              type="time"
              value={bedtime}
              onChange={e => setBedtime(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--pink-200)', borderRadius: 'var(--radius-sm)', fontSize: 14, background: 'var(--pink-50)', fontFamily: 'var(--font-body)' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>{lang === 'en' ? 'Wake time' : 'उठने का समय'}</div>
            <input
              type="time"
              value={waketime}
              onChange={e => setWaketime(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--pink-200)', borderRadius: 'var(--radius-sm)', fontSize: 14, background: 'var(--pink-50)', fontFamily: 'var(--font-body)' }}
            />
          </div>
        </div>

        {/* Hours result */}
        <div style={{ background: 'var(--purple-50)', borderRadius: 'var(--radius-sm)', padding: '12px', textAlign: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#534AB7' }}>{hours}h</div>
          <div style={{ fontSize: 12, color: '#7F77DD' }}>{lang === 'en' ? 'hours of sleep' : 'घंटे की नींद'}</div>
          <div style={{ fontSize: 12, color: advice.color, marginTop: 4 }}>{advice.text}</div>
        </div>

        {/* Sleep quality */}
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8 }}>{lang === 'en' ? 'Sleep quality:' : 'नींद की गुणवत्ता:'}</div>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 12 }}>
          {SLEEP_QUALITY.map(q => (
            <button
              key={q.score}
              onClick={() => setQuality(q.score)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '8px', borderRadius: 'var(--radius-md)', border: quality === q.score ? '1.5px solid var(--purple-400)' : '1px solid var(--border-light)', background: quality === q.score ? 'var(--purple-50)' : 'white', cursor: 'pointer', minWidth: 48 }}
            >
              <span style={{ fontSize: 22 }}>{q.emoji}</span>
              <span style={{ fontSize: 9, color: quality === q.score ? 'var(--purple-600)' : 'var(--text-muted)' }}>{lang === 'en' ? q.label.split(' ')[0] : q.hindi.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSave}
          style={{ width: '100%', padding: '12px', background: saved ? 'var(--teal-400)' : '#534AB7', color: 'white', borderRadius: 'var(--radius-sm)', fontSize: 14, fontWeight: 600, cursor: 'pointer', border: 'none', fontFamily: 'var(--font-body)' }}
        >
          {saved ? '✓ Saved!' : (lang === 'en' ? 'Save Sleep Log' : 'नींद लॉग सेव करें')}
        </motion.button>
      </div>

      {/* Sleep graph */}
      <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--pink-200)', padding: '16px', marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--pink-600)', marginBottom: 12 }}>📊 {lang === 'en' ? 'Weekly Sleep' : 'साप्ताहिक नींद'}</div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={logs}>
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9a9a9a' }} axisLine={false} tickLine={false} />
            <YAxis hide domain={[0, 10]} />
            <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid var(--pink-200)', fontSize: 12 }} />
            <Bar dataKey="hours" fill="#CECBF6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tips */}
      <div style={{ background: 'var(--purple-50)', borderRadius: 'var(--radius-md)', padding: '12px 14px', marginBottom: 20, border: '1px solid var(--purple-100)' }}>
        <p style={{ fontSize: 12, color: 'var(--purple-600)', lineHeight: 1.6 }}>
          💡 {lang === 'en' ? 'Poor sleep increases cortisol which worsens PCOD. Try to sleep and wake at the same time every day!' : 'खराब नींद कोर्टिसोल बढ़ाती है जो PCOD को बिगाड़ता है। हर दिन एक ही समय पर सोने और उठने की कोशिश करें!'}
        </p>
      </div>
    </div>
  )
}