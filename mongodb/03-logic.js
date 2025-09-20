// QUESTION : copy the entire code from index.js file and apply the logic => there should be no same emails or 2 same emails not allowed 
// by doing this we notice that when we first run the code(index.js and dbConnection.js) file the database only creates 1st time when we ran the code when we agian ran the code after a day or week it wont re-create new database , even it adds what we insert and also has previous data inside collection 
/**
How MongoDB handles databases & collections
In MongoDB, a database or collection isn’t really “created” in advance.
They’re created lazily the first time you insert something.
After that, the database and collection persist on disk.

So:
The first time you run your code and call
myDB.collection("student").insertOne(obj)
MongoDB will create the database (if it doesn’t exist yet) and the student collection automatically, then insert the document.
The next time (tomorrow, next week, etc.) when you run the same code:
MongoDB does not create a new database or collection;
It simply connects to the existing database and uses the same student collection with all your old data still inside.
*/


let express = require('express');  
const { dbConnection } = require('./02-dbConnection');  
let app = express();  
app.use(express.json())  


app.post('/student-insert' , async (request , response) => {   
    let myDB = await dbConnection();  
    let studentCollection = myDB.collection("student") 
    

    let obj = {
        sName : request.body.sName,
        sEmail : request.body.sEmail
    }

    let existingEmail = await studentCollection.findOne({ sEmail : obj.sEmail})
    console.log(existingEmail)  // ask gpt whats about findone

    if(existingEmail) {  // that means existingEmail hits 
        return response.send({status : 0 , msg : 'Email already exists'})
    }

    //console.log(obj);
    let insertResponse = await studentCollection.insertOne(obj);  
    let responseObject = {  

        status : 1,
        msg : "Data Insert",
        insertResponse
    } 
    response.send(responseObject)
})


app.get('/student-view' , async (request , response) => {
    let myDB = await dbConnection();   
    let studentCollection = myDB.collection("student")  

    let data = await studentCollection.find().toArray();  
    let cursorObject = await studentCollection.find()
    //console.log(cursorObject)
    let responseObject = {  
        status : 1,
        msg : "Student List",
        data
    } 
    
    
    response.send(responseObject)
})

app.listen('8000')