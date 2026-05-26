import { motion } from 'framer-motion'

const TEXT = {
  en: { cycle: 'My Cycle', symptoms: 'Symptom Log', reminders: 'Reminders', tips: 'Wellness Tips', ai: 'AI Insights', next: 'Next period in', days: 'days', journal: 'Mood Journal', recipes: 'PCOD Recipes', yoga: 'Yoga & Exercise', report: 'Doctor Report', community: 'Community', score: 'PCOD Test', ayurvedic: 'Ayurveda', water: 'Water Tracker', bmi: 'BMI Tracker', sleep: 'Sleep Tracker', pain: 'Pain Relief', hormone: 'Hormone Tracker', info: 'PCOD Info', dashboard: 'Home' },
  hi: { cycle: 'मेरा चक्र', symptoms: 'लक्षण लॉग', reminders: 'रिमाइंडर', tips: 'वेलनेस टिप्स', ai: 'AI अंतर्दृष्टि', next: 'अगला मासिक', days: 'दिन में', journal: 'मूड जर्नल', recipes: 'PCOD रेसिपी', yoga: 'योग और व्यायाम', report: 'डॉक्टर रिपोर्ट', community: 'समुदाय', score: 'PCOD टेस्ट', ayurvedic: 'आयुर्वेद', water: 'पानी ट्रैकर', bmi: 'BMI ट्रैकर', sleep: 'नींद ट्रैकर', pain: 'दर्द राहत', hormone: 'हार्मोन ट्रैकर', info: 'PCOD जानकारी', dashboard: 'होम' },
}

export default function Header({ activeTab, cycleData, lang, setLang }) {
  const { today, periodDays, fertileDays, daysUntilNext } = cycleData
  const t = TEXT[lang]

  const getPhaseLabel = () => {
    if (periodDays.includes(today)) return { text: lang === 'en' ? `Period · Day ${periodDays.indexOf(today) + 1}` : `माहवारी · दिन ${periodDays.indexOf(today) + 1}`, color: '#D4537E', bg: 'rgba(212,83,126,0.1)' }
    if (fertileDays.includes(today)) return { text: lang === 'en' ? 'Fertile window' : 'उपजाऊ समय', color: '#534AB7', bg: 'rgba(83,74,183,0.1)' }
    return { text: lang === 'en' ? 'Luteal phase' : 'ल्यूटियल चरण', color: '#1D9E75', bg: 'rgba(29,158,117,0.1)' }
  }

  const phase = getPhaseLabel()

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      style={{
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        padding: '14px 20px',
        borderBottom: '1px solid rgba(212,83,126,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 4px 30px rgba(212,83,126,0.08)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ fontSize: 30, filter: 'drop-shadow(0 2px 8px rgba(212,83,126,0.4))' }}
          >
            🌸
          </motion.div>
          <div>
            <div style={{
              fontFamily: 'Georgia, serif',
              fontSize: 22,
              fontWeight: 700,
              background: 'linear-gradient(135deg, #D4537E, #7F77DD)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              BloomCycle
            </div>
            <div style={{ fontSize: 11, color: '#9a9a9a', marginTop: 1 }}>
              {t[activeTab] || 'Wellness'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            style={{
              padding: '5px 12px',
              borderRadius: 99,
              border: '1px solid rgba(212,83,126,0.2)',
              background: 'rgba(212,83,126,0.08)',
              fontSize: 12,
              fontWeight: 600,
              color: '#D4537E',
              cursor: 'pointer',
            }}
          >
            {lang === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 EN'}
          </motion.button>

          <motion.div
            animate={{ boxShadow: ['0 0 0 0 rgba(212,83,126,0.3)', '0 0 0 8px rgba(212,83,126,0)', '0 0 0 0 rgba(212,83,126,0)'] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              width: 46, height: 46,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FBEAF0, white)',
              border: '2px solid #D4537E',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(212,83,126,0.2)',
            }}
          >
            <span style={{ fontSize: 9, color: '#9a9a9a', lineHeight: 1 }}>{lang === 'en' ? 'Day' : 'दिन'}</span>
            <span style={{ fontSize: 17, fontWeight: 700, color: '#D4537E', lineHeight: 1.2 }}>{today}</span>
          </motion.div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '4px 12px', borderRadius: 99,
            background: phase.bg, color: phase.color,
            fontSize: 11, fontWeight: 600,
            border: `1px solid ${phase.color}30`,
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
            padding: '4px 12px', borderRadius: 99,
            background: 'rgba(127,119,221,0.1)', color: '#534AB7',
            fontSize: 11, fontWeight: 600,
            border: '1px solid rgba(127,119,221,0.2)',
          }}
        >
          ✨ {t.next} {daysUntilNext} {t.days}
        </motion.span>
      </div>
    </motion.header>
  )
}