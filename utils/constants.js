const constants = {
  httpStatusCode: {
    success: 200,
    unauthorised: 401,
    forbidden: 403,
    badRequest: 400
  },
  responseCodes: {
    successfulOperation: 200,
    failedOperation: 500,
    unauthorizedAccess: 401,
    revalidation: 400
  },
  messageKeys: {
    msg_success: 'Successful Operation',
    msg_failed: 'Something went wrong',
    msg_revalidate: 'Schema Validation Failed'
  },
  moduleNames: {
    models: 'models',
    master: 'master'
  },
  publicAPIs: []
}

module.exports = constants
