import { useState } from 'react'
import { motion } from 'framer-motion'

const TEXT = {
  en: { title: 'Community', post: 'Share your story...', send: 'Post', like: 'Like', reply: 'Reply', anonymous: 'Post anonymously', tag: 'Select topic' },
  hi: { title: 'समुदाय', post: 'अपनी कहानी साझा करें...', send: 'पोस्ट करें', like: 'पसंद', reply: 'जवाब दें', anonymous: 'गुमनाम पोस्ट करें', tag: 'विषय चुनें' },
}

const TAGS = ['My Story', 'Question', 'Diet Tips', 'Exercise', 'Motivation', 'Treatment']

const INITIAL_POSTS = [
  { id: 1, author: 'Priya S.', avatar: '🌸', time: '2 hours ago', tag: 'My Story', likes: 24, content: 'After 2 years of struggling with PCOD, I finally got my periods regular by following a low-GI diet and yoga daily. Don\'t give up ladies! 💪', replies: [{ author: 'Meera', content: 'This gives me so much hope! Thank you 🌺' }] },
  { id: 2, author: 'Anonymous', avatar: '🌷', time: '5 hours ago', tag: 'Question', likes: 12, content: 'Has anyone tried Inositol supplements? My doctor suggested it but I\'m not sure. Would love to hear your experiences!', replies: [{ author: 'Riya K.', content: 'Yes! It really helped regulate my cycle after 3 months' }] },
  { id: 3, author: 'Sunita M.', avatar: '💮', time: '1 day ago', tag: 'Motivation', likes: 45, content: 'PCOD does not define you. You are strong, beautiful and capable. This condition is manageable. We are all in this together! 🌸', replies: [] },
  { id: 4, author: 'Anjali R.', avatar: '🌺', time: '2 days ago', tag: 'Diet Tips', likes: 31, content: 'Spearmint tea twice daily has reduced my facial hair significantly in 3 months! Also cutting out sugar completely changed my skin. Try it!', replies: [{ author: 'Deepa', content: 'Starting spearmint tea tomorrow! 🌿' }] },
]

export default function CommunityPage({ lang }) {
  const t = TEXT[lang] || TEXT.en
  const [posts, setPosts] = useState(INITIAL_POSTS)
  const [newPost, setNewPost] = useState('')
  const [selectedTag, setSelectedTag] = useState('My Story')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [likedPosts, setLikedPosts] = useState([])
  const [replyingTo, setReplyingTo] = useState(null)
  const [replyText, setReplyText] = useState('')
  const [filterTag, setFilterTag] = useState('All')

  const handlePost = () => {
    if (!newPost.trim()) return
    const post = {
      id: Date.now(),
      author: isAnonymous ? 'Anonymous' : 'You',
      avatar: ['🌸', '🌺', '🌷', '💮'][Math.floor(Math.random() * 4)],
      time: 'Just now',
      tag: selectedTag,
      likes: 0,
      content: newPost.trim(),
      replies: [],
    }
    setPosts(prev => [post, ...prev])
    setNewPost('')
  }

  const handleLike = (id) => {
    if (likedPosts.includes(id)) return
    setLikedPosts(prev => [...prev, id])
    setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p))
  }

  const handleReply = (postId) => {
    if (!replyText.trim()) return
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, replies: [...p.replies, { author: 'You', content: replyText.trim() }] } : p))
    setReplyText('')
    setReplyingTo(null)
  }

  const filteredPosts = filterTag === 'All' ? posts : posts.filter(p => p.tag === filterTag)

  return (
    <div style={{ padding: '20px 16px' }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ background: 'linear-gradient(135deg, var(--purple-400), var(--pink-400))', borderRadius: 'var(--radius-lg)', padding: '16px', marginBottom: 16, textAlign: 'center', color: 'white' }}
      >
        <div style={{ fontSize: 32, marginBottom: 6 }}>💬</div>
        <div style={{ fontSize: 16, fontWeight: 600 }}>PCOD Sisters Community</div>
        <div style={{ fontSize: 12, opacity: 0.9, marginTop: 4 }}>You are not alone 🌸 {posts.length} women sharing</div>
      </motion.div>

      {/* New post */}
      <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--pink-200)', padding: '16px', marginBottom: 16 }}>
        <textarea
          value={newPost}
          onChange={e => setNewPost(e.target.value)}
          placeholder={t.post}
          rows={3}
          style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--pink-200)', borderRadius: 'var(--radius-sm)', fontSize: 13, background: 'var(--pink-50)', resize: 'none', fontFamily: 'var(--font-body)', lineHeight: 1.5 }}
        />
        <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
          {TAGS.map(tag => (
            <button key={tag} onClick={() => setSelectedTag(tag)} style={{ padding: '4px 10px', borderRadius: 'var(--radius-full)', border: selectedTag === tag ? '1.5px solid var(--pink-400)' : '1px solid var(--pink-200)', background: selectedTag === tag ? 'var(--pink-100)' : 'white', color: selectedTag === tag ? 'var(--pink-600)' : 'var(--text-muted)', fontSize: 11, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
              {tag}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <input type="checkbox" checked={isAnonymous} onChange={e => setIsAnonymous(e.target.checked)} />
            {t.anonymous}
          </label>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handlePost}
            style={{ padding: '8px 20px', background: 'var(--pink-400)', color: 'white', borderRadius: 'var(--radius-full)', fontSize: 13, fontWeight: 500, cursor: 'pointer', border: 'none', fontFamily: 'var(--font-body)' }}
          >
            {t.send} 🌸
          </motion.button>
        </div>
      </div>

      {/* Filter tags */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 16, paddingBottom: 4 }}>
        {['All', ...TAGS].map(tag => (
          <button key={tag} onClick={() => setFilterTag(tag)} style={{ padding: '5px 12px', borderRadius: 'var(--radius-full)', border: filterTag === tag ? '1.5px solid var(--purple-400)' : '1px solid var(--pink-200)', background: filterTag === tag ? 'var(--purple-400)' : 'white', color: filterTag === tag ? 'white' : 'var(--text-secondary)', fontSize: 11, whiteSpace: 'nowrap', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
            {tag}
          </button>
        ))}
      </div>

      {/* Posts */}
      {filteredPosts.map((post, i) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--pink-200)', padding: '16px', marginBottom: 12 }}
        >
          {/* Post header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--pink-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{post.avatar}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{post.author}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{post.time}</div>
              </div>
            </div>
            <span style={{ fontSize: 10, background: 'var(--purple-50)', color: 'var(--purple-600)', padding: '3px 8px', borderRadius: 'var(--radius-full)' }}>{post.tag}</span>
          </div>

          {/* Post content */}
          <p style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.7, marginBottom: 12 }}>{post.content}</p>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={() => handleLike(post.id)}
              style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: likedPosts.includes(post.id) ? 'var(--pink-400)' : 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)' }}
            >
              {likedPosts.includes(post.id) ? '❤️' : '🤍'} {post.likes}
            </button>
            <button
              onClick={() => setReplyingTo(replyingTo === post.id ? null : post.id)}
              style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)' }}
            >
              💬 {post.replies.length} {t.reply}
            </button>
          </div>

          {/* Replies */}
          {post.replies.length > 0 && (
            <div style={{ marginTop: 10, paddingLeft: 12, borderLeft: '2px solid var(--pink-200)' }}>
              {post.replies.map((reply, i) => (
                <div key={i} style={{ marginBottom: 6 }}>
                  <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--pink-600)' }}>{reply.author}: </span>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{reply.content}</span>
                </div>
              ))}
            </div>
          )}

          {/* Reply input */}
          {replyingTo === post.id && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ display: 'flex', gap: 8, marginTop: 10 }}
            >
              <input
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                style={{ flex: 1, padding: '8px 12px', border: '1px solid var(--pink-200)', borderRadius: 'var(--radius-full)', fontSize: 12, background: 'var(--pink-50)', fontFamily: 'var(--font-body)' }}
              />
              <button
                onClick={() => handleReply(post.id)}
                style={{ padding: '8px 14px', background: 'var(--pink-400)', color: 'white', borderRadius: 'var(--radius-full)', fontSize: 12, cursor: 'pointer', border: 'none', fontFamily: 'var(--font-body)' }}
              >
                Send
              </button>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  )
}