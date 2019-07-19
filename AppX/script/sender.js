async function req(method, data = null){
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

export default req;
