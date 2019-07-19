<template>
  <div class="info">
       <input type="submit" value="Выйти" @click="Exit()">
       <div id="data">
          <p v-for="value in message"> {{value['nickname']}} </p>
       </div>
  </div>
</template>

<script type="text/javascript">

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
