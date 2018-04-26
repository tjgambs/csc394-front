<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8">
          <edit-profile-form>
          </edit-profile-form>
        </div>
        <div class="col-md-4">
          <user-card>
          </user-card>
        </div>
		<div class="col-md-12">
		  <edit-preference>
		  </edit-preference>
		</div>
      </div>
    </div>
  </div>
</template>
<script>
  import EditProfileForm from './UserProfile/EditProfileForm.vue'
  import UserCard from './UserProfile/UserCard.vue'
  import EditPreference from './UserProfile/EditPreference.vue'

  export default {
    components: {
      EditProfileForm,
      UserCard,
	  EditPreference
    }
  }

</script>
<style>

</style>
