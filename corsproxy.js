const corsAnywhere = require('cors-anywhere')

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 8090


corsAnywhere.createServer({
  originWhitelist: [], // Allow all origins
}).listen(port, host, function() {
  console.log('Running CORS Anywhere on ' + host + ':' + port)
})
