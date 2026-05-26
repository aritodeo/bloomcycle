import { useState } from 'react'
import { motion } from 'framer-motion'

const HORMONES = [
  { id: 1, name: 'LH', fullName: 'Luteinizing Hormone', hindi: 'एलएच हार्मोन', unit: 'mIU/mL', normalRange: '2-15', low: 2, high: 15, info: 'High LH is common in PCOD. It affects ovulation and egg release.', hindiInfo: 'PCOD में उच्च LH सामान्य है। यह ओव्यूलेशन को प्रभावित करता है।' },
  { id: 2, name: 'FSH', fullName: 'Follicle Stimulating Hormone', hindi: 'एफएसएच हार्मोन', unit: 'mIU/mL', normalRange: '3-10', low: 3, high: 10, info: 'FSH stimulates egg growth. Low FSH can affect fertility in PCOD.', hindiInfo: 'FSH अंडे के विकास को उत्तेजित करता है। कम FSH PCOD में प्रजनन को प्रभावित कर सकता है।' },
  { id: 3, name: 'Testosterone', fullName: 'Total Testosterone', hindi: 'टेस्टोस्टेरोन', unit: 'ng/dL', normalRange: '15-70', low: 15, high: 70, info: 'High testosterone causes acne, facial hair and irregular periods in PCOD.', hindiInfo: 'उच्च टेस्टोस्टेरोन PCOD में मुंहासे और अनियमित मासिक का कारण बनता है।' },
  { id: 4, name: 'Insulin', fullName: 'Fasting Insulin', hindi: 'इंसुलिन', unit: 'μIU/mL', normalRange: '2-25', low: 2, high: 25, info: 'High insulin causes weight gain and worsens PCOD symptoms.', hindiInfo: 'उच्च इंसुलिन वजन बढ़ाता है और PCOD के लक्षणों को बढ़ाता है।' },
  { id: 5, name: 'AMH', fullName: 'Anti-Mullerian Hormone', hindi: 'एएमएच हार्मोन', unit: 'ng/mL', normalRange: '1-3.5', low: 1, high: 3.5, info: 'High AMH indicates many small follicles in ovaries, typical of PCOD.', hindiInfo: 'उच्च AMH अंडाशय में कई छोटे फॉलिकल्स का संकेत देता है।' },
  { id: 6, name: 'TSH', fullName: 'Thyroid Stimulating Hormone', hindi: 'थायरॉइड', unit: 'mIU/L', normalRange: '0.4-4', low: 0.4, high: 4, info: 'Thyroid issues often coexist with PCOD. Both affect periods.', hindiInfo: 'थायरॉइड समस्याएं अक्सर PCOD के साथ होती हैं।' },
]

export default function HormoneTracker({ lang }) {
  const [results, setResults] = useState({})
  const [saved, setSaved] = useState(false)
  const [testDate, setTestDate] = useState('')

  const getStatus = (hormone, value) => {
    const v = parseFloat(value)
    if (isNaN(v)) return null
    if (v < hormone.low) return { label: 'Low', color: '#534AB7', bg: '#EEEDFE' }
    if (v > hormone.high) return { label: 'High', color: '#D4537E', bg: '#FBEAF0' }
    return { label: 'Normal', color: '#1D9E75', bg: '#E1F5EE' }
  }

  return (
    <div style={{ padding: '20px 16px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ background: 'linear-gradient(135deg, #0F6E56, #1D9E75)', borderRadius: 'var(--radius-xl)', padding: '24px', marginBottom: 20, textAlign: 'center', color: 'white', boxShadow: '0 8px 32px rgba(29,158,117,0.3)' }}
      >
        <div style={{ fontSize: 40, marginBottom: 8 }}>🧬</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600 }}>{lang === 'en' ? 'Hormone Test Tracker' : 'हार्मोन टेस्ट ट्रैकर'}</div>
        <div style={{ fontSize: 13, opacity: 0.9, marginTop: 4 }}>{lang === 'en' ? 'Log and understand your hormone results' : 'अपने हार्मोन परिणाम लॉग करें और समझें'}</div>
      </motion.div>

      <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--pink-200)', padding: '16px', marginBottom: 16, boxShadow: 'var(--shadow-card)' }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--pink-600)', marginBottom: 8 }}>📅 {lang === 'en' ? 'Test date' : 'टेस्ट की तारीख'}</div>
        <input type="date" value={testDate} onChange={e => setTestDate(e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--pink-200)', borderRadius: 'var(--radius-sm)', fontSize: 14, background: 'var(--pink-50)', fontFamily: 'var(--font-body)' }} />
      </div>

      {HORMONES.map((hormone, i) => {
        const status = getStatus(hormone, results[hormone.id])
        return (
          <motion.div
            key={hormone.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--pink-200)', padding: '16px', marginBottom: 12, boxShadow: 'var(--shadow-card)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>{hormone.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{lang === 'en' ? hormone.fullName : hormone.hindi}</div>
              </div>
              {status && (
                <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 'var(--radius-full)', background: status.bg, color: status.color }}>
                  {status.label}
                </span>
              )}
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
              <input
                type="number"
                value={results[hormone.id] || ''}
                onChange={e => setResults(prev => ({ ...prev, [hormone.id]: e.target.value }))}
                placeholder={`Normal: ${hormone.normalRange} ${hormone.unit}`}
                style={{ flex: 1, padding: '10px 12px', border: `1px solid ${status ? status.color + '40' : 'var(--pink-200)'}`, borderRadius: 'var(--radius-sm)', fontSize: 13, background: status ? status.bg : 'var(--pink-50)', fontFamily: 'var(--font-body)' }}
              />
              <span style={{ fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{hormone.unit}</span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {lang === 'en' ? hormone.info : hormone.hindiInfo}
            </p>
          </motion.div>
        )
      })}

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500) }}
        style={{ width: '100%', padding: '14px', background: saved ? 'var(--teal-400)' : 'linear-gradient(135deg, #0F6E56, #1D9E75)', color: 'white', borderRadius: 'var(--radius-md)', fontSize: 15, fontWeight: 600, cursor: 'pointer', border: 'none', fontFamily: 'var(--font-body)', marginBottom: 20, boxShadow: '0 4px 16px rgba(29,158,117,0.3)' }}
      >
        {saved ? '✓ Results Saved!' : (lang === 'en' ? '💾 Save Results' : '💾 परिणाम सेव करें')}
      </motion.button>

      <div style={{ background: 'var(--amber-50)', borderRadius: 'var(--radius-md)', padding: '12px 14px', marginBottom: 20, border: '1px solid rgba(186,117,23,0.2)' }}>
        <p style={{ fontSize: 12, color: 'var(--amber-400)', lineHeight: 1.6 }}>
          ⚠️ {lang === 'en' ? 'Always consult your doctor to interpret hormone results. Normal ranges may vary by lab.' : 'हार्मोन परिणामों की व्याख्या के लिए हमेशा अपने डॉक्टर से सलाह लें।'}
        </p>
      </div>
    </div>
  )
}