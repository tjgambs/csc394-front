<template>
  <card class="card-user">
    <img slot="image" src="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"/>
    <div class="author">
      <a>
        <img class="avatar border-gray" :src="avatarUrl"/>
        <h4 class="title">{{ completeName }}<br />
          <small>{{ email }}</small>
        </h4>
      </a>
    </div>
  </card>
</template>
<script>
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import store from '../../../../store'
  export default {
    store,
    components: {
      Card
    },
    computed: {
      completeName: function() {
        return store.state.user.firstName + ' ' + store.state.user.lastName;
      },
      email: function() {
        return store.state.user.email;
      },
      avatarUrl: function() {
        return "https://api.adorable.io/avatars/285/" + this.email + ".png";
      }
    }
  }
</script>
<style>

</style>
