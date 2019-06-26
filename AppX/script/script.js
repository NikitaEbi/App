
var Request = new Vue({
    el: "#form",
    data: {
      IsActive: true,
      password: "",
      login: "",
      customerId: "",
      error: ""
    },

    methods: {
      Hidden(){
          this.IsActive = !this.IsActive;
      },

       Clear(){
         this.login = "";
         this.password = "";
         this.customerId = "";
     }
    }
});

var load = new Vue({
  el: "#load",

  data: {
    IsActive: false,
  },

  methods: {
    Start() {
      this.IsActive = true;
    },

    End(){
      this.IsActive = false
    }
  }
});

var info = new Vue({
  el: "#info",
  data: {
    IsActive: false,
    message: []
  },

  methods: {
    Hidden() {
      this.IsActive = !this.IsActive;
    },
    Clear(){
       this.message = [];
    },
    SetData(data){
       this.message = data;
    }
  }
});

async function req(method, data = null)
{
var send = (data != null) ? JSON.stringify(data) : ""

    const resp = await fetch(`https://fx.ebiworks.com/api/${method}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer 0560ADB4930DAA9EADBA8D81A45C7DDF',
            'X-API-client'	: 'mobile'
        },
        mode: 'cors',
        credentials: 'include',
        body: send
    })
    const result = await resp.json()
    return result
}


async function login()
{
    load.Start();

    const result = await req('login/submit', {
        userName: Request.login,
        password: Request.password,
        customerId: Request.customerId
    })

    if(typeof result.err !== 'undefined'){
      load.End();
       Request.error = result.err;
    }
    else {
      Request.Hidden();
      info.Hidden();
      getBenes();
    }
}

async function getBenes()
{
    const result = await req('beneficiaries/getList', {
      sort: 'nickname'
    })

    info.SetData(result['data']['rows']);

    load.End();
}


async function exit(){

  load.Start();

  await req('login/logout');

  Request.Hidden();
  Request.Clear();
  Request.error = "";
  info.Clear();
  info.Hidden();

  load.End();
}
