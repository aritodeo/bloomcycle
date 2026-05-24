import { useState } from 'react'
import { motion } from 'framer-motion'

const GOAL = 8

export default function WaterTracker({ lang }) {
  const [glasses, setGlasses] = useState(0)

  const percentage = Math.min((glasses / GOAL) * 100, 100)

  const getMessage = () => {
    if (glasses === 0) return lang === 'en' ? 'Start drinking water! 💧' : 'पानी पीना शुरू करें! 💧'
    if (glasses < 4) return lang === 'en' ? 'Keep going! You can do it! 💪' : 'जारी रखें! आप कर सकती हैं! 💪'
    if (glasses < 8) return lang === 'en' ? 'Almost there! Great job! 🌸' : 'लगभग हो गया! शाबाश! 🌸'
    return lang === 'en' ? 'Goal reached! Amazing! 🎉' : 'लक्ष्य पूरा! शानदार! 🎉'
  }

  return (
    <div style={{ padding: '20px 16px' }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ background: 'linear-gradient(135deg, #534AB7, #7F77DD)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: 20, textAlign: 'center', color: 'white' }}
      >
        <div style={{ fontSize: 40, marginBottom: 8 }}>💧</div>
        <div style={{ fontSize: 18, fontWeight: 600 }}>{lang === 'en' ? 'Water Tracker' : 'पानी ट्रैकर'}</div>
        <div style={{ fontSize: 13, opacity: 0.9, marginTop: 4 }}>{lang === 'en' ? 'Stay hydrated for better PCOD management' : 'बेहतर PCOD प्रबंधन के लिए हाइड्रेटेड रहें'}</div>
      </motion.div>

      {/* Big water circle */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
        <div style={{ position: 'relative', width: 200, height: 200, marginBottom: 16 }}>
          {/* Background circle */}
          <svg width="200" height="200" style={{ position: 'absolute', top: 0, left: 0 }}>
            <circle cx="100" cy="100" r="90" fill="none" stroke="#EEEDFE" strokeWidth="12" />
            <motion.circle
              cx="100" cy="100" r="90"
              fill="none"
              stroke="#7F77DD"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 90}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 90 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 90 * (1 - percentage / 100) }}
              transition={{ duration: 0.5 }}
              style={{ transformOrigin: 'center', transform: 'rotate(-90deg)' }}
            />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: 48, fontWeight: 700, color: '#534AB7' }}>{glasses}</div>
            <div style={{ fontSize: 14, color: '#7F77DD' }}>of {GOAL} glasses</div>
          </div>
        </div>
        <div style={{ fontSize: 14, color: 'var(--text-secondary)', textAlign: 'center' }}>{getMessage()}</div>
      </div>

      {/* Glasses grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
        {Array.from({ length: GOAL }).map((_, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.9 }}
            onClick={() => setGlasses(i < glasses ? i : i + 1)}
            style={{
              aspectRatio: '1',
              borderRadius: 'var(--radius-md)',
              border: i < glasses ? '2px solid #7F77DD' : '2px solid #EEEDFE',
              background: i < glasses ? '#EEEDFE' : 'white',
              fontSize: 28,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {i < glasses ? '💧' : '🫙'}
          </motion.button>
        ))}
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: 10 }}>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setGlasses(prev => Math.min(prev + 1, GOAL))}
          style={{ flex: 1, padding: '14px', background: '#7F77DD', color: 'white', borderRadius: 'var(--radius-md)', fontSize: 15, fontWeight: 600, cursor: 'pointer', border: 'none', fontFamily: 'var(--font-body)' }}
        >
          + {lang === 'en' ? 'Add Glass' : 'गिलास जोड़ें'}
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setGlasses(prev => Math.max(prev - 1, 0))}
          style={{ padding: '14px 20px', background: 'white', color: '#7F77DD', borderRadius: 'var(--radius-md)', fontSize: 15, fontWeight: 600, cursor: 'pointer', border: '1.5px solid #EEEDFE', fontFamily: 'var(--font-body)' }}
        >
          -
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setGlasses(0)}
          style={{ padding: '14px 20px', background: 'white', color: 'var(--text-muted)', borderRadius: 'var(--radius-md)', fontSize: 15, fontWeight: 600, cursor: 'pointer', border: '1.5px solid var(--pink-200)', fontFamily: 'var(--font-body)' }}
        >
          🔄
        </motion.button>
      </div>

      {/* Tip */}
      <div style={{ background: 'var(--purple-50)', borderRadius: 'var(--radius-md)', padding: '12px 14px', marginTop: 16, marginBottom: 20, border: '1px solid var(--purple-100)' }}>
        <p style={{ fontSize: 12, color: 'var(--purple-600)', lineHeight: 1.6 }}>
          💡 {lang === 'en' ? 'Drinking 8 glasses of water daily helps flush excess hormones and reduces PCOD bloating significantly!' : 'रोज 8 गिलास पानी पीने से अतिरिक्त हार्मोन बाहर निकलते हैं और PCOD में सूजन कम होती है!'}
        </p>
      </div>
    </div>
  )
}