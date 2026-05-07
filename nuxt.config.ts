export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: ['@nuxtjs/supabase', '@nuxtjs/tailwindcss', '@hypernym/nuxt-gsap'],
  supabase: { redirect: false },
  runtimeConfig: { portfolioPassword: process.env.PORTFOLIO_PASSWORD }
})
