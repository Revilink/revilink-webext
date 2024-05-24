<script setup lang="ts">
import { onMounted } from 'vue'
import type { Tabs } from 'webextension-polyfill'
import { BACKEND_URL, URL } from '~/system/constants'
import { useApi } from '~/composables'
import { appStorage } from '~/logic/storage'
import noCommentIcon from '~/assets/elements/state/no_chat.svg'

const review = reactive({
  isBusy: false,
  hasError: false,
  items: [],
  meta: {},
}) as any

const urlReaction = reactive({
  isBusy: false,
  hasError: false,
  items: [],
  meta: {},
}) as any

function formatUrl(url: string): string {
  return encodeURIComponent(url)
}

function goExternalLink() {
  const url = (appStorage.value.activeTab as Tabs.Tab).url as string

  if (url) {
    const formattedLink = formatUrl(url)
    window.open(`https://revilink.io/reviews?link=${formattedLink}`, '_blank')
  }
}

async function fetchReviews() {
  const { fetchReviews: _fetchReviews } = useApi()

  review.isBusy = true

  try {
    const { data, meta } = await _fetchReviews({ url: (appStorage.value.activeTab as Tabs.Tab).url as string })

    review.items = data
    review.meta = meta
  }
  catch (error) {
    review.hasError = true
  }

  review.isBusy = false
}

async function fetchUrlReactions() {
  const { fetchUrlReactions: _fetchUrlReactions } = useApi()

  urlReaction.isBusy = true

  try {
    const { data, meta } = await _fetchUrlReactions({ url: (appStorage.value.activeTab as Tabs.Tab).url as string })

    urlReaction.items = data
    urlReaction.meta = meta
  }
  catch (error) {
    urlReaction.hasError = true
  }

  urlReaction.isBusy = false
}

onMounted(async () => {
  await fetchReviews()
  await fetchUrlReactions()
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

    <section class="block pt-11 mb-0">
      <!-- Url Reactions -->
      <template v-if="urlReaction.isBusy">
        <p class="block my-6 text-center text-gray-500">
          Loading url reactions...
        </p>
      </template>
      <template v-else-if="urlReaction.hasError">
        <p class="block my-6 text-center text-red">
          Fetching error on url reactions
        </p>
      </template>
      <template v-else>
        <section v-if="Object.keys(urlReaction).length > 0 && Object.keys(urlReaction.meta).length > 0" class="flex gap-5 mb-5" @click="goExternalLink">
          <button class="flex flex-col items-center">
            <fluent-emoji-red-heart size="22px" />
            <span class="mt-1 text-gray-500">{{ urlReaction.meta.reactionCount.heart }}</span>
          </button>
          <button class="flex flex-col items-center">
            <fluent-emoji-bookmark size="22px" />
            <span class="mt-1 text-gray-500">{{ urlReaction.meta.reactionCount.bookmark }}</span>
          </button>
          <button class="flex flex-col items-center">
            <fluent-emoji-thumbs-down-medium-light size="22px" />
            <span class="mt-1 text-gray-500">{{ urlReaction.meta.reactionCount.dislike }}</span>
          </button>
          <button class="flex flex-col items-center">
            <fluent-emoji-grinning-face-with-smiling-eyes size="22px" />
            <span class="mt-1 text-gray-500">{{ urlReaction.meta.reactionCount.smile }}</span>
          </button>
          <button class="flex flex-col items-center">
            <fluent-emoji-astonished-face size="22px" />
            <span class="mt-1 text-gray-500">{{ urlReaction.meta.reactionCount.wow }}</span>
          </button>
          <button class="flex flex-col items-center">
            <fluent-emoji-thinking-face size="22px" />
            <span class="mt-1 text-gray-500">{{ urlReaction.meta.reactionCount.thinking }}</span>
          </button>
          <button class="flex flex-col items-center">
            <fluent-emoji-face-with-symbols-on-mouth size="22px" />
            <span class="mt-1 text-gray-500">{{ urlReaction.meta.reactionCount.angry }}</span>
          </button>
        </section>
      </template>

      <!-- Reviews -->
      <template v-if="review.isBusy">
        <p class="block my-6 text-center text-gray-500">
          Loading url reactions...
        </p>
      </template>
      <template v-else-if="review.hasError">
        <p class="block my-6 text-center text-red">
          Fetching error on reviews
        </p>
      </template>
      <template v-else>
        <template v-if="review.items?.length > 0">
          <template v-if="review.meta.pagination && Object.keys(review.meta.pagination) && review.meta.pagination.total > 0">
            <strong class="text-gray-800 text-[14px] flex"><span class="me-1">💬</span> <span class="relative top-[-2px]">Comments ({{ review.meta.pagination.total }})</span></strong>

            <!-- Comments -->
            <div v-for="item in review.items" :key="item.id" class="block mt-2">
              <!-- Comment Card -->
              <div class="relative bg-white border-1 border-b-bluegray rounded-lg p-4">
                <div class="flex">
                  <img v-if="item.user.avatar?.formats?.thumbnail?.url" :src="`${BACKEND_URL}${item.user.avatar.formats.thumbnail.url}`" :alt="item.user.username" class="rounded-full object-cover w-[32px] h-[32px] border-1 border-gray-200">
                  <img v-else :src="`${URL}/media/core/user.png`" :alt="item.user.username" class="rounded-full object-cover w-[32px] h-[32px] border-1 border-gray-200">
                  <div class="ps-2 pt-0">
                    <strong class="block line-clamp-1">{{ item.user.username }}</strong>
                    <timeago class="relative top-[-4px] text-[10px]" :datetime="String(item.updatedAt || item.createdAt)" />
                  </div>
                </div>
                <div class="ps-10">
                  <p class="mt-1 mb-2 break-words line-clamp-2 text-md">
                    {{ item.content }}
                  </p>
                  <div class="flex gap-4 mt-3" @click="goExternalLink">
                    <button class="flex flex-row items-center">
                      <ri-heart-3-line size="14px" />
                      <span class="ms-1 text-[12px] text-gray-500">{{ item.likeCount }}</span>
                    </button>
                    <button class="flex flex-row items-center">
                      <ri-chat-1-line size="14px" />
                      <span class="ms-1 text-[12px] text-gray-500">{{ item.replyCount }}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button class="flex py-1 px-6 bg-transparent hover:bg-gray-200 text-gray-900 mt-4 mx-auto rounded" @click="goExternalLink">
              🔗 See more comments
            </button>
          </template>
        </template>
        <template v-else>
          <div class="flex flex-col justify-center items-center">
            <img :src="noCommentIcon" class="grayscale-[1]" width="164" alt="No comment">
            <h4 class="text-gray-800 my-4 text-lg">
              No comments
            </h4>
            <p>No comments have been made about the thing in the link yet</p>
            <button class="flex btn bg-black mt-6" @click="goExternalLink">
              See on Revilink
            </button>
          </div>
        </template>
      </template>
    </section>

    <footer class="absolute left-6 bottom-4 flex flex-col text-[11px] text-gray-600 mt-10">
      <p><a href="https://revilink.io" target="_blank" class="text-gray-800">Revilink</a> - Comment on any link on the internet</p>
      <p>All rights reserved © {{ new Date().getFullYear() }}. revilink.io by <a href="https://selimdoyranli.com" target="_blank" class="text-gray-800">@selimdoyranli</a></p>
    </footer>
  </main>
</template>
