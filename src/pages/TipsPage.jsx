import { useState } from 'react'

const ALL_TIPS = [
  {
    category: 'Diet', icon: '🥗', color: 'var(--teal-50)', textColor: 'var(--teal-600)',
    tips: [
      { title: 'Low-GI foods', text: 'Brown rice, oats, lentils, and legumes help regulate insulin. Fill half your plate with non-starchy vegetables at every meal.' },
      { title: 'Anti-inflammatory eating', text: 'Berries, leafy greens, turmeric, and omega-3 rich foods like flaxseed and walnuts help reduce chronic inflammation linked to PCOD.' },
      { title: 'Spearmint tea', text: '2 cups of spearmint tea daily has shown promising results in reducing excess androgens. A gentle, natural addition to your routine.' },
      { title: 'Reduce sugar', text: 'White bread, sugary drinks, and processed snacks cause insulin spikes. Swap for whole grain alternatives to support hormonal balance.' },
    ],
  },
  {
    category: 'Exercise', icon: '🧘', color: 'var(--purple-50)', textColor: 'var(--purple-600)',
    tips: [
      { title: '30-min moderate exercise', text: 'Walking, yoga, cycling, or swimming 5 days a week significantly improves insulin sensitivity and hormonal balance in PCOD.' },
      { title: 'Strength training', text: '2–3 sessions of light resistance training weekly helps reduce fat mass, improve insulin response, and boost energy levels.' },
      { title: 'Avoid over-exercising', text: 'Excessive high-intensity workouts can raise cortisol and worsen hormonal disruption. Balance is key — rest days matter too.' },
    ],
  },
  {
    category: 'Wellness', icon: '🌸', color: 'var(--pink-100)', textColor: 'var(--pink-600)',
    tips: [
      { title: 'Stress management', text: 'Chronic stress elevates cortisol, worsening hormonal imbalance. 10 minutes of deep breathing or meditation daily makes a real difference.' },
      { title: 'Sleep hygiene', text: 'Aim for 7–9 hours with consistent sleep and wake times. Poor sleep disrupts insulin sensitivity and hunger hormones.' },
      { title: 'Track your cycle', text: 'Consistent logging helps you and your doctor identify patterns, triggers, and improvements over time.' },
    ],
  },
  {
    category: 'Supplements', icon: '💊', color: 'var(--amber-50)', textColor: 'var(--amber-400)',
    tips: [
      { title: 'Inositol', text: 'Strong evidence supports inositol improving insulin sensitivity, ovulation regularity, and androgen levels in PCOD. Consult your doctor before starting.' },
      { title: 'Vitamin D', text: 'Many women with PCOD are deficient in Vitamin D. Supplementation may improve menstrual regularity and insulin resistance.' },
      { title: 'Magnesium', text: 'Supports insulin function and reduces stress. Found in dark leafy greens, nuts, and seeds — or as a supplement (300–400mg daily).' },
    ],
  },
]

export default function TipsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const categories = ['All', ...ALL_TIPS.map(t => t.category)]
  const filtered = activeCategory === 'All' ? ALL_TIPS : ALL_TIPS.filter(t => t.category === activeCategory)

  return (
    <div style={{ padding: '20px 16px' }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: '6px 14px', borderRadius: 'var(--radius-full)', border: activeCategory === cat ? '1.5px solid var(--pink-400)' : '1px solid var(--pink-200)', background: activeCategory === cat ? 'var(--pink-400)' : 'white', color: activeCategory === cat ? 'white' : 'var(--text-secondary)', fontSize: 13, fontWeight: activeCategory === cat ? 500 : 400, transition: 'all 0.15s' }}>
            {cat}
          </button>
        ))}
      </div>

      {filtered.map(section => (
        <div key={section.category} style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 20 }}>{section.icon}</span>
            <h2 style={{ fontSize: 17, color: 'var(--pink-600)', fontWeight: 500 }}>{section.category}</h2>
          </div>
          {section.tips.map((tip, i) => (
            <div key={i} style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--pink-200)', padding: '14px 16px', marginBottom: 10 }}>
              <div style={{ display: 'inline-block', background: section.color, color: section.textColor, fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 'var(--radius-full)', marginBottom: 8 }}>
                {section.icon} {section.category}
              </div>
              <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 6 }}>{tip.title}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{tip.text}</div>
            </div>
          ))}
        </div>
      ))}

      <div style={{ background: 'var(--pink-100)', borderRadius: 'var(--radius-md)', padding: '12px 14px', marginBottom: 20, border: '1px solid var(--pink-200)' }}>
        <p style={{ fontSize: 12, color: 'var(--pink-600)', lineHeight: 1.6 }}>
          ⚠️ These tips are for general wellness and do not replace medical advice. Always consult your gynaecologist for personalized PCOD treatment.
        </p>
      </div>
    </div>
  )
}