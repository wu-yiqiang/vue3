import { createApp } from 'vue'
import './style.css'
import './assets/font/iconfont.css'  //字体图标
import App from './App.vue'
import router from './router'
import {createPinia} from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist' //pinia数据持久化
const pinia = createPinia(); //实例化
pinia.use(piniaPluginPersist) //

createApp(App).use(router).use(pinia).mount('#app')
