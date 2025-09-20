let express = require('express');  // Import the Express framework
const { dbConnection } = require('./02-dbConnection');  // import dbConnection
const { ObjectId } = require('mongodb');
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

// Delete data : deleting existing data
app.delete('/student-delete/:id' , async (request , response) => {  // this route will take params , in this route dynamic paramter URL is id 
    let paramData = request.params;  // params means id 
    console.log(paramData);  // object
    let id = paramData.id
    console.log(id);  // id or value which we put on URL
    let myDB = await dbConnection();   // here we imported database again
    let studentCollection = myDB.collection("student")
    let delResponse = await studentCollection.deleteOne({_id:new ObjectId(id)})   // the ObjectId is a built-in method or class it creates automatically when we insert a document inside collection
    
    let responseObject = {  // why we made this ? bcoz it will help frontend dev to see the response as status and message, and see details of the inserted record

        status : 1,
        msg : "Data Delete",
        delResponse
    } 

    response.send(responseObject)


})  
// app.delete('/student-delete/:id?' , (request , response) => {  what that question mark(?) means ? this means params are optional now ,it means it is ok if user dont type id in request , this means its optional 


// Updating the data : note : data only updates when it already exists 
app.put('/student-update/:id' , async (request , response) => { // we use put method to update existing data , put me bhi data jo jayega vo body se jayega means jo hame update karna hai vo body se jayega and it will go in the 'id' params 
// now why we gave /:id (param) to the URL ? bcoz jiski id doge usi ka data update hoga
    let paramData = request.params;  // its an object 
    let id = paramData.id;  // here we get id which we put into the url as param and which we wanna update 

    // again we have to import database here in put method bcoz we wanna update data and to update data we must have database in this method(put method)
    let myDB = await dbConnection();   // here we imported database again
    let studentCollection = myDB.collection("student")

  // fetch the existing doc
    let oldInfo = await studentCollection.findOne({_id:new ObjectId(id)});
    console.log(oldInfo);

// if the id is incorrect in params, then pass a mssg Student not found
    if (!oldInfo) {  
        return response.send({status:0, msg:"Student not found"});
    }
    
    let obj = {  // old data 
        sName: oldInfo.sName,
        sEmail: oldInfo.sEmail
    }
    console.log(obj)

    let obj1 = {
        sName : request.body.sName,
        sEmail : request.body.sEmail
    }


    if(obj1.sName!=="" && obj1.sName!==null && obj1.sName!==undefined) {
        obj.sName = obj1.sName
        
    }

    if(obj1.sEmail!=="" && obj1.sEmail!==null && obj1.sEmail!==undefined) {
        obj.sEmail = obj1.sEmail
        
    }



    let updateResponse = await studentCollection.updateOne({_id:new ObjectId(id)} , {$set:{ sName:obj.sName , sEmail:obj.sEmail }})   // {_id:new ObjectId(id)} this is a condition whose data we wanna update and this is what we update {$set:{ sName:sName , sEmail:sEmail }}
    let responseObject = {  // why we made this ? bcoz it will help frontend dev to see the response as status and message, and see details of the inserted record
        status : 1,
        msg : "Data Update",
        updateResponse
    } 

    response.send(responseObject)


})  







app.listen('8000')