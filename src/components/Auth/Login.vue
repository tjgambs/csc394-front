<template>
    <div>
        <form @submit.prevent="authenticate()">
            <label for="">E-mail:</label>
            <input v-model="auth.email" type="email">
            <label for="">Password</label>
            <input v-model="auth.password" type="password">
            <button type="submit">Login</button>
        </form>
    </div>
</template>
<script>
    const API_URL = process.env.API_URL
    
    export default {
        name: 'Login',
        data () {
            return {
                auth: { email: '', password: '' }
            }
        },
        methods: {
            authenticate () {
                var tok = this.auth.email.toLowerCase() + ':' + this.auth.password
                var hash = btoa(tok)
                this.$http.get(API_URL + '/v1/auth/user/token', {
                  headers: {
                    Authorization: 'Basic ' + hash
                  }
                }).then((response) => {
                    window.localStorage.setItem('token', response.data.data.token)
                    this.$router.push({name: 'example'})
                }).catch((errors) => {
                    // catch errors
                })
            }
        }
    }
</script>