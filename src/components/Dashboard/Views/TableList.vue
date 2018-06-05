<template>
 <div>
  <card>
	<h2 slot="header" class="card-title">Search Courses</h2>
	<form>  
	  
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
	</form>
  
	  <div class="text-center">
        {{ errorMessage }}
		{{courseInfo}}
        <button type="submit" class="btn btn-info btn-fill float-right" v-on:click="searchCourses">
          Search
        </button>
      </div>
      <div class="clearfix"></div>	  
	</card>
    <card v-if="results.length > 0">
	  <h2>
		Search Results
	  </h2>
	  
	  <div v-for="item in results">
        <div class="col-12">
          <card>
            <h3>{{ item.subject + ' ' + item.catalog_nbr + ' - ' + item.title }}</h3>
            <p>{{ item.description }}</p>
			<button type="submit" class="btn btn-info btn-fill float-right" v-on:click="addToWishList(item.subject, item.catalog_nbr, item.title)">
			  Add to Wish List
			</button>
          </card>
        </div>
      </div>
  </card>
 </div>
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
		results: [],
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
	    

		if (this.course_subject != '' && this.course_number != '') {
			return API_URL + '/v1/search/by_subject_number/' + this.course_subject + '/' + this.course_number;
		} else if (this.course_subject != '' && this.course_number == '') {
			return API_URL + '/v1/search/by_subject/' + this.course_subject;
		} else if (this.course_subject == '' && this.course_number != '') {
			return API_URL + '/v1/search/by_number/' + this.course_number;
		} else if (this.course_subject == '' && this.course_number == '') {
			return API_URL + '/v1/search/all_subjects';
		}
		
		return;
	  }
	},
	methods: {
	  searchCourses () {
        this.errorMessage = '';
        this.$http.get(this.setSearchURL)
          .then((response) => {
            this.results = response.data.data.results;
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
