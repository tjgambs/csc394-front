<template>
  <card>
    <h4 slot="header" class="card-title">Edit Profile</h4>
    <form>
      <div class="row">
        <div class="col-md-6">
          <fg-input type="text"
                    label="Account Type"
                    :disabled="true"
                    placeholder="Light dashboard"
                    v-model="user.account_type">
          </fg-input>
        </div>

        <div class="col-md-6">
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
                    v-model="user.first_name">
          </fg-input>
        </div>
        <div class="col-md-6">
          <fg-input type="text"
                    label="Last Name"
                    placeholder="Last Name"
                    v-model="user.last_name">
          </fg-input>
        </div>
      </div>	  
	  
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label class="control-label">
              Undergraduate Degree
            </label>
            <select v-model="user.undergraduate_degree" class="form-control">
              <option value="Empty"></option>
              <option v-for="item in options.undergraduate_degree" v-bind:value="item">{{item}}</option>
            </select>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label class="control-label">
              Graduate Degree
            </label>
            <select v-model="user.graduate_degree" class="form-control">
              <option value="Empty"></option>
              <option v-for="item in options.graduate_degree" v-bind:value="item">{{item}}</option>
            </select>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label class="control-label">
              Graduate Degree Concentration
            </label>
            <select v-model="user.graduate_degree_concentration" class="form-control">
                <option value="Empty"></option>
                <option v-for="item in concentrations" v-bind:value="item">{{item}}</option>
            </select>
          </div>
        </div>
      </div>
	  
  	  <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label class="control-label">
              Starting Quarter
            </label>
            <select v-model="user.starting_quarter" class="form-control">
			  <option value="Autumn">Autumn</option>
			  <option value="Winter">Winter</option>
			  <option value="Spring">Spring</option>
			  <option value="Summer">Summer</option>
            </select>
          </div>
        </div>
  	  </div>
	  
      <hr />
      <h4 slot="header" class="card-title">Preferences</h4>

      <div class="row">
        <div class="col-md-2">
          <label class="control-label">
            Number of Credits Per Quarter
          </label>
          <select v-model="user.number_credit_hours" class="form-control">
            <option value="0"></option>
            <option v-for="item in options.credits" v-bind:value="item">{{item}} credits</option>
          </select>
        </div>
        <div class="col-md-1"></div>
        <div class="col-md-3">
          <label class="control-label">
            Disallow Online Courses
          </label>
          <div>
            <input type="radio" v-model="user.disallow_online" value="true" /> True </br>
            <input type="radio" v-model="user.disallow_online" value="false" /> False</br>
          </div>
        </div>
      </div>

      <hr />
	
      <h4 slot="header" class="card-title">Wish List</h4>

      <div class="row">
        <div class="col-md-12">
          <table class="table">
            <thead>
              <tr>
                <slot name="columns">
                  <th v-for="column in wishlist.columns">{{column}}</th>
                </slot>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in wishlist.rows">
                <td>{{row.course}}</td>
                <td>{{row.title}}</td>
                <td>
                  <button type="submit" class="btn btn-danger btn-fill" @click.prevent="deleteFromWishlist(row)">
                  Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
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
  import LTable from 'src/components/UIComponents/Table.vue'
  import Card from 'src/components/UIComponents/Cards/Card.vue'

  const API_URL = process.env.API_URL

  export default {
    components: {
	  LTable,
      Card
    },
    props: ['user'],
    data () {
      return {
		columns: [],
		rows: [],
		wishlist: {
			columns: ['Course', 'Title', 'Remove from Wish List'],
			rows: []
		},
        errorMessage: '',
        options: {
          undergraduate_degree: ['Computer Science', 'Information Systems', 'Other'],
          graduate_degree: ['Computer Science', 'Information Systems'],
          credits: ['4', '8', '12', '16']
        }
      }
    },
	created: function () {
      let token = window.localStorage.getItem('token');
      this.$http.get(API_URL + '/v1/search/by_class/csc/300/1005', {
        headers: {
          Authorization: 'Token ' + token
        }
      }).then((response) => {
        this.columns = ['first_name', 'last_name', 'email']
        this.rows = response.data.data.rows;
      })

      this.$http.get(API_URL + '/v1/user/get_wishlist')
         .then((response) => {
          this.wishlist.rows = response.data.data.results;
       })
    },
    computed: {
      concentrations: function() {
        if (this.user.graduate_degree == 'Computer Science') {
          return ['Software and Systems Development', 'Theory', 'Data Science', 'Database Systems', 'Artificial Intelligence', 'Software Engineering', 'Game and Real-Time Systems', 'Human-Computer Interaction'];
        } else if (this.user.graduate_degree == 'Information Systems') {
          return ['Business Analysis/Systems Analysis', 'Business Intelligence', 'Database Administration', 'IT Enterprise Management', 'Standard'];
        } else {
          return [];
        }
      },
    },
    methods: {
      updateProfile () {
        console.log(this.user)
        this.errorMessage = '';
        this.$http.post(API_URL + '/v1/auth/update_user', this.user)
          .then((response) => {
            this.errorMessage = 'Success!';
            var _this = this;
            setTimeout(function(){ 
              _this.errorMessage = '';
            }, 2000);
        }).catch((errors) => {
            this.errorMessage = 'No changes made';
            var _this = this;
            setTimeout(function(){ 
              _this.errorMessage = '';
            }, 2000);
        })
      },
      deleteFromWishlist (row) {
        this.$http.delete(API_URL + '/v1/user/delete_from_wishlist/'+ row.course + '/' + row.title)
         .then((response) => {
          this.errorMessage = 'Success deleteing ' + row.course;
          var _this = this;
            setTimeout(function(){ 
              _this.errorMessage = '';
            }, 2000);
          this.wishlist.rows.splice(this.wishlist.rows.indexOf(row), 1);
       })
      }
    }
  }

</script>
<style>

</style>
