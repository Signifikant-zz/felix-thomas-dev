<script setup>
definePageMeta({
  middleware: 'auth'
})

const isAuthorized = ref(false)

const banners = [
  { id: 1, title: 'DasTelefonbuch 300x250', path: '/api/view/2506_DasTelefonbuch_300x250/index.html', width: '300px', height: '250px' },
  { id: 2, title: 'DasTelefonbuch 300x600', path: '/api/view/2506_DasTelefonbuch_300x600/index.html', width: '300px', height: '600px' },
  { id: 3, title: 'DasTelefonbuch 800x250', path: '/api/view/2506_DasTelefonbuch_800x250/index.html', width: '800px', height: '250px' },
]

onMounted(() => {

  const isLoggedIn = useCookie('is_logged_in')

  if (isLoggedIn.value === true || String(isLoggedIn.value) === 'true') {
    isAuthorized.value = true
  } else {
    navigateTo('/login')
  }
})
</script>

<template>
  <div v-if="isAuthorized" class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-7xl mx-auto">
      <header class="flex justify-between items-center mb-12">
        <h1 class="text-3xl font-bold text-gray-900 font-sans">Project Showcase</h1>
        <NuxtLink to="/" class="text-blue-600 hover:underline font-medium">← Back to CV</NuxtLink>
      </header>

      <div class="flex flex-wrap gap-10 items-start">
        <div
            v-for="banner in banners"
            :key="banner.id"
            class="bg-white p-4 rounded-xl shadow-md border border-gray-200"
        >
          <h2 class="text-sm font-semibold text-gray-600 mb-3 border-b pb-2">
            {{ banner.title }}
          </h2>

          <div class="bg-gray-50 flex items-center justify-center overflow-hidden">
            <iframe
                :src="banner.path"
                :width="banner.width"
                :height="banner.height"
                frameborder="0"
                scrolling="no"
                class="bg-white block border border-gray-100"
            ></iframe>
          </div>

          <div class="mt-3 flex justify-between items-center">
            <span class="text-[10px] text-gray-400 font-mono">Format: {{ banner.width }}x{{ banner.height }}</span>
            <a :href="banner.path" target="_blank" class="text-[10px] text-blue-500 hover:underline">Full View ↗</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="min-h-screen bg-gray-50 flex items-center justify-center">
    <p class="text-gray-400 animate-pulse font-sans">Checking authorization...</p>
  </div>
</template>
