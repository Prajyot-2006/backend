let express = require('express');  // Import the Express framework
const { dbConnection } = require('./dbConnection');  // import dbConnection
let app = express();  // make an express app
app.use(express.json())  // this lets the app understand JSON data

app.get('/student-view' , (request , response) => { // when someone visits /student-view with GET,  send back the text "Student View API"
    response.send("Student View API ")
})

app.post('/student-insert' , async (request , response) => {  // when someone sends a POST request to /student-insert, // send back the text "Student Insert API"
    let myDB = await dbConnection();  // myDB = dbConnection
    // here we have created a collection from the database which we took from dbConnection file 
    let studentCollection = myDB.collection("")
    response.send("Student Insert API ")
})

app.listen('8000')