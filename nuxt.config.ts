// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/supabase', '@nuxtjs/tailwindcss', '@hypernym/nuxt-gsap'],

  app: {
    head: {
      title: 'FELIXTHOMAS | Frontend Developer',
      meta: [
        { name: 'description', content: 'Senior Banner Developer & Creative Technologist' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%233b82f6"/></svg>'
        }
      ]
    }
  },

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
