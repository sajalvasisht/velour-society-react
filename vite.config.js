import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  
  server: {
    proxy: {
      // --- THIS IS THE FIX ---
      // We are now only proxying links that start with /api
      '/api/users': 'http://localhost:3000/users',
      '/api/men': 'http://localhost:3000/men',
      '/api/women': 'http://localhost:3000/women',
      '/api/accessories': 'http://localhost:3000/accessories',
      '/api/arrivals': 'http://localhost:3000/arrivals'
    }
  },
  
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,mp4}']
      },
      manifest: {
        name: 'Velour Society',
        short_name: 'Velour',
        description: 'Velour Society E-Commerce Project',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})