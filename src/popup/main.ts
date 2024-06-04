import { createApp } from 'vue'
import timeago from 'vue-timeago3'
import App from './Popup.vue'
import { setupApp } from '~/logic/common-setup'
import '../styles'

const app = createApp(App)
setupApp(app)
app.mount('#app')
app.use(timeago)

;(function () {
  // eslint-disable-next-line no-var
  var applyCSS = function () {
    const iframe = document.getElementById('revilink-reviews-embed-iframe')

    if (iframe) {
      let customStyles = ''
      const styleElements = document.getElementsByTagName('style')

      for (let i = 0; i < styleElements.length; i++)
        customStyles += styleElements[i].textContent
      if (customStyles) {
        (iframe as HTMLIFrameElement).contentWindow?.postMessage(
          {
            type: 'applyCSS',
            styles: customStyles,
          },
          '*',
        )
      }
    }
  }

  const setEmbedHeight = function () {
    window.addEventListener('message', (event) => {
      if (event.data.type === 'revilink-reviews-embed-height') {
        const iframe = document.getElementById(
          'revilink-reviews-embed-iframe',
        )

        if (iframe) {
          iframe.style.height = `${event.data.height + 32}px`
          applyCSS()
        }
      }
    })
  }

  const listenAuth = function () {
    window.addEventListener('message', (event) => {
      if (event.data.type === 'on-click-google-auth') {
        const popup = window.open(
          event.data.url,
          'popup',
          'width=600,height=600',
        )

        if (popup) {
          window.addEventListener('message', (event) => {
            if (event.data.type === 'google-callback-success') {
              const iframe = document.getElementById(
                'revilink-reviews-embed-iframe',
              )

              if (iframe) {
                setTimeout(() => {
                  // eslint-disable-next-line no-self-assign
                  iframe.src = iframe.src
                }, 0)
              }
            }
          })
        }
      }
    })
  }

  // Ensure the functions are called after the script is loaded
  if (document.readyState === 'complete') {
    setEmbedHeight()
    applyCSS()
    listenAuth()
  }
  else {
    window.addEventListener('load', () => {
      setEmbedHeight()
      applyCSS()
      listenAuth()
    })
  }
})()
