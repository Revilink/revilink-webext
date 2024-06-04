<script setup lang="ts">
import type { Tabs } from 'webextension-polyfill'
import browser from 'webextension-polyfill'
import { appStorage } from '~/logic/storage'
import { convertToRevilinkFormat } from '~/utils/url'

async function setActiveTab() {
  try {
    const [activeTab] = await browser.tabs.query({ active: true, currentWindow: true })
    if (activeTab)
      appStorage.value.activeTab = activeTab

    else
      console.error('No active tab found')
  }
  catch (error) {
    console.error('Error fetching active tab:', error)
  }
}

function getActiveLink() {
  let link = (appStorage.value.activeTab as Tabs.Tab).url as string

  if (link?.length > 0)
    link = convertToRevilinkFormat({ url: link })

  return link
}

const isOpenAppMenu = ref(false)

function handleClickAppMenuButton() {
  isOpenAppMenu.value = !isOpenAppMenu.value
}

const locale = ref(localStorage.getItem('revilink-webext-locale') || 'en')

function changeLocale(newLocale: string) {
  locale.value = newLocale
  localStorage.setItem('revilink-webext-locale', newLocale)
  isOpenAppMenu.value = false
}

onMounted(async () => {
  await nextTick()

  await setActiveTab()
})
</script>

<template>
  <main class="w-[425px] px-4 py-5 text-gray-700">
    <header class="relative">
      <div class="flex justify-start">
        <Logo :height="64" />
      </div>
      <div class="flex justify-start">
        <p class="text-gray-500 absolute left-[39px]">
          <template v-if="locale === 'en'">
            Comment on any link on the internet
          </template>
          <template v-if="locale === 'tr'">
            İnternetteki herhangi bir link hakkında yorum yap
          </template>
        </p>
      </div>
      <div class="flex justify-start absolute top-0 right-0">
        <button class="inline-flex items-center justify-center text-gray-500 w-[36px] h-[36px] rounded-full bg-[#fff] border border-gray-200 hover:bg-gray-100" @click="handleClickAppMenuButton">
          <ri:list-settings-fill v-if="!isOpenAppMenu" class="w-5 h-5" />
          <ri:close-line v-else class="w-5 h-5" />
        </button>
        <div v-if="isOpenAppMenu" class="absolute top-[40px] right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
          <ul class="py-1">
            <li>
              <button class="flex w-full items-center px-4 py-2 text-gray-700 hover:bg-gray-100" :class="{ 'bg-gray-100': locale === 'en' }" @click.prevent="changeLocale('en')">
                <circle-flags:us class="w-4 h-4 mr-2" />English
              </button>
            </li>
            <li>
              <button class="flex w-full items-center px-4 py-2 text-gray-700 hover:bg-gray-100" :class="{ 'bg-gray-100': locale === 'tr' }" @click.prevent="changeLocale('tr')">
                <circle-flags:tr class="w-4 h-4 mr-2" />Türkçe
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>

    <section class="block pt-10 mb-0">
      <a v-if="locale === 'en'" :href="`https://revilink.io/reviews?link=${getActiveLink()}`" :title="getActiveLink()" target="_blank" class="text-gray-800 hover:text-black bg-[#fff] line-clamp-1 py-1 px-2 line-height-relaxed rounded-lg"><ri:external-link-line class="float-left w-4 h-4 mt-[1px] mr-1" />{{ getActiveLink() }}</a>
      <a v-if="locale === 'tr'" :href="`https://revilink.io/tr/incelemeler?link=${getActiveLink()}`" :title="getActiveLink()" target="_blank" class="text-gray-800 hover:text-black bg-[#fff] line-clamp-1 py-1 px-2 line-height-relaxed rounded-lg"><ri:external-link-line class="float-left w-4 h-4 mt-[1px] mr-1" />{{ getActiveLink() }}</a>
      <!-- eslint-disable-next-line -->
      <iframe v-if="locale === 'en'" id="revilink-reviews-embed-iframe" :src="`https://revilink.io/embed/reviews?link=${getActiveLink()}&urlReactions=true&commentListHead=true&avatar=true&reply=true&like=true&commentFormAvatar=true&perPage=10&page=1`" frameborder="0" width="600" height="800" scrolling="no" allowtransparency="true"></iframe>
      <!-- eslint-disable-next-line -->
      <iframe v-if="locale === 'tr'" id="revilink-reviews-embed-iframe" :src="`https://revilink.io/tr/embed/incelemeler?link=${getActiveLink()}&urlReactions=true&commentListHead=true&avatar=true&reply=true&like=true&commentFormAvatar=true&perPage=10&page=1`" frameborder="0" width="600" height="800" scrolling="no" allowtransparency="true"></iframe>
    </section>

    <footer class="relative left-0 bottom-4 flex flex-col text-[11px] text-gray-600 mt-10">
      <template v-if="locale === 'en'">
        <p><a href="https://revilink.io" target="_blank" class="text-gray-800">Revilink</a> - Comment on any link on the internet</p>
        <p>All rights reserved © {{ new Date().getFullYear() }}. revilink.io by <a href="https://selimdoyranli.com" target="_blank" class="text-gray-800">@selimdoyranli</a></p>
      </template>

      <template v-if="locale === 'tr'">
        <p><a href="https://revilink.io/tr" target="_blank" class="text-gray-800">Revilink</a> - İnternetteki herhangi bir link hakkında yorum yap</p>
        <p>Tüm hakları saklıdır © {{ new Date().getFullYear() }}. revilink.io <a href="https://selimdoyranli.com" target="_blank" class="text-gray-800">@selimdoyranli</a> tarafından</p>
      </template>
    </footer>
  </main>
</template>
