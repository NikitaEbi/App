import req from './sender.js'
import Vue from 'vue'
import controller from './components/controller.vue'


new Vue({
  el: "#dat",
  components: {
    'controller' : controller
  }
});
