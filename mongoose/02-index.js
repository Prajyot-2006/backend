let a = require('express');   // Import Express
var mongoose = require('mongoose');   // Import Mongoose for MongoDB
require('dotenv').config();   // Load environment variables from .env file
//let enquiryModel = require('./App/models/02-enquiry.model.js');   // Import enquiry model

// Import controllers and routes
// Controllers contain the actual logic for handling requests (insert, list, delete, update)
const { enquiryInsert, enquiryList, enquiryDelete, enquiryUpdate } = require('./App/controllers/web/01-userEnquiryController.js');
// Routes file groups all enquiry-related routes in one place
const enquiryRoutes = require('./App/routes/web/01-enquiry-routes.js');

let app = a()    // Create Express app

app.use(a.json());  // Allow Express to read JSON data from request body


// Mount enquiry routes under a base URL
// Any route defined in enquiryRoutes will now start with /web/api/enquiry
// Example: enquiryRoutes.get('/enquiry-list') becomes /web/api/enquiry/enquiry-list
app.use("/web/api/enquiry" , enquiryRoutes);   // the /web/api/enquiry is the default url and enquiryRoutes will add remaining URL from its value we know enquiryRoutes has values in it its a variable

// http://localhost:8000/web/api/enquiry/enquiry-insert







// connect to mongodb using mongoose
mongoose.connect(process.env.DBURL).then(() => { // this is a promise
    console.log('Connected to the MongoDB');
    app.listen(process.env.Port , () => {  // Start server on the given port
        console.log('Server is running on port 3000')
    })
}) 
/* why its a promise ? 
In modern Mongoose (≥5.x), the connect() method is asynchronous.
Connecting to MongoDB involves:
Opening a network socket
Authenticating (if credentials)
Handshaking with the database server
Initializing internal connection pools

Those steps take time, so the function cannot return immediately with a “connected” status.
Instead, it returns a Promise that will be fulfilled once the connection succeeds or rejected if it fails.
*/

