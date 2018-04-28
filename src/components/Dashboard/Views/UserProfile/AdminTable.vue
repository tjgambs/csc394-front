<template>
  <table class="table">
    <thead>
      <tr>
        <slot name="columns">
          <th v-for="column in columns">{{column}}</th>
        </slot>
      </tr>
    </thead>
    <tbody>
    <tr v-for="item in rows">
      <slot :row="item">
        <td v-for="column in columns" v-if="hasValue(item, column)">{{itemValue(item, column)}}</td>
        <td>
          <button type="submit" class="btn btn-info btn-fill" @click.prevent="viewAccount(item.id)">
          View
          </button>
        </td>
        <td>
          <button type="submit" class="btn btn-info btn-fill" @click.prevent="loginAs(item.token)">
          Login
          </button>
        </td>
        <td v-if="account_type == 'Admin'">
          <button type="submit" class="btn btn-info btn-fill" @click.prevent="deleteAccount(item.id)">
          Delete
          </button>
        </td>
      </slot>
    </tr>
    </tbody>
  </table>
</template>
<script>
  
  const API_URL = process.env.API_URL

  export default {
    props: ['account_type'],
    data () {
      return {
        columns: [],
        rows: []
      }
    },
    created: function () {
      let token = window.localStorage.getItem('token');
      this.$http.get(API_URL + '/v1/admin/get_students', {
        headers: {
          Authorization: 'Token ' + token
        }
      }).then((response) => {
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
        this.$router.push({name: 'admin'});
      },
      viewAccount(token) {
        console.log(token)
      },
      deleteAccount(token) {
        console.log(token)
      }
    }
  }
</script>
<style>
</style>
