// Import the Express framework (we’re not using it yet, but required for routing)
const e = require('express');

// Import Mongoose library to interact with MongoDB using schemas and models
let mongoose = require('mongoose');

// Define a schema (blueprint) for the "userEnquiry" collection.
// A schema tells Mongoose what fields each document will have and their types.
let userEnquirySchema = mongoose.Schema({

    // 'name' field – must be a string and is required (cannot be empty)
    name: {
        type: String,
        required: true
    },

    // 'email' field – must be a string, required and must be unique across documents
    email: {
        type: String,
        required: true,
        unique: true
    },

    // 'phone' field – must be a number and is required
    phone: {
        type: Number,
        required: true,
        unique: true
    },

    // 'message' field – must be a string and is required
    message: {
        type: String,
        required: true
    }
});


// Create a model (class) named "enquiry" from the userEnquirySchema.
// This tells Mongoose: 
//  - use the schema as the blueprint for the documents,
//  - and store them in a MongoDB collection called "enquiries" (Mongoose pluralizes the name by default).
let enquiryModel = mongoose.model("enquiry", userEnquirySchema);   // enquiry is a collection , enquiryModel is a model
// is enquiryModel ke andar vo table(means collection) padi hui hai , to jab aap is model ke through kuch query lagate ho like enquiryModel.find()  or .save() toh ye isi table ke andar jake data dikha deta hai   etc  
// Export the model so you can import it in other files (e.g. routes/controllers)
// and use it to create, read, update, or delete enquiry documents in MongoDB.
module.exports = enquiryModel;