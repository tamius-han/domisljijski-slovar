import Vue from 'vue';
import vueDebounce from 'vue-debounce';
import App from './App.vue';
import router from './router'

Vue.config.productionTip = false

Vue.use(vueDebounce);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
