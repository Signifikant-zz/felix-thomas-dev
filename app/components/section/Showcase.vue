<script setup>
import { ref, watch } from "vue";

// --- AUTH ---
// WICHTIG: Die Optionen müssen mit dem Server übereinstimmen
const loginOptions = {
  default: () => false,
  watch: true,
  path: '/',
  sameSite: 'lax',
  secure: true
};
const loginCookie = useCookie('is_logged_in', loginOptions);

const isLoggedIn = ref(loginCookie.value === true || String(loginCookie.value) === 'true');
const passwordInput = ref('');
const loginError = ref(false);
const isSubmitting = ref(false);

watch(loginCookie, (newVal) => {
  isLoggedIn.value = (newVal === true || String(newVal) === 'true');
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
      // Wir setzen den Cookie hier nochmal explizit mit den richtigen Optionen
      loginCookie.value = 'true';
      isLoggedIn.value = true;
      passwordInput.value = '';

      // Seite kurz neu laden oder Daten refreshen, damit useFetch die neuen Cookies nutzt
      refreshNuxtData();
    }
  } catch (err) {
    loginError.value = true;
  } finally {
    isSubmitting.value = false;
  }
};

// --- DATA FETCHING ---
// credentials: 'include' stellt sicher, dass useFetch die Cookies an die API sendet
const { data: campaigns, pending, refresh } = await useFetch('/api/projects', {
  credentials: 'include'
})

// ... restlicher Code (activeCampaign, parseTitle, etc.) bleibt gleich ...
</script>

<template>
  <section id="showcase" class="relative min-h-screen py-24 bg-white overflow-hidden font-sans">
    <div class="max-w-6xl mx-auto px-6">

      <div class="mb-16">
        <h2 class="text-sm uppercase tracking-[0.3em] text-blue-500 font-bold mb-4">Portfolio</h2>
        <h3 class="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-10 text-balance">
          Ausgewählte Arbeiten<span class="text-blue-500">.</span>
        </h3>

        <div class="flex flex-col lg:flex-row gap-12 lg:gap-20">
          <div class="lg:w-1/2 text-slate-600 leading-relaxed">
            <p class="text-lg mb-6">
              In den vergangenen sechs Jahren lag mein Schwerpunkt auf der technischen Umsetzung hochperformanter Werbemittel. In dieser Zeit habe ich eine Vielzahl nationaler und internationaler Kampagnen realisiert.
            </p>
            <p class="text-sm italic border-l-2 border-slate-200 pl-4">
              Die hier gezeigte Auswahl bietet einen Einblick in die Bandbreite meiner Arbeit der letzten 6 Jahre. <br />Der Zugang ist passwortgeschützt.
            </p>
          </div>

          <div class="lg:w-1/2">
            <h4 class="text-slate-900 font-bold mb-6 uppercase tracking-wider text-sm">Mein Fokus im Detail:</h4>
            <ul class="space-y-6 text-sm">
              <li class="flex items-start gap-4 text-slate-600">
                <span class="text-blue-500 font-bold mt-1">/</span>
                <span><strong>Full-Cycle Development:</strong> Animationen mit modernem HTML5, CSS3 und <strong>GSAP 3</strong>.</span>
              </li>
              <li class="flex items-start gap-4 text-slate-600">
                <span class="text-blue-500 font-bold mt-1">/</span>
                <span><strong>Design-Adaption:</strong> Pixelgenaue Umsetzung aus Figma, Adobe Suite oder Sketch.</span>
              </li>
              <li class="flex items-start gap-4 text-slate-600">
                <span class="text-blue-500 font-bold mt-1">/</span>
                <span><strong>Technical Excellence:</strong> Asset-Optimierung und strikte Einhaltung von Specs.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="relative">
        <div v-if="!isLoggedIn" class="absolute -inset-4 z-50 flex items-center justify-center bg-slate-900/5 backdrop-blur-xl rounded-3xl border border-slate-100/50 shadow-inner">
          <div class="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl text-center border border-slate-100 border-t-8 border-t-blue-500 mx-6">
            <div class="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl shadow-inner">🔒</div>
            <h3 class="text-2xl font-bold text-slate-900 mb-2">Geschützter Inhalt</h3>
            <p class="text-slate-500 mb-8 text-sm">Geben Sie Ihren Zugangscode ein, um das Showcase freizuschalten.</p>
            <form @submit.prevent="checkPassword" class="space-y-4">
              <input v-model="passwordInput" type="password" placeholder="Zugangscode" class="w-full px-5 py-4 bg-slate-100 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              <button type="submit" class="w-full bg-blue-500 text-white px-10 py-4 rounded-xl font-bold shadow-lg hover:bg-blue-600 transition-all active:scale-95">
                {{ isSubmitting ? 'Wird geprüft...' : 'Inhalte freischalten' }}
              </button>
              <p v-if="loginError" class="text-red-500 text-xs mt-2 font-medium">Ungültiger Code.</p>
            </form>
          </div>
        </div>

        <div v-if="pending" class="text-center py-20 text-slate-400">Scanne Projekte...</div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700" :class="{ 'opacity-10 pointer-events-none grayscale blur-sm': !isLoggedIn }">
          <div v-for="(campaign, index) in campaigns" :key="index" @click="openCampaign(campaign, index)"
               class="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500 flex flex-col">

            <div class="h-48 bg-slate-900 relative flex items-center justify-center overflow-hidden">
              <div class="absolute inset-0 flex items-center justify-center pointer-events-none text-[120px] font-black text-white/[0.03] select-none uppercase">
                {{ parseTitle(campaign.title).name.substring(0,3) }}
              </div>
              <div class="relative z-10 flex gap-4 items-end opacity-40 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110">

                <div v-if="hasFormat(campaign, 'ds')" class="w-10 h-20 border-2 border-blue-500 rounded-sm relative flex items-center justify-center bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                  <div class="flex flex-col items-center leading-none text-blue-400 font-black text-lg"><span>→</span><span>↓</span></div>
                </div>

                <div v-if="hasFormat(campaign, 'hpa')" class="w-10 h-20 border-2 border-white/80 rounded-sm bg-white/10"></div>

                <div v-else-if="hasFormat(campaign, 'sky')" class="w-5 h-20 border border-white/60 rounded-sm"></div>

                <div v-if="hasFormat(campaign, 'interstitial')" class="w-12 h-16 border border-white/60 rounded-sm bg-white/5 relative">
                  <div class="absolute inset-1 border border-white/20 border-dashed"></div>
                </div>

                <div v-if="hasFormat(campaign, 'billboard')" class="w-24 h-6 border border-white/60 rounded-sm"></div>

                <div v-if="hasFormat(campaign, 'rectangle')" class="w-12 h-10 border border-white/60 rounded-sm"></div>

                <div v-if="hasFormat(campaign, 'fireplace')" class="flex items-start h-20 gap-0 border border-white/20 border-dashed p-1">
                  <div class="w-3 h-full bg-white/60"></div>
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
      <div v-if="activeCampaign && isLoggedIn" class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-sm p-4 md:p-8">
        <div class="absolute inset-0" @click="closeModal"></div>
        <div class="relative bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col text-left">

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
