<template>
  <div class = "controller">
    <load v-if = "load"/>
    <login v-if = "IsActive" @login = "login" ref = "login"/>
    <div v-else>
      <div class = "inputs">
        <input type="submit" value="Выйти" @click="exit">
        <input type="submit" value = "Назад" @click = "back" v-if = "!isLists">
      </div>
      <div v-if = "isLists" class = "list">
        <button v-for = "(value,key) in modules" @click = "entryModule(key)">
          {{value.text}}
        </button>
      </div>
      <div v-else>
        <info v-if = "modules['info'].active"/>
        <holding v-if = "modules['holding'].active"/>
      </div>
    </div>
  </div>
</template>

<script>
    import login from './login.vue'
    import load from './load.vue'
    import req from '../sender.js'

    import info from './info.vue'
    import holding from './holding.vue'


    export default {

      data(){
        return{
          IsActive: true,
          isLists: true,
          load: false,
          modules:{
            'info': {
              active: false,
              text: "Список бенифициаров"
            },
            'holding': {
              active:false,
              text: "Список Holding"
            }
          },
        }
      },


      methods: {

        login: async function(){

          this.IsActive = false;
          this.isLists = true;

        },

        exit: async function(){
          this.IsActive = true;

          await req('login/logout');

          this.$refs.login.Clear();

        },

        back(){

          for(var modul in this.modules){
            this.modules[modul].active = false;
          }

          this.isLists = true;
        },

        entryModule( name ){

          this.load = true;

          this.modules[name].active = true;
          this.isLists = false;

          this.load = false;

        }
      },

      components: {
        login,
        info,
        holding,
        load
      }
    }
</script>

<style lang = "scss">
  @import "../../scss/input";

  .controller{
    .inputs{

      text-align: center;

      input[type = "submit"]{
        @include input;
        display: inline-block;
        margin: 20px 10px;
      }

    }

    .list{
        margin:auto;
        text-align:center;
        margin-top:20px;

        button{
          display:block;
          margin:auto;
          margin-top: 15px;
          cursor:pointer;
          width:400px;
          padding: 5px 20px;
          background-color: $textColor;
          color: $mainColor;
          border: 1px solid black;
          font-size:15px;
          font-weight: bold;
        }
    }
  }

</style>
