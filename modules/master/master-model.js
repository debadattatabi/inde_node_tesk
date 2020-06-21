const MongoClient = require('mongodb').MongoClient;
const config = require('../../configurations/config')

/** @namespace */
const master = function () {

}

let db; 
// Use connect method to connect to the server
MongoClient.connect(config.get('mongodb.url'), {
  useUnifiedTopology: true
}).then((client) => {
  console.log("Connected successfully to server");
 
  db = client.db(config.get('mongodb.database'))
  // client.close();
}).catch(error => console.error(error))

/** API To Fetch authors who have greater than or equal to n awards
 * @returns {Array} results - Authors List.
 */

master.getAwardsCount = async function (n) {
    // Method To Fetch authors who have greater than or equal to n awards 
    try {
      const results = await db.collection('authors').find({
        awards: { $exists: true },
        $where: `this.awards.length >= ${n}`
      }).toArray()
      return results
    } catch(error) {
      console.error('Error: ', error)
      return error
    }
}

master.getYearWiseAuthorsList = async function (y) {
  // Method To Fetch authors who have won award where year >= y
  try {
    const results = await db.collection('authors').find({
      awards: { $elemMatch: { year: { $gte: y }} }
    }).toArray()
    return results
  } catch(error) {
    console.error('Error: ', error)
    return error
  }
}

master.getSoldBooksList = async function () {
  // Method To Fetch total number of books sold and total profit by each author.
  try {
    const results = await db.collection('books').aggregate([
      {
        $group: {
          _id: '$authorId',
          totalBooksSold: { $sum: '$sold' },
          totalProfit: { $sum: { $multiply: ['$price', '$sold']} }
        }
      }
    ]).toArray()
    return results
  } catch(error) {
    console.error('Error: ', error)
    return error
  }
}

master.getFilterListData = async function (birthDate, totalPrice) {
  // Method To Fetch data with filter key birthDate and totalPrice
  try {
    const results = await db.collection('authors').aggregate([
      { $match: { birth: { $gte: new Date(birthDate)}} },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: 'authorId',
          as: 'bookDetails'
        }
      },
      {
        $project: {
          _id: 1,
          totalBookPrice: { $sum: '$bookDetails.price' }
        }
      },
      {
        $match: {
          totalBookPrice: { $gte: +totalPrice }
        }
      }
    ]).toArray()
    return results
  } catch(error) {
    console.error('Error: ', error)
    return error
  }
}

module.exports = master
