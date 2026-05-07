<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// --- AUTH ---
const loginCookie = useCookie('is_logged_in', { path: '/' });
const isLoggedIn = ref(false);
const passwordInput = ref('');
const loginError = ref(false);
const isSubmitting = ref(false);

// --- DATA FETCHING ---
// Wir nutzen dein ursprüngliches Fetching, aber mit Fehlerabsicherung
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
  if (!title) return { date: '', name: '' };
  const parts = title.split('_');
  const dateStr = parts[0] || '0000';
  const year = "20" + dateStr.substring(0, 2);
  const month = dateStr.substring(2, 4);
  const name = parts.slice(1).join(' ').replace(/_/g, ' ');
  return { date: `${month} / ${year}`, name };
};

const hasFormat = (campaign, type) => {
  if (!campaign?.formats) return false;
  const t = type.toLowerCase();
  const formats = campaign.formats.map(f => (f.name || '').toLowerCase());
  if (t === 'ds') return formats.some(n => n.includes('sitebar') || n.includes('ds'));
  if (t === 'hpa') return formats.some(n => n.includes('300x600'));
  if (t === 'sky') return formats.some(n => (n.includes('160x600') || n.includes('skyscraper')) && !n.includes('300x600'));
  if (t === 'interstitial') return formats.some(n => n.includes('320x480') || n.includes('interstitial'));
  if (t === 'billboard') return formats.some(n => n.includes('800x250') || n.includes('970x250'));
  if (t === 'rectangle') return formats.some(n => n.includes('300x250'));
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
        <h2 class="text-sm uppercase tracking-[0.3em] text-blue-500 font-bold mb-4">Portfolio</h2>
        <h3 class="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-10 text-balance">
          Ausgewählte Arbeiten<span class="text-blue-500">.</span>
        </h3>
        <div class="flex flex-col lg:flex-row gap-12 lg:gap-20">
          <div class="lg:w-1/2 text-slate-600 leading-relaxed">
            <p class="text-lg mb-6">In den vergangenen sechs Jahren lag mein Schwerpunkt auf der technischen Umsetzung hochperformanter Werbemittel.</p>
            <p class="text-sm italic border-l-2 border-slate-200 pl-4">Passwortgeschützter Zugang.</p>
          </div>
        </div>
      </div>

      <div class="relative min-h-[400px]">
        <div v-if="!isLoggedIn" class="absolute -inset-4 z-50 flex items-center justify-center bg-slate-900/5 backdrop-blur-xl rounded-3xl border border-slate-100/50 shadow-inner">
          <div class="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl text-center border-t-8 border-t-blue-500">
            <div class="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">🔒</div>
            <h3 class="text-2xl font-bold text-slate-900 mb-2">Geschützter Inhalt</h3>
            <form @submit.prevent="checkPassword" class="space-y-4">
              <input v-model="passwordInput" type="password" placeholder="Zugangscode" class="w-full px-5 py-4 bg-slate-100 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
              <button type="submit" class="w-full bg-blue-500 text-white px-10 py-4 rounded-xl font-bold shadow-lg hover:bg-blue-600 transition-all active:scale-95">
                {{ isSubmitting ? 'Wird geprüft...' : 'Inhalte freischalten' }}
              </button>
              <p v-if="loginError" class="text-red-500 text-xs mt-2 font-medium">Ungültiger Code.</p>
            </form>
          </div>
        </div>

        <div v-if="pending && isLoggedIn" class="text-center py-20 text-slate-400 font-medium">Scanne Projekte...</div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700" :class="{ 'opacity-10 pointer-events-none grayscale blur-sm': !isLoggedIn }">
          <div v-for="(campaign, index) in campaigns" :key="index" @click="openCampaign(campaign, index)"
               class="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500 flex flex-col">

            <div class="h-48 bg-slate-900 relative flex items-center justify-center overflow-hidden">
              <div class="absolute inset-0 flex items-center justify-center pointer-events-none text-[120px] font-black text-white/[0.03] select-none uppercase">
                {{ parseTitle(campaign.title).name.substring(0,3) }}
              </div>
              <div class="relative z-10 flex gap-4 items-end opacity-40 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110">
                <div v-if="hasFormat(campaign, 'ds')" class="w-10 h-20 border-2 border-blue-500 rounded-sm relative flex items-center justify-center bg-blue-500/10">
                  <div class="flex flex-col items-center leading-none text-blue-400 font-black text-lg"><span>→</span><span>↓</span></div>
                </div>
                <div v-if="hasFormat(campaign, 'hpa')" class="w-10 h-20 border-2 border-white/80 rounded-sm bg-white/10"></div>
                <div v-else-if="hasFormat(campaign, 'sky')" class="w-5 h-20 border border-white/60 rounded-sm"></div>
                <div v-if="hasFormat(campaign, 'billboard')" class="w-24 h-6 border border-white/60 rounded-sm"></div>
                <div v-if="hasFormat(campaign, 'rectangle')" class="w-12 h-10 border border-white/60 rounded-sm"></div>
              </div>
            </div>

            <div class="p-6 text-left">
              <p class="text-blue-500 text-[10px] font-bold uppercase tracking-widest mb-1">{{ campaign.client }}</p>
              <h4 class="text-xl font-bold text-slate-900 leading-tight">{{ parseTitle(campaign.title).name }}</h4>
              <div class="pt-4 mt-4 border-t border-slate-50 flex justify-between items-center text-[10px]">
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
        <div class="relative bg-white rounded-2xl w-full max-w-6xl h-[90vh] overflow-hidden shadow-2xl flex flex-col text-left">

          <div class="p-4 border-b flex justify-between items-center bg-slate-50">
            <div>
              <span class="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{{ activeCampaign.client }}</span>
              <h4 class="font-bold text-slate-900">{{ parseTitle(activeCampaign.title).name }}</h4>
            </div>
            <button @click="closeModal" class="p-2 text-slate-400 hover:text-slate-900">✕</button>
          </div>

          <div class="flex flex-1 overflow-hidden">
            <div class="w-24 md:w-56 border-r border-slate-100 p-2 md:p-4 bg-slate-50 overflow-y-auto">
              <button v-for="f in activeCampaign.formats" :key="f.name" @click="activeFormat = f"
                      class="w-full text-center md:text-left px-2 md:px-4 py-3 rounded-xl text-[10px] md:text-sm font-medium transition-all mb-2"
                      :class="activeFormat.name === f.name ? 'bg-blue-500 text-white shadow-lg' : 'hover:bg-slate-200 text-slate-600'">
                {{ f.name }}
              </button>
            </div>

            <div class="flex-1 bg-slate-200 p-4 flex items-center justify-center overflow-auto relative">
              <div v-if="activeFormat && activeFormat.width && !activeFormat.isResponsive"
                   class="bg-white shadow-2xl relative"
                   :style="{ width: activeFormat.width + 'px', height: activeFormat.height + 'px' }">
                <iframe :key="activeFormat.url" :src="activeFormat.url" class="w-full h-full border-0 bg-white" scrolling="no"></iframe>
                <div class="absolute -bottom-8 left-0 text-[10px] text-slate-500 font-mono italic">
                  {{ activeFormat.width }} × {{ activeFormat.height }}px
                </div>
              </div>
              <div v-else-if="activeFormat" class="text-center p-12 bg-white rounded-3xl shadow-xl max-w-md border-t-8 border-blue-500">
                <div class="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">↔</div>
                <h5 class="text-2xl font-bold text-slate-900 mb-3 capitalize">{{ activeFormat.name.replace(/_/g, ' ') }}</h5>
                <a :href="activeFormat.url" target="_blank" class="inline-block bg-blue-500 text-white px-10 py-4 rounded-xl font-bold">Testseite öffnen ↗</a>
              </div>
            </div>
          </div>

          <div class="p-4 border-t flex justify-between items-center bg-white">
            <button @click="navigateCampaign(-1)" class="text-xs font-bold text-slate-400 hover:text-blue-500">← Projekt</button>
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
