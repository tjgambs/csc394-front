import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Auth/Login'
import Example from '@/components/Example'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/login',
        name: 'login',
        meta: {
            requiresLogin: false,
        },
        component: Login
    }, {
        path: '/example',
        name: 'example',
        meta: {
            requiresLogin: true,
        },
        component: Example
    }, {
        path: '*',
        redirect: '/example'
    }]
})