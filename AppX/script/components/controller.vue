<template>
  <div>
    <login v-if = "IsActive" @login = "login" ref = "login"></login>
    <info v-else ref = "info" @exit = "exit"></info>
    <load ref = "load"></load>
  </div>
</template>

<script>
    import login from './login.vue'
    import info from './info.vue'
    import load from './load.vue'
    import req from '../sender.js'

    export default {

      data(){
        return{
          IsActive: true,
        }
      },

      methods: {
        login(){
          this.IsActive = false;
          this.getBenes();
        },

        exit: async function(){
          this.IsActive = true;
          await req('login/logout');
          this.$refs.login.Clear();
          
        },

        getBenes: async function(){

            var loadCircle = this.$refs.load;
            loadCircle.Start();

            const result = await req('beneficiaries/getList', {
              sort: 'nickname'
            })

            this.$refs.info.Clear();
            this.$refs.info.SetData(result['data']['rows']);

            loadCircle.End();
        }
      },

      components: {
        login,
        info,
        load
      }
    }
</script>
