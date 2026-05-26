import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico'],
      manifest: {
        name: 'BloomCycle - PCOD Tracker',
        short_name: 'BloomCycle',
        description: 'Your PCOD Wellness Companion for Indian Women',
        theme_color: '#D4537E',
        background_color: '#FDF6F9',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'https://emojicdn.elk.sh/🌸?style=apple',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'https://emojicdn.elk.sh/🌸?style=apple',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
})