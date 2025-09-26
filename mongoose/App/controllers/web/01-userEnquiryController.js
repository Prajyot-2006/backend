// this is web controller
// controller means which shows functionality , that means which manage functionality

const enquiryModel = require("../../models/02-enquiry.model");

//  insert enquiry data function , got from api/insert
let enquiryInsert = (request , response) => {
    let obj = {   // Get data from request body
        sName : request.body.sName,
        sEmail : request.body.sEmail,
        sPhone : request.body.sPhone,
        sMessage : request.body.sMessage
    }
    console.log(obj);

// Create a new document based on the enquiry model (like making a new record)
    let enquiry = new enquiryModel({   // When you write new enquiryModel({...}), you are creating a new document (record) that follows the structure of your schema.
        name: obj.sName,    // the name , email , phone , message should be same as the one we defined in schema , if u bymistakely write phone as Phone then it will throw error
        email: obj.sEmail,
        phone: obj.sPhone,
        message: obj.sMessage
    })

// Save the new document into the database
    enquiry.save().then(() => { // save is a method which saves the data , jo bhi data ayega vo save karlega
        response.send({status : 1 , message : "Enquiry Saved Successfully" })  //  Send response back to client , Runs if data saved successfully
    }).catch((error) => {
        response.send({status : 0 , message : "Error while saving data" , error})   //  Send response back to client , Runs if error occurs (like duplicate email)
    });  

}

// get enquiryList function
let enquiryList = async (request , response) => {
    let enquiryList = await enquiryModel.find()   // we dont need to convert this in array cuz it is automatically done my mongoose , if we are using in MongoDB that time we have to convert in array , 
    response.send({ status : 1 , message : "Enquiry List" , data : enquiryList })
}

// DELETE function - to delete a specific enquiry by its ID
let enquiryDelete = async (request , response) => {  // /:id this is dynamic parameter id 
    let id = request.params.id;  // Get the enquiry ID from the URL (dynamic parameter)
    
    let deleteResponse = await enquiryModel.deleteOne({_id : id});    // Delete the enquiry from the database where _id matches
    console.log(deleteResponse)   // Log the result (shows how many documents got deleted)
    response.send({status : 1 , message : "Enquiry deleted successfully" , id : id , delResponse : deleteResponse})
}

// update function - to update a specific enquiry by its ID
let enquiryUpdate = async (request , response) => {
    let id = request.params.id;  // Get the enquiry ID from the URL
    console.log(id);

  // Get the updated data from the request body
    let obj = {   // Get updated data from request body
        sName : request.body.sName,
        sEmail : request.body.sEmail,
        sPhone : request.body.sPhone,
        sMessage : request.body.sMessage
    }

  // Prepare the object in the same format as the database schema
    let updatedObj = {
        name : obj.sName,
        email : obj.sEmail, 
        phone : obj.sPhone, 
        message : obj.sMessage 
    }

// Update the enquiry document in the database where _id matches
    let updateResponse = await enquiryModel.updateOne({_id : id} , updatedObj)

    response.send({status : 1 , message : "Enquiry updated successfully" , id : id , updateResponse : updateResponse});
}

module.exports = {enquiryInsert , enquiryList , enquiryDelete , enquiryUpdate}