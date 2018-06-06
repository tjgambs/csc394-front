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
  import EditPreference from './UserProfile/EditPreference.vue'
  import AdminCard from './UserProfile/AdminCard.vue'
  import store from 'src/store.js'

  const API_URL = process.env.API_URL

  export default {
    store,
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
          account_type: '',
          undergraduate_degree: '',
          graduate_degree: '',
          graduate_degree_concentration: '',
          starting_quarter: '',
          number_credit_hours: '',
          elective: '',
          automation: '',
          disallow_online: ''
        }
      }
    },
    created: function () {
      this.updateUser();
      this.$store.watch(this.$store.getters.getUpdateUser, n => {
        this.updateUser();
      })
    },
    methods: {
      updateUser: function() {
        this.$http.get(API_URL + '/v1/auth/user')
          .then((response) => {
            this.user = response.data.data;
            console.log(this.user)
        })
      }
    }
  }

</script>
<style>

</style>
