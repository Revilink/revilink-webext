import type { Tabs } from 'webextension-polyfill'
import { useApi, useBadge } from '~/composables'
import { appStorage } from '~/logic/storage'

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client')
  // load latest content script
  import('./contentScriptHMR')
}

browser.runtime.onInstalled.addListener((): void => {
  // eslint-disable-next-line no-console
  console.log('Extension installed')
})

const reviews = reactive({
  total: 0,
})

const badge = reactive({
  isBusy: false,
})

const tabCache: Record<number, { data: any, meta: any }> = {}

async function fetchReviews({ tabId }: { tabId: number }) {
  if (tabCache[tabId])
    return tabCache[tabId]

  badge.isBusy = true

  const activeTab: Tabs.Tab = await browser.tabs.get(tabId)

  const { fetchReviews: _fetchReviews } = useApi()
  const { data, meta } = await _fetchReviews({ url: activeTab.url as string })

  reviews.total = meta.pagination.total

  badge.isBusy = false

  tabCache[tabId] = { data, meta }

  return { data, meta }
}

watch(
  () => badge.isBusy,
  async (value) => {
    const { setBadge } = useBadge()

    if (value) {
      await setBadge({
        backgroundColor: '#666',
        text: '...',
      })
    }
    else {
      await setBadge({
        text: reviews.total > 0 ? String(reviews.total) : null,
      })
    }
  },
)

async function setReviewTotalBadge(total: number) {
  const { setBadge } = useBadge()

  if (total > 0) {
    await setBadge({
      text: String(total),
    })
  }
  else {
    await setBadge({
      text: null,
    })
  }
}

browser.tabs.onActivated.addListener(async ({ tabId }) => {
  const { meta } = await fetchReviews({ tabId })
  await setReviewTotalBadge(meta.pagination.total)

  appStorage.value.activeTab = await browser.tabs.get(tabId)
})

browser.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  if (changeInfo.url) {
    delete tabCache[tabId]

    const { meta } = await fetchReviews({ tabId })
    await setReviewTotalBadge(meta.pagination.total)

    appStorage.value.activeTab = await browser.tabs.get(tabId)
  }
})

browser.windows.onFocusChanged.addListener(async (windowId) => {
  const [tab] = await browser.tabs.query({ active: true, windowId })

  if (tab) {
    const { meta } = await fetchReviews({ tabId: tab.id as number })
    await setReviewTotalBadge(meta.pagination.total)

    appStorage.value.activeTab = await browser.tabs.get(tab.id as number)
  }
})
