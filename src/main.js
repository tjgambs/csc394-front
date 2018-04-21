import Vue from 'vue'
import Resource from 'vue-resource'
import VueRouter from 'vue-router'
import App from './App.vue'


// Permissions
import UserHasPermissions from './middleware/UserHasPermissions'

// Vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// LightBootstrap plugin
import LightBootstrap from './light-bootstrap-main'

// router setup
import routes from './routes/routes'
// plugin setup
Vue.use(VueRouter)
Vue.use(LightBootstrap)
Vue.use(Resource)

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'nav-item active'
})

require('./interceptors.js')

UserHasPermissions(router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
