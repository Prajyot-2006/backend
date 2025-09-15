// creating a small API that gives 'Hello World, Server is running' as a respnose

let http = require('http')  // package.json by default uses http type which is already install in nodejs , we must use http to create a server
// now with the help of http we gonna create a server
let server = http.createServer((request , respnose) => {  // when server is creating it takes a callback fn , inside callback fn we need to give 2 parameter(this is mandatory) 1st parameter is request(it means the one which comes from frontend) and 2nd parameter is response(it means backend will give response to the frontend)
    respnose.end('Hello World, Server is running');  // This is the response which will go to the frontend , we use end in nodejs to create a server
} )
server.listen('8000'); // http://localhost:8000  // server.listen means it reads the server and listen and then runs  and it needs a port like 3000,4000,5000

// check the API in the http://localhost:8000