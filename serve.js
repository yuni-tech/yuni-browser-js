const httpServer = require('http-server')

var http = httpServer.createServer({})
http.listen(15069, '0.0.0.0', function() {

  console.log('http  server start at 0.0.0.0:15069')

  var https = httpServer.createServer({
    https: {
      cert: __dirname + '/certificate/localhost.pem',
      key: __dirname + '/certificate/localhost.pem'
    }
  })

  https.listen(15068, '0.0.0.0', function() {
    console.log('https server start at 0.0.0.0:15068')
  })
})