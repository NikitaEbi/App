<template>
  <div class="info">
       <input type="submit" value="Выйти" @click="Exit()">
       <div id="data">
          <my-table :data = "message"></my-table>
       </div>
  </div>
</template>

<script type="text/javascript">
import table from './table.vue';

  export default {
    data() {
      return{
        message: []
      }
    },

    methods: {
      Clear(){
         this.message = [];
      },

      SetData(data){
         this.message = data;
      },

      Exit(){
        this.$emit('exit');
      }
    },

    components: {
      'my-table' :table
    }
  }

</script>

<style media="screen" lang = "scss">

  @import "../../scss/mixins";
  @import "../../scss/input";

  .info{
    padding: 50px 50px 50px 0px;
    top:100px;
  }

</style>
