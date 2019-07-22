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
        <modules v-for = "module in modules" :url = "module.url" v-if = "module.active && module.drawing"/>
      </div>
    </div>
  </div>
</template>

<script>
    import login from './login.vue'
    import load from './load.vue'
    import req from '../sender.js'

    import modules from './module.vue'


    export default {

      data(){
        return{
          IsActive: true,
          isLists: true,
          load: false,
          modules:{
            'info': {
              drawing: true,
              active: false,
              text: "Список бенифициаров",
              url: "beneficiaries/getList"
            },
            'holding': {
              drawing: true,
              active:false,
              text: "Список Holding",
              url: "reports/holding/getList"
            },
            'forwards': {
              drawing: true,
              active: false,
              text: "Список Forwards",
              url: "reports/forwards/getList"
            },
            'orders': {
              drawing: true,
              active: false,
              text: "Список Orders",
              url: "reports/orders/getList"
            },
            'tracker': {
              drawing: true,
              active: false,
              text: "Список Tracker",
              url: "tracker/getList"
            },
            'accountActivity': {
              drawing: true,
              active: false,
              text: "Список accountActivity",
              url: "reports/accountActivity/getList"
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
        modules,
        load
      }
    }
</script>

<style lang = "scss">
  @import "../../scss/input";

  .modul{
    padding: 50px 50px 50px 0px;
    top:100px;

    .load{
      position: absolute;
      left:48.5%;
      top:33px;
    }
  }

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
