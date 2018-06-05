<template>
  <card>
	<h2 slot="header" class="card-title">Search Courses</h2>
	<form>
	  <h4>Please fill in at least one optional search box.</h4>
	  
	  <p>Term & Year</p> 
	  <div class="row">
	    <div class="col-md-3">
		
		  <select v-model="selected_quarter" class="form-control">
			<option value=""></option>
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
			  <option value=""></option>
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

	  <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="addToWishList">
        Add to Wish List
      </button>
	  
	  <!--
	  <table-list>
	    <data-viewer v-if="viewing_data == True">
	      <data-viewer v-for="item in data" v-bind:value="item">
			{{item}}
			<input type="checkbox" id="checkbox" v-model="checked">
		  </data-viewer>
		
		  
		  <div class="row">
		    <div class="col-md-12">
			  <label class="control-label">
			    Search Results
			  </label>
			  <div class="table">
			    <l-table class="table-hover table-striped"
				  :columns="displayTable.columns"
				  :rows="displayTable.rows">
			    </l-table>
			  </div>
	        </div>
		  </div>
		  
		
	    </data-viewer>
		<search v-else></search>
		
	  </table-list>
	  -->
	  
	</form>
  </card>
</template>
<script>
  import LTable from 'src/components/UIComponents/Table.vue'
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  const tableColumns = ['Subject', 'Number', 'Title', 'Term']
  const API_URL = process.env.API_URL
  const tableData = [{
    subject: 'CSC',
	number: '300',
    title: 'Data Structures I',
    term: 'Winter 16-17',
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
        displayTable: {
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
	  },
	  addToWishList (subject, number, title) {
        this.errorMessage = '';
        this.$http.get(API_URL + '/v1/user/add_to_wishlist/' + subject + ' ' + number + '/' + title)
          .then((response) => {
            this.errorMessage = 'Added to Wish List';
            var _this = this;
        }).catch((errors) => {
            this.errorMessage = 'Already in Wish List';
        })
      }
	}
  }
</script>
<style>
</style>
