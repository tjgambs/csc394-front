<template>
  <card>
    <h4 slot="header" class="card-title">Edit Preference</h4>
    <form>
      
	  
      <div class="text-center">
        {{ errorMessage }}
        <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="updatePreferences">
          Update Preferences
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
      updatePreferences () {
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
            this.errorMessage = 'No changes made';
        })
      }
    }
  }

</script>
<style>

</style>