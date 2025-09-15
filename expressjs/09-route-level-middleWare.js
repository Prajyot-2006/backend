/*
Route-Level Middleware
A route-level middleware is a middleware that runs only for a specific route — not for every request.
You attach it directly to the route instead of app.use() (which makes it global).

in the previous files where we learnt about middleware , that all was global middleware which means it will run for every route such as for homepage , /news /news/id etc
now we are learning how to call middleware fn only for specific route or a particular route 
*/


require('dotenv').config();
let myServer = require('express');  
const { checkToken } = require("./checkToken-for-09-file")
let app = myServer();
app.use(myServer.json())  




//app.use(checkToken)  instead we are using it only in a particular route that is news API and also in homepage API


const myTokenPassword = 'ws@123'
/*
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


app.listen('8000') // http://localhost:8000