<template>
  <div class="info">
       <input type="submit" value="Выйти" @click="Exit()">
       <div id="data">
          <p v-for="value in message"> {{value['nickname']}} </p>
       </div>
       <load></load>
  </div>
</template>

<script type="text/javascript">

import load from './load.vue'

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
      load
    }
  }

</script>

<style media="screen" lang = "scss">

  @import "../../scss/mixins";
  @import "../../scss/input";

  .info{
    padding: 50px;
    width:400px;
    @include center(500px,100px);
    top:100px;
  }

</style>
