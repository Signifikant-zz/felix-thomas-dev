<script setup>
const password = ref('')
const error = ref(false)

const handleLogin = async () => {
  try {
    // Wir rufen unsere Server-API auf
    const data = await $fetch('/api/login', {
      method: 'POST',
      body: { password: password.value }
    })

    if (data.success) {
      localStorage.setItem('portfolio_token', 'true')

      setTimeout(() => {
        navigateTo('/portfolio')
      }, 100)
    }
  } catch (e) {
    console.error('Login fehlgeschlagen:', e)
    error.value = true
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div class="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
      <h2 class="text-2xl font-bold mb-2">Geschützter Bereich</h2>
      <p class="text-gray-600 mb-6 italic">Passworteingabe erforderlich</p>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <input
            v-model="password"
            type="password"
            placeholder="Passwort eingeben"
            class="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition"
        />
        <button type="submit" class="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition">
          Einloggen
        </button>
        <p v-if="error" class="text-red-500 text-sm animate-pulse">Zugriff verweigert.</p>
      </form>
    </div>
  </div>
</template>
