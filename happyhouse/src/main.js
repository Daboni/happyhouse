/*!

=========================================================
* BootstrapVue Argon Dashboard - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/bootstrap-vue-argon-dashboard
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from 'vue';
import DashboardPlugin from './plugins/dashboard-plugin';
import App from './App.vue';
import VueCookies from 'vue-cookies'
// router setup
import router from './routes/router';
import store from './store';
import Chat from 'vue-beautiful-chat';

// plugin setup
Vue.use(DashboardPlugin);
Vue.use(Chat);
Vue.use(VueCookies);
Vue.$cookies.config("1d") // expire 1일 (global 설정)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
});
