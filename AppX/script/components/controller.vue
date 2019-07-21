<template>
  <div>
    <load ref = "load"/>
    <login v-if = "IsActive" @login = "login" ref = "login"/>
    <info v-else @exit = "exit" ref = "info"/>
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
        login: async function(){
          this.IsActive = false;

          var loadCircle = this.$refs.load;
          loadCircle.Start();

          const result = await this.getBenes();

          var info = this.$refs.info;
          info.Clear();
          info.SetData(result['data']['rows']);

          loadCircle.End();
        },

        exit: async function(){
          this.IsActive = true;

          await req('login/logout');

          this.$refs.login.Clear();

        },

        getBenes: async function(){

            const result = await req('beneficiaries/getList', {
              sort: 'nickname'
            })

            return result;

        }
      },

      components: {
        login,
        info,
        load
      }
    }
</script>
