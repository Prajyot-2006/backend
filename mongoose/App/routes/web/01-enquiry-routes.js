// This file is used to separate the routing logic from the main server file.
// It keeps the code organized and modular (good practice).
// also we have created routes using router in expressjs
let a = require('express');
// Import controller functions that contain the actual logic
// These handle inserting, listing, deleting, and updating enquiries
const { enquiryInsert, enquiryList, enquiryDelete, enquiryUpdate } = require('../../controllers/web/01-userEnquiryController');


// Create a router instance from Express
// Router allows you to define multiple routes in one place and then export them
let enquiryRoutes = a.Router();  // ye aapko bata sakta hai ki aap kya kya routes banane wale hai 

// POST route - Insert new enquiry data
// When a POST request is made to /enquiry-insert, it will call enquiryInsert()
enquiryRoutes.post('/enquiry-insert' , enquiryInsert)

// GET route - Fetch all enquiries
// When a GET request is made to /enquiry-list, it will call enquiryList()
enquiryRoutes.get('/enquiry-list' , enquiryList)

// DELETE route - Delete a specific enquiry using its unique ID
// :id is a route parameter that will be available as req.params.id in the controller
enquiryRoutes.delete('/enquiry-delete/:id' , enquiryDelete)

// PUT route - Update a specific enquiry using its unique ID
// PUT is used for updating existing records
enquiryRoutes.put('/enquiry-update/:id' , enquiryUpdate)

module.exports = enquiryRoutes;