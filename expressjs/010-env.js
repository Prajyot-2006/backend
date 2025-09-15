/*
In Express (or any Node.js project), an .env file is a special file used to store environment variables — things like:
API keys
Database connection strings
Port numbers
Secrets (JWT secret, password, etc.)

You can make multiple variables in .env file
to install .env we have to install a package in ur foldeer
*/




let myServer = require('express'); 
require("dotenv").config();  // .config fn will initialize this and makes sure to ready to use , now u can access environment variable in ur app    
const { checkToken } = require("./checkToken-for-09-file")
let app = myServer();
app.use(myServer.json())

console.log(process.env.MyToken);// We use process because Node.js automatically provides a global object called process, and inside it there’s a property env that stores all environment variables. so process is mandatory 



/*
const myTokenPassword = 'ws@123'

let checkTokenPassword = (request , response , next) => {
    if(request.query.password === "" || request.query.password === undefined){
        response.send(
            {
                status : 0,
                mssg : 'Please Fill the Password' 
            }
        )
    }

    if(request.query.password !== myTokenPassword) {
        return (
            {
                status : 0,
                msg : 'Please Fill the corret Password'
            }
        )
    }

    else {
        next()
    }
}
app.use(checkTokenPassword)
*/




app.get('/' , checkToken ,(request , response) => {   
    response.send('Home Page API')
})

app.get('/news' , checkToken , (request , response) => {   // this is route-level middleware , where we called the middleware fn only to this route
    response.send('This is NEWS API')
})

const port = process.env.PORT;  // port = 3000
app.listen(port) // http://localhost:3000
