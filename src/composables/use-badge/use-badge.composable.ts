import type { SetBadgeTypes } from './use-badge.composable.types'

export default () => {
  const setBadge: SetBadgeTypes = async (params) => {
    const { text, backgroundColor, textColor } = params

    if (text) {
      await browser.action.setBadgeBackgroundColor({ color: backgroundColor || '#F00' })
      await browser.action.setBadgeTextColor({ color: textColor || '#FFF' })
      await browser.action.setBadgeText({ text })
    }
    else {
      await browser.action.setBadgeText({ text: null })
    }
  }

  return {
    setBadge,
  }
}
