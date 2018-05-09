/**
 *
 * Don't forget that the code below will be executed within every request.
 * 
 */

import Vue from 'vue'


Vue.http.interceptors.push((request, next) => {
    /**
     * Here we will fetch the token from local storage and 
     * attach it (if exists) to the Authorization header on EVERY request.
     */
    let token = window.localStorage.getItem('token')
    let studentToken = window.localStorage.getItem('studentToken')
    if (token) {
        if (!request.headers.Authorization) {
            request.headers.set('Authorization', `Token ${studentToken || token}`)
        }
        request.headers.set('Accept', 'application/json')
    }

    next((response) => {
        /**
         * If we get a 401 response from the API means that we are Unauthorized to
         * access the requested end point. 
         * This means that probably our token has expired and we need to get a new one.
         */
        if (response.status === 401) {
            return next({name: 'login'})
        }
    })
})
