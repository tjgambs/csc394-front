<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <slot name="columns">
            <th v-for="column in columns">{{column}}</th>
          </slot>
        </tr>
      </thead>
      <tbody>
      <tr v-for="user in rows">
        <slot :row="user">
          <td v-for="column in columns" v-if="hasValue(user, column)">{{itemValue(user, column)}}</td>
          <td>
            <button type="submit" class="btn btn-info btn-fill" @click.prevent="viewAccount(user)">
            View
            </button>
          </td>
          <td>
            <button type="submit" class="btn btn-info btn-fill" @click.prevent="loginAs(user.token)">
            Login
            </button>
          </td>
          <td v-if="account_type == 'Admin'">
            <button type="submit" class="btn btn-danger btn-fill" @click.prevent="deleteAccount(user.email)">
            Delete
            </button>
          </td>
        </slot>
      </tr>
      </tbody>
    </table>

    <modal v-if="showModal" @close="closeModal()">
      <h3 slot="header">Account Information</h3>
      <div slot="body"> 
        <div v-for="(item, key) in selectedAccount">
          <b>{{ key }}: </b>
          {{ item }} 
        </div>
      </div>
    </modal>

  </div>
</template>
<script>

  import Modal from 'src/components/UIComponents/Modal.vue'
  import store from 'src/store.js'
  
  const API_URL = process.env.API_URL

  export default {
    store,
    components: {
      Modal
    },
    props: ['account_type'],
    data () {
      return {
        columns: [],
        rows: [],
        showModal: false,
        selectedAccount: {}
      }
    },
    created: function () {
      let endpoint = '/v1/admin/get_students';
      if (this.account_type == 'Admin') {
        endpoint = '/v1/admin/get_accounts';
      }
      this.$http.get(API_URL + endpoint)
      .then((response) => {
        this.columns = ['first_name', 'last_name', 'email']
        this.rows = response.data.data.rows;
      })
    },
    methods: {
      hasValue (item, column) {
        return item[column] !== 'undefined'
      },
      itemValue (item, column) {
        return item[column]
      },
      loginAs(token) {
        window.localStorage.setItem('studentToken', token);
        this.$store.commit('enterStudentView');
        this.$store.commit('updateUser')
      },
      viewAccount(user) {
        this.selectedAccount = user;
        this.showModal = true;
      },
      closeModal() {
        this.showModal = false;
        this.selectedAccount = {};
      },
      deleteAccount(email) {
        this.$http.delete(API_URL + '/v1/admin/delete_account/' + email)
          .then((response) => {
            let i;
            for(i = 0; i < this.rows; i++) {
              if (this.rows[i].email == email) {
                break;
              }
            }
            this.rows.splice(i, 1);
          })
      }
    }
  }
</script>
<style>
</style>
