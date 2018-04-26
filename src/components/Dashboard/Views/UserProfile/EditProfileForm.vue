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

        <div class="col-md-7">
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
        {{ errorMessage }}
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

  const API_URL = process.env.API_URL

  export default {
    components: {
      Card
    },
    data () {
      return {
        errorMessage: '',
        user: {
          accountType: JSON.parse(window.localStorage.getItem('user')).account_type,
          email: JSON.parse(window.localStorage.getItem('user')).email,
          firstName: JSON.parse(window.localStorage.getItem('user')).first_name,
          lastName: JSON.parse(window.localStorage.getItem('user')).last_name
        }
      }
    },
    methods: {
      updateProfile () {
        this.errorMessage = '';
        let token = window.localStorage.getItem('token')
        this.$http.post(API_URL + '/v1/auth/update_user', this.user, {
          headers: {
            Authorization: 'Token ' + token
          }
        }).then((response) => {
            window.localStorage.setItem('user', JSON.stringify(response.data.data));
            this.errorMessage = 'Success!';
            var _this = this;
            setTimeout(function(){ 
              _this.errorMessage = '';
            }, 2000);
        }).catch((errors) => {
            this.errorMessage = 'The email address you have entered is already registered';
        })
      }
    }
  }

</script>
<style>

</style>
