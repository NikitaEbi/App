<template>

  <div>
  <search-field
    v-if = "Search"
    :data = "data"
    @search = "search($event)"
    @empty = "endSearch"
  />
  <table class = "table">
    <tr class = "first">
      <td v-for="(value,key) in data[0]" @click = "sort(key)">
        {{ key }}
        <div class = "arrow" v-if = "sortKey == key"> {{ arrow }} </div>
      </td>
    </tr>
    <tr v v-for="lines in (searching) ? dataSearch : data">
      <td v-for="elem in lines"> {{ elem }} </td>
    </tr>
  </table>
  </div>
</template>

<script>
    import Search from './search.vue';

    export default {

      data(){
        return{
          sortKey: "",
          reverse: false,
          isSort: [],
          arrow: "↓",
          searching: false,
          dataSearch: this.data
        }
      },

      props:{
        data: Array,
        Search: Boolean,
        Sort: Boolean
      },

      methods: {

        sort(key) {

          if(!this.Sort)
            return;

          var i = this.sortKey == key && this.reverse ? true : false;
          var mass = this.searching ? this.dataSearch : this.data;

          this.sortKey = key;

          if(i){

            this.arrow = "↑";
            this.reverse = false;
            mass.reverse();

          }else{

            if(this.isNumericColumn(mass,key))
              mass.sort(this.templateNumber);
            else
              mass.sort(this.templateString);

            this.arrow = "↓";
            this.reverse = true;
          }
        },

        search(data){
          this.searching = true;
          this.dataSearch = data;
          this.sortKey = "";
        },

        endSearch(){
          this.searching = false;
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
      },

      components: {
        'search-field': Search
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
