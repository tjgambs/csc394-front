<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8">
          <edit-profile-form v-bind:user="user">
          </edit-profile-form>
        </div>
        <div class="col-md-4">
          <user-card v-bind:user="user">
          </user-card>
        </div>
        <div v-if="user.account_type == 'Admin' || user.account_type == 'Faculty'" class="col-md-8">
          <admin-card v-bind:user="user">
          </admin-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import EditProfileForm from './UserProfile/EditProfileForm.vue'
  import UserCard from './UserProfile/UserCard.vue'
  import AdminCard from './UserProfile/AdminCard.vue'

  const API_URL = process.env.API_URL

  export default {
    components: {
      EditProfileForm,
      UserCard,
      AdminCard
    },
    data () {
      return {
        user: {
          first_name: '',
          last_name: '',
          email: '',
          account_type: ''
        }
      }
    },
    created: function () {
      let token = window.localStorage.getItem('token');
      this.$http.get(API_URL + '/v1/auth/user', {
        headers: {
          Authorization: 'Token ' + token
        }
      }).then((response) => {
          this.user = response.data.data;
      })
    }
  }

</script>
<style>

</style>
