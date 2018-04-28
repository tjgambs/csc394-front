<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <a class="navbar-brand">Dashboard</a>
      <button type="button"
              class="navbar-toggler navbar-toggler-right"
              :class="{toggled: $sidebar.showSidebar}"
              aria-controls="navigation-index"
              aria-expanded="false"
              aria-label="Toggle navigation"
              @click="toggleSidebar">
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            
            <a v-if="isViewingAsStudent" v-on:click="exitStudent();" class="nav-link">
              Exit Student
            </a>

            <a v-on:click="logout();" class="nav-link">
              Log out
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
  
  import store from 'src/store.js'

  export default {
    store,
    computed: {
      routeName () {
        const {name} = this.$route
        return this.capitalizeFirstLetter(name)
      },
      isViewingAsStudent () {
        return this.$store.state.isViewingAsStudent;
      }
    },
    data () {
      return {
        activeNotifications: false,
      }
    },
    methods: {
      capitalizeFirstLetter (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      },
      toggleNotificationDropDown () {
        this.activeNotifications = !this.activeNotifications
      },
      closeDropDown () {
        this.activeNotifications = false
      },
      toggleSidebar () {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      },
      hideSidebar () {
        this.$sidebar.displaySidebar(false)
      },
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
  a {
    cursor: pointer;
  }
</style>
