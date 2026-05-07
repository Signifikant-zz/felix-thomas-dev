import { execSync } from 'child_process'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  hooks: {
    ready: () => {
      // Prüfen ob wir auf Vercel sind (Vercel setzt CI=1 oder VERCEL=1)
      if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
        console.log('--- NUXT HOOK: Starte Asset-Sync ---')
        try {
          const token = process.env.GITHUB_TOKEN
          if (!token) {
            throw new Error('GITHUB_TOKEN ist nicht gesetzt!')
          }
          // Das Klonen wird hier erzwungen, bevor Nitro die Assets scannt
          execSync(`rm -rf assets/showcase && git clone https://${token}@github.com/Signifikant-zz/showcase-assets.git assets/showcase`, { stdio: 'inherit' })
          console.log('--- NUXT HOOK: Sync erfolgreich ---')
        } catch (e) {
          console.error('--- NUXT HOOK: Fehler beim Asset-Sync ---', e)
        }
      }
    }
  },

  modules: ['@nuxtjs/supabase', '@nuxtjs/tailwindcss', '@hypernym/nuxt-gsap'],

  supabase: {
    redirect: false
  },

  runtimeConfig: {
    portfolioPassword: process.env.PORTFOLIO_PASSWORD
  },

  nitro: {
    // Das sorgt dafür, dass die Dateien im Server-Bundle landen
    serverAssets: [{
      baseName: 'showcase',
      dir: './assets/showcase'
    }]
  }
})
