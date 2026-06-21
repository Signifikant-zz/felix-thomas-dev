<template>
  <footer class="py-8 border-t border-slate-800 text-center text-slate-500 text-sm">
    <p>© 2026 Felix Thomas</p>

    <div class="mt-4 flex items-center justify-center gap-4">

      <p class="group relative flex items-center gap-2">
        Kontakt: thomasfelix@web.de
      </p>

      <button
          @click="copyEmail"
          class="group relative flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
          title="Kopieren"
      >

        <svg class="w-4 h-4 text-slate-500 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
        </svg>

        <transition name="fade">
          <span v-if="copied" class="absolute -top-8 bg-blue-600 text-white text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap">
            Kopiert
          </span>
        </transition>
      </button>

      <span class="text-slate-700">|</span>

      <a
          href="mailto:thomasfelix@web.de"
          class="text-slate-500 hover:text-blue-500 transition-colors"
          title="E-Mail senden"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
      </a>

    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const copied = ref(false)

const copyEmail = async () => {
  await navigator.clipboard.writeText('kontakt@felix-thomas.de')
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
