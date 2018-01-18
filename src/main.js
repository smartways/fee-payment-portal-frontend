// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import Auth from './packages/auth/Auth.js'
import axios from 'axios'
import VeeValidate from 'vee-validate'
import VueAxios from 'vue-axios'
import JsonExcel from 'vue-json-excel'
// import VueResource from 'vue-resource'
import Vuetable from 'vuetable-2'
import VueEvents from 'vue-events'

Vue.use(VueEvents)
Vue.use(Vuetable)
Vue.component('downloadExcel', JsonExcel)
Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(Auth)
Vue.use(VeeValidate, {fieldsBagName: 'formFields'})

// Vue.http.options.root = 'http://104.196.190.201:4567'
// Vue.http.headers.common['API-KEY'] = 'jYrFZDJlt4s'
// Vue.http.headers.common['Content-Type'] = 'application/json'

router.beforeEach(
  (to, from, next) => {
    if (to.matched.some(record => record.meta.forVisitors)) {
      if (Vue.auth.isAuthenticated()) {
        next({
          path: '/dashboard'
        })
      } else next()
    } else if (to.matched.some(record => record.meta.forAuth)) {
      if (!Vue.auth.isAuthenticated()) {
        next({
          path: '/authentication/login'
        })
      } else next()
    } else next()
  }
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
