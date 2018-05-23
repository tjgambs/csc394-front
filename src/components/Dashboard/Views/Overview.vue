<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <card>
            <template slot="header">
              <h4 class="card-title">Schedule</h4>
              <p class="card-category">According to your preferences, this is your recommended schedule.</p>
            </template>
            <div class="table-responsive">
              <table class="table-hover table-striped table">
                <thead>
                  <tr>
                    <th v-for="column in columns">{{column}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in rows">
                    <td v-for="column in item">{{column}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  import LTable from 'src/components/UIComponents/Table.vue'
  import Card from 'src/components/UIComponents/Cards/Card.vue'

  export default {
    components: {
      LTable,
      Card
    },
    data () {
      return {
        columns: ['Term', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        rows: [
          ['Autumn 2018', '', 'CSC 421', 'CSC 435', 'CSC 447', ''],
          ['Winter 2019', 'CSC 453', 'SE 450', '', '', ''],
          ['Spring 2019', 'CSC 555', '', '', 'CSC 578', ''],
          ['Autumn 2019', 'CSC 482', '', '', '', 'CSC 672'],
          ['Winter 2020', '', 'CSC 587', 'CSC 577', '', ''],
          ['Spring 2020', '', '', 'CSC 461', 'CSC 462', ''],
        ]
      }
    }
  }
</script>
<style>

</style>
