<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <h4 class="card-title">Current Course Schedule</h4>
              <p class="card-category">Fall 2018-19</p>
            </template>
            <div class="table-responsive">
              <l-table class="table-hover table-striped"
                       :columns="table1.columns"
                       :data="table1.data">
              </l-table>
            </div>
          </card>
        </div>
		
		<div class="col-12">
          <card>
            <template slot="header">
              <h4 class="card-title">Striped Table with Hover</h4>
              <p class="card-category">Here is a subtitle for this table</p>
            </template>
            <div class="table-responsive">
              <l-table class="table-hover table-striped"
                       :columns="table1.columns"
                       :rows="table1.rows">
              </l-table>
            </div>
          </card>
        </div>

        <div class="col-12">
          <card class="card-plain">
            <template slot="header">
              <h4 class="card-title">Table on Plain Background</h4>
              <p class="card-category">Here is a subtitle for this table</p>
            </template>
            <div class="table-responsive">
              <l-table class="table-hover"
                       :columns="table2.columns"
                       :rows="table2.rows">
              </l-table>
            </div>
          </card>
        </div>
		
      </div>
	  
	  <div class="row">
		<div class="col-12">
		  <card>
		    <template slot="header">
			  <h4 class="card-title">Class Schedule Per Quarter</h4>
			  <p class="card-category">Subtitle</p>
			</template>
			<div class="table-responsive">
			  <l-table class="table-hover"
					   :columns="table3.columns"
					   :rows="table3.rows">
			  </l-table>
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
  const tableColumns = ['Id', 'Name', 'Number']
  const tableData = [{
    id: 1,
    name: 'Data Structures I',
    number: 'CSC 300'
  },
  {
    id: 2,
    name: '',
    salary: '',
    country: '',
    city: ''
  },
  {
    id: 3,
    name: '',
    salary: '',
    country: '',
    city: ''
  },
  {
    id: 4,
    name: '',
    salary: '',
    country: '',
    city: ''
  },
  {
    id: 5,
    name: '',
    salary: '',
    country: '',
    city: ''
  }]
  const classScheduleColumns = ['Quarter', 'M', 'T', 'W', 'Th', 'F']
  const classScheduleData = [{
	quarter: 'Autumn Quarter 17-18',
	m: '',
	t: '',
	w: '',
	th: '',
	f: ''
  },
  {
	quarter: 'Winter Quarter 17-18',
	m: '',
	t: '',
	w: '',
	th: '',
	f: ''
  },
  {
	quarter: 'Spring Quarter 17-18',
	m: '',
	t: '',
	w: '',
	th: '',
	f: ''
  }]
  export default {
    components: {
      LTable,
      Card
    },
    data () {
      return {
        table1: {
          columns: [...tableColumns],
          rows: [...tableData]
        },
        table2: {
          columns: [...tableColumns],
          rows: [...tableData]
        },
		table3: {
		  columns: [...classScheduleColumns],
		  rows: [...classScheduleData]
		}
      }
    }
  }
</script>
<style>
</style>
