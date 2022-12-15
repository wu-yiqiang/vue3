import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

// 导入Element-Plus UI
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// 导入bpmn样式文件
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
// panel样式文件
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';
// 创建vue实例
const app = createApp(App);
app.use(ElementPlus);
app.use(store);
app.use(router);

// 挂载实例
app.mount('#app');
