import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const QUESTIONS = [
  {
    id: 1,
    question: 'How regular are your periods?',
    hindi: 'आपके मासिक धर्म कितने नियमित हैं?',
    options: [
      { text: 'Very regular (28-32 days)', hindi: 'बहुत नियमित', score: 0 },
      { text: 'Slightly irregular (33-40 days)', hindi: 'थोड़ा अनियमित', score: 1 },
      { text: 'Very irregular (40+ days)', hindi: 'बहुत अनियमित', score: 2 },
      { text: 'Rarely get periods', hindi: 'बहुत कम आते हैं', score: 3 },
    ],
  },
  {
    id: 2,
    question: 'Do you have excess facial or body hair?',
    hindi: 'क्या आपके चेहरे या शरीर पर अधिक बाल हैं?',
    options: [
      { text: 'No, not at all', hindi: 'नहीं बिल्कुल नहीं', score: 0 },
      { text: 'Slightly more than normal', hindi: 'थोड़ा अधिक', score: 1 },
      { text: 'Yes, noticeably more', hindi: 'हाँ, काफी अधिक', score: 2 },
      { text: 'Yes, significantly more', hindi: 'हाँ, बहुत अधिक', score: 3 },
    ],
  },
  {
    id: 3,
    question: 'How is your skin?',
    hindi: 'आपकी त्वचा कैसी है?',
    options: [
      { text: 'Clear and normal', hindi: 'साफ और सामान्य', score: 0 },
      { text: 'Occasionally oily/acne', hindi: 'कभी-कभी तैलीय/मुंहासे', score: 1 },
      { text: 'Frequently oily/acne', hindi: 'अक्सर तैलीय/मुंहासे', score: 2 },
      { text: 'Severe acne/very oily', hindi: 'गंभीर मुंहासे', score: 3 },
    ],
  },
  {
    id: 4,
    question: 'Have you noticed hair thinning or hair loss?',
    hindi: 'क्या आपने बालों का पतला होना या झड़ना देखा है?',
    options: [
      { text: 'No hair loss', hindi: 'कोई बाल नहीं झड़ते', score: 0 },
      { text: 'Slight thinning', hindi: 'थोड़ा पतला होना', score: 1 },
      { text: 'Noticeable hair loss', hindi: 'ध्यान देने योग्य झड़ना', score: 2 },
      { text: 'Significant hair loss', hindi: 'काफी झड़ना', score: 3 },
    ],
  },
  {
    id: 5,
    question: 'How is your weight?',
    hindi: 'आपका वजन कैसा है?',
    options: [
      { text: 'Healthy weight, easy to maintain', hindi: 'स्वस्थ वजन', score: 0 },
      { text: 'Slightly overweight', hindi: 'थोड़ा अधिक वजन', score: 1 },
      { text: 'Overweight, hard to lose', hindi: 'अधिक वजन, कम करना मुश्किल', score: 2 },
      { text: 'Obese or very hard to lose weight', hindi: 'मोटापा', score: 3 },
    ],
  },
  {
    id: 6,
    question: 'Do you experience mood swings or anxiety?',
    hindi: 'क्या आपको मूड स्विंग या चिंता होती है?',
    options: [
      { text: 'Rarely', hindi: 'शायद ही कभी', score: 0 },
      { text: 'Sometimes', hindi: 'कभी-कभी', score: 1 },
      { text: 'Frequently', hindi: 'अक्सर', score: 2 },
      { text: 'Almost always', hindi: 'लगभग हमेशा', score: 3 },
    ],
  },
  {
    id: 7,
    question: 'Do you have fatigue or low energy?',
    hindi: 'क्या आपको थकान या कम ऊर्जा होती है?',
    options: [
      { text: 'No, I feel energetic', hindi: 'नहीं, मैं ऊर्जावान हूं', score: 0 },
      { text: 'Sometimes tired', hindi: 'कभी-कभी थकान', score: 1 },
      { text: 'Often tired', hindi: 'अक्सर थकान', score: 2 },
      { text: 'Always exhausted', hindi: 'हमेशा थकान', score: 3 },
    ],
  },
  {
    id: 8,
    question: 'Have you been diagnosed with PCOD/PCOS by a doctor?',
    hindi: 'क्या डॉक्टर ने आपको PCOD/PCOS बताया है?',
    options: [
      { text: 'No diagnosis', hindi: 'कोई निदान नहीं', score: 0 },
      { text: 'Suspected but not confirmed', hindi: 'संदिग्ध लेकिन पुष्टि नहीं', score: 1 },
      { text: 'Yes, diagnosed with PCOD', hindi: 'हाँ, PCOD निदान', score: 2 },
      { text: 'Yes, severe PCOD', hindi: 'हाँ, गंभीर PCOD', score: 3 },
    ],
  },
]

const getResult = (score) => {
  if (score <= 4) return {
    level: 'Low Risk',
    hindi: 'कम जोखिम',
    emoji: '🌟',
    color: '#1D9E75',
    bg: '#E1F5EE',
    description: 'Your symptoms suggest low PCOD risk. Keep maintaining a healthy lifestyle!',
    hindiDesc: 'आपके लक्षण कम PCOD जोखिम दर्शाते हैं। स्वस्थ जीवनशैली बनाए रखें!',
    tips: ['Maintain healthy diet', 'Exercise regularly', 'Annual gynaecologist checkup'],
  }
  if (score <= 10) return {
    level: 'Mild PCOD',
    hindi: 'हल्का PCOD',
    emoji: '🌸',
    color: '#BA7517',
    bg: '#FAEEDA',
    description: 'You show mild PCOD symptoms. Lifestyle changes can help significantly!',
    hindiDesc: 'आपमें हल्के PCOD लक्षण हैं। जीवनशैली में बदलाव काफी मदद कर सकते हैं!',
    tips: ['Low-GI diet', 'Daily 30 min exercise', 'Consult a gynaecologist', 'Reduce stress'],
  }
  if (score <= 16) return {
    level: 'Moderate PCOD',
    hindi: 'मध्यम PCOD',
    emoji: '⚡',
    color: '#D4537E',
    bg: '#FBEAF0',
    description: 'You show moderate PCOD symptoms. Medical consultation is recommended!',
    hindiDesc: 'आपमें मध्यम PCOD लक्षण हैं। चिकित्सा परामर्श की सिफारिश की जाती है!',
    tips: ['See a gynaecologist soon', 'Get hormone tests done', 'Start low-GI diet immediately', 'Daily yoga and exercise'],
  }
  return {
    level: 'Severe PCOD',
    hindi: 'गंभीर PCOD',
    emoji: '🏥',
    color: '#993556',
    bg: '#FBEAF0',
    description: 'Your symptoms suggest severe PCOD. Please consult a doctor immediately!',
    hindiDesc: 'आपके लक्षण गंभीर PCOD दर्शाते हैं। कृपया तुरंत डॉक्टर से मिलें!',
    tips: ['Consult gynaecologist immediately', 'Get ultrasound and hormone tests', 'Medical treatment may be needed', 'Follow strict diet and exercise plan'],
  }
}

export default function PCODScore({ lang }) {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)

  const handleAnswer = (optionScore) => {
    const newAnswers = [...answers, optionScore]
    setAnswers(newAnswers)
    if (current < QUESTIONS.length - 1) {
      setCurrent(current + 1)
    } else {
      const total = newAnswers.reduce((sum, s) => sum + s, 0)
      setScore(total)
      setShowResult(true)
    }
  }

  const handleRestart = () => {
    setCurrent(0)
    setAnswers([])
    setShowResult(false)
    setScore(0)
  }

  const handleShare = () => {
    const result = getResult(score)
    const text = `🌸 My PCOD Risk Score on BloomCycle App!\n\nResult: ${result.level} (${score}/24)\n${result.description}\n\nCheck your PCOD score too! Download BloomCycle 🌸`
    const encoded = encodeURIComponent(text)
    window.open(`https://wa.me/?text=${encoded}`, '_blank')
  }

  const q = QUESTIONS[current]
  const result = getResult(score)
  const progress = ((current) / QUESTIONS.length) * 100

  if (showResult) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '20px 16px' }}>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          style={{ background: result.bg, borderRadius: 'var(--radius-lg)', padding: '30px 20px', textAlign: 'center', marginBottom: 16, border: `1px solid ${result.color}30` }}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ fontSize: 64, marginBottom: 12 }}
          >
            {result.emoji}
          </motion.div>
          <div style={{ fontSize: 13, color: result.color, fontWeight: 500, marginBottom: 4 }}>Your PCOD Risk Level</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: result.color, marginBottom: 4 }}>
            {lang === 'en' ? result.level : result.hindi}
          </div>
          <div style={{ fontSize: 36, fontWeight: 700, color: result.color, marginBottom: 8 }}>{score}<span style={{ fontSize: 18 }}>/24</span></div>
          <p style={{ fontSize: 13, color: '#666', lineHeight: 1.7 }}>
            {lang === 'en' ? result.description : result.hindiDesc}
          </p>
        </motion.div>

        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--pink-200)', padding: '16px', marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--pink-600)', marginBottom: 12 }}>
            💊 Recommended next steps
          </div>
          {result.tips.map((tip, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < result.tips.length - 1 ? '1px solid var(--pink-100)' : 'none' }}
            >
              <span style={{ color: result.color, fontSize: 16 }}>✓</span>
              <span style={{ fontSize: 13, color: 'var(--text-primary)' }}>{tip}</span>
            </motion.div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleShare}
            style={{ width: '100%', padding: '14px', background: '#25D366', color: 'white', borderRadius: 'var(--radius-md)', fontSize: 15, fontWeight: 600, cursor: 'pointer', border: 'none', fontFamily: 'var(--font-body)' }}
          >
            📱 Share on WhatsApp
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleRestart}
            style={{ width: '100%', padding: '14px', background: 'white', color: 'var(--pink-600)', borderRadius: 'var(--radius-md)', fontSize: 15, fontWeight: 600, cursor: 'pointer', border: '1.5px solid var(--pink-200)', fontFamily: 'var(--font-body)' }}
          >
            🔄 Take test again
          </motion.button>
        </div>

        <div style={{ background: 'var(--amber-50)', borderRadius: 'var(--radius-md)', padding: '12px 14px', border: '1px solid rgba(186,117,23,0.2)' }}>
          <p style={{ fontSize: 12, color: 'var(--amber-400)', lineHeight: 1.6 }}>
            ⚠️ This is not a medical diagnosis. Please consult a qualified gynaecologist for proper diagnosis and treatment.
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <div style={{ padding: '20px 16px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ background: 'linear-gradient(135deg, var(--pink-400), var(--purple-400))', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: 20, textAlign: 'center', color: 'white' }}
      >
        <div style={{ fontSize: 32, marginBottom: 6 }}>🎯</div>
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>PCOD Risk Calculator</div>
        <div style={{ fontSize: 12, opacity: 0.9 }}>Answer 8 questions to know your risk level</div>
        <div style={{ marginTop: 14, background: 'rgba(255,255,255,0.2)', borderRadius: 99, height: 6, overflow: 'hidden' }}>
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
            style={{ height: '100%', background: 'white', borderRadius: 99 }}
          />
        </div>
        <div style={{ fontSize: 12, marginTop: 6, opacity: 0.9 }}>Question {current + 1} of {QUESTIONS.length}</div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.2 }}
        >
          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--pink-200)', padding: '20px', marginBottom: 16 }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6, lineHeight: 1.5 }}>
              {lang === 'en' ? q.question : q.hindi}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {q.options.map((option, i) => (
              <motion.button
                key={i}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => handleAnswer(option.score)}
                style={{ width: '100%', padding: '14px 16px', background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--pink-200)', fontSize: 14, color: 'var(--text-primary)', textAlign: 'left', cursor: 'pointer', fontFamily: 'var(--font-body)', lineHeight: 1.4 }}
              >
                {lang === 'en' ? option.text : option.hindi}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}