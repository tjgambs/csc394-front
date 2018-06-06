<template>
	<div class="content">
    	<div class="container-fluid">
      		<div class="row">
 				<div class="col-md-12">
				    <card>
					  	<template slot="header">
					        <h4 class="card-title">Search Courses</h4>
					    </template>
						<form>  
					    <div class="row">
							<div class="col-md-2">
								<label class="control-label">Course Subject</label>
								<select v-model="courseSubject" class="form-control">
							  		<option value=""></option>
							  		<option v-for="item in options.courseSubject" v-bind:value="item">{{item}}</option>
								</select>
							</div>
						
							<div class="col-md-2">
						  		<fg-input type="text"
								    label="Course Number"
									placeholder=""
									v-model="courseNumber"
									>
								</fg-input>
							</div>
					  	</div>
						</form>
				  
						<div class="text-center">
					        {{ infoMessage }}
					        <button type="submit" class="btn btn-info btn-fill float-right" v-on:click="searchCourses">
					          Search
					        </button>
					    </div>
					    <div class="clearfix"></div>	  
					</card>
				    <card v-if="results.length > 0">
						<template slot="header">
				    		<h4 class="card-title">Search Results</h4>
				    	</template>
					  
						<div v-for="item in results">
					        <div class="col-12">
					            <h3>{{ item.subject + ' ' + item.catalog_nbr + ' - ' + item.title }}</h3>
					            <p>{{ item.description + ' ' + ((item && item.prerequisites) ? item.prerequisites : '') }}</p>
								<button type="submit" class="btn btn-info btn-fill float-right" v-on:click="addToWishList(item.subject, item.catalog_nbr, item.title)">
								  Add to Wish List
								</button>
								<br /><br />
								<hr />
				        	</div>
				      	</div>
				    </card>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  const tableColumns = ['Subject', 'Number', 'Title', 'Term']
  const API_URL = process.env.API_URL

  export default {
	props: ['search'],
    components: {
      Card
    },
    data () {
      return {
		results: [],
		courseSubject: '',
		courseNumber: '',
		infoMessage: '',
		options: {
		  courseSubject: ['CNS', 'CSC', 'ECT', 'GAM', 'GEO', 'GPH', 'HCI', 'HIT', 'IPD', 'IS', 'IT', 'PM', 'SE', 'TDC'],
		}
      }
	},
	computed: {
	  setSearchURL: function () {
		if (this.courseSubject != '' && this.courseNumber != '') {
			return API_URL + '/v1/search/by_subject_number/' + this.courseSubject + '/' + this.courseNumber;
		} else if (this.courseSubject != '' && this.courseNumber == '') {
			return API_URL + '/v1/search/by_subject/' + this.courseSubject;
		} else if (this.courseSubject == '' && this.courseNumber != '') {
			return API_URL + '/v1/search/by_number/' + this.courseNumber;
		}
	  }
	},
	methods: {
	  searchCourses () {
        this.infoMessage = '';
        this.$http.get(this.setSearchURL)
          .then((response) => {
            this.results = response.data.data.results;
        })
	  },
	  addToWishList (subject, number, title) {
        this.infoMessage = '';
        this.$http.get(API_URL + '/v1/user/add_to_wishlist/' + subject + ' ' + number + '/' + title)
          .then((response) => {
            this.infoMessage = 'Added ' + subject + ' ' + number + ' to Wish List';
            var _this = this;
            setTimeout(function(){ 
              _this.infoMessage = '';
            }, 2000);
        })
      }
	}
  }
</script>
<style>
</style>
