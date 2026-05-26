import { motion } from 'framer-motion'
import { auth, provider } from '../firebase'
import { signInWithPopup } from 'firebase/auth'

export default function LoginPage({ onLogin, lang }) {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      onLogin(result.user)
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ position: 'fixed', inset: 0, background: 'linear-gradient(135deg, #FBEAF0 0%, #EEEDFE 50%, #FDF6F9 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', zIndex: 998 }}
    >
      {/* Floating petals */}
      {['🌸','🌺','🌷','💮','✨'].map((p, i) => (
        <motion.div
          key={i}
          style={{ position: 'absolute', fontSize: 20 + i * 4, opacity: 0.2 }}
          animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
          initial={{ top: `${10 + i * 18}%`, left: `${5 + i * 20}%` }}
        >
          {p}
        </motion.div>
      ))}

      {/* Logo */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ fontSize: 80, marginBottom: 20, filter: 'drop-shadow(0 8px 24px rgba(212,83,126,0.3))' }}
      >
        🌸
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ fontFamily: 'Georgia, serif', fontSize: 36, fontWeight: 700, background: 'linear-gradient(135deg, #D4537E, #7F77DD)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 8, textAlign: 'center' }}
      >
        BloomCycle
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{ fontSize: 15, color: '#D4537E', marginBottom: 8, textAlign: 'center' }}
      >
        Your PCOD Wellness Companion 🌺
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        style={{ fontSize: 13, color: '#9a9a9a', marginBottom: 40, textAlign: 'center', lineHeight: 1.6 }}
      >
        {lang === 'en'
          ? '🇮🇳 Made for Indian women with PCOD'
          : '🇮🇳 भारतीय महिलाओं के लिए बनाया गया'}
      </motion.div>

      {/* Login button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        onClick={handleGoogleLogin}
        style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 32px', background: 'white', borderRadius: 99, border: '1px solid rgba(212,83,126,0.2)', fontSize: 16, fontWeight: 600, color: '#333', cursor: 'pointer', boxShadow: '0 8px 32px rgba(212,83,126,0.2)', fontFamily: 'var(--font-body)', marginBottom: 20 }}
      >
        <img src="https://www.google.com/favicon.ico" width="20" height="20" alt="Google" />
        {lang === 'en' ? 'Continue with Google' : 'Google से जारी रखें'}
      </motion.button>

      {/* Skip login */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        onClick={() => onLogin(null)}
        style={{ fontSize: 13, color: '#9a9a9a', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', textDecoration: 'underline' }}
      >
        {lang === 'en' ? 'Skip for now' : 'अभी छोड़ें'}
      </motion.button>

      {/* Bottom text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        style={{ position: 'absolute', bottom: 30, fontSize: 11, color: '#9a9a9a', textAlign: 'center', padding: '0 40px' }}
      >
        By continuing you agree to our Terms & Privacy Policy
      </motion.div>
    </motion.div>
  )
}