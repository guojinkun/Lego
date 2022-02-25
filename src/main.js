import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { Collapse,Tabs } from 'ant-design-vue';
import store from './store'
const app = createApp(App);
[router, store, Collapse, Tabs].forEach((item) => { app.use(item) });
app.mount('#app');
