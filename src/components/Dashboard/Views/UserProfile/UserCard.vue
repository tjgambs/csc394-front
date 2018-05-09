<template>
  <card class="card-user">
    <img slot="image" src="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"/>
    <div class="author">
      <a>
        <img class="avatar border-gray" src="static/img/default-avatar.png"/>
        <h4 class="title">{{ completeName }}<br />
          <small>{{ email }}</small>
        </h4>
      </a>
    </div>
  </card>
</template>
<script>
  import Card from 'src/components/UIComponents/Cards/Card.vue'

  export default {
    components: {
      Card
    },
    props: ['user'],
    computed: {
      completeName: function() {
        return this.user.first_name + ' ' + this.user.last_name;
      },
      email: function() {
        return this.user.email;
      }
    }
  }
</script>
<style>

</style>
