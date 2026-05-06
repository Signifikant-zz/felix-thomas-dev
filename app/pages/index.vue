<template>
  <NuxtLayout>
    <template #navigation>
      <div class="flex gap-6 text-sm uppercase tracking-widest font-medium">
        <a href="#hero"
           @click.prevent="scrollToSection('#hero')"
           :class="activeSection === 'hero' ? 'text-blue-500' : 'text-slate-400 hover:text-white'"
           class="transition-colors duration-300">Home</a>

        <a href="#skills"
           @click.prevent="scrollToSection('#skills')"
           :class="activeSection === 'skills' ? 'text-blue-500' : 'text-slate-400 hover:text-white'"
           class="transition-colors duration-300">Skills</a>

        <a href="#showcase"
           @click.prevent="scrollToSection('#showcase')"
           :class="activeSection === 'showcase' ? 'text-blue-500' : 'text-slate-400 hover:text-white'"
           class="transition-colors duration-300">Showcase</a>

        <a href="#cv"
           @click.prevent="scrollToSection('#cv')"
           :class="activeSection === 'cv' ? 'text-blue-500' : 'text-slate-400 hover:text-white'"
           class="transition-colors duration-300">CV</a>
      </div>
    </template>

    <div>
      <section id="hero" class="relative min-h-screen flex items-center bg-white overflow-hidden w-full">
        <canvas id="hero-canvas" class="absolute inset-0 z-0 block"></canvas>

        <div class="max-w-6xl mx-auto px-6 z-10 w-full select-none pointer-events-none">
          <h1 class="text-6xl md:text-8xl font-bold text-slate-900 mb-4 tracking-tighter leading-none">
            FRONTEND/<br />FULLSTACK<br />DEVELOPER<span class="text-blue-500">.</span>
          </h1>
          <p class="text-xl text-slate-400 max-w-2xl pointer-events-auto">
            Spezialisiert auf High-End Banner-Animationen (GSAP) und moderne Web-Applikationen.
          </p>
        </div>

        <div class="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-6">
          <button v-for="(config, modeName) in modeConfigs" :key="modeName"
                  @click="switchMode(modeName)" class="group relative p-2">
            <span class="block w-3 h-3 rounded-full border-2 border-slate-900 transition-all duration-500"
                  :class="currentMode === modeName ? 'bg-slate-900 scale-125' : 'bg-transparent opacity-30 group-hover:opacity-100'">
            </span>
          </button>
        </div>
      </section>

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

      <section id="showcase" class="py-24">
        <div class="max-w-6xl mx-auto px-6">
          <h2 class="text-3xl font-bold mb-12">Showcase</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div v-for="i in 3" class="aspect-video bg-slate-800 rounded-xl border-2 border-dashed border-slate-700 flex items-center justify-center text-slate-600">
              Kampagnen Slot {{ i }}
            </div>
          </div>
        </div>
      </section>

      <section id="cv" class="py-24 bg-[#1a202c] text-slate-200">
        <div class="max-w-5xl mx-auto px-6">

          <h2 class="text-4xl font-black mb-20 text-slate-100 tracking-tight">Werdegang</h2>

          <div class="mb-24">
            <h3 class="text-2xl font-bold mb-10 text-slate-150 border-b border-slate-700 pb-4">berufliche & praktische Erfahrung</h3>

            <div class="relative border-l-2 border-slate-700 md:ml-48">

              <div class="relative pl-10 pb-12">
                <div class="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-blue-500"></div>
                <span class="md:absolute md:-left-48 md:w-36 text-slate-200 text-[15px] font-mono font-bold md:text-right pt-0.5 whitespace-nowrap">03/2020 - 05/2026</span>
                <div>
                  <h4 class="text-xl font-bold text-white">Webentwickler & Programmierer (Senior Banner Developer)</h4>
                  <p class="text-slate-300">Tastenkunst GmbH, Leipzig</p>
                </div>
              </div>

              <div class="relative pl-10 pb-10">
                <div class="absolute -left-[6px] top-2 w-2.5 h-2.5 rounded-full bg-slate-500"></div>
                <span class="md:absolute md:-left-48 md:w-36 text-slate-300 text-sm font-mono md:text-right pt-0.5 whitespace-nowrap">02/2019 - 07/2019</span>
                <div>
                  <h4 class="text-lg font-bold text-slate-250">Software-Entwickler</h4>
                  <p class="text-slate-400">S&P Software Consulting & Solution GmbH, Leipzig</p>
                </div>
              </div>

              <div class="relative pl-10 pb-10">
                <div class="absolute -left-[6px] top-2 w-2.5 h-2.5 rounded-full bg-slate-500"></div>
                <span class="md:absolute md:-left-48 md:w-36 text-slate-300 text-sm font-mono md:text-right pt-0.5 whitespace-nowrap">12/2017 - 08/2018</span>
                <div>
                  <h4 class="text-lg font-bold text-slate-200">Programmierer (Praktikant)</h4>
                  <p class="text-slate-400">ORSoft GmbH, Leipzig</p>
                </div>
              </div>

              <div class="relative pl-10 pb-10">
                <div class="absolute -left-[6px] top-2 w-2.5 h-2.5 rounded-full bg-slate-500"></div>
                <span class="md:absolute md:-left-48 md:w-36 text-slate-300 text-sm font-mono md:text-right pt-0.5 whitespace-nowrap">12/2017 - 08/2018</span>
                <div>
                  <h4 class="text-lg font-medium text-slate-250 italic">autodidaktische Weiterbildung & private Projekte</h4>
                  <p class="text-slate-400">Zend Framework 2, HTML5, CSS3, Javascript (Leipzig)</p>
                </div>
              </div>

              <div class="relative pl-10">
                <div class="absolute -left-[6px] top-2 w-2.5 h-2.5 rounded-full bg-slate-500"></div>
                <span class="md:absolute md:-left-48 md:w-36 text-slate-300 text-sm font-mono md:text-right pt-0.5 whitespace-nowrap">02/2013 - 06/2013</span>
                <div>
                  <h4 class="text-lg font-bold text-slate-200">Programmierer / Webentwickler (Praktikant)</h4>
                  <p class="text-slate-400">Artkolchose GmbH, Leipzig</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-2xl font-bold mb-10 text-slate-150 border-b border-slate-700 pb-4">Bildungsweg</h3>

            <div class="relative border-l-2 border-slate-700 md:ml-48">

              <div class="relative pl-10 pb-12">
                <div class="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-blue-500"></div>
                <span class="md:absolute md:-left-48 md:w-36 text-slate-100 text-sm font-mono font-bold md:text-right pt-0.5 whitespace-nowrap">09/2016 - 08/2018</span>
                <div>
                  <h4 class="text-xl font-bold text-white">Fachinformatiker Anwendungsentwicklung (IHK)</h4>
                  <p class="text-slate-300">Note: 1,8 </p>
                  <p class="text-slate-400">ciT Leipzig GmbH</p>
                </div>
              </div>

              <div class="relative pl-10 pb-10">
                <div class="absolute -left-[6px] top-2 w-2.5 h-2.5 rounded-full bg-slate-500"></div>
                <span class="md:absolute md:-left-48 md:w-36 text-slate-300 text-sm font-mono md:text-right pt-0.5 whitespace-nowrap">05/2014 - 09/2014</span>
                <div>
                  <h4 class="text-lg font-bold text-slate-250">modulare Weiterbildung</h4>
                  <p class="text-slate-400">Web-Developer Level 2, Ajax, jQuery, Fortgeschrittene Programmierung mit JavaScript</p>
                  <p class="text-slate-400 text-sm">future Training & Consulting GmbH, Halle</p>
                </div>
              </div>

              <div class="relative pl-10 pb-12">
                <div class="absolute -left-[8px] top-2 w-3.5 h-3.5 rounded-full bg-blue-500"></div>
                <span class="md:absolute md:-left-48 md:w-36 text-slate-100 text-sm font-mono font-bold md:text-right pt-0.5 whitespace-nowrap">09/2011 - 09/2012</span>
                <div>
                  <h4 class="text-xl font-bold text-slate-150 font-bold">Web Design & Development - SAE Diploma</h4>
                  <p class="text-slate-300">Note: 1,9</p>
                  <p class="text-slate-400">SAE Leipzig</p>
                </div>
              </div>

              <div class="relative pl-10 pb-4">
                <div class="absolute -left-[7px] top-2 w-3 h-3 rounded-full bg-blue-500"></div>
                <span class="md:absolute md:-left-48 md:w-36 text-slate-100 text-sm font-mono font-bold md:text-right pt-0.5 whitespace-nowrap">10/2006 - 09/2010</span>
                <div>
                  <h4 class="text-xl font-bold text-slate-100">Magister Artium</h4>
                  <p class="text-slate-300">Magister Studium der Philosophie (1. Hauptfach) und der Logik & Wissenschaftstheorie (2. Hauptfach)</p>
                  <p class="text-slate-400">Universität Leipzig</p>
                </div>
              </div>

              <div class="relative pl-10 pb-10">
                <div class="absolute -left-[6px] top-2 w-2.5 h-2.5 rounded-full bg-slate-500"></div>
                <span class="md:absolute md:-left-48 md:w-36 text-slate-300 text-sm font-mono md:text-right pt-0.5 whitespace-nowrap">10/2002 - 09/2006</span>
                <div>
                  <p class="text-slate-400">Magister Studium der Logik & Wissenschaftstheorie (1. Hauptfach) und der Philosophie (2. Hauptfach)</p>
                  <p class="text-slate-400">Universität Leipzig</p>
                </div>
              </div>

              <div class="relative pl-10">
                <div class="absolute -left-[6px] top-2 w-2.5 h-2.5 rounded-full bg-slate-500"></div>
                <span class="md:absolute md:-left-48 md:w-36 text-slate-300 text-sm font-mono md:text-right pt-0.5 whitespace-nowrap">10/2002 - 09/2006</span>
                <div>
                  <h4 class="text-lg font-bold text-slate-150 leading-tight">Allgemeine Hochschulreife / Abitur</h4>
                  <p class="text-slate-400">Staatliches Gymnasium Lerchenberg Gymnasium, Altenburg</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

// --- 1. SEITEN-LOGIK (Navigation & Showcase) ---
const activeSection = ref('hero')
const isLoggedIn = ref(false)

const campaigns = ref([
  {
    title: '2506_DasTelefonbuch',
    client: 'DasTelefonbuch',
    formats: [
      { name: 'Medium Rectangle', width: 300, height: 250, url: '/api/view/2506_DasTelefonbuch_300x250/index.html' },
      { name: 'Halfpage', width: 300, height: 600, url: '/api/view/2506_DasTelefonbuch_300x600/index.html' }
    ]
  },
  {
    title: '2510_Lotto',
    client: 'Lotto',
    formats: [{ name: 'Dynamic Sidebar', url: '/api/view/2510_Lotto_300x960_DS_auto/index.html' }]
  }
])

const activeCampaign = ref(null)
const activeFormat = ref(null)

const openCampaign = (campaign) => {
  activeCampaign.value = campaign
  activeFormat.value = campaign.formats[0]
}

const scrollToSection = (id) => {
  gsap.to(window, { duration: 1.2, scrollTo: { y: id, offsetY: 64 }, ease: "power4.out" })
}

// --- 2. ENGINE-LOGIK (Variablen & Configs) ---
const currentMode = ref('classic')
let particles = []
let canvas, ctx, width, height
const mouse = { x: -1000, y: -1000 }

const params = ref({
  time: 0, hue: 217, saturation: 10, lightness: 50,
  repelRadius: 150, isAttracting: false,
  trailAlpha: 0.08, speedMult: 1, sizeScale: 1
})

const modeConfigs = {
  classic: {
    hue: 217,
    saturation: 10,
    lightness: 50,
    repelRadius: 150,
    baseParticleCount: 1200,
    trailAlpha: 0.08,
    speedMult: 1,
    sizeScale: 1
  },
  vortex: {
    hue: 217,
    saturation: 10,
    lightness: 50,
    repelRadius: 150,
    baseParticleCount: 1200,
    trailAlpha: 0.08,
    speedMult: 1.1,
    sizeScale: 1
  },
  pulse: {
    hue: 190,
    saturation: 80,
    lightness: 60,
    repelRadius: 300,
    baseParticleCount: 600,
    trailAlpha: 0.15,
    speedMult: 0.5,
    sizeScale: 3
  },
  techno: {
    hue: 150,
    saturation: 50,
    lightness: 40,
    repelRadius: 100,
    baseParticleCount: 2500,
    trailAlpha: 0.2,
    speedMult: 1.5,
    sizeScale: 0.7
  },
  vines: {
    hue: 280,
    saturation: 40,
    lightness: 60,
    repelRadius: 200,
    baseParticleCount: 400,
    trailAlpha: 0.02,
    speedMult: 0.8,
    sizeScale: 1.5
  }
}

const behaviors = {
  classic: (p) => {
    const angle = (Math.cos(p.x * 0.0035) + Math.sin(p.y * 0.005) + params.value.time) * Math.PI;
    p.x += Math.cos(angle) * p.speed * params.value.speedMult;
    p.y += Math.sin(angle) * p.speed * params.value.speedMult;
  },
  vortex: (p) => {
    const noiseScale = 0.008;
    const angle = (Math.cos(p.x * noiseScale) + Math.sin(p.y * noiseScale) + params.value.time) * Math.PI * 2;
    p.x += Math.cos(angle) * p.speed * params.value.speedMult;
    p.y += Math.sin(angle) * p.speed * params.value.speedMult;
  },
  pulse: (p) => {
    p.x += Math.cos(params.value.time + p.zOffset) * p.speed * params.value.speedMult;
    p.y += Math.sin(params.value.time + p.zOffset) * p.speed * params.value.speedMult;
  },
  techno: (p) => {
    p.y += p.speed * 4 * params.value.speedMult;
    if (p.y > height) p.y = 0;
  },
  vines: (p) => {
    p.x += Math.sin(params.value.time + p.y * 0.01) * p.speed;
    p.y -= p.speed * params.value.speedMult;
  }
}

const getPerformanceFactor = () => {
  if (process.server) return 1;
  return window.innerWidth < 768 ? 0.35 : window.innerWidth < 1024 ? 0.7 : 1;
};

const updateParticleCount = () => {
  const target = Math.floor(modeConfigs[currentMode.value].baseParticleCount * getPerformanceFactor());
  if (particles.length < target) {
    for (let i = particles.length; i < target; i++) particles.push(new Particle());
  } else {
    particles.splice(target);
  }
};

const switchMode = (newMode) => {
  currentMode.value = newMode;
  const config = modeConfigs[newMode];

  // WICHTIG: Wir animieren params.value, nicht params
  gsap.to(params.value, {
    hue: config.hue,
    saturation: config.saturation,
    lightness: config.lightness,
    repelRadius: config.repelRadius,
    trailAlpha: config.trailAlpha,
    speedMult: config.speedMult,
    sizeScale: config.sizeScale,
    duration: 1.5,
    ease: "power2.inOut",
    onStart: updateParticleCount
  });
};

// --- 3. PARTIKEL KLASSE ---
class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * (width || 1920);
    this.y = Math.random() * (height || 1080);
    this.z = Math.random() * 100;
    this.speed = Math.random() * 1.5 + 0.5;
    this.zOffset = Math.random() * Math.PI * 2;
  }
  update() {
    this.z = (Math.sin(params.value.time * 2 + this.zOffset) + 1) * 50;
    behaviors[currentMode.value](this);

    const dx = this.x - mouse.x, dy = this.y - mouse.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist < params.value.repelRadius) {
      const force = (params.value.repelRadius - dist) / params.value.repelRadius;
      const dir = params.value.isAttracting ? -1.5 : 1;
      this.x += (dx / dist) * force * 10 * dir;
      this.y += (dy / dist) * force * 10 * dir;
    }
    if (this.x < -100 || this.x > width + 100 || this.y < -100 || this.y > height + 100) this.reset();
  }
  draw() {
    // Wenn sizeScale 1 ist (wie im classic Modus),
    // ist die Schwankung geringer als bei sizeScale 3 (pulse).
    const scale = (this.z / 100) * params.value.sizeScale + 0.5;
    const alpha = (this.z / 100) * 0.2 + 0.2;

    ctx.fillStyle = `hsla(${params.value.hue}, ${params.value.saturation}%, ${params.value.lightness}%, ${alpha})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, scale, 0, Math.PI * 2);
    ctx.fill();
  }
}

// --- 4. LIFECYCLE ---
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) activeSection.value = e.target.id });
  }, { threshold: 0.5 });
  document.querySelectorAll('section[id]').forEach(s => observer.observe(s));

  canvas = document.getElementById('hero-canvas');
  ctx = canvas.getContext('2d');

  const resize = () => {
    width = canvas.width = document.documentElement.clientWidth;
    height = canvas.height = window.innerHeight;
    updateParticleCount();
  };
  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('contextmenu', e => e.preventDefault());
  window.addEventListener('mousedown', e => {
    if (e.button === 0) {
      params.value.isAttracting = true;
      gsap.to(params.value, { saturation: 80, lightness: 40, duration: 0.3 });
    } else if (e.button === 2) {
      // Rechtsklick: Modus-Zyklus
      const keys = Object.keys(modeConfigs);
      const nextIdx = (keys.indexOf(currentMode.value) + 1) % keys.length;
      switchMode(keys[nextIdx]);
    }
  });
  window.addEventListener('mouseup', e => {
    if (e.button === 0) {
      params.value.isAttracting = false;
      const cfg = modeConfigs[currentMode.value];
      gsap.to(params.value, { saturation: cfg.saturation, lightness: cfg.lightness, duration: 1 });
    }
  });

  gsap.ticker.add(() => {
    params.value.time += 0.003;
    ctx.fillStyle = `rgba(255, 255, 255, ${params.value.trailAlpha})`;
    ctx.fillRect(0, 0, width, height);
    particles.forEach(p => { p.update(); p.draw(); });
  });
});
</script>
