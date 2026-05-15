<template>
  <NuxtLayout>
    <template #navigation>
      <div class="flex items-center justify-end h-full">
        <nav class="hidden md:flex gap-6">
          <a v-for="item in navItems"
             :key="item"
             @click.prevent="scrollToSection('#' + item)"
             class="text-sm tracking-[0.2em] font-bold uppercase cursor-pointer select-none transition-colors duration-300"
             :class="activeSection === item ? 'text-blue-500' : 'text-slate-400 hover:text-white'">
            {{ item }}
          </a>
        </nav>

        <button @click="isMenuOpen = !isMenuOpen"
                class="md:hidden flex flex-col justify-center items-end gap-1.5 z-[1100] relative w-10 h-10 -mr-2">
          <span :class="isMenuOpen ? 'rotate-45 translate-y-2 w-6' : 'w-6'" class="h-0.5 bg-white transition-all duration-300 origin-center"></span>
          <span :class="isMenuOpen ? 'opacity-0 scale-0' : 'w-4'" class="h-0.5 bg-white transition-all duration-300"></span>
          <span :class="isMenuOpen ? '-rotate-45 -translate-y-2 w-6' : 'w-6'" class="h-0.5 bg-white transition-all duration-300 origin-center"></span>
        </button>
      </div>

      <Teleport to="body">
        <transition :css="false" @enter="backdropEnter" @leave="backdropLeave">
          <div v-if="isMenuOpen"
               class="fixed top-16 inset-0 z-[990] bg-slate-900/60 md:hidden"
               @click="isMenuOpen = false"></div>
        </transition>

        <transition :css="false" @enter="navEnter" @leave="navLeave">
          <div v-if="isMenuOpen"
               class="fixed top-16 left-0 w-full bg-[#2d3748] border-b-2 border-blue-500 shadow-2xl z-[995] md:hidden">
            <nav class="flex flex-col p-4">
              <a v-for="item in navItems"
                 :key="'mob-' + item"
                 @click.prevent="mobileClick('#' + item)"
                 class="px-6 py-5 text-sm font-bold tracking-[0.2em] uppercase border-b border-white/5 last:border-0 flex justify-between items-center cursor-pointer select-none"
                 :class="activeSection === item ? 'text-blue-500' : 'text-slate-200'"
                 style="-webkit-tap-highlight-color: transparent;">
                {{ item }}
                <span v-if="activeSection === item" class="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span>
              </a>
            </nav>
          </div>
        </transition>
      </Teleport>
    </template>

    <SectionHero />
    <SectionSkills />
    <SectionDevelopment />
    <SectionShowcase />
    <SectionCv />
  </NuxtLayout>
</template>

<script setup>
import {
  onMounted,
  onUnmounted,
  ref
}                             from 'vue'
import { gsap }               from 'gsap'
import { ScrollToPlugin }     from 'gsap/ScrollToPlugin'
import { ScrollTrigger }      from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

const navItems                = ['intro', 'expertise', 'development', 'showcase', 'cv']
const isMenuOpen              = ref(false)
const activeSection           = ref('hero')

const scrollToSection = (id) => {
  gsap.to(window, { duration: 0.8, scrollTo: { y: id, offsetY: 64 }, ease: "power3.out" })
}

const mobileClick = (id) => {
  isMenuOpen.value = false
  setTimeout(() => {
    scrollToSection(id)
  }, 50)
}

const navEnter = (el, done) => {
  gsap.fromTo(el,
      { yPercent: -100 },
      { yPercent: 0, duration: 0.6, ease: "power4.out", onComplete: done }
  )
}

const navLeave = (el, done) => {
  gsap.to(el,
      { yPercent: -100, duration: 0.4, ease: "power2.in", onComplete: done }
  )
}

const backdropEnter = (el, done) => {
  gsap.fromTo(el,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, onComplete: done }
  )
}

const backdropLeave = (el, done) => {
  gsap.to(el,
      { opacity: 0, duration: 0.4, onComplete: done }
  )
}

const handleRefresh = () => {
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);
};

const handleResize = () => {
  ScrollTrigger.refresh();
};

onMounted(() => {
  ScrollTrigger.getAll().forEach(t => t.kill());

  navItems.forEach((item) => {
    ScrollTrigger.create({
      trigger: `#${item}`,
      start: "top 40%",
      end: "bottom 40%",
      onToggle: (self) => {
        if (self.isActive) activeSection.value = item;
      }
    });
  });

  window.addEventListener('resize', handleResize);
  window.addEventListener('content-updated', handleRefresh);

  ScrollTrigger.refresh();
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('content-updated', handleRefresh);

  ScrollTrigger.getAll().forEach(t => t.kill());
});

</script>
