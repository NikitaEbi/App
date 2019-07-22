<template>
  <div class="modul">
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

    props: {
      url: String
    },

    created() {
      this.Start();
    },

    methods: {
      Start: async function(){
        this.load = true;

        const result = await req(this.url);

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
