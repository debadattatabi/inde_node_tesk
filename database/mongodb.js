/* const MongoClient = require('mongodb').MongoClient;

const db = function () {

}

// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'indegene';
 
// Use connect method to connect to the server
MongoClient.connect(url, {
  useUnifiedTopology: true
}).then((client) => {
  console.log("Connected successfully to server");
 
  db = client.db(dbName)
  client.close();
}).catch(error => console.error(error))

module.exports = db */