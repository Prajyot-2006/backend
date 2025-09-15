// sending data using params

let myServer = require('express');  // as we know require is just like import 
let app = myServer();
app.use(myServer.json())  // puri app ke pehle ye chal raha hoga , its like int main() function of C-prog , we should use this

// this is the 1st middleware for asking token
const myToken = '12345'
let checkToken = (request , response , next) => {  // This is Malware's function, age jane ke liye next wwale function ka role bohot imp hai 
    console.log('Welcome')  

    if(request.query.token === "" || request.query.token === undefined){
        console.log(request.query.token);  // why its undefined ? bcoz 
/* because : 
1. request.query comes from the URL
request.query is used to read query parameters from the URL.

Example: http://localhost:8000/news?token=12345
Here:
request.query = { token: "12345" }
request.query.token = "12345"

But if you just open: http://localhost:8000/news
then there is no token parameter in the URL, so request.query = {} and request.query.token = undefined.
*/
        return response.send(
            {
                status : 0,
                msg : 'Please Fill the Token, do u know how to fill it?   just type token=1234 after quextion mark(?) in the URl'
            }
        )
    }

    if(request.query.token !== myToken) {
        return response.send(
            {
                status : 0,
                msg : 'Please Fill the correct Token'
            }
        )
    }

    else {
        next();
    }

}
app.use(checkToken)  

// we can even use multiple middleware
// this is the 2nd middleware for asking token password
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






app.get('/' , (request , response) => {  // post method's API cant run in direct browser like if we run http://localhost:8000/news direct in a browser it wont work bcoz post method's API cant run in direct browser but get method's API can run 
    response.send('Home Page API')
})

app.get('/news' , (request , response) => {  // post method's API cant run in direct browser like if we run http://localhost:8000/news direct in a browser it wont work bcoz post method's API cant run in direct browser but get method's API can run 
    response.send('This is NEWS API')
})


app.listen('8000')
