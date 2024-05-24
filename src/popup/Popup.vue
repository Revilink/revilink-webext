<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storageDemo } from '~/logic/storage'

const activeLink = ref('')

function formatUrl(url: string): string {
  return encodeURIComponent(url)
}

function goExternalLink() {
  if (activeLink.value) {
    const formattedLink = formatUrl(activeLink.value)
    window.open(`https://revilink.io/reviews?link=${formattedLink}`, '_blank')
  }
}

onMounted(() => {
  //
})
</script>

<template>
  <main class="w-[300px] px-4 py-5 text-center text-gray-700">
    <Logo />
    <div>Popup</div>
    <SharedSubtitle />

    <button class="btn mt-2" @click="goExternalLink">
      Go to revilink
    </button>
    <div class="mt-2">
      <span class="opacity-50">Storage:</span> {{ storageDemo }}
    </div>
    <div class="mt-2">
      <span class="opacity-50">Active Link:</span> {{ activeLink }}
    </div>
  </main>
</template>
