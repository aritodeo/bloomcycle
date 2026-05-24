import { useState } from 'react'
import { motion } from 'framer-motion'

const TEXT = {
  en: { title: 'Pain Relief Guide', subtitle: 'Natural ways to ease period pain' },
  hi: { title: 'दर्द राहत गाइड', subtitle: 'मासिक दर्द को कम करने के प्राकृतिक तरीके' },
}

const REMEDIES = [
  {
    id: 1, emoji: '🔥', name: 'Heat Therapy', hindi: 'गर्म सिकाई',
    category: 'Physical',
    steps: [
      'Place a heating pad on lower abdomen',
      'Use for 15-20 minutes at a time',
      'Keep temperature comfortable, not too hot',
      'Repeat every 2-3 hours as needed',
    ],
    hindiSteps: [
      'पेट के निचले हिस्से पर हीटिंग पैड रखें',
      'एक बार में 15-20 मिनट के लिए उपयोग करें',
      'तापमान आरामदायक रखें, बहुत गर्म नहीं',
      'जरूरत के अनुसार हर 2-3 घंटे में दोहराएं',
    ],
    benefit: 'Heat relaxes uterine muscles and reduces cramping by up to 50%',
    relief: '⚡ Fast relief',
  },
  {
    id: 2, emoji: '🧘', name: 'Child\'s Pose', hindi: 'बालासन',
    category: 'Yoga',
    steps: [
      'Kneel on floor and sit back on heels',
      'Stretch arms forward and rest forehead down',
      'Breathe deeply and hold for 2-3 minutes',
      'Gently massage lower back while holding',
    ],
    hindiSteps: [
      'फर्श पर घुटने टेकें और एड़ियों पर बैठें',
      'बाहें आगे फैलाएं और माथा नीचे रखें',
      'गहरी सांस लें और 2-3 मिनट रुकें',
      'रुकते समय पीठ के निचले हिस्से की मालिश करें',
    ],
    benefit: 'Relieves pelvic tension and reduces lower back pain during periods',
    relief: '🌸 Gentle relief',
  },
  {
    id: 3, emoji: '🫚', name: 'Ginger Tea', hindi: 'अदरक की चाय',
    category: 'Drink',
    steps: [
      'Boil 1 cup water with 1 inch fresh ginger',
      'Add honey and lemon to taste',
      'Drink while warm',
      'Have 2-3 cups daily during periods',
    ],
    hindiSteps: [
      '1 इंच ताजे अदरक के साथ 1 कप पानी उबालें',
      'स्वाद के लिए शहद और नींबू डालें',
      'गर्म होने पर पिएं',
      'मासिक धर्म के दौरान रोज 2-3 कप पिएं',
    ],
    benefit: 'Ginger has anti-inflammatory properties as effective as ibuprofen for period pain',
    relief: '⚡ Fast relief',
  },
  {
    id: 4, emoji: '💆', name: 'Abdominal Massage', hindi: 'पेट की मालिश',
    category: 'Physical',
    steps: [
      'Lie down comfortably on your back',
      'Apply warm coconut or sesame oil on abdomen',
      'Massage in gentle circular motions clockwise',
      'Do for 10-15 minutes with light pressure',
    ],
    hindiSteps: [
      'पीठ के बल आराम से लेट जाएं',
      'पेट पर गर्म नारियल या तिल का तेल लगाएं',
      'घड़ी की दिशा में हल्के गोलाकार गतियों में मालिश करें',
      'हल्के दबाव के साथ 10-15 मिनट तक करें',
    ],
    benefit: 'Improves blood circulation and reduces prostaglandins causing cramps',
    relief: '🌸 Gentle relief',
  },
  {
    id: 5, emoji: '🛁', name: 'Warm Bath', hindi: 'गर्म स्नान',
    category: 'Physical',
    steps: [
      'Fill bath with warm (not hot) water',
      'Add 1 cup Epsom salt for extra relief',
      'Soak for 15-20 minutes',
      'Add lavender oil drops for relaxation',
    ],
    hindiSteps: [
      'बाथ को गर्म (बहुत गर्म नहीं) पानी से भरें',
      'अतिरिक्त राहत के लिए 1 कप एप्सम नमक डालें',
      '15-20 मिनट के लिए भिगोएं',
      'आराम के लिए लैवेंडर तेल की बूंदें डालें',
    ],
    benefit: 'Warm water relaxes muscles and Epsom salt reduces inflammation',
    relief: '😊 Soothing',
  },
  {
    id: 6, emoji: '🌬️', name: 'Deep Breathing', hindi: 'गहरी सांस',
    category: 'Yoga',
    steps: [
      'Lie down or sit comfortably',
      'Breathe in slowly for 4 counts',
      'Hold breath for 4 counts',
      'Breathe out slowly for 6 counts',
      'Repeat 10 times for pain relief',
    ],
    hindiSteps: [
      'आराम से लेट जाएं या बैठें',
      '4 गिनती के लिए धीरे-धीरे सांस लें',
      '4 गिनती के लिए सांस रोकें',
      '6 गिनती के लिए धीरे-धीरे सांस छोड़ें',
      'दर्द से राहत के लिए 10 बार दोहराएं',
    ],
    benefit: 'Activates parasympathetic nervous system and reduces pain perception',
    relief: '✨ Instant calm',
  },
]

const CATEGORIES = ['All', 'Physical', 'Yoga', 'Drink']

export default function PainRelief({ lang }) {
  const t = TEXT[lang] || TEXT.en
  const [category, setCategory] = useState('All')
  const [selected, setSelected] = useState(null)
  const [painLevel, setPainLevel] = useState(5)

  const filtered = category === 'All' ? REMEDIES : REMEDIES.filter(r => r.category === category)

  if (selected) {
    return (
      <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} style={{ padding: '20px 16px' }}>
        <button onClick={() => setSelected(null)} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--pink-400)', fontSize: 14, marginBottom: 16, cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'var(--font-body)' }}>
          ← {lang === 'en' ? 'Back' : 'वापस'}
        </button>

        <div style={{ background: 'linear-gradient(135deg, #FBEAF0, #EEEDFE)', borderRadius: 'var(--radius-lg)', padding: '24px', marginBottom: 16, textAlign: 'center' }}>
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ fontSize: 64, marginBottom: 8 }}>{selected.emoji}</motion.div>
          <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--pink-600)' }}>{lang === 'en' ? selected.name : selected.hindi}</div>
          <span style={{ display: 'inline-block', marginTop: 8, fontSize: 11, background: 'var(--pink-100)', color: 'var(--pink-600)', padding: '3px 10px', borderRadius: 'var(--radius-full)' }}>
            {selected.relief}
          </span>
        </div>

        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--pink-200)', padding: '16px', marginBottom: 14 }}>
          <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--pink-600)', marginBottom: 12 }}>✨ {lang === 'en' ? 'Why it works' : 'यह क्यों काम करता है'}</div>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{selected.benefit}</p>
        </div>

        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--pink-200)', padding: '16px', marginBottom: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--pink-600)', marginBottom: 12 }}>📋 {lang === 'en' ? 'How to do it' : 'कैसे करें'}</div>
          {(lang === 'en' ? selected.steps : selected.hindiSteps).map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: i < selected.steps.length - 1 ? '1px solid var(--pink-100)' : 'none' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--pink-400)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, flexShrink: 0 }}>{i + 1}</div>
              <span style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.6 }}>{step}</span>
            </div>
          ))}
        </div>
      </motion.div>
    )
  }

  return (
    <div style={{ padding: '20px 16px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ background: 'linear-gradient(135deg, #993556, #D4537E)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: 16, textAlign: 'center', color: 'white' }}
      >
        <div style={{ fontSize: 32, marginBottom: 6 }}>🌙</div>
        <div style={{ fontSize: 18, fontWeight: 600 }}>{t.title}</div>
        <div style={{ fontSize: 12, opacity: 0.9, marginTop: 4 }}>{t.subtitle}</div>
      </motion.div>

      {/* Pain level */}
      <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--pink-200)', padding: '16px', marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--pink-600)', marginBottom: 8 }}>⚡ {lang === 'en' ? 'Current pain level' : 'वर्तमान दर्द स्तर'}: {painLevel}/10</div>
        <input
          type="range" min="1" max="10" value={painLevel}
          onChange={e => setPainLevel(Number(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--pink-400)' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
          <span>{lang === 'en' ? 'Mild' : 'हल्का'}</span>
          <span>{lang === 'en' ? 'Severe' : 'गंभीर'}</span>
        </div>
      </div>

      {/* Category filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)} style={{ padding: '6px 14px', borderRadius: 'var(--radius-full)', border: category === cat ? '1.5px solid var(--pink-400)' : '1px solid var(--pink-200)', background: category === cat ? 'var(--pink-400)' : 'white', color: category === cat ? 'white' : 'var(--text-secondary)', fontSize: 12, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Remedies grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        {filtered.map((remedy, i) => (
          <motion.div
            key={remedy.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setSelected(remedy)}
            style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--pink-200)', padding: '14px', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}
          >
            <div style={{ fontSize: 36, textAlign: 'center', marginBottom: 8 }}>{remedy.emoji}</div>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 4, lineHeight: 1.3 }}>{lang === 'en' ? remedy.name : remedy.hindi}</div>
            <div style={{ fontSize: 10, background: 'var(--pink-100)', color: 'var(--pink-600)', padding: '2px 6px', borderRadius: 'var(--radius-full)', display: 'inline-block' }}>{remedy.relief}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}