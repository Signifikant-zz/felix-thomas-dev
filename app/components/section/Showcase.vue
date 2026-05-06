<template>
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
</template>

<script setup>
import {gsap}                 from "gsap";
import {ref}                  from "vue";

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

</script>
