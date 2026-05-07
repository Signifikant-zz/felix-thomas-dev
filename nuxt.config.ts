import { execSync } from 'child_process'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  // Wir entfernen die Nuxt-Hooks und gehen direkt in die Nitro-Konfiguration
  nitro: {
    hooks: {
      'compiled': () => {
        // Nur zur Sicherheit: Falls Nitro nach dem Compile nochmal schaut
      },
      // DAS HIER IST DER ENTSCHEIDENDE PUNKT:
      'prerender:before': () => {
        // Wird oft für statische Assets genutzt
      },
      'init': () => {
        // Nitro Initialisierung
        if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
          console.log('--- NITRO INIT: Starte Asset-Sync ---')
          try {
            const token = process.env.GITHUB_TOKEN
            execSync(`rm -rf assets/showcase && git clone https://${token}@github.com/Signifikant-zz/showcase-assets.git assets/showcase`, { stdio: 'inherit' })
            console.log('--- NITRO INIT: Sync erfolgreich ---')
          } catch (e) {
            console.error('--- NITRO INIT Fehler ---', e)
          }
        }
      }
    },
    serverAssets: [{
      baseName: 'showcase',
      dir: './assets/showcase'
    }]
  },

  modules: ['@nuxtjs/supabase', '@nuxtjs/tailwindcss', '@hypernym/nuxt-gsap'],
  supabase: { redirect: false },
  runtimeConfig: {
    portfolioPassword: process.env.PORTFOLIO_PASSWORD
  }
})
