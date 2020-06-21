// const schemas = require('./master-schema')
const master = require('./master-model')
const constants = require('../../utils/constants')

const getAuthorAwards = function (req, res) {
  master.getAwardsCount(req.query.n || 1).then((response) => {
    res.status(constants.httpStatusCode.success).send({
      code: constants.responseCodes.successfulOperation,
      message: constants.messageKeys.msg_success,
      data: response
    })
  }).catch((error) => {
    console.log(error)
    return res.status(constants.httpStatusCode.success).send({
      code: constants.responseCodes.failedOperation,
      message: constants.messageKeys.msg_revalidate,
      data: error
    })
  })
}

const getYearWiseAuthors = function (req, res) {
  master.getYearWiseAuthorsList(+req.query.y || 1950).then((response) => {
    res.status(constants.httpStatusCode.success).send({
      code: constants.responseCodes.successfulOperation,
      message: constants.messageKeys.msg_success,
      data: response
    })
  }).catch((error) => {
    console.log(error)
    return res.status(constants.httpStatusCode.success).send({
      code: constants.responseCodes.failedOperation,
      message: constants.messageKeys.msg_revalidate,
      data: error
    })
  })
}

const getSoldBooks = function (req, res) {
  master.getSoldBooksList().then((response) => {
    res.status(constants.httpStatusCode.success).send({
      code: constants.responseCodes.successfulOperation,
      message: constants.messageKeys.msg_success,
      data: response
    })
  }).catch((error) => {
    console.log(error)
    return res.status(constants.httpStatusCode.success).send({
      code: constants.responseCodes.failedOperation,
      message: constants.messageKeys.msg_revalidate,
      data: error
    })
  })
}

const getFilterData = function (req, res) {
  master.getFilterListData(req.query.birthDate, req.query.totalPrice).then((response) => {
    res.status(constants.httpStatusCode.success).send({
      code: constants.responseCodes.successfulOperation,
      message: constants.messageKeys.msg_success,
      data: response
    })
  }).catch((error) => {
    console.log(error)
    return res.status(constants.httpStatusCode.success).send({
      code: constants.responseCodes.failedOperation,
      message: constants.messageKeys.msg_revalidate,
      data: error
    })
  })
}

module.exports = {
  getAuthorAwards: getAuthorAwards,
  getYearWiseAuthors: getYearWiseAuthors,
  getSoldBooks: getSoldBooks,
  getFilterData: getFilterData
}
