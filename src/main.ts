import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vueDebounce from 'vue-debounce';


createApp(App)
  .use(router)
  .use(vueDebounce)
  .mount('#app');
