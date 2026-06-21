<template>
  <div class="min-h-screen bg-slate-900 text-white font-sans selection:bg-blue-500/30">
    <nav class="fixed top-0 w-full z-[1000] bg-[#1b202d] border-b border-slate-800">
      <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        <div class="flex items-baseline text-xl md:text-2xl font-bold tracking-tighter select-none">
          <span class="text-blue-500">FELIX</span>

          <span class="text-white text-opacity-90 ml-0">THOMAS</span>

          <span class="inline-block w-[0.3em] h-[0.3em] bg-blue-500 rounded-full ml-[0.1em] self-baseline"></span>
        </div>

        <slot name="navigation" />

      </div>
    </nav>

    <main>
      <slot />
    </main>

    <AppFooter />
  </div>
</template>
<script setup>
import AppFooter from "~/components/AppFooter.vue"
</script>
