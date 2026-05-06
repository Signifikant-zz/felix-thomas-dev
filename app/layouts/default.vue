<template>
  <div class="min-h-screen bg-slate-900 text-white font-sans selection:bg-blue-500/30">
    <nav class="fixed top-0 w-full z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div class="text-xl font-bold tracking-tighter">FT<span class="text-blue-500">.</span>DEV</div>

        <slot name="navigation" />

      </div>
    </nav>

    <main>
      <slot />
    </main>

  </div>
</template>

<script setup>

</script>
