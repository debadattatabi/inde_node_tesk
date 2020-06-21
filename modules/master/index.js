const service = require('./master-service')

module.exports = function (app) {
  //  GET api to fetch authors who have greater than or equal to n awards
  app.get('/author/awardwise', service.getAuthorAwards)
  //  GET api to fetch authors who have won award where year >= y
  app.get('/author/yearwise', service.getYearWiseAuthors)
  //  GET api to fetch total number of books sold and total profit by each author. 
  app.get('/books/sold', service.getSoldBooks)
  //  GET api to fetch data with filter birthDate and totalPrice
  app.get('/authors/fetch', service.getFilterData)
}
