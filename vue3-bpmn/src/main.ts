import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

// 导入bpmn样式文件
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
// 创建vue实例
const app = createApp(App);

app.use(store);
app.use(router);

// 挂载实例
app.mount('#app');
