<template>
  <ul class="nav nav-mobile-menu">
    <li class="nav-item">
      <a v-if="isViewingAsStudent" v-on:click="exitStudent();" class="nav-link">
        Exit Student
      </a>
    </li>
    <li>
      <a v-on:click="logout();" class="nav-link">
        Log out
      </a>
    </li>
  </ul>
</template>
<script>
  import store from 'src/store.js'

  export default {
    store,
    computed: {
      isViewingAsStudent () {
        return this.$store.state.isViewingAsStudent;
      }
    },
    methods: {
      logout () {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('studentToken');
        this.$store.commit('exitStudentView');
        this.$router.push({name: 'login'});
      },
      exitStudent() {
        window.localStorage.removeItem('studentToken');
        this.$store.commit('exitStudentView');
        this.$store.commit('updateUser');
      }
    }
  }
</script>
<style>
</style>
