import { useState } from 'react'

const ICONS = { pill: '💊', heart: '❤️', droplet: '💧', stethoscope: '🩺', bell: '🔔' }
const COLORS = [
  { bg: 'var(--pink-100)', color: 'var(--pink-600)' },
  { bg: 'var(--purple-50)', color: 'var(--purple-600)' },
  { bg: 'var(--teal-50)', color: 'var(--teal-600)' },
  { bg: 'var(--amber-50)', color: 'var(--amber-400)' },
]

export default function RemindersPage({ reminders, setReminders }) {
  const [name, setName] = useState('')
  const [time, setTime] = useState('')
  const [type, setType] = useState('pill')

  const toggleReminder = (id) => setReminders(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r))
  const deleteReminder = (id) => setReminders(prev => prev.filter(r => r.id !== id))
  const addReminder = () => {
    if (!name.trim()) return
    setReminders(prev => [...prev, { id: Date.now(), name: name.trim(), time: time || 'Custom', type, active: true }])
    setName(''); setTime('')
  }

  return (
    <div style={{ padding: '20px 16px' }}>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
        <div style={{ background: 'var(--pink-100)', borderRadius: 'var(--radius-md)', padding: '14px', textAlign: 'center' }}>
          <div style={{ fontSize: 26, fontWeight: 600, color: 'var(--pink-400)' }}>{reminders.filter(r => r.active).length}</div>
          <div style={{ fontSize: 12, color: 'var(--pink-600)' }}>Active reminders</div>
        </div>
        <div style={{ background: 'var(--purple-50)', borderRadius: 'var(--radius-md)', padding: '14px', textAlign: 'center' }}>
          <div style={{ fontSize: 26, fontWeight: 600, color: 'var(--purple-400)' }}>{reminders.length}</div>
          <div style={{ fontSize: 12, color: 'var(--purple-600)' }}>Total set</div>
        </div>
      </div>

      <div style={card}>
        <div style={cardTitle}>🔔 Medication & reminders</div>
        {reminders.map((rem, i) => {
          const c = COLORS[i % COLORS.length]
          return (
            <div key={rem.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < reminders.length - 1 ? '1px solid var(--pink-100)' : 'none', opacity: rem.active ? 1 : 0.5 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: c.bg, color: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                  {ICONS[rem.type] || '🔔'}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{rem.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{rem.time}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button onClick={() => deleteReminder(rem.id)} style={{ fontSize: 14, color: 'var(--text-muted)', padding: 4 }}>🗑</button>
                <div onClick={() => toggleReminder(rem.id)} style={{ width: 44, height: 24, borderRadius: 12, background: rem.active ? 'var(--pink-400)' : 'var(--gray-200)', position: 'relative', cursor: 'pointer', transition: 'background 0.2s' }}>
                  <div style={{ position: 'absolute', top: 3, left: rem.active ? 22 : 3, width: 18, height: 18, borderRadius: '50%', background: 'white', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div style={card}>
        <div style={cardTitle}>➕ Add new reminder</div>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Medication or reminder name" style={inputStyle} />
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <input type="time" value={time} onChange={e => setTime(e.target.value)} style={{ ...inputStyle, flex: 1, marginTop: 0 }} />
          <select value={type} onChange={e => setType(e.target.value)} style={{ ...inputStyle, flex: 1, marginTop: 0 }}>
            <option value="pill">💊 Medication</option>
            <option value="heart">❤️ Supplement</option>
            <option value="droplet">💧 Water</option>
            <option value="stethoscope">🩺 Appointment</option>
            <option value="bell">🔔 Other</option>
          </select>
        </div>
        <button onClick={addReminder} style={{ width: '100%', marginTop: 12, padding: '12px', background: 'var(--pink-400)', color: 'white', borderRadius: 'var(--radius-sm)', fontSize: 14, fontWeight: 500 }}>
          Add reminder
        </button>
      </div>
    </div>
  )
}

const card = { background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--pink-200)', padding: '16px', marginBottom: 14 }
const cardTitle = { fontSize: 15, fontWeight: 500, color: 'var(--pink-600)', marginBottom: 12 }
const inputStyle = { width: '100%', padding: '10px 12px', border: '1px solid var(--pink-200)', borderRadius: 'var(--radius-sm)', fontSize: 13, background: 'var(--pink-50)' }