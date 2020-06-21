const express = require('express')
const cors = require('cors')
const config = require('./configurations/config')
const routes = require('./routes/index')
const app = express()

// Global Variable Declarations
const middlewares = require('./middlewares/index')

// use cors
app.use(cors())

// required to get client IP when running via reverse proxy (HA proxy)
app.set('trust proxy', true)

// setup middlewares
middlewares(app)

// setup routes
routes(app)

app.listen(process.env.PORT || config.get('server.port'), function () {
  console.log('API Server with pid: %s listening on port: %s', process.pid, config.get('server.port'))
  console.log('Environment: %s', config.get('env'))
})

app.timeout = config.get('server.timeout')

process.on('uncaughtException', function (e) {
  console.error('uncaught exception:- ', e.stack)
})
