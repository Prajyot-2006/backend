let express = require('express');  // Import the Express framework
const { dbConnection } = require('./02-dbConnection');  // import dbConnection
let app = express();  // make an express app
app.use(express.json())  // this lets the app understand JSON data


app.post('/student-insert' , async (request , response) => {  // when someone sends a POST request to /student-insert, // send back the text "Student Insert API"
    let myDB = await dbConnection();  // myDB = dbConnection
    // here we have created a collection(table) from the database(basic-mongoDataBase) which we took from dbConnection file 
    // now we gonna insert some key-values(data) in it , so before inserting data the question is where we gonna insert ? we havent made collection yet so we have to make a collection in order to perform insertion 
    let studentCollection = myDB.collection("student")  // this is collection , we created a collection 

    let obj = {
        sName : request.body.sName,
        sEmail : request.body.sEmail
    }

    console.log(obj);
    let insertResponse = await studentCollection.insertOne(obj);  // so ye pura obj insert hojayega aur db ke andar store hojayega 
    let responseObject = {  // why we made this ? bcoz it will help frontend dev to see the response as status and message, and see details of the inserted record

        status : 1,
        msg : "Data Insert",
        insertResponse
    } 
    response.send(responseObject)
})


app.get('/student-view' , async (request , response) => { // when someone visits /student-view with GET,  send back the text "Student View API"
    let myDB = await dbConnection();   // here we imported database again
    let studentCollection = myDB.collection("student")  //  In MongoDB, calling .collection('name') does not automatically create a new collection every time. //If the collection already exists, it simply returns a handle/reference to that existing collection. //If the collection does not exist yet, MongoDB will create it lazily the first time you insert a document into it.
// my doubt : So in your GET /student-view route, when you write: let studentCollection = myDB.collection("student")
// you are not creating a new collection again; you’re simply accessing the existing "student" collection that was previously used (or will be created on first insert).

    let data = await studentCollection.find().toArray();  // toArray() is used to convert the collection into an array bcoz the data wont be in proper format 
    // to see what is the cursor object (means data not in proper format) we gonna console.log it 
    let cursorObject = await studentCollection.find()
    console.log(cursorObject)
    let responseObject = {  // why we made this ? bcoz it will help frontend dev to see the response as status and message, and see details of the inserted record
        status : 1,
        msg : "Student List",
        data
    } 
    
    
    response.send(responseObject)
})

app.listen('8000')