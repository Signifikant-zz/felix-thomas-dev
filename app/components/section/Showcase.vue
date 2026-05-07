<script setup>
import { ref, onMounted, watch } from "vue";

// --- AUTH ---
const loginCookie = useCookie('is_logged_in', { path: '/' });
const isLoggedIn = ref(false);
const passwordInput = ref('');
const loginError = ref(false);
const isSubmitting = ref(false);

// --- DATA FETCHING ---
// Wir laden die Daten erst, wenn isLoggedIn true ist
const { data: campaigns, pending, refresh } = await useFetch('/api/projects', {
  immediate: false,
  server: false,
  default: () => [] // Verhindert, dass campaigns jemals null ist
})

const updateAuth = () => {
  const status = String(loginCookie.value) === 'true';
  isLoggedIn.value = status;
  if (status && (!campaigns.value || campaigns.value.length === 0)) {
    refresh();
  }
};

onMounted(() => {
  updateAuth();
  // Reaktivität beim manuellen Cookie-Löschen
  window.addEventListener('visibilitychange', updateAuth);
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
      isLoggedIn.value = true;
      await refresh();
      passwordInput.value = '';
    }
  } catch (err) {
    loginError.value = true;
    isLoggedIn.value = false;
  } finally {
    isSubmitting.value = false;
  }
};

// --- NAVIGATION & HELPER ---
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
      </div>

      <div class="relative min-h-[400px]">
        <div v-if="!isLoggedIn" class="absolute inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-md rounded-3xl">
          <div class="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl text-center border border-slate-100 border-t-8 border-t-blue-500 mx-6">
            <h3 class="text-2xl font-bold text-slate-900 mb-2">Geschützter Inhalt</h3>
            <p class="text-slate-500 mb-8 text-sm">Geben Sie Ihren Zugangscode ein.</p>
            <form @submit.prevent="checkPassword" class="space-y-4">
              <input v-model="passwordInput" type="password" placeholder="Zugangscode" class="w-full px-5 py-4 bg-slate-100 border border-slate-200 rounded-xl outline-none" />
              <button type="submit" class="w-full bg-blue-500 text-white px-10 py-4 rounded-xl font-bold shadow-lg">
                {{ isSubmitting ? 'Wird geprüft...' : 'Freischalten' }}
              </button>
              <p v-if="loginError" class="text-red-500 text-xs mt-2">Ungültiger Code.</p>
            </form>
          </div>
        </div>

        <div v-if="isLoggedIn" class="transition-all duration-700">
          <div v-if="pending" class="text-center py-20 text-slate-400">Lade Projekte...</div>

          <div v-else-if="campaigns && campaigns.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="(campaign, index) in campaigns" :key="index" @click="openCampaign(campaign, index)"
                 class="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-all flex flex-col">
              <div class="h-48 bg-slate-900 flex items-center justify-center relative">
                <span class="text-white font-bold opacity-50">{{ parseTitle(campaign.title).name }}</span>
              </div>
              <div class="p-6">
                <p class="text-blue-500 text-[10px] font-bold uppercase mb-1">{{ campaign.client }}</p>
                <h4 class="text-xl font-bold text-slate-900">{{ parseTitle(campaign.title).name }}</h4>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-20 text-slate-400">Keine Projekte gefunden.</div>
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="activeCampaign && isLoggedIn" class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 p-4 md:p-8">
        <div class="absolute inset-0" @click="closeModal"></div>
        <div class="relative bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
          <div class="p-4 border-b flex justify-between items-center bg-slate-50">
            <h4 class="font-bold text-slate-900">{{ parseTitle(activeCampaign.title).name }}</h4>
            <button @click="closeModal" class="p-2 text-slate-400">✕</button>
          </div>
          <div class="flex flex-1 overflow-hidden">
            <div class="w-24 md:w-56 border-r overflow-y-auto p-2 bg-slate-50">
              <button v-for="f in activeCampaign.formats" :key="f.name" @click="activeFormat = f"
                      class="w-full mb-2 p-3 rounded-lg text-xs font-medium transition-all"
                      :class="activeFormat.name === f.name ? 'bg-blue-500 text-white' : 'hover:bg-slate-200'">
                {{ f.name }}
              </button>
            </div>
            <div class="flex-1 bg-slate-200 flex items-center justify-center p-4 relative overflow-auto">
              <iframe v-if="activeFormat" :key="activeFormat.url" :src="activeFormat.url" class="bg-white shadow-2xl" :style="{ width: activeFormat.width + 'px', height: activeFormat.height + 'px' }" frameborder="0"></iframe>
            </div>
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
