import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPlay, faPlus, faMinus, faPause, faRedoAlt, faLink,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import store from './store';

Vue.component('font-awesome-icon', FontAwesomeIcon);
library.add(faPlay, faPlus, faMinus, faPause, faRedoAlt, faLink);

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
