// we are learning middleware in this file , middleWare is just a function btwn request and response cycle which is used to check whether to send the response or not , if middleware fn hits then only we can acess the localhost API

let myServer = require('express');  // as we know require is just like import 

let app = myServer();
app.use(myServer.json())  // puri app ke pehle ye chal raha hoga , its like int main() function of C-prog , we should use this 

let checkToken = (request , response , next) => {  // This is Malware's function, age jane ke liye next wwale function ka role bohot imp hai 
    console.log('Welcome')
    next(); // next is a type of callback fn , next ko call karte hi fir ye route ko dhundega aur apna 8000 port chalega  
/*
It is used to pass control from the current middleware function to the next middleware function in the request–response cycle.
If next() is called, the request will continue and show "Home Page".
If you remove next(), the request will hang forever because it never reaches the route handler.
*/
}
app.use(checkToken)  // This is an MiddleWare , jab tak aap isko satisfy nahi kroge aap aage wale route pe nahi jaoge. when you use a function inside app.use() or pass it as the first argument of a route (before the main handler), it becomes a middleware in Express. 
// for eg : we have created a 8000 port localhost , when we go into the http://localhost:8000/news , 1st if the Middleware satisfies then only we can acces the localhost  

app.get('/news' , (request , response) => {  // post method's API cant run in direct browser like if we run http://localhost:8000/news direct in a browser it wont work bcoz post method's API cant run in direct browser but get method's API can run 
    response.send('This is NEWS API')
})

app.get('/news/:id' , (request , response) => {
    let currentId = request.params.id;
    response.send('News Detail API, ID:' +  currentId)
})

app.listen('8000')
