<template>
  <section id="skills" class="py-24 bg-slate-800/30">
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="text-3xl font-bold mb-12">Expertise</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="skill in ['HTML5 / GSAP', 'Vue / Nuxt', 'PHP / Zend', 'Tailwind CSS']"
             class="p-4 border border-slate-700 rounded-lg bg-slate-800/50">
          {{ skill }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

</script>
