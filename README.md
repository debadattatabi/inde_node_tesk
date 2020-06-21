# INDEGENE API

- Step by step process to run the project
1. Take a clone from git "git clone https://github.com/debadattatabi/inde_node_tesk.git"
2. open command prompt and navigate to the project folder and do "npm install" - To Install all the dependencies
3. create a database in your mongoDB names "indegene" 
4. Now to run the project start "nodemon server.js" or "node server.js"

- Now To Check The APIs are properly working or not, open postman or any similar tools like this and run the below details,

## TASK1:
- Request URL:  "http://localhost:3001/author/awardwise?n=2"
- Query Params: n
- Method: GET
-----------
- Raw Query: 
    db.getCollection('authors').find({
        awards: { $exists: true },
        $where: `this.awards.length >= 3`
    })

## TASK2:
- Request URL:  "http://localhost:3001/author/yearwise?y=2002"
- Query Params: y
- Method: GET
-----------
- Raw Query: 
    db.getCollection('authors').find({
      awards: { $elemMatch: { year: { $gte: 2002 }} }
    })

## TASK3:
- Request URL:  "http://localhost:3001/books/sold"
- Method: GET
-----------
- Raw Query: 
    db.getCollection('books').aggregate([
      {
        $group: {
          _id: '$authorId',
          totalBooksSold: { $sum: '$sold' },
          totalProfit: { $sum: { $multiply: ['$price', '$sold']} }
        }
      }
    ])

## TASK4:
- Request URL:  "http://localhost:3001/authors/fetch?birthDate=1906-12-09T05:00:00.000Z&totalPrice=2000"
- Query Params: birthDate, totalPrice
- Method: GET
--------------
- Raw Query:  
    db.getCollection('authors').aggregate([
      { $match: { birth: { $gte: new Date('1906-12-09T05:00:00.000Z')}} },
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
          totalBookPrice: { $gte: 7000 }
        }
      }
    ])
