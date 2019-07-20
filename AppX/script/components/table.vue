<template>
  <table class = "table">
    <tr class = "first">
      <td v-for="(value,key) in data[0]">{{key}}</td>
    </tr>
    <tr v-for="lines in data">
      <td v-for="elem in lines"> {{ elem }} </td>
    </tr>
  </table>
</template>

<script>
    export default {

      props:{
        data: Array
      }

    }
</script>

<style lang="scss">
@import "../../scss/variables";

  .table{

    border-collapse: collapse;

    tr{

      &.first{

        td{
          background-color: $mainColor;
          text-align: center;
          color:$textColor;
        }

      }

      td{
        border:1px solid gray;
        padding: 15px;
      }
    }
  }
</style>
