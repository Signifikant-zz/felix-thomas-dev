export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/supabase', '@nuxtjs/tailwindcss', '@hypernym/nuxt-gsap'],
  supabase: { redirect: false },
  runtimeConfig: {
    portfolioPassword: process.env.PORTFOLIO_PASSWORD
  },
  routeRules: {
    '/api/view/**': {
      headers: {
        'X-Frame-Options': 'SAMEORIGIN',
        'Content-Security-Policy': "frame-ancestors 'self'"
      }
    }
  }
})
