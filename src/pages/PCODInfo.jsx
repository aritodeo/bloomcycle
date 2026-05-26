import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TEXT = {
  en: { title: 'What is PCOD?', subtitle: 'Understanding your condition' },
  hi: { title: 'PCOD क्या है?', subtitle: 'अपनी स्थिति को समझें' },
}

const SECTIONS = [
  {
    id: 1, emoji: '🔬', title: 'What is PCOD?', hindi: 'PCOD क्या है?',
    color: '#D4537E', bg: '#FBEAF0',
    content: 'PCOD (Polycystic Ovarian Disease) is a hormonal condition where the ovaries produce excess male hormones (androgens). This causes small cysts to form on the ovaries and disrupts the normal menstrual cycle. It affects 1 in 5 Indian women.',
    hindiContent: 'PCOD एक हार्मोनल स्थिति है जिसमें अंडाशय अधिक पुरुष हार्मोन बनाते हैं। इससे अंडाशय पर छोटे सिस्ट बनते हैं और मासिक चक्र बाधित होता है। यह 5 में से 1 भारतीय महिला को प्रभावित करता है।',
  },
  {
    id: 2, emoji: '❓', title: 'Why does PCOD happen?', hindi: 'PCOD क्यों होता है?',
    color: '#7F77DD', bg: '#EEEDFE',
    content: 'PCOD happens due to hormonal imbalance — too much insulin causes the ovaries to produce excess androgens. Genetics, lifestyle, stress, and diet all play a role. It is NOT your fault — it is a medical condition that can be managed.',
    hindiContent: 'PCOD हार्मोनल असंतुलन के कारण होता है। अधिक इंसुलिन से अंडाशय अतिरिक्त एंड्रोजन बनाते हैं। आनुवंशिकता, जीवनशैली, तनाव और आहार सभी की भूमिका है। यह आपकी गलती नहीं है!',
  },
  {
    id: 3, emoji: '⚠️', title: 'Common symptoms', hindi: 'सामान्य लक्षण',
    color: '#BA7517', bg: '#FAEEDA',
    content: null, hindiContent: null,
    symptoms: [
      { en: 'Irregular or missed periods', hi: 'अनियमित या छूटे हुए मासिक' },
      { en: 'Excess facial or body hair', hi: 'चेहरे या शरीर पर अधिक बाल' },
      { en: 'Acne and oily skin', hi: 'मुंहासे और तैलीय त्वचा' },
      { en: 'Hair thinning or loss', hi: 'बालों का पतला होना या झड़ना' },
      { en: 'Weight gain especially belly', hi: 'वजन बढ़ना खासकर पेट' },
      { en: 'Mood swings and anxiety', hi: 'मूड स्विंग और चिंता' },
      { en: 'Fatigue and low energy', hi: 'थकान और कम ऊर्जा' },
      { en: 'Difficulty getting pregnant', hi: 'गर्भधारण में कठिनाई' },
    ],
  },
  {
    id: 4, emoji: '🔄', title: 'PCOD vs PCOS', hindi: 'PCOD बनाम PCOS',
    color: '#1D9E75', bg: '#E1F5EE',
    content: 'PCOD and PCOS are often confused. PCOD is more common and manageable through lifestyle changes. PCOS is more severe and involves a full endocrine disorder. Both can be managed well with proper care.',
    hindiContent: 'PCOD और PCOS को अक्सर भ्रमित किया जाता है। PCOD अधिक सामान्य और जीवनशैली से प्रबंधनीय है। PCOS अधिक गंभीर है। दोनों को उचित देखभाल से प्रबंधित किया जा सकता है।',
  },
  {
    id: 5, emoji: '💊', title: 'How is it diagnosed?', hindi: 'निदान कैसे होता है?',
    color: '#534AB7', bg: '#EEEDFE',
    content: null, hindiContent: null,
    tests: [
      { en: 'Pelvic ultrasound', hi: 'पेल्विक अल्ट्रासाउंड', icon: '🔊' },
      { en: 'Blood hormone tests (LH, FSH, testosterone)', hi: 'रक्त हार्मोन परीक्षण', icon: '🩸' },
      { en: 'Fasting insulin and glucose test', hi: 'फास्टिंग इंसुलिन और ग्लूकोज', icon: '🧪' },
      { en: 'Thyroid function test', hi: 'थायरॉइड फंक्शन टेस्ट', icon: '🦋' },
    ],
  },
  {
    id: 6, emoji: '🌸', title: 'Can PCOD be cured?', hindi: 'क्या PCOD ठीक हो सकता है?',
    color: '#D4537E', bg: '#FBEAF0',
    content: 'PCOD cannot be fully cured but it CAN be managed very effectively! Many women reverse their symptoms completely through diet, exercise, stress management and proper medical care. You are not alone — BloomCycle is here to help! 🌸',
    hindiContent: 'PCOD पूरी तरह ठीक नहीं हो सकता लेकिन इसे प्रभावी ढंग से प्रबंधित किया जा सकता है! कई महिलाएं आहार और व्यायाम से लक्षणों को उलट देती हैं। आप अकेली नहीं हैं! 🌸',
  },
]

const MYTHS = [
  { myth: 'PCOD means you cannot get pregnant', fact: 'Many women with PCOD get pregnant naturally!', hi_myth: 'PCOD का मतलब है गर्भवती नहीं हो सकतीं', hi_fact: 'PCOD वाली कई महिलाएं स्वाभाविक रूप से गर्भवती होती हैं!' },
  { myth: 'PCOD only affects overweight women', fact: 'PCOD can affect women of all body types.', hi_myth: 'PCOD केवल मोटी महिलाओं को होता है', hi_fact: 'PCOD सभी शरीर प्रकार की महिलाओं को हो सकता है।' },
  { myth: 'Birth control pills cure PCOD', fact: 'Pills manage symptoms but do not cure PCOD.', hi_myth: 'गर्भनिरोधक गोलियां PCOD ठीक करती हैं', hi_fact: 'गोलियां लक्षण नियंत्रित करती हैं लेकिन ठीक नहीं करतीं।' },
  { myth: 'You must have cysts to have PCOD', fact: 'Not all women with PCOD have visible cysts.', hi_myth: 'PCOD के लिए सिस्ट होना जरूरी है', hi_fact: 'PCOD वाली सभी महिलाओं में सिस्ट दिखाई नहीं देते।' },
]

export default function PCODInfo({ lang }) {
  const t = TEXT[lang] || TEXT.en
  const [activeSection, setActiveSection] = useState(null)
  const [showMyths, setShowMyths] = useState(false)

  return (
    <div style={{ padding: '20px 16px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ background: 'linear-gradient(135deg, #D4537E, #7F77DD)', borderRadius: 'var(--radius-xl)', padding: '24px', marginBottom: 20, color: 'white', boxShadow: '0 8px 32px rgba(212,83,126,0.3)', position: 'relative', overflow: 'hidden' }}
      >
        <div style={{ position: 'absolute', top: -20, right: -20, fontSize: 80, opacity: 0.1 }}>🔬</div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 13, opacity: 0.9, marginBottom: 4 }}>📚 {lang === 'en' ? 'Education' : 'शिक्षा'}</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, marginBottom: 8 }}>{t.title}</div>
          <p style={{ fontSize: 13, opacity: 0.9, lineHeight: 1.6 }}>
            {lang === 'en' ? 'Learn everything about PCOD — what it is, why it happens, and how to manage it.' : 'PCOD के बारे में सब कुछ जानें — यह क्या है, क्यों होता है और कैसे प्रबंधित करें।'}
          </p>
          <div style={{ marginTop: 12, background: 'rgba(255,255,255,0.2)', borderRadius: 99, padding: '6px 14px', display: 'inline-block', fontSize: 12 }}>
            🇮🇳 {lang === 'en' ? '1 in 5 Indian women have PCOD' : '5 में से 1 भारतीय महिला को PCOD है'}
          </div>
        </div>
      </motion.div>

      {SECTIONS.map((section, i) => (
        <motion.div
          key={section.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
          style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: `1px solid ${section.color}20`, padding: '16px', marginBottom: 12, cursor: 'pointer', boxShadow: 'var(--shadow-card)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: section.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                {section.emoji}
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, color: section.color }}>
                {lang === 'en' ? section.title : section.hindi}
              </div>
            </div>
            <motion.div animate={{ rotate: activeSection === section.id ? 180 : 0 }} style={{ fontSize: 14, color: section.color }}>▼</motion.div>
          </div>

          <AnimatePresence>
            {activeSection === section.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${section.color}15` }}>
                  {section.content && (
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                      {lang === 'en' ? section.content : section.hindiContent}
                    </p>
                  )}
                  {section.symptoms && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      {section.symptoms.map((s, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 10px', background: section.bg, borderRadius: 'var(--radius-sm)' }}>
                          <span style={{ color: section.color, fontSize: 14 }}>●</span>
                          <span style={{ fontSize: 12, color: section.color }}>{lang === 'en' ? s.en : s.hi}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {section.tests && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {section.tests.map((test, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: section.bg, borderRadius: 'var(--radius-sm)' }}>
                          <span style={{ fontSize: 20 }}>{test.icon}</span>
                          <span style={{ fontSize: 13, color: section.color }}>{lang === 'en' ? test.en : test.hi}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ background: 'linear-gradient(135deg, #993556, #D4537E)', borderRadius: 'var(--radius-xl)', padding: '20px', marginBottom: 16, color: 'white', cursor: 'pointer' }}
        onClick={() => setShowMyths(!showMyths)}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>🚫 {lang === 'en' ? 'Myths vs Facts' : 'मिथक बनाम तथ्य'}</div>
            <div style={{ fontSize: 12, opacity: 0.9 }}>{lang === 'en' ? 'Bust common PCOD myths!' : 'सामान्य PCOD मिथकों को तोड़ें!'}</div>
          </div>
          <motion.div animate={{ rotate: showMyths ? 180 : 0 }} style={{ fontSize: 20 }}>▼</motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showMyths && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden', marginBottom: 16 }}>
            {MYTHS.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '16px', marginBottom: 10, boxShadow: 'var(--shadow-card)' }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 16 }}>❌</span>
                  <div>
                    <div style={{ fontSize: 11, color: '#DC2626', fontWeight: 600, marginBottom: 2 }}>MYTH</div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', fontStyle: 'italic' }}>"{lang === 'en' ? item.myth : item.hi_myth}"</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, paddingTop: 8, borderTop: '1px solid var(--pink-100)' }}>
                  <span style={{ fontSize: 16 }}>✅</span>
                  <div>
                    <div style={{ fontSize: 11, color: '#1D9E75', fontWeight: 600, marginBottom: 2 }}>FACT</div>
                    <div style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.6 }}>{lang === 'en' ? item.fact : item.hi_fact}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ background: 'var(--pink-100)', borderRadius: 'var(--radius-lg)', padding: '16px', marginBottom: 20, textAlign: 'center', border: '1px solid var(--pink-200)' }}>
        <div style={{ fontSize: 24, marginBottom: 8 }}>🌸</div>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--pink-600)', marginBottom: 4 }}>
          {lang === 'en' ? 'You are stronger than PCOD!' : 'आप PCOD से ज़्यादा मज़बूत हैं!'}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {lang === 'en' ? 'Millions of women manage PCOD successfully every day. With the right knowledge and support, so can you!' : 'लाखों महिलाएं हर दिन PCOD को सफलतापूर्वक प्रबंधित करती हैं। सही ज्ञान के साथ आप भी कर सकती हैं!'}
        </div>
      </div>
    </div>
  )
}