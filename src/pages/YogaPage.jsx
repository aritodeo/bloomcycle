import { useState } from 'react'
import { motion } from 'framer-motion'

const TEXT = {
  en: { title: 'Yoga & Exercise', start: 'Start', done: 'Done!', benefit: 'PCOD Benefit', steps: 'How to do it', duration: 'min', difficulty: 'Level' },
  hi: { title: 'योग और व्यायाम', start: 'शुरू करें', done: 'हो गया!', benefit: 'PCOD फायदा', steps: 'कैसे करें', duration: 'मिनट', difficulty: 'स्तर' },
}

const EXERCISES = [
  {
    id: 1, emoji: '🧘', name: 'Butterfly Pose', hindiName: 'बद्ध कोणासन',
    duration: 5, difficulty: 'Easy', category: 'Yoga',
    benefit: 'Stimulates ovaries and helps regulate menstrual cycle. Reduces PCOD symptoms significantly.',
    steps: ['Sit on floor with legs stretched', 'Bend knees and bring feet together', 'Hold feet with both hands', 'Gently flap knees up and down like butterfly wings', 'Hold for 30 seconds, repeat 5 times'],
    tags: ['Ovary health', 'Stress relief'],
  },
  {
    id: 2, emoji: '🌙', name: 'Child\'s Pose', hindiName: 'बालासन',
    duration: 3, difficulty: 'Easy', category: 'Yoga',
    benefit: 'Calms the nervous system and reduces cortisol levels which worsen PCOD.',
    steps: ['Kneel on the floor', 'Sit back on your heels', 'Stretch arms forward on floor', 'Rest forehead on ground', 'Breathe deeply for 1-2 minutes'],
    tags: ['Stress relief', 'Relaxation'],
  },
  {
    id: 3, emoji: '⚡', name: 'Surya Namaskar', hindiName: 'सूर्य नमस्कार',
    duration: 15, difficulty: 'Medium', category: 'Exercise',
    benefit: 'Full body workout that improves insulin sensitivity and hormonal balance in PCOD.',
    steps: ['Stand straight, join palms', 'Raise arms and bend back', 'Bend forward touch toes', 'Step right leg back', 'Plank position', 'Lower to ground', 'Cobra pose', 'Downward dog', 'Step forward', 'Rise up', 'Return to start', 'Repeat 5-10 rounds'],
    tags: ['Full body', 'Insulin control'],
  },
  {
    id: 4, emoji: '🚶', name: 'Brisk Walking', hindiName: 'तेज़ चलना',
    duration: 30, difficulty: 'Easy', category: 'Exercise',
    benefit: 'Most effective exercise for PCOD. Reduces insulin resistance and helps with weight management.',
    steps: ['Wear comfortable shoes', 'Start with 5 min slow walk', 'Increase pace gradually', 'Maintain brisk pace for 20 min', 'Cool down with 5 min slow walk', 'Do this 5 days a week'],
    tags: ['Weight management', 'Insulin control'],
  },
  {
    id: 5, emoji: '🧘', name: 'Seated Twist', hindiName: 'अर्ध मत्स्येन्द्रासन',
    duration: 5, difficulty: 'Easy', category: 'Yoga',
    benefit: 'Massages reproductive organs and stimulates liver which helps detox excess hormones.',
    steps: ['Sit with legs extended', 'Bend right knee, place foot outside left thigh', 'Twist body to right', 'Place left elbow outside right knee', 'Hold 30 seconds each side', 'Repeat 3 times'],
    tags: ['Hormone balance', 'Detox'],
  },
  {
    id: 6, emoji: '💪', name: 'Strength Training', hindiName: 'शक्ति व्यायाम',
    duration: 20, difficulty: 'Medium', category: 'Exercise',
    benefit: 'Builds muscle mass which improves insulin sensitivity and helps manage PCOD weight gain.',
    steps: ['Start with bodyweight squats x15', 'Lunges x10 each leg', 'Push-ups x10', 'Glute bridges x15', 'Plank hold 30 seconds', 'Rest 1 min, repeat 3 rounds'],
    tags: ['Weight management', 'Muscle building'],
  },
]

const CATEGORIES = ['All', 'Yoga', 'Exercise']

export default function YogaPage({ lang }) {
  const t = TEXT[lang] || TEXT.en
  const [category, setCategory] = useState('All')
  const [selected, setSelected] = useState(null)
  const [timer, setTimer] = useState(null)
  const [timeLeft, setTimeLeft] = useState(0)

 
  const filteredExercises = category === 'All' ? EXERCISES : EXERCISES.filter(e => e.category === category)

  const startTimer = (minutes) => {
    setTimeLeft(minutes * 60)
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(interval); return 0 }
        return prev - 1
      })
    }, 1000)
    setTimer(interval)
  }

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  if (selected) {
    const e = selected
    return (
      <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} style={{ padding: '20px 16px' }}>
        <button onClick={() => { setSelected(null); setTimeLeft(0); if (timer) clearInterval(timer) }} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--pink-400)', fontSize: 14, marginBottom: 16, cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'var(--font-body)' }}>
          ← {lang === 'en' ? 'Back' : 'वापस'}
        </button>

        <div style={{ background: 'linear-gradient(135deg, var(--purple-50), var(--pink-100))', borderRadius: 'var(--radius-lg)', padding: '24px', marginBottom: 16, textAlign: 'center' }}>
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ fontSize: 64, marginBottom: 8 }}>{e.emoji}</motion.div>
          <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--purple-600)' }}>{lang === 'en' ? e.name : e.hindiName}</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 10 }}>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>⏱ {e.duration} {t.duration}</span>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>📊 {e.difficulty}</span>
          </div>

          {timeLeft > 0 ? (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ marginTop: 16, fontSize: 36, fontWeight: 700, color: 'var(--pink-600)' }}>
              {formatTime(timeLeft)}
            </motion.div>
          ) : (
            <button onClick={() => startTimer(e.duration)} style={{ marginTop: 16, padding: '10px 24px', background: 'var(--pink-400)', color: 'white', borderRadius: 'var(--radius-full)', fontSize: 14, fontWeight: 500, cursor: 'pointer', border: 'none', fontFamily: 'var(--font-body)' }}>
              ▶ {t.start}
            </button>
          )}
        </div>

        <div style={card}>
          <div style={cardTitle}>🌿 {t.benefit}</div>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{e.benefit}</p>
        </div>

        <div style={card}>
          <div style={cardTitle}>📋 {t.steps}</div>
          {e.steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: i < e.steps.length - 1 ? '1px solid var(--pink-100)' : 'none' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--purple-400)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, flexShrink: 0 }}>{i + 1}</div>
              <span style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.6 }}>{step}</span>
            </div>
          ))}
        </div>
      </motion.div>
    )
  }

  return (
    <div style={{ padding: '20px 16px' }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)} style={{ padding: '6px 14px', borderRadius: 'var(--radius-full)', border: category === cat ? '1.5px solid var(--purple-400)' : '1px solid var(--pink-200)', background: category === cat ? 'var(--purple-400)' : 'white', color: category === cat ? 'white' : 'var(--text-secondary)', fontSize: 12, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {filteredExercises.map((e, i) => (
          <motion.div key={e.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} onClick={() => setSelected(e)} style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--pink-200)', padding: '14px', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ fontSize: 36, textAlign: 'center', marginBottom: 8 }}>{e.emoji}</div>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 4, lineHeight: 1.3 }}>{lang === 'en' ? e.name : e.hindiName}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8 }}>⏱ {e.duration} {t.duration}</div>
            <span style={{ fontSize: 10, background: 'var(--purple-50)', color: 'var(--purple-600)', padding: '2px 6px', borderRadius: 'var(--radius-full)' }}>{e.difficulty}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const card = { background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--pink-200)', padding: '16px', marginBottom: 14 }
const cardTitle = { fontSize: 15, fontWeight: 500, color: 'var(--purple-600)', marginBottom: 12 }