<template>
  <ul class="nav nav-mobile-menu">
    <li class="nav-item">
      <a v-on:click="logout();" class="nav-link">
        <span class="no-icon">Log out</span>
      </a>
    </li>
  </ul>
</template>
<script>
  import DropDown from 'src/components/UIComponents/Dropdown.vue'

  export default {
    components: {
      DropDown
    },
    methods: {
      logout () {
        window.localStorage.removeItem('token')
        this.$router.push({name: 'login'})
      }
    }
  }
</script>
<style>
</style>
