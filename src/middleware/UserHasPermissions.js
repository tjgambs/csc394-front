/**
 * This is where all the authorization login is stored
 */
import Vue from 'vue';

const API_URL = process.env.API_URL

export default function UserHasPermissions(router) {
    /**
     * Before each route we will see if the current user is authorized
     * to access the given route
     */
    router.beforeEach((to, from, next) => {
        if (to.meta.requiresLogin) {
            let token = window.localStorage.getItem('token')
            Vue.http.get(API_URL + '/v1/auth/user/verify', {
                headers: {
                    Authorization: 'Token ' + token
                }
            }).then((response) => {
                return next()
            }).catch((errors) => {
                return next({
                    name: 'login'
                })
            })
        } else {
            return next()
        }
    })
}
