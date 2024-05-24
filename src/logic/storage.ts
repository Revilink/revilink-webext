import { useWebExtensionStorage } from '~/composables'

export const appStorage = useWebExtensionStorage('app-storage', {
  activeTab: {},
})
