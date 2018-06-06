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

  const API_URL = process.env.API_URL

  export default {
    components: {
      LTable,
      Card
    },
    data () {
      return {
        columns: ['Term', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'OnLine'],
        rows: [
        ]
      }
    },
    created: function () {
      this.$http.get(API_URL + '/v1/build/auto_schedule')
      .then((response) => {
        let i, j;
        let results = response.data.data.results;
        let legend = ['', 'mon', 'tues', 'wed', 'thurs', 'fri', 'online'];
        let finalResults = [];
        for (i = 0; i < results.length; i++) {
          let term = ['','','','','','','']
          for (j = 0; j < results[i].length; j++) {
            let course = results[i][j][0].toUpperCase();
            let day = results[i][j][1].toLowerCase();
            let index = legend.indexOf(day);
            if (term[index].length > 0) {
              term[index] += ', ';
            }
            term[index] += course;
          }
          finalResults.push(term)
        }
        this.rows = finalResults;
      })
    }
  }
</script>
<style>

</style>
