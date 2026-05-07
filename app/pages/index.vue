<template>
  <NuxtLayout>
    <template #navigation>
      <div class="flex gap-6 text-lg tracking-widest font-medium">
        <a v-for="item in ['intro', 'expertise', 'showcase', 'cv']"
           :key="item"
           :href="'#' + item"
           @click.prevent="scrollToSection('#' + item)"
           :class="activeSection === item ? 'text-blue-500' : 'text-slate-400 hover:text-white'"
           class="transition-colors duration-300">
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
  const sections = document.querySelectorAll('section[id]');

  const observerOptions = {
    // Dieser Margin erstellt einen Sensor-Streifen:
    // Er liegt 30% von oben und endet 69% vor dem unteren Rand.
    // Das heißt: Der Sensor ist fast eine Linie bei 30% der Höhe.
    rootMargin: '-30% 0px -69% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // NUR wenn die Section den Sensor-Streifen berührt, wird sie aktiv.
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id;
      }
    });
  }, observerOptions);

  sections.forEach((s) => observer.observe(s));

  // INITIALER CHECK: Damit Hero beim Laden aktiv ist
  // Wir prüfen, welche Section gerade den Punkt bei 30% überlappt
  const triggerPoint = window.innerHeight * 0.3;
  const initialSection = Array.from(sections).find(s => {
    const rect = s.getBoundingClientRect();
    return rect.top <= triggerPoint && rect.bottom >= triggerPoint;
  });

  if (initialSection) {
    activeSection.value = initialSection.id;
  }
});

</script>
