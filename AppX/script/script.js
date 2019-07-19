import req from './sender.js'
import Vue from 'vue'
import controller from './components/controller.vue'


new Vue({
  el: "#dat",
  components: {
    'controller' : controller
  }
});

export async function getBenes()
{
    const result = await req('beneficiaries/getList', {
      sort: 'nickname'
    })

    info.SetData(result['data']['rows']);

    load.End();
}


export async function exit(){

  load.Start();

  await req('login/logout');

  Request.Hidden();
  Request.Clear();
  Request.error = "";
  info.Clear();
  info.Hidden();

  load.End();
}
