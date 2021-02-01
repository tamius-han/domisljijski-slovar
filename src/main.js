import Vue from 'vue';
import vueDebounce from 'vue-debounce';
import App from './App.vue';

Vue.config.productionTip = false

Vue.use(vueDebounce);

new Vue({
  render: h => h(App),
}).$mount('#app')
