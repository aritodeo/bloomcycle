import { useState } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { motion } from 'framer-motion'

const TEXT = {
  en: { title: 'Mood Journal', weekly: 'Weekly Mood', pain: 'Pain Levels', symptoms: 'Top Symptoms', score: 'Wellness Score' },
  hi: { title: 'मूड जर्नल', weekly: 'साप्ताहिक मूड', pain: 'दर्द स्तर', symptoms: 'मुख्य लक्षण', score: 'स्वास्थ्य स्कोर' },
}

const MOOD_DATA = [
  { day: 'Mon', mood: 3, pain: 6 },
  { day: 'Tue', mood: 4, pain: 4 },
  { day: 'Wed', mood: 2, pain: 7 },
  { day: 'Thu', mood: 3, pain: 5 },
  { day: 'Fri', mood: 5, pain: 2 },
  { day: 'Sat', mood: 4, pain: 3 },
  { day: 'Sun', mood: 4, pain: 2 },
]

const SYMPTOM_DATA = [
  { name: 'Bloating', value: 5, color: '#D4537E' },
  { name: 'Cramps', value: 4, color: '#7F77DD' },
  { name: 'Fatigue', value: 6, color: '#1D9E75' },
  { name: 'Headache', value: 2, color: '#BA7517' },
]

const WELLNESS_SCORE = 72

export default function MoodJournal({ lang }) {
  const t = TEXT[lang] || TEXT.en
  const [activeChart, setActiveChart] = useState('mood')

  return (
    <div style={{ padding: '20px 16px' }}>

      {/* Wellness Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ background: 'linear-gradient(135deg, var(--pink-400), var(--purple-400))', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: 16, textAlign: 'center', color: 'white' }}
      >
        <div style={{ fontSize: 13, opacity: 0.9, marginBottom: 8 }}>🌸 {t.score}</div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
          style={{ fontSize: 56, fontWeight: 700, lineHeight: 1 }}
        >
          {WELLNESS_SCORE}
        </motion.div>
        <div style={{ fontSize: 12, opacity: 0.8, marginTop: 6 }}>out of 100 — Keep going! 💪</div>
        <div style={{ marginTop: 12, background: 'rgba(255,255,255,0.2)', borderRadius: 99, height: 8, overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${WELLNESS_SCORE}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ height: '100%', background: 'white', borderRadius: 99 }}
          />
        </div>
      </motion.div>

      {/* Chart selector */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {[
          { id: 'mood', label: '😊 ' + t.weekly },
          { id: 'pain', label: '⚡ ' + t.pain },
          { id: 'symptoms', label: '🌸 ' + t.symptoms },
        ].map(c => (
          <button
            key={c.id}
            onClick={() => setActiveChart(c.id)}
            style={{ flex: 1, padding: '8px 4px', borderRadius: 'var(--radius-sm)', border: activeChart === c.id ? '1.5px solid var(--pink-400)' : '1px solid var(--pink-200)', background: activeChart === c.id ? 'var(--pink-100)' : 'white', color: activeChart === c.id ? 'var(--pink-600)' : 'var(--text-muted)', fontSize: 11, fontWeight: activeChart === c.id ? 600 : 400, cursor: 'pointer' }}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Charts */}
      <motion.div
        key={activeChart}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--pink-200)', padding: '16px', marginBottom: 16 }}
      >
        {activeChart === 'mood' && (
          <>
            <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--pink-600)', marginBottom: 12 }}>😊 {t.weekly}</div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={MOOD_DATA}>
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9a9a9a' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 5]} hide />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid var(--pink-200)', fontSize: 12 }} />
                <Line type="monotone" dataKey="mood" stroke="#D4537E" strokeWidth={3} dot={{ fill: '#D4537E', r: 5 }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          </>
        )}

        {activeChart === 'pain' && (
          <>
            <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--pink-600)', marginBottom: 12 }}>⚡ {t.pain}</div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={MOOD_DATA}>
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9a9a9a' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 10]} hide />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid var(--pink-200)', fontSize: 12 }} />
                <Bar dataKey="pain" fill="#CECBF6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}

        {activeChart === 'symptoms' && (
          <>
            <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--pink-600)', marginBottom: 12 }}>🌸 {t.symptoms}</div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={SYMPTOM_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={4}>
                  {SYMPTOM_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 8 }}>
              {SYMPTOM_DATA.map(s => (
                <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text-secondary)' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.color }} />
                  {s.name}
                </div>
              ))}
            </div>
          </>
        )}
      </motion.div>

    </div>
  )
}