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

  browser.tabs.create({
    url: 'https://revilink.io/extension/webext/installed',
  })
})

browser.tabs.onActivated.addListener(async ({ tabId }) => {
  appStorage.value.activeTab = await browser.tabs.get(tabId)
})

browser.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  if (changeInfo.url || changeInfo.status === 'complete')
    appStorage.value.activeTab = await browser.tabs.get(tabId)
})

browser.windows.onFocusChanged.addListener(async (windowId) => {
  const [tab] = await browser.tabs.query({ active: true, windowId })

  if (tab)
    appStorage.value.activeTab = await browser.tabs.get(tab.id as number)
})
