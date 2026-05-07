<template>
  <section id="intro" ref="container" class="relative min-h-screen flex items-center bg-white overflow-hidden w-full">

    <canvas
        id="hero-canvas"
        class="absolute inset-0 block pointer-events-none transition-all duration-500"
        :style="{
        zIndex: params.textBehind ? 25 : 5,
        mixBlendMode: params.textBehind ? 'difference' : 'normal'
      }"
    ></canvas>

    <div class="max-w-6xl mx-auto px-6 w-full select-none pointer-events-none z-10">
<!--      <div class="mb-0.5 overflow-hidden">-->
<!--        <span class="text-xl md:text-2xl font-bold tracking-tighter block transform translate-y-0">-->
<!--          <span class="text-slate-500">FELIX</span>-->
<!--          <span class="text-blue-500">THOMAS</span>-->
<!--        </span>-->
<!--      </div>-->

      <h1 class="text-6xl md:text-8xl font-bold text-slate-900 mb-4 tracking-tighter leading-none">
        FRONTEND <br />
        DEVELOPER<span class="text-blue-500">.</span><br />
        & CREATIVE <br />
        TECHNOLOGIST<span class="text-blue-500">.</span>
      </h1>
    </div>

    <div class="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-6">
      <button v-for="(config, modeName) in modeConfigs" :key="modeName"
              @click="switchMode(modeName)" class="group relative p-2 pointer-events-auto">
        <span class="block w-3 h-3 rounded-full border-2 border-slate-900 transition-all duration-500"
              :class="currentMode === modeName ? 'bg-slate-900 scale-125' : 'bg-transparent opacity-30 group-hover:opacity-100'">
        </span>
      </button>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { gsap } from "gsap";

const container = ref(null);
let particles = [];
let canvas, ctx, width, height;
let tickerFunction = null;
let isHeroVisible = true; // Steuerung für Intersection

const mouse = { x: -1000, y: -1000 };

class Particle {
  constructor() {
    this.reset();
    // Initialisieren mit zufälliger Lebensdauer, damit nicht alle gleichzeitig sterben
    this.life = Math.random() * 500;
  }

  reset() {
    // Falls Breite/Höhe noch nicht da sind, Nutze Window als Fallback
    const safeWidth = width > 0 ? width : window.innerWidth;
    const safeHeight = height > 0 ? height : window.innerHeight;

    this.x = Math.random() * safeWidth;
    this.y = Math.random() * safeHeight;
    this.z = Math.random() * 100;
    this.speed = Math.random() * 1.5 + 0.5;
    this.zOffset = Math.random() * Math.PI * 2;

    // Lebensdauer-Parameter
    this.life = 0;
    this.maxLife = 200 + Math.random() * 400; // Zwischen 200 und 600 Frames
  }

  update() {
    // --- LEBENSDAUER-CHECK (Spezifisch für Classic) ---
    // Verhindert das "Zusammenkleben" zu Linien durch regelmäßigen Respawn
    if (currentMode.value === 'classic') {
      this.life++;
      if (this.life > this.maxLife) {
        this.reset();
      }
    }

    // Animation & Tiefe
    this.z = (Math.sin(params.value.time * 2 + this.zOffset) + 1) * 50;

    // Das jeweilige Bewegungsverhalten aus dem behaviors-Objekt aufrufen
    behaviors[currentMode.value](this);

    // --- INTERAKTION (Mouse Repel/Attract) ---
    const dx = this.x - mouse.x, dy = this.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < params.value.repelRadius) {
      const force = (params.value.repelRadius - dist) / params.value.repelRadius;
      const dir = params.value.isAttracting ? -1.5 : 1;
      this.x += (dx / dist) * force * 10 * dir;
      this.y += (dy / dist) * force * 10 * dir;
    }

    // --- BOUNDS CHECK (Spezifisch nach Modus) ---
    const margin = 100;
    if (
        this.x < -margin ||
        this.x > width + margin ||
        this.y < -margin ||
        this.y > height + margin
    ) {
      if (currentMode.value === 'classic') {
        // Im Classic-Modus: Komplett neu würfeln für gleichmäßige Verteilung
        this.reset();
      } else {
        // In anderen Modi (z.B. Techno): Einfaches Wrapping am Rand
        if (this.y < -margin) this.y = height + margin;
        else if (this.y > height + margin) this.y = -margin;

        if (this.x < -margin) this.x = width + margin;
        else if (this.x > width + margin) this.x = -margin;
      }
    }
  }

  draw() {
    const scale = (this.z / 100) * params.value.sizeScale + 0.5;
    const alpha = params.value.textBehind ? 0.6 : (this.z / 100) * 0.2 + 0.2;

    ctx.beginPath();
    ctx.fillStyle = `hsla(${params.value.hue}, ${params.value.saturation}%, ${params.value.lightness}%, ${alpha})`;
    ctx.arc(this.x, this.y, scale, 0, Math.PI * 2);
    ctx.fill();
  }
}

const currentMode = ref('classic');

const resize = () => {
  if (!container.value) return;
  const newWidth = container.value.offsetWidth;
  const newHeight = container.value.offsetHeight;

  if (newWidth > 0 && newHeight > 0) {
    width = canvas.width = newWidth;
    height = canvas.height = newHeight;
    updateParticleCount();
  }
};

const handleMouseMove = e => { mouse.x = e.clientX; mouse.y = e.clientY; };

const handleMouseDown = e => {
  if (e.button === 0) {
    params.value.isAttracting = true;
    gsap.to(params.value, { saturation: 80, lightness: 40, duration: 0.3 });
  } else if (e.button === 2) {
    const keys = Object.keys(modeConfigs);
    const nextIdx = (keys.indexOf(currentMode.value) + 1) % keys.length;
    switchMode(keys[nextIdx]);
  }
};

const handleMouseUp = e => {
  if (e.button === 0) {
    params.value.isAttracting = false;
    const cfg = modeConfigs[currentMode.value];
    gsap.to(params.value, { saturation: cfg.saturation, lightness: cfg.lightness, duration: 1 });
  }
};

const handleContextMenu = e => e.preventDefault();

// Visibility & Intersection Logic
const startTicker = () => {
  if (!tickerFunction) return;
  gsap.ticker.remove(tickerFunction); // Doppelungen vermeiden
  gsap.ticker.add(tickerFunction);
};

const stopTicker = () => {
  if (tickerFunction) gsap.ticker.remove(tickerFunction);
};

const handleVisibilityChange = () => {
  if (document.hidden) {
    stopTicker();
  } else if (isHeroVisible) {
    resize();
    startTicker();
  }
};

const params = ref({
  time: 0, hue: 217, saturation: 10, lightness: 50,
  repelRadius: 150, isAttracting: false,
  trailAlpha: 0.08, speedMult: 1, sizeScale: 1,
  textBehind: false
});

const modeConfigs = {
  classic: { hue: 217, saturation: 10, lightness: 50, repelRadius: 150, baseParticleCount: 1400, trailAlpha: 0.08, speedMult: 1, sizeScale: 1.1, textBehind: false },
  vortex: { hue: 217, saturation: 10, lightness: 50, repelRadius: 150, baseParticleCount: 1200, trailAlpha: 0.08, speedMult: 1.1, sizeScale: 1, textBehind: false },
  pulse: { hue: 190, saturation: 80, lightness: 60, repelRadius: 300, baseParticleCount: 600, trailAlpha: 0.15, speedMult: 0.5, sizeScale: 3, textBehind: false },
  techno: { hue: 150, saturation: 50, lightness: 90, repelRadius: 100, baseParticleCount: 2500, trailAlpha: 0.2, speedMult: 1.5, sizeScale: 0.7, textBehind: true },
  vines: { hue: 280, saturation: 40, lightness: 60, repelRadius: 200, baseParticleCount: 400, trailAlpha: 0.02, speedMult: 0.8, sizeScale: 1.5, textBehind: false }
};

const behaviors = {
  classic: (p) => {
    const angle1 = (Math.cos(p.x * 0.002) + Math.sin(p.y * 0.002) + params.value.time) * Math.PI;
    const angle2 = (Math.sin(p.x * 0.01 - params.value.time) + Math.cos(p.y * 0.01 - params.value.time)) * Math.PI;
    const finalAngle = angle1 * 0.8 + angle2 * 0.4;

    p.x += Math.cos(finalAngle) * p.speed * params.value.speedMult;
    p.y += Math.sin(finalAngle) * p.speed * params.value.speedMult;
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
};

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
  params.value.textBehind = config.textBehind;

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

onMounted(() => {
  canvas = document.getElementById('hero-canvas');
  ctx = canvas.getContext('2d');

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mousedown', handleMouseDown);
  window.addEventListener('mouseup', handleMouseUp);
  window.addEventListener('contextmenu', handleContextMenu);
  document.addEventListener("visibilitychange", handleVisibilityChange);

  resize();

  tickerFunction = () => {
    params.value.time += 0.003;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = `rgba(0, 0, 0, ${params.value.trailAlpha})`;
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'source-over';
    particles.forEach(p => {
      p.update();
      p.draw();
    });
  };

  // Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isHeroVisible = entry.isIntersecting;
      if (isHeroVisible) {
        resize(); // Hartes Reset der Maße beim Wiedereintritt
        startTicker();
      } else {
        stopTicker();
      }
    });
  }, { threshold: 0.01 });

  if (container.value) observer.observe(container.value);

  // Initialer Start
  startTicker();
});

onUnmounted(() => {
  window.removeEventListener('resize', resize);
  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('mousedown', handleMouseDown);
  window.removeEventListener('mouseup', handleMouseUp);
  window.removeEventListener('contextmenu', handleContextMenu);
  document.removeEventListener("visibilitychange", handleVisibilityChange);
  stopTicker();
  particles = [];
});
</script>

