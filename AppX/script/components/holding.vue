<template>
  <div class="holding">
    <load class = "load" v-if = "load"/>
       <div>
          <my-table
          :data = "message"
          :Search = "true"
          :Sort = "true"
          />
       </div>
  </div>
</template>

<script type="text/javascript">
import table from './table.vue';
import load from './load.vue'
import req from '../sender.js'

  export default {
    data() {
      return{
        message: [],
        load: false
      }
    },

    created() {
      this.Start();
    },

    methods: {
      Start: async function(){
        this.load = true;

        const result = await req('reports/holding/getList', {
          sort: 'dealNumber'
        });

        this.message = result['data']['rows'];

        this.load = false;
      }
    },

    components: {
      'my-table': table,
      'load': load
    }
  }

</script>

<style media="screen" lang = "scss">

  @import "../../scss/mixins";

  .holding{
    padding: 50px 50px 50px 0px;
    top:100px;

    .load{
      position: absolute;
      left:48.5%;
      top:33px;
    }
  }

</style>
