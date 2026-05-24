import { useState } from 'react'
import { motion } from 'framer-motion'

const TEXT = {
  en: { title: 'Ayurvedic Remedies', subtitle: 'Ancient Indian wisdom for PCOD', disclaimer: 'These are traditional remedies. Always consult your doctor before trying.' },
  hi: { title: 'आयुर्वेदिक उपचार', subtitle: 'PCOD के लिए प्राचीन भारतीय ज्ञान', disclaimer: 'ये पारंपरिक उपाय हैं। कोशिश करने से पहले हमेशा अपने डॉक्टर से सलाह लें।' },
}

const REMEDIES = [
  {
    id: 1, emoji: '🌿', name: 'Shatavari', hindi: 'शतावरी',
    category: 'Herb', tag: 'Hormone Balance',
    benefit: 'Known as the "Queen of Herbs" for women. Shatavari balances female hormones and regulates menstrual cycle naturally.',
    hindiBenefit: 'महिलाओं के लिए "जड़ी-बूटियों की रानी"। शतावरी महिला हार्मोन को संतुलित करती है।',
    howToUse: 'Mix 1 tsp Shatavari powder in warm milk. Drink daily before bedtime.',
    hindiUse: '1 चम्मच शतावरी पाउडर गर्म दूध में मिलाएं। सोने से पहले रोज पिएं।',
    duration: '3 months',
  },
  {
    id: 2, emoji: '🌱', name: 'Ashwagandha', hindi: 'अश्वगंधा',
    category: 'Herb', tag: 'Stress Relief',
    benefit: 'Reduces cortisol (stress hormone) which directly affects PCOD. Improves energy, mood and hormonal balance.',
    hindiBenefit: 'कोर्टिसोल (तनाव हार्मोन) को कम करता है जो PCOD को सीधे प्रभावित करता है।',
    howToUse: 'Take 300-500mg Ashwagandha capsule daily OR mix powder in warm milk with honey.',
    hindiUse: 'रोज 300-500mg अश्वगंधा कैप्सूल लें या पाउडर को गर्म दूध में शहद के साथ मिलाएं।',
    duration: '2-3 months',
  },
  {
    id: 3, emoji: '🫚', name: 'Flaxseed (Alsi)', hindi: 'अलसी',
    category: 'Food', tag: 'Androgen Control',
    benefit: 'Rich in lignans which help reduce excess androgens in PCOD. Also rich in omega-3 for inflammation.',
    hindiBenefit: 'लिग्नान से भरपूर जो PCOD में अतिरिक्त एंड्रोजन को कम करने में मदद करता है।',
    howToUse: 'Add 1-2 tbsp ground flaxseed to smoothies, yogurt or roti dough daily.',
    hindiUse: 'रोज 1-2 चम्मच पिसी अलसी को स्मूदी, दही या रोटी के आटे में मिलाएं।',
    duration: 'Ongoing',
  },
  {
    id: 4, emoji: '🍵', name: 'Spearmint Tea', hindi: 'पुदीना चाय',
    category: 'Drink', tag: 'Hair & Skin',
    benefit: 'Clinical studies show spearmint tea reduces excess facial hair and androgens. Improves skin and hair.',
    hindiBenefit: 'नैदानिक अध्ययन दिखाते हैं कि पुदीना चाय अतिरिक्त चेहरे के बाल और एंड्रोजन को कम करती है।',
    howToUse: 'Steep 1 tsp fresh spearmint leaves in hot water for 5 min. Drink 2 cups daily.',
    hindiUse: '5 मिनट के लिए गर्म पानी में 1 चम्मच ताजा पुदीने की पत्तियां डालें। रोज 2 कप पिएं।',
    duration: '3 months',
  },
  {
    id: 5, emoji: '🌼', name: 'Turmeric (Haldi)', hindi: 'हल्दी',
    category: 'Spice', tag: 'Anti-inflammatory',
    benefit: 'Curcumin in turmeric reduces inflammation and improves insulin sensitivity. Powerful antioxidant for PCOD.',
    hindiBenefit: 'हल्दी में करक्यूमिन सूजन को कम करता है और इंसुलिन संवेदनशीलता में सुधार करता है।',
    howToUse: 'Mix 1/2 tsp turmeric + pinch of black pepper in warm milk (golden milk). Drink nightly.',
    hindiUse: 'गर्म दूध में 1/2 चम्मच हल्दी + काली मिर्च मिलाएं (गोल्डन मिल्क)। रात को पिएं।',
    duration: 'Ongoing',
  },
  {
    id: 6, emoji: '🫙', name: 'Cinnamon (Dalchini)', hindi: 'दालचीनी',
    category: 'Spice', tag: 'Insulin Control',
    benefit: 'Cinnamon significantly improves insulin sensitivity and helps regulate menstrual cycles in PCOD women.',
    hindiBenefit: 'दालचीनी इंसुलिन संवेदनशीलता में सुधार करती है और PCOD में मासिक चक्र को नियमित करती है।',
    howToUse: 'Add 1/2 tsp cinnamon to oatmeal, smoothies or warm water with honey every morning.',
    hindiUse: 'हर सुबह दलिया, स्मूदी या गर्म पानी में शहद के साथ 1/2 चम्मच दालचीनी मिलाएं।',
    duration: 'Ongoing',
  },
  {
    id: 7, emoji: '🌾', name: 'Fenugreek (Methi)', hindi: 'मेथी',
    category: 'Spice', tag: 'Cycle Regulation',
    benefit: 'Methi seeds help regulate menstrual cycles, reduce testosterone levels and improve insulin sensitivity.',
    hindiBenefit: 'मेथी के बीज मासिक चक्र को नियमित करने, टेस्टोस्टेरोन कम करने में मदद करते हैं।',
    howToUse: 'Soak 1 tsp methi seeds overnight. Drink the water on empty stomach every morning.',
    hindiUse: 'रात को 1 चम्मच मेथी के बीज भिगोएं। हर सुबह खाली पेट पानी पिएं।',
    duration: '2 months',
  },
  {
    id: 8, emoji: '🍯', name: 'Amla (Indian Gooseberry)', hindi: 'आंवला',
    category: 'Fruit', tag: 'Hormone Balance',
    benefit: 'Amla is rich in Vitamin C and antioxidants. Reduces inflammation, improves liver function and detoxes excess hormones.',
    hindiBenefit: 'आंवला विटामिन C और एंटीऑक्सीडेंट से भरपूर है। सूजन कम करता है और हार्मोन को डिटॉक्स करता है।',
    howToUse: 'Drink 30ml fresh amla juice every morning OR eat 1 raw amla daily.',
    hindiUse: 'हर सुबह 30ml ताजा आंवला जूस पिएं या रोज 1 कच्चा आंवला खाएं।',
    duration: 'Ongoing',
  },
]

const CATEGORIES = ['All', 'Herb', 'Food', 'Drink', 'Spice', 'Fruit']

export default function AyurvedicPage({ lang }) {
  const t = TEXT[lang] || TEXT.en
  const [category, setCategory] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered = category === 'All' ? REMEDIES : REMEDIES.filter(r => r.category === category)

  if (selected) {
    return (
      <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} style={{ padding: '20px 16px' }}>
        <button onClick={() => setSelected(null)} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--teal-600)', fontSize: 14, marginBottom: 16, cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'var(--font-body)' }}>
          ← {lang === 'en' ? 'Back' : 'वापस'}
        </button>

        <div style={{ background: 'linear-gradient(135deg, #E1F5EE, #EEEDFE)', borderRadius: 'var(--radius-lg)', padding: '24px', marginBottom: 16, textAlign: 'center' }}>
          <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} style={{ fontSize: 64, marginBottom: 8 }}>{selected.emoji}</motion.div>
          <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--teal-600)' }}>{lang === 'en' ? selected.name : selected.hindi}</div>
          <span style={{ display: 'inline-block', marginTop: 8, fontSize: 11, background: 'var(--teal-50)', color: 'var(--teal-600)', padding: '3px 10px', borderRadius: 'var(--radius-full)', border: '1px solid var(--teal-400)' }}>
            🌿 {selected.tag}
          </span>
        </div>

        <div style={card}>
          <div style={cardTitle}>✨ {lang === 'en' ? 'PCOD Benefit' : 'PCOD फायदा'}</div>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            {lang === 'en' ? selected.benefit : selected.hindiBenefit}
          </p>
        </div>

        <div style={card}>
          <div style={cardTitle}>🥄 {lang === 'en' ? 'How to use' : 'कैसे उपयोग करें'}</div>
          <p style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.7 }}>
            {lang === 'en' ? selected.howToUse : selected.hindiUse}
          </p>
          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 12, background: 'var(--purple-50)', color: 'var(--purple-600)', padding: '4px 10px', borderRadius: 'var(--radius-full)' }}>
              ⏱ {lang === 'en' ? 'Duration' : 'अवधि'}: {selected.duration}
            </span>
          </div>
        </div>

        <div style={{ background: 'var(--amber-50)', borderRadius: 'var(--radius-md)', padding: '12px 14px', marginBottom: 20, border: '1px solid rgba(186,117,23,0.2)' }}>
          <p style={{ fontSize: 12, color: 'var(--amber-400)', lineHeight: 1.6 }}>⚠️ {t.disclaimer}</p>
        </div>
      </motion.div>
    )
  }

  return (
    <div style={{ padding: '20px 16px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ background: 'linear-gradient(135deg, #1D9E75, #534AB7)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: 16, textAlign: 'center', color: 'white' }}
      >
        <div style={{ fontSize: 32, marginBottom: 6 }}>🌿</div>
        <div style={{ fontSize: 18, fontWeight: 600 }}>{t.title}</div>
        <div style={{ fontSize: 12, opacity: 0.9, marginTop: 4 }}>{t.subtitle}</div>
      </motion.div>

      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 16, paddingBottom: 4 }}>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)} style={{ padding: '6px 14px', borderRadius: 'var(--radius-full)', border: category === cat ? '1.5px solid var(--teal-400)' : '1px solid var(--pink-200)', background: category === cat ? 'var(--teal-400)' : 'white', color: category === cat ? 'white' : 'var(--text-secondary)', fontSize: 12, whiteSpace: 'nowrap', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
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
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 4 }}>{lang === 'en' ? remedy.name : remedy.hindi}</div>
            <div style={{ fontSize: 10, background: 'var(--teal-50)', color: 'var(--teal-600)', padding: '2px 6px', borderRadius: 'var(--radius-full)', display: 'inline-block' }}>{remedy.tag}</div>
          </motion.div>
        ))}
      </div>

      <div style={{ background: 'var(--amber-50)', borderRadius: 'var(--radius-md)', padding: '12px 14px', marginTop: 16, marginBottom: 20, border: '1px solid rgba(186,117,23,0.2)' }}>
        <p style={{ fontSize: 12, color: 'var(--amber-400)', lineHeight: 1.6 }}>⚠️ {t.disclaimer}</p>
      </div>
    </div>
  )
}

const card = { background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--pink-200)', padding: '16px', marginBottom: 14 }
const cardTitle = { fontSize: 15, fontWeight: 500, color: 'var(--teal-600)', marginBottom: 12 }