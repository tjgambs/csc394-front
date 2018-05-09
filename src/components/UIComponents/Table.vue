<template>
  <table class="table">
    <thead>
      <tr>
        <slot name="columns">
          <th v-for="column in columns">{{column}}</th>
        </slot>
      </tr>
    </thead>
    <tbody>
    <tr v-for="item in rows">
      <slot :row="item">
        <td v-for="column in columns" v-if="hasValue(item, column)">{{itemValue(item, column)}}</td>
      </slot>
    </tr>
    </tbody>
  </table>
</template>
<script>
  export default {
    name: 'l-table',
    props: {
      columns: Array,
      rows: Array
    },
    methods: {
      hasValue (item, column) {
        return item[column.toLowerCase()] !== 'undefined'
      },
      itemValue (item, column) {
        return item[column.toLowerCase()]
      }
    }
  }
</script>
<style>
</style>
