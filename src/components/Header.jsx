import { motion } from 'framer-motion'

const TEXT = {
  en: { cycle: 'My Cycle', symptoms: 'Symptom Log', reminders: 'Reminders', tips: 'Wellness Tips', ai: 'AI Insights', next: 'Next period in', days: 'days', journal: 'Mood Journal', recipes: 'PCOD Recipes', yoga: 'Yoga & Exercise', report: 'Doctor Report', community: 'Community', score: 'PCOD Test', ayurvedic: 'Ayurveda', water: 'Water Tracker', bmi: 'BMI Tracker', sleep: 'Sleep Tracker', pain: 'Pain Relief', hormone: 'Hormone Tracker' },
  hi: { cycle: 'मेरा चक्र', symptoms: 'लक्षण लॉग', reminders: 'रिमाइंडर', tips: 'वेलनेस टिप्स', ai: 'AI अंतर्दृष्टि', next: 'अगला मासिक', days: 'दिन में', journal: 'मूड जर्नल', recipes: 'PCOD रेसिपी', yoga: 'योग और व्यायाम', report: 'डॉक्टर रिपोर्ट', community: 'समुदाय', score: 'PCOD टेस्ट', ayurvedic: 'आयुर्वेद', water: 'पानी ट्रैकर', bmi: 'BMI ट्रैकर', sleep: 'नींद ट्रैकर', pain: 'दर्द राहत', hormone: 'हार्मोन ट्रैकर' },
}

export default function Header({ activeTab, cycleData, lang, setLang }) {
  const { today, periodDays, fertileDays, daysUntilNext } = cycleData
  const t = TEXT[lang]

  const getPhaseLabel = () => {
    if (periodDays.includes(today)) return { text: lang === 'en' ? `Period · Day ${periodDays.indexOf(today) + 1}` : `माहवारी · दिन ${periodDays.indexOf(today) + 1}`, color: 'var(--pink-400)', bg: 'var(--pink-100)' }
    if (fertileDays.includes(today)) return { text: lang === 'en' ? 'Fertile window' : 'उपजाऊ समय', color: 'var(--purple-600)', bg: 'var(--purple-50)' }
    return { text: lang === 'en' ? 'Luteal phase' : 'ल्यूटियल चरण', color: 'var(--teal-600)', bg: 'var(--teal-50)' }
  }

  const phase = getPhaseLabel()

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      style={{
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        padding: '14px 20px',
        borderBottom: '1px solid rgba(212,83,126,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 20px rgba(212,83,126,0.08)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ fontSize: 28, filter: 'drop-shadow(0 2px 4px rgba(212,83,126,0.3))' }}
          >
            🌸
          </motion.div>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 20,
              fontWeight: 600,
              background: 'linear-gradient(135deg, #D4537E, #7F77DD)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              BloomCycle
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>
              {t[activeTab] || 'Wellness'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Language toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            style={{
              padding: '5px 12px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--pink-200)',
              background: 'var(--pink-50)',
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--pink-600)',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            {lang === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 EN'}
          </motion.button>

          {/* Day ring */}
          <motion.div
            animate={{ boxShadow: ['0 0 0 0 rgba(212,83,126,0.3)', '0 0 0 6px rgba(212,83,126,0)', '0 0 0 0 rgba(212,83,126,0)'] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              width: 46,
              height: 46,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FBEAF0, white)',
              border: '2px solid var(--pink-400)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <span style={{ fontSize: 9, color: 'var(--text-muted)', lineHeight: 1 }}>{lang === 'en' ? 'Day' : 'दिन'}</span>
            <span style={{ fontSize: 17, fontWeight: 700, color: 'var(--pink-600)', lineHeight: 1.2 }}>{today}</span>
          </motion.div>
        </div>
      </div>

      {/* Phase badges */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '4px 12px', borderRadius: 'var(--radius-full)',
            background: phase.bg, color: phase.color,
            fontSize: 11, fontWeight: 600,
            border: `1px solid ${phase.color}25`,
            boxShadow: `0 2px 8px ${phase.color}20`,
          }}
        >
          ● {phase.text}
        </motion.span>
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '4px 12px', borderRadius: 'var(--radius-full)',
            background: 'var(--purple-50)', color: 'var(--purple-600)',
            fontSize: 11, fontWeight: 600,
            border: '1px solid var(--purple-100)',
            boxShadow: '0 2px 8px rgba(127,119,221,0.15)',
          }}
        >
          ✨ {t.next} {daysUntilNext} {t.days}
        </motion.span>
      </div>
    </motion.header>
  )
}