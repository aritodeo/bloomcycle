import { useState } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function BMITracker({ lang }) {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [bmi, setBmi] = useState(null)
  const [logs, setLogs] = useState([
    { date: 'May 1', weight: 68 },
    { date: 'May 7', weight: 67.5 },
    { date: 'May 14', weight: 67 },
    { date: 'May 21', weight: 66.5 },
  ])

  const calculateBMI = () => {
    if (!height || !weight) return
    const h = parseFloat(height) / 100
    const w = parseFloat(weight)
    const result = (w / (h * h)).toFixed(1)
    setBmi(result)
    setLogs(prev => [...prev, { date: 'Today', weight: w }])
  }

  const getBMIInfo = (bmi) => {
    if (bmi < 18.5) return { label: 'Underweight', hindi: 'कम वजन', color: '#534AB7', bg: '#EEEDFE', advice: 'Gaining healthy weight may help regulate your cycle.' }
    if (bmi < 25) return { label: 'Healthy Weight', hindi: 'स्वस्थ वजन', color: '#1D9E75', bg: '#E1F5EE', advice: 'Great! Maintaining healthy weight helps manage PCOD.' }
    if (bmi < 30) return { label: 'Overweight', hindi: 'अधिक वजन', color: '#BA7517', bg: '#FAEEDA', advice: 'Losing 5-10% weight can significantly improve PCOD symptoms.' }
    return { label: 'Obese', hindi: 'मोटापा', color: '#D4537E', bg: '#FBEAF0', advice: 'Weight management is crucial for PCOD. Consult your doctor.' }
  }

  const info = bmi ? getBMIInfo(parseFloat(bmi)) : null

  return (
    <div style={{ padding: '20px 16px' }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ background: 'linear-gradient(135deg, #D4537E, #7F77DD)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: 20, textAlign: 'center', color: 'white' }}
      >
        <div style={{ fontSize: 40, marginBottom: 8 }}>⚖️</div>
        <div style={{ fontSize: 18, fontWeight: 600 }}>{lang === 'en' ? 'BMI & Weight Tracker' : 'BMI और वजन ट्रैकर'}</div>
        <div style={{ fontSize: 13, opacity: 0.9, marginTop: 4 }}>{lang === 'en' ? 'Track your weight for better PCOD management' : 'बेहतर PCOD प्रबंधन के लिए वजन ट्रैक करें'}</div>
      </motion.div>

      {/* Input */}
      <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--pink-200)', padding: '16px', marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--pink-600)', marginBottom: 12 }}>📏 {lang === 'en' ? 'Calculate BMI' : 'BMI कैलकुलेट करें'}</div>
        <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>{lang === 'en' ? 'Height (cm)' : 'ऊंचाई (cm)'}</div>
            <input
              type="number"
              value={height}
              onChange={e => setHeight(e.target.value)}
              placeholder="e.g. 160"
              style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--pink-200)', borderRadius: 'var(--radius-sm)', fontSize: 14, background: 'var(--pink-50)', fontFamily: 'var(--font-body)' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>{lang === 'en' ? 'Weight (kg)' : 'वजन (kg)'}</div>
            <input
              type="number"
              value={weight}
              onChange={e => setWeight(e.target.value)}
              placeholder="e.g. 65"
              style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--pink-200)', borderRadius: 'var(--radius-sm)', fontSize: 14, background: 'var(--pink-50)', fontFamily: 'var(--font-body)' }}
            />
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={calculateBMI}
          style={{ width: '100%', padding: '12px', background: 'var(--pink-400)', color: 'white', borderRadius: 'var(--radius-sm)', fontSize: 14, fontWeight: 600, cursor: 'pointer', border: 'none', fontFamily: 'var(--font-body)' }}
        >
          {lang === 'en' ? 'Calculate BMI' : 'BMI कैलकुलेट करें'}
        </motion.button>
      </div>

      {/* BMI Result */}
      {bmi && info && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ background: info.bg, borderRadius: 'var(--radius-lg)', border: `1px solid ${info.color}30`, padding: '20px', marginBottom: 16, textAlign: 'center' }}
        >
          <div style={{ fontSize: 48, fontWeight: 700, color: info.color }}>{bmi}</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: info.color, marginBottom: 8 }}>
            {lang === 'en' ? info.label : info.hindi}
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{info.advice}</p>
        </motion.div>
      )}

      {/* BMI Scale */}
      <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--pink-200)', padding: '16px', marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--pink-600)', marginBottom: 12 }}>📊 BMI Scale</div>
        {[
          { label: 'Underweight', range: '< 18.5', color: '#534AB7', bg: '#EEEDFE' },
          { label: 'Healthy', range: '18.5 - 24.9', color: '#1D9E75', bg: '#E1F5EE' },
          { label: 'Overweight', range: '25 - 29.9', color: '#BA7517', bg: '#FAEEDA' },
          { label: 'Obese', range: '> 30', color: '#D4537E', bg: '#FBEAF0' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', borderRadius: 'var(--radius-sm)', background: item.bg, marginBottom: 6 }}>
            <span style={{ fontSize: 13, color: item.color, fontWeight: 500 }}>{item.label}</span>
            <span style={{ fontSize: 13, color: item.color }}>{item.range}</span>
          </div>
        ))}
      </div>

      {/* Weight graph */}
      <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--pink-200)', padding: '16px', marginBottom: 20 }}>
        <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--pink-600)', marginBottom: 12 }}>📈 {lang === 'en' ? 'Weight History' : 'वजन इतिहास'}</div>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={logs}>
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9a9a9a' }} axisLine={false} tickLine={false} />
            <YAxis hide domain={['auto', 'auto']} />
            <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid var(--pink-200)', fontSize: 12 }} />
            <Line type="monotone" dataKey="weight" stroke="#D4537E" strokeWidth={3} dot={{ fill: '#D4537E', r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}