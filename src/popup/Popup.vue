<script setup lang="ts">
import type { Tabs } from 'webextension-polyfill'
import { appStorage } from '~/logic/storage'

function formatUrl(url: string): string {
  return encodeURIComponent(url)
}

function getReviewsLink() {
  const url = (appStorage.value.activeTab as Tabs.Tab).url as string

  if (url) {
    const formattedLink = formatUrl(url)

    return `${formattedLink}`
  }
  else {
    return 'https://revilink.io'
  }
}

onMounted(async () => {
  await nextTick()
})
</script>

<template>
  <main class="w-[425px] px-4 py-5 text-gray-700">
    <header>
      <div class="flex justify-start">
        <Logo :height="64" />
      </div>
      <div class="flex justify-start">
        <p class="text-gray-500 absolute left-[55px]">
          Comment on any link on the internet
        </p>
      </div>
    </header>

    <section class="block pt-6 mb-0">
      <!-- eslint-disable-next-line -->
      <iframe id="revilink-reviews-embed-iframe" :src="`https://revilink.io/embed/reviews?link=${getReviewsLink()}&urlReactions=true&commentListHead=true&avatar=true&reply=true&like=true&commentFormAvatar=true&perPage=10&page=1`" frameborder="0" width="600" height="800" scrolling="no" allowtransparency="true"></iframe>
    </section>

    <footer class="relative left-0 bottom-4 flex flex-col text-[11px] text-gray-600 mt-10">
      <p><a href="https://revilink.io" target="_blank" class="text-gray-800">Revilink</a> - Comment on any link on the internet</p>
      <p>All rights reserved © {{ new Date().getFullYear() }}. revilink.io by <a href="https://selimdoyranli.com" target="_blank" class="text-gray-800">@selimdoyranli</a></p>
    </footer>
  </main>
</template>
