<template>
  <card>
	<h2 slot="header" class="card-title">Search Courses</h2>
	<form>
	  <h4>Please fill in at least one optional search box.</h4>
	  
	  <p>Term & Year</p> 
	  <div class="row">
	    <div class="col-md-3">
		  
		  <select class="form-control">
            <option value="0"></option>
			<option value="1">Autumn 2017-18</option>
			<option value="2">Winter 2017-18</option>
			<option value="3">Spring 2017-18</option>
			<option value="4">Summer 2017-18</option>
          </select>
		</div>
	  </div>
	  
	  <p></br>Course Subject & Number</p>
	  <div class="row">
		<div class="col-md-2">
		<label class="control-label">
          Course Subject
        </label>
		<select class="form-control">
		  <option value="Empty"></option>
		  <option value="1">CNS</option>
		  <option value="2">CSC</option>
		  <option value="3">ECT</option>
		  <option value="4">GAM</option>
		  <option value="5">GEO</option>
		  <option value="6">GPH</option>
		  <option value="7">HCI</option>
		  <option value="8">HIT</option>
		  <option value="9">IPD</option>
		  <option value="10">IS</option>
		  <option value="11">IT</option>
		  <option value="12">PM</option>
		  <option value="13">SE</option>
		  <option value="14">TDC</option>
		</select>
		
		</div>
		
		<div class="col-md-2">
		  <fg-input type="text"
		    label="Course Number"
			placeholder=""
			>
		  </fg-input>
		</div>
	  </div>
	  
	  <p>Course Title</p>
	  <div class="row">
	    <div class="col-md-5">
		  <fg-input type="text"
		    label="Course Title"
			placeholder=""
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
	  <!--
	  <p>When user clicks search, add a table underneath that shows likely results.</p>
	  <p>Add days of the week search. Add wishlist search. Allow user to 
	  specify days for wishlist classes if they would like or have the class chosen for
	  a random quarter. Click on course name in list to display description of class</p>
	  <input type="checkbox" id="myCheck" onclick="testing()">
	  -->
	</form>
	<form>
	
	</form>
  </card>
</template>
<script>
  import LTable from 'src/components/UIComponents/Table.vue'
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  const tableColumns = ['Add', 'Course', 'Title', 'Instructor', 'Term']
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
		},
		errorMessage: '',
		options: {
		  course_subject: ['CSC', 'HCI', 'IS']
		},
		courseInfo: ''
      }
	},
	methods: {
	  searchCourses () {
	    this.errorMessage = 'e';
		this.courseInfo = 'asdf';
        this.$http.post(API_URL + '/v1/search/by_subject/csc/1010', this.user
		).then((response) => {
            this.errorMessage = 'Searching...';
			this.courseInfo = 'test';
            var _this = this;
            setTimeout(function(){ 
              _this.errorMessage = '';
            }, 2000);
        }).catch((errors) => {
            this.errorMessage = 'Unable to search';
        })
	  },
	  testing () {
		var checkBox = document.getElementById("myCheck");
		var text = document.getElementById("text");
		if (checkBox.checked == true) {
			text.style.display = "block";
		} else {
			text.style.display = "none";
		}
		
	  }
	}
  }
</script>
<style>
</style>
