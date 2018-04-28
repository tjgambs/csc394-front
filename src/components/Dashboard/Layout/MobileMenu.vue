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
  import DropDown from 'src/components/UIComponents/Dropdown.vue'

  export default {
    components: {
      DropDown
    },
    data () {
      return {
        isViewingAsStudent: false
      }
    },
    created: function () {
      this.updateState();
    },
    methods: {
      updateState () {
        this.isViewingAsStudent = Boolean(window.localStorage.getItem('studentToken'));
      },
      logout () {
        window.localStorage.removeItem('token')
        this.$router.push({name: 'login'})
      },
      exitStudent() {
        window.localStorage.removeItem('studentToken');
        this.isViewingAsStudent = false;
      }
    }
  }
</script>
<style>
</style>
