<template>
  <card>
	<h2 slot="header" class="card-title">Search Courses</h2>
	<form>
	  <h4>Please fill in at least one optional search box.</h4>
	  <p></br>Course Subject & Number</p>
	  <div class="row">
		<div class="col-md-2">
		  <fg-input type="text"
			label="Course Subject"
			placeholder="(CSC, IS, etc.)"
			>
		  </fg-input>
		</div>
		
		<div class="col-md-2">
		  <fg-input type="text"
		    label="Course Number"
			placeholder="(300, 301, etc.)"
			>
		  </fg-input>
		</div>
	  </div>
	  
	  <p>Course Title</p>
	  <div class="row">
	    <div class="col-md-5">
		  <fg-input type="text"
		    label="Course Title"
			placeholder="(Data Structures, etc.)"
			>
		  </fg-input>
		</div>
	  </div>
			
	  <p>Teacher Name</p>
	  <div class="row">
	    <div class="col-md-2">
	      <fg-input type="text"
			label="First Name"
			>
		  </fg-input>
		</div>
			  
		<div class="col-md-1">
		  <fg-input type="text"
			label="Middle Initial"
			>
		  </fg-input>
		</div>
		
	    <div class="col-md-2">
		  <fg-input type="text"
			label="Last Name"
			>
		  </fg-input>
		</div>
	  </div>
	  
	  <p>Term & Year</p> 
	  <div class="row">
	    <div class="col-md-3">
		  <fg-input type="text"
		    label="Term"
			placeholder="(Autumn, Winter, Spring, Summer)"
			>
		  </fg-input>
		</div>
		<div class="col-md-3">
		  <fg-input type="text"
		    label="School Year"
			placeholder="(2017, 2017-18, 17-18, etc.)"
			>
	      </fg-input>
		</div>
	  </div>
		 
	   
		 
	  <div class="text-center">
        {{ errorMessage }}
        <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="searchCourses">
          Search
        </button>
      </div>
      <div class="clearfix"></div>	 
	  <p>When user clicks search, add a table underneath that shows likely results.
	  If searching by term/year, limit to those classes.
	  If searching by class name/number, limit to those classes.
	  If searching by teacher, limit to that teacher.
	  If searching by course title, allow key search (or limit to that class).</p>
	  <p>Add days of the week search. Add wishlist search. Allow user to 
	  specify days for wishlist classes if they would like or have the class chosen for
	  a random quarter. Click on course name in list to display description of class</p>
	</form>
  </card>
</template>
<script>
  import LTable from 'src/components/UIComponents/Table.vue'
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  const tableColumns = ['Course', 'Title', 'Instructor', 'Term']
  const tableData = [{
    course: 'CSC 300',
    title: 'Data Structures I',
    instructor: 'Radha',
	term: 'Winter 16-17'
  },
  {
    course: 'aaa',
    title: 'bbb',
    instructor: 'ccc',
	term: 'ddd'
  },
  {
    course: 'CSC 300',
    title: 'Data Structures I',
    instructor: 'Radha',
	term: 'Winter 16-17'
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
		},
		errorMessage: ''
      }
    },
	methods: {
	  searchCourses () {
	    this.errorMessage = '';
        let token = window.localStorage.getItem('token')
        this.$http.post(API_URL + '/v1/auth/update_user', this.user, {
          headers: {
            Authorization: 'Token ' + token
          }
        }).then((response) => {
            this.errorMessage = 'Searching...';
            var _this = this;
            setTimeout(function(){ 
              _this.errorMessage = '';
            }, 2000);
        }).catch((errors) => {
            this.errorMessage = 'No changes made';
        })
	  }
	}
  }
</script>
<style>
</style>
