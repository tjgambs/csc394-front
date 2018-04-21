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
  import Identicon from 'identicon.js'

  export default {
    components: {
      Card
    },
    computed: {
      completeName: function() {
        let user = JSON.parse(window.localStorage.getItem('user'));
        return user.first_name + ' ' + user.last_name;
      },
      email: function() {
        let user = JSON.parse(window.localStorage.getItem('user'));
        return user.email;
      },
      avatarUrl: function() {
        var data = new Identicon(this.email + this.completeName).toString();
        return 'data:image/png;base64,' + data;
      }
    }
  }
</script>
<style>

</style>
