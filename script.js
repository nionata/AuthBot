'use strict'

// node cron
const request = require('request').defaults({
  jar: true
})

const baseUrl = 'https://auth.impulse.com:8443'
const form = {
  userId: "big",
  pass: "penis",
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
  const date = new Date()
  console.log(`${date.getHours()}:${date.getMinutes()} checking authentication...`)

  request(baseUrl + '/clientStatus.!%5E', function (err, response, body) {
    if(err) console.log(err)

    if (body) {
      const noAuthed = body.includes('UF SafeConnect')

      if (noAuthed) {
        request.post(formReq, function (err, httpResponse) {
          if (err) console.log(err)

          const response = httpResponse.toJSON()

          if (response.statusCode === 303) {
            console.log('successfully authenticated')
          } else {
            console.log('failed to authenticate');
          }
        })
      } else {
        console.log('already authenticated')
      }
    } else {
      console.log('failed to check status')
    }
  })
}


doReq() // Check auth on start
setInterval(function () { // Every 1 min, auth
  doReq()
}, 1000*60*1)
