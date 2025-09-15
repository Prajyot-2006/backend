// sending data using post method's query parameter

let myServer = require('express');  // as we know require is just like import 

let app = myServer();
app.use(myServer.json())  // we should use this 


app.post('/login' , (request , response) => {  // post method's API cant run in direct browser like if we run http://localhost:8000/login direct in a browser it wont work bcoz post method's API cant run in direct browser but get method's API can run 
    console.log('This is request' ,request)
    console.log('This is the data which we fetched from Query parameter' , request.query)
    response.send({
        status : 1,
        message : 'Log in info',
        data : request.query
    })
    
})

app.listen('8000')


/*
What we did here:
- Opened Thunder Client (or Postman) and selected POST method.
- Put the URL: http://localhost:8000/login
- Went to "Body" tab, selected "JSON" and typed some data like:
  {
    "username": "John",
    "password": "1234"
  }
- When we send the request, backend receives it in request.body
- We used console.log(request) to see the entire request object
  and console.log(request.body) to see only the data we sent.

This is exactly how the frontend would send data when user fills
username & password and clicks the login button.

It’s stored in request because the request object represents everything that comes from the client (frontend).
*/

// query ka data url se aapko milta hai 

/**
1. request.query comes from the URL
request.query is used to read query parameters from the URL.
http://localhost:8000/news?token=12345   , here after question mark(?) is the query parameter


 */