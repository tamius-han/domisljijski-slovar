import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vueDebounce from 'vue-debounce';
import GAuth from 'vue3-google-oauth2';
import env from '../config/env';

createApp(App)
  .use(router)
  .use(vueDebounce)
  .use(GAuth, {
    clientId: env.GOOGLE_CLIENT_ID,
    scope: 'email',
    fetchBasicProfile: false
  })
  .mount('#app');
