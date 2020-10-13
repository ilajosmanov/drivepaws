import Vue from 'vue';
import App from './App.vue';
import './plugins';
import './registerServiceWorker';
import { router } from './router';
import { init, initGeocoder } from './core/gmaps';

Vue.config.productionTip = false;

const app = new Vue({
  router,
  render: (h) => h(App),
});

router.onReady(async () => {
  await init();

  initGeocoder();

  app.$mount('#app');
});
