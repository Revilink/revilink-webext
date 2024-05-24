import { createApp } from 'vue'
import timeago from 'vue-timeago3'
import App from './Popup.vue'
import { setupApp } from '~/logic/common-setup'
import '../styles'

const app = createApp(App)
setupApp(app)
app.mount('#app')
app.use(timeago)
