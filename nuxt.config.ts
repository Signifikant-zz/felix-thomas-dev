import path from 'path'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/supabase', '@nuxtjs/tailwindcss', '@hypernym/nuxt-gsap'],
  supabase: {
    redirect: false
  },
  runtimeConfig: {
    portfolioPassword: process.env.PORTFOLIO_PASSWORD
  },
  nitro: {
    serverAssets: [{
      baseName: 'showcase',
      dir: './assets/showcase'
    }]
  }
})
