<template>
  <button
      @click="$emit('open', pdfPath)"
      class="text-blue-500 hover:text-blue-400 transition-colors flex items-center justify-center p-1 inline-flex"
      :title="title"
      type="button"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
      <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
      <path d="M10 9H8"/>
      <path d="M16 13H8"/>
      <path d="M16 17H8"/>
    </svg>
  </button>
</template>

<script setup>
defineProps({
  pdfPath: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: 'Dokument ansehen'
  }
})

defineEmits(['open'])
</script>
