<template>
  <card>
    <h4 slot="header" class="card-title">Edit Profile</h4>
    <form>
      <div class="row">
        <div class="col-md-5">
          <fg-input type="text"
                    label="Account Type"
                    :disabled="true"
                    placeholder="Light dashboard"
                    v-model="user.accountType">
          </fg-input>
        </div>
        <div class="col-md-3">
          <fg-input type="text"
                    label="Username"
                    placeholder="Username"
                    v-model="user.username">
          </fg-input>
        </div>
        <div class="col-md-4">
          <fg-input type="email"
                    label="Email"
                    placeholder="Email"
                    v-model="user.email">
          </fg-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <fg-input type="text"
                    label="First Name"
                    placeholder="First Name"
                    v-model="user.firstName">
          </fg-input>
        </div>
        <div class="col-md-6">
          <fg-input type="text"
                    label="Last Name"
                    placeholder="Last Name"
                    v-model="user.lastName">
          </fg-input>
        </div>
      </div>

      <div class="text-center">
        <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="updateProfile">
          Update Profile
        </button>
      </div>
      <div class="clearfix"></div>
    </form>
  </card>
</template>
<script>
  import Card from 'src/components/UIComponents/Cards/Card.vue'

  export default {
    components: {
      Card
    },
    data () {
      return {
        user: {
          accountType: JSON.parse(window.localStorage.getItem('user')).account_type,
          username: JSON.parse(window.localStorage.getItem('user')).username,
          email: JSON.parse(window.localStorage.getItem('user')).email,
          firstName: JSON.parse(window.localStorage.getItem('user')).first_name,
          lastName: JSON.parse(window.localStorage.getItem('user')).last_name
        }
      }
    },
    methods: {
      updateProfile () {
        
        alert('Your data: ' + JSON.stringify(this.user))

      }
    }
  }

</script>
<style>

</style>
