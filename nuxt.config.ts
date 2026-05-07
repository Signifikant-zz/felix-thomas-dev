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
      dir: './server/assets/showcase' // Wir legen es in einen Unterordner von server
    }]
  }
})
