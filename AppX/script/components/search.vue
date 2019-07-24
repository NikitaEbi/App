<template>
  <input class = "search" type = "text" v-model = "text"  @input = "search" placeholder="search">
</template>

<script type="text/javascript">

  export default {
    data(){
      return{
        text: ""
      }
    },

    props:{
      data: Array,
    },

    methods: {
      search(){

        if(this.text == ""){
          this.$emit('empty');
          return;
        }

        var result = [];

        if(typeof this.data[0] == "object" || typeof this.data[0] == "array"){

          this.data.forEach( row => {
            var isFits = false;

            for(var i in row){
              if(typeof row[i] == "string" && row[i].indexOf(this.text) == 0)
                isFits = true;

            }


            if(isFits)
              result.push(row);

          });

        }else{

          this.data.forEach( element => {
            if(element.indexOf(this.text) + 1)
              result.push(element);
          });

        }

        this.$emit('search',result);

      }
    }
  }

</script>
<style lang="scss">

  .search{
    width:200px;
    height:15px;
    border-radius:10px;
    border: 1px solid black;
    padding:5px;
    text-align:center;
  }
</style>
