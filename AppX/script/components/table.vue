<template>
  <table class = "table">
    <tr class = "first">
      <td v-for="(value,key) in data[0]" @click = "sort(key)">{{key}} <div class = "arrow" v-if = "sortKey == key"> {{arrow}} </div></td>
    </tr>
    <tr v-for="lines in data">
      <td v-for="elem in lines"> {{ elem }} </td>
    </tr>
  </table>
</template>

<script>
    export default {

      data(){
        return{
          sortKey: "",
          reverse: false,
          isSort: [],
          arrow: "↓"
        }
      },

      props:{
        data: Array
      },

      methods: {

        sort(key) {
          var i = false;

          if(this.sortKey == key && this.reverse)
            i = true;

          this.sortKey = key;

          if(this.isNumericColumn(this.data,key))
            this.data.sort(this.templateNumber);
          else
            this.data.sort(this.templateString);

          if(i){
            this.arrow = "↑";
            this.reverse = false;
            this.data.reverse();
          }else{
            this.arrow = "↓";
            this.reverse = true;
          }
        },

        templateNumber(a,b){

          if(a[this.sortKey] > b[this.sortKey])
            return 1;
          else if(a[this.sortKey] < b[this.sortKey])
            return -1;
          else
            return 0;

        },

        templateString(a,b){
          return a[this.sortKey].localeCompare(b[this.sortKey]);
        },

        isNumericColumn(array, key){

          var isNumber = true
          array.forEach( element => {

              if(isNaN(Number(element[key])) && element[key] != ""){
                 isNumber = false;
              }

            }
          );

          return isNumber;
        }
      }

    }
</script>

<style lang="scss">
@import "../../scss/variables";

  .table{

    border-collapse: collapse;
    padding:0xp;
    margin:0px;

    .arrow {
      position:absolute;
      top:23%;
      right:10px;
      font-size:20px;
      color:$textColor;
    }

    tr{

      &.first{

        td{
          position:relative;
          border:none;
          background-color: $mainColor;
          text-align: center;
          color:$textColor;
          cursor:pointer;
        }

      }

      td{
        border:1px solid gray;
        padding: 15px 25px;
      }
    }
  }
</style>
