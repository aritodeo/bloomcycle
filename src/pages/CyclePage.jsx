import { useState } from 'react'
import { motion } from 'framer-motion'

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

export default function CyclePage({ cycleData, setPeriodStart, lang }) {
  const { periodDays, ovulationDay, fertileDays, today, avgLength, periodLength, daysUntilNext } = cycleData
  const [newPeriodDate, setNewPeriodDate] = useState('2026-05-14')
  const [logged, setLogged] = useState(false)

  const year = 2026, month = 4
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const getDayStyle = (d) => {
    if (d === ovulationDay) return { bg: 'var(--purple-100)', border: 'var(--purple-400)', color: 'var(--purple-800)' }
    if (periodDays.includes(d)) return { bg: 'var(--pink-200)', border: 'var(--pink-400)', color: 'var(--pink-800)' }
    if (fertileDays.includes(d)) return { bg: 'var(--purple-50)', border: 'var(--purple-100)', color: 'var(--purple-600)' }
    return { bg: 'white', border: 'rgba(0,0,0,0.06)', color: 'var(--text-secondary)' }
  }

  const handleLog = () => {
    setPeriodStart(newPeriodDate)
    setLogged(true)
    setTimeout(() => setLogged(false), 2500)
  }

  return (
    <div style={{ padding: '20px 16px' }}>

      {/* Hero card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, #D4537E 0%, #7F77DD 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '24px',
          marginBottom: 20,
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(212,83,126,0.3)',
        }}
      >
        {/* Background decoration */}
        <div style={{ position: 'absolute', top: -20, right: -20, fontSize: 100, opacity: 0.1 }}>🌸</div>
        <div style={{ position: 'absolute', bottom: -10, left: -10, fontSize: 60, opacity: 0.1 }}>💮</div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 13, opacity: 0.9, marginBottom: 4 }}>
            {lang === 'en' ? '🌸 Current cycle' : '🌸 वर्तमान चक्र'}
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 600, marginBottom: 16 }}>
            {lang === 'en' ? `Day ${today}` : `दिन ${today}`}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[
              { label: lang === 'en' ? 'Avg cycle' : 'औसत चक्र', value: avgLength, unit: lang === 'en' ? 'days' : 'दिन' },
              { label: lang === 'en' ? 'Period' : 'मासिक', value: periodLength, unit: lang === 'en' ? 'days' : 'दिन' },
              { label: lang === 'en' ? 'Next in' : 'अगला', value: daysUntilNext, unit: lang === 'en' ? 'days' : 'दिन' },
            ].map(s => (
              <div key={s.label} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 'var(--radius-md)', padding: '12px 8px', textAlign: 'center', backdropFilter: 'blur(10px)' }}>
                <div style={{ fontSize: 24, fontWeight: 700 }}>{s.value}</div>
                <div style={{ fontSize: 10, opacity: 0.9, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{ background: 'white', borderRadius: 'var(--radius-xl)', padding: '20px', marginBottom: 16, boxShadow: 'var(--shadow-card)' }}
      >
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--pink-600)', marginBottom: 16, fontWeight: 500 }}>
          📅 {MONTHS[month]} {year}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4, marginBottom: 8 }}>
          {DAYS.map(d => <div key={d} style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, padding: '4px 0' }}>{d}</div>)}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4, maxWidth: 340, margin: '0 auto' }}>
          {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const d = i + 1
            const s = getDayStyle(d)
            const isToday = d === today
            return (
              <motion.div
                key={d}
                whileTap={{ scale: 0.9 }}
                style={{
                  aspectRatio: '1',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: isToday ? 700 : 400,
                  background: isToday ? 'linear-gradient(135deg, #D4537E, #7F77DD)' : s.bg,
                  border: isToday ? 'none' : `1px solid ${s.border}`,
                  color: isToday ? 'white' : s.color,
                  boxShadow: isToday ? '0 4px 12px rgba(212,83,126,0.4)' : 'none',
                  cursor: 'default',
                }}
              >
                {d}
              </motion.div>
            )
          })}
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 16, justifyContent: 'center' }}>
          {[
            { color: 'var(--pink-200)', border: 'var(--pink-400)', label: lang === 'en' ? 'Period' : 'मासिक' },
            { color: 'var(--purple-100)', border: 'var(--purple-400)', label: lang === 'en' ? 'Ovulation' : 'ओव्यूलेशन' },
            { color: 'var(--purple-50)', border: 'var(--purple-100)', label: lang === 'en' ? 'Fertile' : 'उपजाऊ' },
          ].map(l => (
            <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--text-secondary)' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: l.color, border: `1px solid ${l.border}` }} />
              {l.label}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Log period */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{ background: 'white', borderRadius: 'var(--radius-xl)', padding: '20px', boxShadow: 'var(--shadow-card)', marginBottom: 20 }}
      >
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--pink-600)', marginBottom: 12, fontWeight: 500 }}>
          💧 {lang === 'en' ? 'Log period start' : 'मासिक शुरू लॉग करें'}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            type="date"
            value={newPeriodDate}
            onChange={e => setNewPeriodDate(e.target.value)}
            style={{
              flex: 1, padding: '12px 14px',
              border: '1.5px solid var(--pink-200)',
              borderRadius: 'var(--radius-md)',
              fontSize: 14, background: 'var(--pink-50)',
              color: 'var(--text-primary)',
            }}
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleLog}
            style={{
              padding: '12px 20px',
              background: logged ? 'var(--teal-400)' : 'linear-gradient(135deg, var(--pink-400), var(--purple-400))',
              color: 'white',
              borderRadius: 'var(--radius-md)',
              fontSize: 14, fontWeight: 600,
              boxShadow: logged ? 'none' : 'var(--shadow-md)',
              border: 'none',
              fontFamily: 'var(--font-body)',
            }}
          >
            {logged ? '✓' : lang === 'en' ? 'Log' : 'लॉग'}
          </motion.button>
        </div>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 10, lineHeight: 1.6 }}>
          💡 {lang === 'en' ? 'Logging consistently helps AI predict your cycle more accurately' : 'नियमित लॉगिंग AI को आपके चक्र की सटीक भविष्यवाणी करने में मदद करती है'}
        </p>
      </motion.div>
    </div>
  )
}