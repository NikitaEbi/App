<template>
  <div>
    <div class = "form">
       <input type="text" placeholder="Логин" v-model="login" required>
       <input type="password" placeholder="Пароль" v-model="password" required>
       <input type="text" placeholder="customerId" v-model="customerId" required>
       <input type="submit" value="Вход" @click="startLogin">
       <p>
         {{error}}
       </p>
    </div>
    <load v-if = "load"/>
  </div>
</template>

<script>
  import load from './load.vue';
  import req from '../sender.js';

  export default {

      data() {
        return{
          password: "",
          login: "",
          load: false,
          customerId: "",
          error: "",
          IsLoging: false
        }
      },

      created() {
        this.Clear();
      },

      methods: {
         Clear(){
           this.login = "";
           this.password = "";
           this.customerId = "";
       },

       startLogin: async function(){
          this.load = true;

           const result = await req('login/submit', {
               userName: this.login,
               password: this.password,
               customerId: this.customerId
           });

           if(typeof result.err !== 'undefined')
              this.error = result.err;
           else
             this.$emit('login');


           this.load = false;
       }

     },

     components: {
        'load' : load
     }
  }
</script>

<style lang="scss">
  @import "../../scss/mixins";
  @import "../../scss/input";

  .form {
      padding:30px;
      text-align: center;
      width:300px;
      @include border(grey);
      @include center(360px,310px);

      input{
        @include input;
      }
  }
</style>
