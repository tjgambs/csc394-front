/**
 * Think of this "main.js" file as your application bootstrap.
 */

import Vue from 'vue'
import Resource from 'vue-resource'
import router from './router'
import App from './App'
import UserHasPermissions from './middleware/UserHasPermissions'


Vue.use(Resource)

require('./interceptors.js')

UserHasPermissions(router)


new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})

