<template>
  <div class = "load"> </div>
</template>

<style lang = "scss">
  @import "../../scss/mixins";
  @import "../../scss/input";

  .load{
    width: 40px;
    height: 40px;
    margin: auto;
    margin-top: 40px;
    @include load;
    @include border($mainColor,5px,30px);
    border-right: transparent;

    input{
      @include input;
    }

  }
</style>
