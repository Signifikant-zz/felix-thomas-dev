<template>
  <NuxtLayout>
    <template #navigation>
      <div class="flex gap-6 text-sm uppercase tracking-widest font-medium">
        <a v-for="item in ['hero', 'skills', 'showcase', 'cv']"
           :key="item"
           :href="'#' + item"
           @click.prevent="scrollToSection('#' + item)"
           :class="activeSection === item ? 'text-blue-500' : 'text-slate-400 hover:text-white'"
           class="transition-colors duration-300 capitalize">
          {{ item }}
        </a>
      </div>
    </template>

    <SectionHero />
    <SectionSkills />
    <SectionShowcase />
    <SectionCv />

  </NuxtLayout>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

const activeSection = ref('hero')

const scrollToSection = (id) => {
  gsap.to(window, { duration: 1.2, scrollTo: { y: id, offsetY: 64 }, ease: "power4.out" })
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        activeSection.value = e.target.id
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  });

  document.querySelectorAll('section[id]').forEach(s => observer.observe(s));
})

</script>
