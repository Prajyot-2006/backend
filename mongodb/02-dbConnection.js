const { MongoClient } = require('mongodb');  // Import the MongoClient class from the mongodb package (this is a named export) 
let dbConnectionURL  = 'mongodb://localhost:27017'   // this URL is used for connection , Connection URL for MongoDB (we’re connecting to MongoDB running locally on port 27017)
const client = new MongoClient(dbConnectionURL) // Create a new MongoClient instance using the connection URL , This client object is what you’ll use to actually connect and talk to MongoDB.

// Connecting to MongoDB is asynchronous and returns a Promise,
// so we should use async/await to handle it
// databse connect karne me time lagta hai so we are using async

let dbConnection = async () => {
    await client.connect()
    let db = client.db("basic-mongoDataBase");  // it is connected and stored in this variable , we have created a new database named as basic-mongoDataBase
    return db;
}

module.exports = {dbConnection}