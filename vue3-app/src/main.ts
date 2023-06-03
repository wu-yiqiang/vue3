import { createApp } from 'vue'
import 'amfe-flexible'
import 'virtual:svg-icons-register'
import { useI18n } from '/@/plugins/i18n'
import { setupStore } from '/@/store'
import { setupVant } from '/@/plugins/vant'
// import './assets/css/index.scss'
import router from '/@/router'
import App from '/@/App.vue'
const app = createApp(App)

useI18n(app)
setupVant(app)
setupStore(app)
app.use(router).mount('#app')
// router.isReady().then(() => {
//   app.mount('#app')
// })
