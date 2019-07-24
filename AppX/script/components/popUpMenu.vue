<template>
  <div class = "popUpMenu">
    <transition name = "filter">
      <div class = "filter" v-if = "isSwitch" :style = "{height: windowHeight + 'px', width: windowWidth + 'px'}"> </div>
    </transition>
    <button class = "switch" @click = "Switch" v-if = "!isSwitch">
      <div class = "relative">
        <div></div>
      </div>
    </button>
    <transition name = "menu">
      <div class = "popUp" :style = "{height: (windowHeight - 15) + 'px'}" :class = "{opacity: isSwitch}" v-if = "isSwitch">
        <div>
          <button class = "switch-menu menuStyle" @click = "Switch">
            <
          </button>
          <p class = "header">Меню</p>
          <button class = "list menuStyle" v-for = "(value,key) in data" @click = "choice(key,value)" :class = "{active: value.active}">
            {{value.text}}
          </button>
        </div>
        <div>
          <input class = "menuStyle" type = "submit" value = "Выход" @click = "exit">
          <input class = "menuStyle" type = "submit" value = "Меню" @click = "menu">
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

  export default {
    data(){
      return{
        isSwitch: false,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
      }
    },

    created() {
      window.addEventListener("resize", this.resize);

    },

    destroyed() {
      window.removeEventListener("resize", this.resize);
    },

    props: {
      data: Object,
    },

    methods: {

      resize(){
        this.windowWidth = window.innerWidth,
        this.windowHeight = window.innerHeight
      },

      Switch() {
        this.isSwitch = !this.isSwitch;
      },

      exit(){
        this.$emit('exit')
      },

      menu(){
        this.$emit('menu')
      },

      choice(key,value){
        if(!value.active)
          this.$emit('choice',key)
      }
    }
  }
</script>
<style lang="scss">
@mixin menu(){
  position:absolute;
  display:block;
  width:40px;
  border:1px solid black;
}

.menu-enter-active, .menu-leave-active {
  transition: transform .5s;
}

.menu-enter, .menu-leave-to{
  transform: translateX(-200px);
}

.menu-enter-to , .menu-leave {
  transform: translateX(0px);
}

.filter{
  opacity: 0.3;
}

.filter-enter-active, .filter-leave-acive{
  transition: opacity 1s;
}

.filter-enter, .filter-leave-to{
  opacity:0;
}

.filter-enter-to, .filter-leave{
  opacity:0.3;
}

.popUpMenu{

  .filter{
    position:absolute;
    background-color:grey;
    position:fixed;
    top:0px;
    left:0px;
    z-index:50;
  }

  .switch{
    display: block;
    position: absolute;
    top: 5px;
    left: 5px;
    width:50px;
    height:50px;
    background-color:white;
    border:none;
    cursor:pointer;

    .relative{
      disolay:relative;

      div{

        @include menu;
        top:12px;
        left: 2.5px;

        &:after{
          @include menu;
          content: "";
          top:10px;
          left: -1px;
        }

        &:before{
          @include menu;
          content: "";
          top:20px;
          left: -1px;
        }
      }
    }
  }

  .popUp{
    display: none;
    flex-direction: column;
    justify-content:space-between;
    background-color:white;
    box-shadow:0 0 10px 0px grey;
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 100;

    .menuStyle{
      display:block;
      width:100%;
      padding:10px 20px;
      margin:0px;
      background-color:white;
      border:none;
      border-right:2px solid black;
      cursor:pointer;

      &:hover{
        border-right:2px solid orange;
      }
    }

    .list{


      &.active{
        cursor: default;
        background-color: #dcdcdc;

        &:hover{
          border-right:2px solid black;
        }
      }
    }

    .header{
      display:block;
      text-align:left;
      color:grey;
      padding:5px 15px;
    }

  }

  .opacity{
    display:flex;

    .switch{
      position: static;
      width:100%;
    }
  }

}
</style>
