<template>
  <card class="card-user">
    <div class="content">
      <div class="container-fluid">
        <div class="row">

          <div class="col-12">
            <card class="card-plain">
              <template slot="header">
                <h4 class="card-title">Student Accounts</h4>
                <p class="card-category">Login as a student or view their information.</p>
              </template>
              <div class="table-responsive">
                <admin-table class="table-hover" v-bind:account_type="user.account_type">
                </admin-table>
              </div>
            </card>
          </div>

        </div>
      </div>
    </div>

  </card>
</template>
<script>
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import AdminTable from 'src/components/Dashboard/Views/UserProfile/AdminTable.vue'

  export default {
    components: {
      AdminTable,
      Card
    },
    props: ['user']
  }
</script>
<style>

</style>
