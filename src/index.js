import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './routers'
import iView from 'iview';
import axios from './http/axios'
import myCommponents from './components'
import "./assets/js/datePrototype"

import 'iview/dist/styles/iview.css';

Vue.use(Vuex)
import store from './store'
Vue.use(iView)
Vue.use(myCommponents)


Vue.prototype.http=axios;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
