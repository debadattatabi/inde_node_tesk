const convict = require('convict')
const path = require('path')

const config = convict({
  env: {
    doc: 'The applicaton environment.',
    format: ['development'],
    default: 'development',
    env: 'NODE_ENV',
    arg: 'env'
  },
  server: {
    port: {
      doc: 'HTTP port to bind',
      format: 'Number',
      default: 5003
    },
    timeout: {
      doc: 'Server Timeout',
      format: 'Number',
      default: 60000
    },
    enableCompression: {
      doc: 'Enable HTTP compression',
      format: Boolean,
      default: true
    },
    bodyParser: {
      limit: {
        doc: 'maximum request body size',
        format: String,
        default: '100kb'
      }
    }
  },
  mongodb: {
    url: {
      doc: 'database connection url',
      format: 'String',
      default: 'mongodb://localhost:27017'
    },
    database: {
      doc: 'database name',
      format: 'String',
      default: 'indegene'
    }
  }
})

config.loadFile(path.join(__dirname, '/config-' + config.get('env') + '.json'))

// validate
config.validate()

module.exports = config
