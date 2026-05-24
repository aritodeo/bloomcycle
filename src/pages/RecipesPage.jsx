import { useState } from 'react'
import { motion } from 'framer-motion'

const TEXT = {
  en: { title: 'PCOD Recipes', search: 'Search recipes...', tag: 'Good for PCOD', time: 'min', serves: 'serves' },
  hi: { title: 'PCOD रेसिपी', search: 'रेसिपी खोजें...', tag: 'PCOD के लिए अच्छा', time: 'मिनट', serves: 'लोगों के लिए' },
}

const RECIPES = [
  { id: 1, name: 'Spearmint Green Smoothie', hindiName: 'पुदीना स्मूदी', emoji: '🥤', time: 5, serves: 1, category: 'Drink', tags: ['Anti-inflammatory', 'Hormone balance'], ingredients: ['1 cup spearmint leaves', '1 banana', '1 cup spinach', '1 tbsp flaxseed', '1 cup almond milk', '1 tsp honey'], steps: ['Add all ingredients to blender', 'Blend until smooth', 'Serve immediately with ice'], benefit: 'Spearmint reduces excess androgens in PCOD' },
  { id: 2, name: 'Turmeric Oats Bowl', hindiName: 'हल्दी ओट्स बाउल', emoji: '🥣', time: 10, serves: 1, category: 'Breakfast', tags: ['Low-GI', 'Anti-inflammatory'], ingredients: ['1 cup rolled oats', '1/2 tsp turmeric', '1 tbsp chia seeds', '1 cup almond milk', '1 tbsp honey', 'Mixed berries for topping'], steps: ['Cook oats with almond milk', 'Add turmeric and stir well', 'Top with chia seeds and berries', 'Drizzle honey on top'], benefit: 'Low-GI breakfast that stabilizes insulin levels' },
  { id: 3, name: 'Lentil Vegetable Soup', hindiName: 'दाल सब्जी सूप', emoji: '🍲', time: 25, serves: 2, category: 'Lunch', tags: ['High protein', 'Low-GI'], ingredients: ['1 cup red lentils', '2 cups mixed vegetables', '1 tsp cumin', '1 tsp turmeric', '2 cloves garlic', 'Salt to taste'], steps: ['Wash lentils thoroughly', 'Boil lentils with vegetables', 'Add spices and garlic', 'Simmer for 15 minutes', 'Serve hot'], benefit: 'High protein and fibre helps manage insulin resistance' },
  { id: 4, name: 'Walnut Berry Salad', hindiName: 'अखरोट बेरी सलाद', emoji: '🥗', time: 10, serves: 1, category: 'Snack', tags: ['Omega-3', 'Antioxidants'], ingredients: ['1/2 cup walnuts', '1 cup mixed berries', '2 cups spinach', '1 tbsp olive oil', '1 tsp lemon juice', 'Black pepper to taste'], steps: ['Wash and dry spinach', 'Mix berries and walnuts', 'Drizzle olive oil and lemon', 'Season with pepper and serve'], benefit: 'Omega-3 from walnuts helps reduce inflammation' },
  { id: 5, name: 'Cinnamon Quinoa Bowl', hindiName: 'दालचीनी क्विनोआ', emoji: '🫙', time: 20, serves: 2, category: 'Dinner', tags: ['High protein', 'Blood sugar control'], ingredients: ['1 cup quinoa', '1 tsp cinnamon', '1/2 cup chickpeas', '1 cup roasted vegetables', '2 tbsp tahini', 'Fresh herbs'], steps: ['Cook quinoa as per package', 'Roast vegetables with olive oil', 'Mix quinoa with chickpeas', 'Add cinnamon and tahini', 'Top with fresh herbs'], benefit: 'Cinnamon helps improve insulin sensitivity in PCOD' },
]

const CATEGORIES = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Drink', 'Snack']

export default function RecipesPage({ lang }) {
  const t = TEXT[lang] || TEXT.en
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered = RECIPES.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.hindiName.includes(search)
    const matchCat = category === 'All' || r.category === category
    return matchSearch && matchCat
  })

  if (selected) {
    const r = selected
    return (
      <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} style={{ padding: '20px 16px' }}>
        <button onClick={() => setSelected(null)} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--pink-400)', fontSize: 14, marginBottom: 16, cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'var(--font-body)' }}>
          ← {lang === 'en' ? 'Back to recipes' : 'वापस जाएं'}
        </button>
        <div style={{ background: 'linear-gradient(135deg, var(--pink-100), var(--purple-50))', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: 16, textAlign: 'center' }}>
          <div style={{ fontSize: 60, marginBottom: 8 }}>{r.emoji}</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--pink-600)' }}>{lang === 'en' ? r.name : r.hindiName}</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 10 }}>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>⏱ {r.time} {t.time}</span>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>👥 {r.serves} {t.serves}</span>
          </div>
        </div>
        <div style={card}>
          <div style={cardTitle}>🌿 {lang === 'en' ? 'PCOD Benefit' : 'PCOD फायदा'}</div>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{r.benefit}</p>
        </div>
        <div style={card}>
          <div style={cardTitle}>🛒 {lang === 'en' ? 'Ingredients' : 'सामग्री'}</div>
          {r.ingredients.map((ing, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: i < r.ingredients.length - 1 ? '1px solid var(--pink-100)' : 'none' }}>
              <span style={{ color: 'var(--pink-400)', fontSize: 16 }}>✓</span>
              <span style={{ fontSize: 13, color: 'var(--text-primary)' }}>{ing}</span>
            </div>
          ))}
        </div>
        <div style={card}>
          <div style={cardTitle}>👩‍🍳 {lang === 'en' ? 'Steps' : 'विधि'}</div>
          {r.steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: i < r.steps.length - 1 ? '1px solid var(--pink-100)' : 'none' }}>
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
      <input
        value={search} onChange={e => setSearch(e.target.value)}
        placeholder={t.search}
        style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--pink-200)', borderRadius: 'var(--radius-full)', fontSize: 14, background: 'white', marginBottom: 14, fontFamily: 'var(--font-body)' }}
      />
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 16, paddingBottom: 4 }}>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)} style={{ padding: '6px 14px', borderRadius: 'var(--radius-full)', border: category === cat ? '1.5px solid var(--pink-400)' : '1px solid var(--pink-200)', background: category === cat ? 'var(--pink-400)' : 'white', color: category === cat ? 'white' : 'var(--text-secondary)', fontSize: 12, whiteSpace: 'nowrap', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
            {cat}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {filtered.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setSelected(r)}
            style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--pink-200)', padding: '14px', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}
          >
            <div style={{ fontSize: 36, textAlign: 'center', marginBottom: 8 }}>{r.emoji}</div>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 4, lineHeight: 1.3 }}>{lang === 'en' ? r.name : r.hindiName}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8 }}>⏱ {r.time} {t.time}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {r.tags.slice(0, 1).map(tag => (
                <span key={tag} style={{ fontSize: 10, background: 'var(--pink-100)', color: 'var(--pink-600)', padding: '2px 6px', borderRadius: 'var(--radius-full)' }}>{tag}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const card = { background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--pink-200)', padding: '16px', marginBottom: 14 }
const cardTitle = { fontSize: 15, fontWeight: 500, color: 'var(--pink-600)', marginBottom: 12 }