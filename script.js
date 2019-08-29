'use strict'

// node cron
const request = require('request').defaults({
  jar: true
})

const baseUrl = 'https://auth.impulse.com:8443'
const form = {
  userId: "nionata",
  pass: "WeAreReallyOutHereBaby",
  platform: "MacIntel",
  appversion: "5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Mobile Safari/537.36"
}
const formReq = {
  url: baseUrl + '/authenticate.!%5E',
  form
}

// Check client status
// If no authed, will send back auth page
const doReq = function() {
  request(baseUrl + '/clientStatus.!%5E', function (error, response, body) {
    const noAuthed = body.includes('UF SafeConnect')

    if (noAuthed) {
      request.post(formReq, function (err, httpResponse, body) {
        if (err) console.log(err)
        console.log('res', httpResponse.toJSON())
        console.log('body', body)
      })
    } else {
      console.log('already authed')
    }
  })
}

setInterval(function () {
  doReq()
}, 1000*60*15)