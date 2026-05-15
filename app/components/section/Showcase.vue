<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// --- AUTH ---
const loginCookie = useCookie('is_logged_in', { path: '/' });
const isLoggedIn = ref(false);
const passwordInput = ref('');
const loginError = ref(false);
const isSubmitting = ref(false);

// DATA FETCHING
const { data: campaigns, pending, refresh } = await useFetch('/api/projects', {
  immediate: false,
  server: false,
  default: () => []
})

const syncAuth = () => {
  const status = String(loginCookie.value) === 'true';
  if (isLoggedIn.value !== status) {
    isLoggedIn.value = status;
    if (status) refresh();
  }
};

let authInterval;
onMounted(() => {
  syncAuth();
  // Überwacht den Cookie jede Sekunde für reaktives Logout
  authInterval = setInterval(syncAuth, 1000);
});

onUnmounted(() => {
  if (authInterval) clearInterval(authInterval);
});

const checkPassword = async () => {
  if (!passwordInput.value) return;
  isSubmitting.value = true;
  loginError.value = false;
  try {
    const response = await $fetch('/api/login', {
      method: 'POST',
      body: { password: passwordInput.value.trim() }
    });
    if (response.success) {
      // API setzt den Cookie, wir triggern die UI
      isLoggedIn.value = true;
      await refresh();
      passwordInput.value = '';
    }
  } catch (err) {
    loginError.value = true;
  } finally {
    isSubmitting.value = false;
  }
};

// --- MODAL & HELPER ---
const activeCampaign = ref(null);
const activeFormat = ref(null);
const activeIndex = ref(0);

const parseTitle = (title) => {
  if (!title) return { client: '', name: '' };
  const parts = title.split('_');

  const dateStr = parts[0] || ''; // z.B. 2310
  const client = parts[1] || 'PROJEKT';
  const kampagne = parts.slice(2).join(' ').replace(/-/g, ' ');

  // Quartal berechnen: 01-03 = Q1, 04-06 = Q2, etc.
  const yearShort = dateStr.substring(0, 2);
  const month = parseInt(dateStr.substring(2, 4), 10);

  let quarter = '';
  if (month >= 1 && month <= 3) quarter = 'Q1';
  else if (month >= 4 && month <= 6) quarter = 'Q2';
  else if (month >= 7 && month <= 9) quarter = 'Q3';
  else if (month >= 10 && month <= 12) quarter = 'Q4';

  const timeInfo = quarter && yearShort ? `${quarter}/${yearShort}` : '';

  // Wir bauen den Namen: "Kunde + Kampagne (falls da) + Quartal"
  // Beispiel: "Lotto Jackpot — Q4/23" oder "Lotto Q4/23"
  const displayName = kampagne
      ? `${client} ${kampagne} — ${timeInfo}`
      : `${client} ${timeInfo}`;

  return {
    client: client.toUpperCase(),
    name: displayName
  };
};

const hasFormat = (campaign, type) => {
  if (!campaign?.formats) return false;
  const t = type.toLowerCase();
  const formats = campaign.formats.map(f => (f.name || '').toLowerCase());
  if (t === 'ds') return formats.some(n => n.includes('sitebar') || n.includes('ds'));
  if (t === 'hpa') return formats.some(n => n.includes('300x600') && !n.includes('ds') && !n.includes('sitebar'));
  if (t === 'sky') return formats.some(n => (n.includes('160x600') || n.includes('skyscraper')) && !n.includes('300x600'));
  if (t === 'interstitial') return formats.some(n => n.includes('320x480') || n.includes('interstitial'));
  if (t === 'billboard') return formats.some(n => n.includes('800x250') || n.includes('970x250'));
  if (t === 'rectangle') return formats.some(n => n.includes('300x250'));
  if (t === 'superbanner') return formats.some(n => n.includes('728x90'));
  if (t === 'fireplace' || t === 'wallpaper') return formats.some(n => n.includes(t));
  return formats.some(n => n.includes(t));
};

const openCampaign = (campaign, index) => {
  activeCampaign.value = campaign;
  activeIndex.value = index;
  activeFormat.value = campaign.formats[0];
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  activeCampaign.value = null;
  activeFormat.value = null;
  document.body.style.overflow = 'auto';
};

const navigateCampaign = (direction) => {
  if (!campaigns.value?.length) return;
  let newIdx = activeIndex.value + direction;
  if (newIdx < 0) newIdx = campaigns.value.length - 1;
  if (newIdx >= campaigns.value.length) newIdx = 0;
  openCampaign(campaigns.value[newIdx], newIdx);
};
</script>

<template>
  <section id="showcase" class="relative min-h-screen py-24 bg-white overflow-hidden font-sans">
    <div class="max-w-6xl mx-auto px-6">

      <div class="mb-16">
        <h2 class="text-sm uppercase tracking-[0.3em] text-blue-500 font-bold mb-4">Banner Showcase</h2>
        <h3 class="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-10 text-balance">
          Ausgewählte Arbeiten<span class="text-blue-500">.</span>
        </h3>

        <div class="flex flex-col lg:flex-row gap-12 lg:gap-20">
          <div class="lg:w-1/2 text-slate-600 leading-relaxed">
            <p class="text-lg mb-6">
              In den vergangenen sechs Jahren lag mein Schwerpunkt auf der technischen Umsetzung hochperformanter Werbemittel. In dieser Zeit habe ich eine Vielzahl nationaler und internationaler Kampagnen realisiert – stets mit dem Anspruch an <strong>höchste Präzision, Schnelligkeit, Kundenzufriedenheit und Termintreue</strong>.
            </p>
            <p class="text-sm italic border-l-2 border-blue-500 pl-4 py-1 bg-slate-50">
              Die hier gezeigte Auswahl bietet einen kleinen Einblick in die Bandbreite meiner Arbeit. <br />
              <span class="text-slate-400 font-normal">Der Zugang ist passwortgeschützt – das Passwort finden Sie in meinen Bewerbungsunterlagen.</span>
            </p>
          </div>

          <div class="lg:w-1/2">
            <h4 class="text-slate-900 font-bold mb-6 uppercase tracking-wider text-xs">Expertise im Detail:</h4>
            <ul class="space-y-6">
              <li class="flex items-start gap-4 text-slate-600">
                <span class="text-blue-500 font-bold mt-1">/</span>
                <span class="text-sm leading-relaxed">
<!--          <strong>Motion Development:</strong> Umsetzung von Animationen mit <strong>GSAP 3</strong> – basierend auf detaillierten Storyboards oder durch eigenständige kreative Gestaltung auf Basis vorhandener Layouts.-->
                  <strong>Creative Motion Engineering:</strong> Programmierung komplexer Animationen mit <strong>GSAP 3</strong>. Die Realisierung erfolgt wahlweise auf Basis detaillierter Storyboards, vager Briefings oder in freier Gestaltung – inklusive zügiger Anpassung und Finalisierung im direkten Austausch mit dem Kunden..
        </span>
              </li>
              <li class="flex items-start gap-4 text-slate-600">
                <span class="text-blue-500 font-bold mt-1">/</span>
                <span class="text-sm leading-relaxed">
<!--              <strong>Design & Adaption:</strong> Souveräner Umgang mit Adobe Suite, Figma und Sketch. Die Bandbreite umfasst die pixelgenaue Umsetzung von Master-Layouts, deren eigenständige Adaption auf Abformate sowie die kreative Neugestaltung basierend auf bestehenden Kampagnen-Assets.-->
              <strong>Design Integrity & Adaptation:</strong> Der Hauptfokus liegt auf der pixelgenauen Realisierung gelieferter Layouts - inklusive der lösungsorientierten Asset-Aufbereitung zur Ermöglichung komplexer Animationen. Das Spektrum umfasst zudem die eigenständige Formatadaption sowie die Konzeption neuer Layouts auf Basis bestehender Kampagnen-Assets.
                </span>
              </li>
              <li class="flex items-start gap-4 text-slate-600">
                <span class="text-blue-500 font-bold mt-1">/</span>
                <span class="text-sm leading-relaxed">
<!--          <strong>Technical Delivery:</strong> Strikte Einhaltung technischer Spezifikationen inkl. Asset-Optimierung zur Einhaltung von Dateigrößen-Grenzen – auch unter engen Deadlines und in intensiven Feedback-Zyklen.-->
       <strong>Technical Delivery & Ad Management:</strong> Strikte Einhaltung technischer Spezifikationen inkl. Asset-Optimierung. Erprobte Routine im Setup und Deployment auf Plattformen wie Flashtalking, CM360 oder DCStudio – auch unter engen Deadlines.
        </span>
              </li>
            </ul>
          </div>
        </div>

      </div>

      <div class="relative min-h-[700px]">

        <div v-if="!isLoggedIn"
             class="absolute inset-0 z-50 flex items-start justify-center pt-32 bg-white/40 backdrop-blur-md rounded-3xl border border-slate-100 transition-all duration-500">

          <div class="max-w-md w-full bg-white p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] text-center border border-slate-100 border-t-8 border-t-blue-500 mx-6 relative z-[60]">
            <div class="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl shadow-inner">🔒</div>
            <h3 class="text-2xl font-bold text-slate-900 mb-2">Geschützter Inhalt</h3>
            <p class="text-slate-500 mb-8 text-sm">Geben Sie Ihren Zugangscode ein, um das Showcase freizuschalten.</p>

            <form @submit.prevent="checkPassword" class="space-y-4">
              <input
                  v-model="passwordInput"
                  type="password"
                  placeholder="Zugangscode"
                  autocomplete="current-password"
                  class="w-full px-5 py-4 bg-slate-100 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900"
                  style="color-scheme: light;"
              />
              <button type="submit" :disabled="isSubmitting" class="w-full bg-blue-500 text-white px-10 py-4 rounded-xl font-bold shadow-lg hover:bg-blue-600 transition-all active:scale-95 disabled:opacity-50">
                {{ isSubmitting ? 'Wird geprüft...' : 'Inhalte freischalten' }}
              </button>
              <p v-if="loginError" class="text-red-500 text-xs mt-2 font-medium">Ungültiger Code.</p>
            </form>
          </div>
        </div>

        <div v-if="pending" class="text-center py-20 text-slate-400">Scanne Projekte...</div>

        <div v-else
             class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700"
             :class="{ 'opacity-40 grayscale blur-sm pointer-events-none select-none': !isLoggedIn }">

          <div v-for="(campaign, index) in campaigns" :key="index" @click="openCampaign(campaign, index)"
               class="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500 flex flex-col">

            <div class="h-48 bg-slate-900 relative flex items-center justify-center overflow-hidden">
              <div class="absolute inset-0 flex items-center justify-center pointer-events-none text-[120px] font-black text-white/[0.03] select-none uppercase">
                {{ parseTitle(campaign.title).name.substring(0,3) }}
              </div>
              <div class="relative z-10 flex gap-4 items-end opacity-40 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110">
                <div v-if="hasFormat(campaign, 'ds')" class="w-10 h-20 border-2 border-white/60 rounded-sm relative flex items-center justify-center bg-white/10 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                  <div class="flex flex-col items-center leading-none text-white/60 font-black text-lg"><span>→</span><span>↓</span></div>
                </div>
                <div v-if="hasFormat(campaign, 'hpa')" class="w-10 h-20 border-2 border-white/60 rounded-sm bg-white/5"></div>
                <div v-else-if="hasFormat(campaign, 'sky')" class="w-5 h-20 border border-white/60 rounded-sm"></div>
                <div v-if="hasFormat(campaign, 'interstitial')" class="w-12 h-16 border border-white/60 rounded-sm bg-white/10 relative">
                  <div class="absolute inset-1 border border-white/20 border-dashed"></div>
                </div>
                <div v-if="hasFormat(campaign, 'superbanner')" class="w-20 h-4 border border-white/60 rounded-sm bg-white/5"></div>
                <div v-if="hasFormat(campaign, 'billboard')" class="w-24 h-6 border border-white/60 rounded-sm"></div>
                <div v-if="hasFormat(campaign, 'rectangle')" class="w-12 h-10 border border-white/60 rounded-sm"></div>
                <div v-if="hasFormat(campaign, 'fireplace')" class="flex items-start h-20 gap-0 border border-white/20 border-dashed p-1">
                  <div class="w-3 h-full bg-white/60"></div>
                  <div class="w-16 h-4 bg-white/60 mx-[2px]"></div>
                  <div class="w-3 h-full bg-white/60"></div>
                </div>
                <div v-if="hasFormat(campaign, 'wallpaper')" class="flex items-start h-20 gap-0 border border-white/10 border-dashed p-1">
                  <div class="w-16 h-4 bg-white/80 mx-[2px]"></div>
                  <div class="w-3 h-full bg-white/60"></div>
                </div>
              </div>
            </div>

            <div class="p-6 text-left">
              <div class="mb-6">
                <p class="text-blue-500 text-[10px] font-bold uppercase tracking-widest mb-1">{{ campaign.client }}</p>
                <h4 class="text-xl font-bold text-slate-900 leading-tight">{{ parseTitle(campaign.title).name }}</h4>
              </div>
              <div class="pt-4 border-t border-slate-50 flex justify-between items-center text-[10px]">
                <span class="font-mono text-slate-400 uppercase">{{ campaign.title }}</span>
                <span class="font-bold text-slate-300 uppercase">{{ campaign.formats.length }} Formate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="activeCampaign && isLoggedIn" class="fixed inset-0 z-[1100] flex items-center justify-center bg-slate-950/95 backdrop-blur-sm p-4 md:p-8">
        <div class="absolute inset-0" @click="closeModal"></div>
        <div class="relative bg-white rounded-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col text-left">

          <div class="p-4 border-b flex justify-between items-center bg-slate-50">
            <div>
              <span class="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{{ activeCampaign.client }}</span>
              <h4 class="font-bold text-slate-900">{{ parseTitle(activeCampaign.title).name }}</h4>
            </div>
            <button @click="closeModal" class="p-2 text-slate-400 hover:text-slate-900">✕</button>
          </div>

          <div class="flex flex-1 overflow-hidden">
            <div class="w-24 md:w-56 border-r border-slate-100 p-2 md:p-4 bg-slate-50 overflow-y-auto">
              <div class="space-y-2 text-left">
                <button v-for="f in activeCampaign.formats" :key="f.name" @click="activeFormat = f"
                        class="w-full text-center md:text-left px-2 md:px-4 py-3 rounded-xl text-[10px] md:text-sm font-medium transition-all"
                        :class="activeFormat.name === f.name ? 'bg-blue-500 text-white shadow-lg' : 'hover:bg-slate-200 text-slate-600'">
                  {{ f.name }}
                </button>
              </div>
            </div>

            <div class="flex-1 bg-slate-200 p-4 md:p-12 flex items-center justify-center overflow-auto relative">
              <div v-if="activeFormat && activeFormat.width && !activeFormat.isResponsive"
                   class="bg-white shadow-2xl relative"
                   :style="{ width: activeFormat.width + 'px', height: activeFormat.height + 'px' }">
                <iframe :key="activeFormat.url" :src="activeFormat.url" class="w-full h-full border-0 bg-white" scrolling="no"></iframe>
                <div class="absolute -bottom-8 left-0 text-[10px] text-slate-500 font-mono italic">
                  {{ activeFormat.width }} × {{ activeFormat.height }}px
                </div>
              </div>

              <div v-else-if="activeFormat"
                   class="text-center p-12 bg-white rounded-3xl shadow-xl max-w-md border-t-8 border-blue-500">
                <div class="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold">
                  {{ activeFormat.name.toLowerCase().includes('fireplace') ? '🔥' : '↔' }}
                </div>
                <h5 class="text-2xl font-bold text-slate-900 mb-3 capitalize">{{ activeFormat.name.replace(/_/g, ' ') }}</h5>
                <p class="text-sm text-slate-500 mb-8 leading-relaxed">
                  Dieses Format benötigt eine spezielle Umgebung oder ist voll-responsiv. Bitte nutzen Sie die Testseite.
                </p>
                <a :href="activeFormat.url" target="_blank" class="inline-block bg-blue-500 text-white px-10 py-4 rounded-xl font-bold shadow-lg hover:bg-blue-600 transition-all">
                  Testseite öffnen ↗
                </a>
              </div>
            </div>
          </div>

          <div class="p-4 border-t flex justify-between items-center bg-white">
            <button @click="navigateCampaign(-1)" class="text-xs font-bold text-slate-400 hover:text-blue-500">← Projekt</button>
            <div class="hidden md:flex gap-1">
              <div v-for="(_, i) in campaigns" :key="i" class="w-1.5 h-1.5 rounded-full transition-all" :class="i === activeIndex ? 'bg-blue-500 w-4' : 'bg-slate-200'"></div>
            </div>
            <button @click="navigateCampaign(1)" class="text-xs font-bold text-slate-400 hover:text-blue-500">Projekt →</button>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>


