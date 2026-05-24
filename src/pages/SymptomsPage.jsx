import { useState } from 'react'

const MOODS = [
  { emoji: '😊', label: 'Great' },
  { emoji: '😐', label: 'Okay' },
  { emoji: '😔', label: 'Low' },
  { emoji: '😰', label: 'Anxious' },
  { emoji: '😤', label: 'Irritable' },
]

const SYMPTOMS = [
  { label: 'Bloating', icon: '🫧' },
  { label: 'Cramps', icon: '⚡' },
  { label: 'Fatigue', icon: '😴' },
  { label: 'Headache', icon: '🤕' },
  { label: 'Acne', icon: '🔴' },
  { label: 'Nausea', icon: '🌊' },
  { label: 'Heavy flow', icon: '💧' },
  { label: 'Insomnia', icon: '🌙' },
  { label: 'Hair loss', icon: '🌾' },
  { label: 'Weight gain', icon: '⚖️' },
]

export default function SymptomsPage({ logs, setLogs }) {
  const [mood, setMood] = useState('')
  const [symptoms, setSymptoms] = useState([])
  const [pain, setPain] = useState(0)
  const [notes, setNotes] = useState('')
  const [saved, setSaved] = useState(false)

  const today = new Date().toISOString().slice(0, 10)

  const toggleSymptom = (label) => {
    setSymptoms(prev => prev.includes(label) ? prev.filter(s => s !== label) : [...prev, label])
  }

  const handleSave = () => {
    setLogs(prev => [{ date: today, mood, symptoms, pain, notes }, ...prev.filter(l => l.date !== today)])
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div style={{ padding: '20px 16px' }}>

      <div style={card}>
        <div style={cardTitle}>🌸 How are you feeling today?</div>
        <div style={{ display: 'flex', justifyContent: 'space-around', gap: 6 }}>
          {MOODS.map(m => (
            <button key={m.label} onClick={() => setMood(m.label)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '10px 8px', borderRadius: 'var(--radius-md)', border: mood === m.label ? '1.5px solid var(--pink-400)' : '1px solid var(--border-light)', background: mood === m.label ? 'var(--pink-100)' : 'var(--pink-50)', color: mood === m.label ? 'var(--pink-600)' : 'var(--text-muted)', fontSize: 11, fontWeight: mood === m.label ? 600 : 400, minWidth: 52 }}>
              <span style={{ fontSize: 22 }}>{m.emoji}</span>
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div style={card}>
        <div style={cardTitle}>💊 Physical symptoms</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {SYMPTOMS.map(s => (
            <button key={s.label} onClick={() => toggleSymptom(s.label)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: symptoms.includes(s.label) ? '1.5px solid var(--pink-400)' : '1px solid var(--border-light)', background: symptoms.includes(s.label) ? 'var(--pink-100)' : 'white', color: symptoms.includes(s.label) ? 'var(--pink-600)' : 'var(--text-secondary)', fontSize: 13, textAlign: 'left' }}>
              <span style={{ fontSize: 16 }}>{s.icon}</span> {s.label}
            </button>
          ))}
        </div>
      </div>

      <div style={card}>
        <div style={cardTitle}>⚡ Pain intensity</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>None</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--pink-400)' }}>{pain}/10</span>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Severe</span>
        </div>
        <input type="range" min="0" max="10" step="1" value={pain} onChange={e => setPain(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--pink-400)' }} />
      </div>

      <div style={card}>
        <div style={cardTitle}>📝 Additional notes</div>
        <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any other observations..." rows={3} style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--pink-200)', borderRadius: 'var(--radius-sm)', fontSize: 13, background: 'var(--pink-50)', resize: 'vertical', lineHeight: 1.5 }} />
      </div>

      <button onClick={handleSave} style={{ width: '100%', padding: '14px', background: saved ? 'var(--teal-400)' : 'var(--pink-400)', color: 'white', borderRadius: 'var(--radius-md)', fontSize: 15, fontWeight: 600, marginBottom: 20 }}>
        {saved ? '✓ Saved for today!' : "Save today's log"}
      </button>

      {logs.length > 0 && (
        <div style={card}>
          <div style={cardTitle}>🗓 Recent logs</div>
          {logs.slice(0, 3).map((log, i) => (
            <div key={i} style={{ padding: '10px 0', borderBottom: i < 2 ? '1px solid var(--pink-100)' : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{log.date}</span>
                <span style={{ fontSize: 12, color: 'var(--pink-400)' }}>Pain: {log.pain}/10</span>
              </div>
              {log.mood && <span style={badge}>{log.mood}</span>}
              {log.symptoms.map(s => <span key={s} style={badge}>{s}</span>)}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const card = { background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--pink-200)', padding: '16px', marginBottom: 14 }
const cardTitle = { fontSize: 15, fontWeight: 500, color: 'var(--pink-600)', marginBottom: 12 }
const badge = { display: 'inline-block', background: 'var(--pink-100)', color: 'var(--pink-600)', fontSize: 11, fontWeight: 500, padding: '2px 8px', borderRadius: 'var(--radius-full)', marginRight: 4, marginBottom: 2 }