import { createApp } from 'vue';
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import globalComponents from '@/components';
import { Updater } from '@/utils/Updater';
import router from './router';
import store from './store';
import i18n from './locale';
import directive from './directive';
import './mock';
import App from './App.vue';
import '@arco-design/web-vue/dist/arco.css';
import '@/assets/style/global.less';
import '@/api/interceptor';
import Track from './track'
// const up = new Updater({
//   timer: 2000,
// });
// // 未更新通知
// up.on('no-update', () => {
//   // eslint-disable-next-line no-console
//   console.log('未更新');
// });
// // 更新通知
// up.on('update', () => {
//   // eslint-disable-next-line no-alert
//   alert('文件更新');
// });
const app = createApp(App);
app.use(new Track() as any);
app.use(ArcoVue, {});
app.use(ArcoVueIcon);

app.use(router);
app.use(store);
app.use(i18n);
app.use(globalComponents);
app.use(directive);

app.mount('#app');
