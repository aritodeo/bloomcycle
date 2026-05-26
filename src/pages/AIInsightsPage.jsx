import { useState } from 'react'
import { motion } from 'framer-motion'

const QUICK_QUESTIONS = {
  en: [
    'Why is my cycle irregular with PCOD?',
    'Best foods for PCOD?',
    'How to manage PCOD weight gain?',
    'Can PCOD affect fertility?',
    'What exercises help PCOD?',
  ],
  hi: [
    'PCOD में मेरा चक्र अनियमित क्यों है?',
    'PCOD के लिए सबसे अच्छे खाद्य पदार्थ?',
    'PCOD वजन बढ़ने को कैसे प्रबंधित करें?',
    'क्या PCOD प्रजनन क्षमता को प्रभावित कर सकता है?',
    'कौन से व्यायाम PCOD में मदद करते हैं?',
  ],
}

export default function AIInsightsPage({ cycleData, lang }) {
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [chatHistory, setChatHistory] = useState([])

  const { avgLength, today, daysUntilNext, fertileDays } = cycleData

  const askAI = async (q) => {
    const query = q || question
    if (!query.trim()) return
    setLoading(true)
    setError('')
    setQuestion('')

    const userMessage = { role: 'user', content: query }
    setChatHistory(prev => [...prev, userMessage])

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `You are BloomCycle AI, a warm PCOD wellness assistant for Indian women. User cycle: ${avgLength} day average, day ${today} of cycle, next period in ${daysUntilNext} days. Be compassionate, practical. Keep responses to 3-4 sentences. Add relevant emojis.`,
          messages: [...chatHistory, userMessage],
        }),
      })
      if (!response.ok) throw new Error('API request failed')
      const data = await response.json()
      const text = data.content?.map(c => c.text || '').join('') || 'No response received.'
      setChatHistory(prev => [...prev, { role: 'assistant', content: text }])
    } catch {
      setError(lang === 'en' ? 'Could not connect to AI. Add your API key to .env file.' : 'AI से कनेक्ट नहीं हो सका।')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '20px 16px' }}>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ background: 'linear-gradient(135deg, #534AB7, #7F77DD)', borderRadius: 'var(--radius-xl)', padding: '24px', marginBottom: 20, color: 'white', boxShadow: '0 8px 32px rgba(127,119,221,0.3)', position: 'relative', overflow: 'hidden' }}
      >
        <div style={{ position: 'absolute', top: -20, right: -20, fontSize: 80, opacity: 0.1 }}>✨</div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 13, opacity: 0.9, marginBottom: 4 }}>✨ {lang === 'en' ? 'AI Wellness Guide' : 'AI वेलनेस गाइड'}</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, marginBottom: 8 }}>
            {lang === 'en' ? 'Your Personal PCOD Assistant' : 'आपका व्यक्तिगत PCOD सहायक'}
          </div>
          <p style={{ fontSize: 13, opacity: 0.9, lineHeight: 1.6 }}>
            {lang === 'en'
              ? `Your next period is in ${daysUntilNext} days. Fertile window: days ${fertileDays[0]}-${fertileDays[fertileDays.length - 1]}.`
              : `आपका अगला मासिक ${daysUntilNext} दिनों में है। उपजाऊ खिड़की: दिन ${fertileDays[0]}-${fertileDays[fertileDays.length - 1]}।`
            }
          </p>
        </div>
      </motion.div>

      {chatHistory.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          {chatHistory.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: 10 }}
            >
              <div style={{
                maxWidth: '80%', padding: '12px 16px',
                borderRadius: msg.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                background: msg.role === 'user' ? 'linear-gradient(135deg, var(--pink-400), var(--purple-400))' : 'white',
                color: msg.role === 'user' ? 'white' : 'var(--text-primary)',
                fontSize: 13, lineHeight: 1.7,
                boxShadow: 'var(--shadow-card)',
                border: msg.role === 'assistant' ? '1px solid var(--purple-100)' : 'none',
              }}>
                {msg.role === 'assistant' && (
                  <div style={{ fontSize: 11, color: 'var(--purple-400)', fontWeight: 600, marginBottom: 4 }}>🌸 BloomCycle AI</div>
                )}
                {msg.content}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {loading && (
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 10 }}>
          <div style={{ background: 'white', padding: '12px 16px', borderRadius: '20px 20px 20px 4px', boxShadow: 'var(--shadow-card)', border: '1px solid var(--purple-100)' }}>
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ fontSize: 13, color: 'var(--purple-400)' }}
            >
              ✨ {lang === 'en' ? 'Thinking...' : 'सोच रहा हूं...'}
            </motion.div>
          </div>
        </div>
      )}

      {error && (
        <div style={{ padding: '12px 14px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 'var(--radius-md)', fontSize: 13, color: '#DC2626', marginBottom: 16 }}>
          {error}
        </div>
      )}

      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, fontWeight: 500 }}>
          {lang === 'en' ? '💡 Quick questions:' : '💡 त्वरित प्रश्न:'}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {QUICK_QUESTIONS[lang].map(q => (
            <motion.button
              key={q}
              whileTap={{ scale: 0.95 }}
              onClick={() => askAI(q)}
              style={{ padding: '7px 14px', borderRadius: 'var(--radius-full)', border: '1px solid var(--purple-100)', background: 'var(--purple-50)', color: 'var(--purple-600)', fontSize: 12, fontFamily: 'var(--font-body)', cursor: 'pointer' }}
            >
              {q}
            </motion.button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <input
          type="text"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && askAI()}
          placeholder={lang === 'en' ? 'Ask anything about PCOD...' : 'PCOD के बारे में कुछ भी पूछें...'}
          style={{ flex: 1, padding: '12px 16px', border: '1.5px solid var(--purple-100)', borderRadius: 'var(--radius-full)', fontSize: 13, background: 'white', color: 'var(--text-primary)', boxShadow: 'var(--shadow-sm)' }}
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => askAI()}
          disabled={loading}
          style={{ padding: '12px 16px', background: loading ? 'var(--gray-200)' : 'linear-gradient(135deg, var(--purple-400), var(--pink-400))', color: 'white', borderRadius: 'var(--radius-full)', fontSize: 14, fontWeight: 600, border: 'none', fontFamily: 'var(--font-body)', boxShadow: 'var(--shadow-md)', minWidth: 52 }}
        >
          {loading ? '...' : '↑'}
        </motion.button>
      </div>

      <div style={{ background: 'var(--amber-50)', borderRadius: 'var(--radius-md)', padding: '12px 14px', marginBottom: 20, border: '1px solid rgba(186,117,23,0.2)' }}>
        <p style={{ fontSize: 12, color: 'var(--amber-400)', lineHeight: 1.6 }}>
          🤖 {lang === 'en' ? 'AI responses are for informational purposes only. Always consult your doctor.' : 'AI प्रतिक्रियाएं केवल सूचनात्मक उद्देश्यों के लिए हैं। हमेशा अपने डॉक्टर से सलाह लें।'}
        </p>
      </div>
    </div>
  )
}