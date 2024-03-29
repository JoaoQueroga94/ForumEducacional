import Vue from 'vue';
import VueRouter from 'vue-router';
import DashboardPlugin from './dashboard-plugin';

// Plugins
import App from './App.vue';

// router setup
import routes from './routes/routes';

//store
import store from '@/store';

// plugin setup
Vue.use(VueRouter);
Vue.use(DashboardPlugin);

// configure router
const router = new VueRouter({
  mode: 'history',
  routes, // short for routes: routes
  linkActiveClass: 'active'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
});
