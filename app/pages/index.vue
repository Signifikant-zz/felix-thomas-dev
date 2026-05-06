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
      <section id="hero" class="min-h-screen flex items-center bg-white">
        <canvas id="hero-canvas" class="absolute inset-0 z-0 block"></canvas>

        <div class="max-w-6xl mx-auto px-6 z-10 w-full select-none">
          <h1 class="text-6xl md:text-8xl font-bold text-slate-900 mb-4 tracking-tighter leading-none">
            FRONTEND/<br />FULLSTACK<br />DEVELOPER<span class="text-blue-500">.</span>
          </h1>
          <p class="text-xl text-slate-400 max-w-2xl">
            Spezialisiert auf High-End Banner-Animationen (GSAP) und moderne Web-Applikationen.
          </p>
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

import { onMounted, ref }     from 'vue'
import { gsap }               from 'gsap'
import { ScrollToPlugin }     from 'gsap/ScrollToPlugin'
import { ScrollTrigger }      from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

const activeSection           = ref('hero')

const isLoggedIn              = ref(false)

const campaigns               = ref([
  {
    title: '2506_DasTelefonbuch',
    client: 'DasTelefonbuch',
    description: '',
    thumbnail: '/api/view/2506_DasTelefonbuch_300x250/fb.jpg',
    formats: [
      {
        name: 'Medium Rectangle',
        width: 300,
        height: 250,
        url: '/api/view/2506_DasTelefonbuch_300x250/index.html',
        type: 'static'
      },
      {
        name: 'Halfpage',
        width: 300,
        height: 600,
        url: '/api/view/2506_DasTelefonbuch_300x600/index.html',
        type: 'static'
      },
      {
        name: 'Billboard',
        width: 800,
        height: 250,
        url: '/api/view/2506_DasTelefonbuch_800x250/index.html',
        type: 'static'
      }
    ]
  },
  {
    title: '2510_Lotto',
    client: 'Lotto',
    description: '',
    thumbnail: '/api/view/2510_Lotto_300x960_DS_auto/fb.jpg',
    formats: [
      {
        name: 'Dynamic Sidebar (responsiv)',
        url: '/api/view/2510_Lotto_300x960_DS_auto/index.html',
        type: 'dynamic'
      },
    ]
  },
  {
    title: '2207_Michelin',
    client: 'Michelin',
    description: '',
    thumbnail: '',
    formats: [
      {
        name: 'Fireplace (120x600 + 1280x90 + 120x600)',
        url: '/api/view/2207_michelin_fireplace_120x600_1280x90_120x600/test.html',
        type: 'external'
      },
    ]
  },
])

const activeCampaign          = ref(null)
const activeFormat            = ref(null)

const openCampaign = (campaign) => {
  activeCampaign.value = campaign
  activeFormat.value = campaign.formats[0]
}

onMounted(() => {
  const observerOptions = {
    root: null,
    threshold: 0.5,
    rootMargin: "-10% 0px -40% 0px"
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id
      }
    })
  }, observerOptions)

  document.querySelectorAll('section[id]').forEach((section) => {
    observer.observe(section)
  })

  // HERO ANI
  const canvas = document.getElementById('hero-canvas');
  const ctx = canvas.getContext('2d');
  let width, height, particles = [];

  // State für Interaktion
  const mouse = { x: -1000, y: -1000 };
  const params = {
    time: 0,
    hue: 217, // Slate/Blue Bereich
    saturation: 10, // Dezent
    lightness: 50,
    repelRadius: 150,
    isAttracting: false
  };

  let particleCount = 1200

  const resize = () => {
    width = canvas.width = document.documentElement.clientWidth;
    height = canvas.height = window.innerHeight;

    if(window.innerWidth < 768){
      particleCount = 400
    }
    else if(window.innerWidth < 1024){
      particleCount = 800
    }
  };
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('contextmenu', (e) => e.preventDefault());

  window.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      // LINKSKLICK: Temporäres Anziehen / Boost
      params.isAttracting = true;
      gsap.to(params, { saturation: 80, lightness: 40, duration: 0.3 });
    }
    else if (e.button === 2) {
      // RECHTSKLICK: Dauerhafter Toggle
      params.isAttracting = !params.isAttracting;

      const targetHue = params.isAttracting ? 280 : 217;
      const targetSat = params.isAttracting ? 60 : 10;

      gsap.to(params, {
        hue: targetHue,
        saturation: targetSat,
        duration: 0.8,
        ease: "power2.inOut"
      });
    }
  });

// 3. Mouseup nur für Linksklick
  window.addEventListener('mouseup', (e) => {
    if (e.button === 0) {
      // Nur beim Linksklick lassen wir wieder los
      params.isAttracting = false;
      gsap.to(params, { saturation: 10, lightness: 50, duration: 1 });
    }
  });

  resize();

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.z = Math.random() * 100;
      this.speed = Math.random() * 1.5 + 0.5;
      this.life = Math.random() * 200 + 100;
      this.zOffset = Math.random() * Math.PI * 2;
    }

    update() {
      // 1. 3D-Wirbel Bewegung
      // Die Tiefe (z) schwingt synchron mit der Zeit und der Position
      this.z = (Math.sin(params.time * 2 + this.zOffset) + 1) * 50;

      // Die restliche Bewegung bleibt gleich
      const angle = (Math.cos(this.x * 0.0035) + Math.sin(this.y * 0.005) + params.time) * Math.PI;
      this.x += Math.cos(angle) * this.speed;
      this.y += Math.sin(angle) * this.speed;

      // 2. Maus-Interaktion (Repel vs. Attract)
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < params.repelRadius) {
        const force = (params.repelRadius - dist) / params.repelRadius;

        // Richtungs-Faktor: 1 = Abstoßen, -1.5 = Starkes Anziehen
        const direction = params.isAttracting ? -1.5 : 1;

        this.x += (dx / dist) * force * 10 * direction;
        this.y += (dy / dist) * force * 10 * direction;
      }

      this.life--;
      if (this.life <= 0 || this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
        this.reset();
      }
    }

    draw() {
      // Projektion der Z-Achse auf Größe und Sichtbarkeit
      // Partikel "vorne" (hoher z-Wert) sind größer und klarer
      const scale = (this.z / 100) * 1 + 0.5; // Größe zwischen 0.5 und 2.5
      const alpha = (this.z / 100) * 0.2 + 0.2; // Deckkraft zwischen 0.1 und 0.5

      ctx.fillStyle = `hsla(${params.hue}, ${params.saturation}%, ${params.lightness}%, ${alpha})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, scale, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) particles.push(new Particle());

  gsap.ticker.add(() => {
    params.time += 0.003;

    // Sanfter Trail-Effekt
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.fillRect(0, 0, width, height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });
  });
})

const scrollToSection = (id) => {
  gsap.to(window, {
    duration: 1.2,
    scrollTo: { y: id, offsetY: 64 },
    ease: "power4.out"
  })
}
</script>
