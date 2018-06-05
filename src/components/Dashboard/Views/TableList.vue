<template>
  <card>
	<h2 slot="header" class="card-title">Search Courses</h2>
	<form>
	  <h4>Please fill in at least one optional search box.</h4>
	  
	  <p>Term & Year</p> 
	  <div class="row">
	    <div class="col-md-3">
		
		  <select v-model="selected_quarter" class="form-control">
			<option value="Empty"></option>
			<option v-for="item in options.quarters" v-bind:value="item.stream">{{item.description}}</option>
		  </select>
	
		</div>
	  </div>
	  
	  <p></br>Course Subject & Number</p>
	  <div class="row">
		<div class="col-md-2">
			<label class="control-label">
			  Course Subject
			</label>
			<select v-model="course_subject" class="form-control">
			  <option value="Empty"></option>
			  <option v-for="item in options.course_subject" v-bind:value="item">{{item}}</option>
			</select>
		</div>
		
		<div class="col-md-2">
		  <fg-input type="text"
		    label="Course Number"
			placeholder=""
			v-model="course_number"
			>
		  </fg-input>
		</div>
	  </div>
	
	 
	  <div class="text-center">
        {{ errorMessage }}
		{{courseInfo}}
        <button type="submit" class="btn btn-info btn-fill float-right" v-on:click="searchCourses">
          Search
        </button>
      </div>
      <div class="clearfix"></div>	 
	 	  
	</form>
  </card>
</template>
<script>
  import LTable from 'src/components/UIComponents/Table.vue'
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  const tableColumns = ['Add', 'Course', 'Title', 'Instructor', 'Term']
  const API_URL = process.env.API_URL
  const tableData = [{
    add: '',
    course: 'CSC 300',
    title: 'Data Structures I',
    instructor: 'Radha',
	term: 'Winter 16-17'
  },
  {
    add: '',
    course: '',
    title: '',
    instructor: '',
	term: ''
  }]
  
  export default {
	props: ['search'],
    components: {
      LTable,
      Card
    },
    data () {
      return {
	    selected_quarter: '',
		course_subject: '',
		course_number: '',
		myToggle: 'blank',
        table1: {
          columns: [...tableColumns],
          rows: [...tableData]
        },
        table2: {
          columns: [...tableColumns],
          rows: [...tableData]
        },
		errorMessage: '',
		options: {
		  course_subject: ['CNS', 'CSC', 'ECT', 'GAM', 'GEO', 'GPH', 'HCI', 'HIT', 'IPD', 'IS', 'IT', 'PM', 'SE', 'TDC'],
		  quarters: [
			  {
				"description": "2016-2017 Winter", 
				"stream": "0980"
			  }, 
			  {
				"description": "2016-2017 Spring", 
				"stream": "0985"
			  }, 
			  {
				"description": "2016-2017 Summer", 
				"stream": "0990"
			  }, 
			  {
				"description": "2017-2018 Autumn", 
				"stream": "1000"
			  }, 
			  {
				"description": "2017-2018 Winter", 
				"stream": "1005"
			  }, 
			  {
				"description": "2017-2018 Spring", 
				"stream": "1010"
			  }, 
			  {
				"description": "2017-2018 Summer", 
				"stream": "1015"
			  }, 
			  {
				"description": "2018-2019 Autumn", 
				"stream": "1020"
			  }, 
			  {
				"description": "2018-2019 Graduate DEC Session", 
				"stream": "1024"
			  }
			]
		},
		courseInfo: ''
      }
	},
	computed: {
	  setSearchURL: function () {
	    if (this.selected_quarter == '') {
			return;
		}

		if (this.course_subject != '' && this.course_number != '') {
			return API_URL + '/v1/search/by_class/' + this.course_subject + '/' + this.course_number + '/' + this.selected_quarter;
		} else if (this.course_subject != '' && this.course_number == '') {
			return API_URL + '/v1/search/by_subject/' + this.course_subject + '/' + this.selected_quarter;
		} else if (this.course_subject == '' && this.course_number != '') {
			return API_URL + '/v1/search/by_number/' + this.course_number + '/' + this.selected_quarter;
		} else if (this.course_subject == '' && this.course_number == '') {
			return API_URL + '/v1/search/all_subjects/' + this.selected_quarter;
		}
		
		return;
	  }
	},
	methods: {
	  searchCourses () {
        this.errorMessage = '';
        this.$http.get(this.setSearchURL)
          .then((response) => {
            this.errorMessage = response.data;
        }).catch((errors) => {
            this.errorMessage = 'No data found';
        })
	  }
	}
  }
</script>
<style>
</style>
