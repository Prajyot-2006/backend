let myServer = require('express');  // as we know require is just like import 

let app = myServer();

app.get('/' , (request , response) => {   // we are creating a route from get method and / means standard local host port ie http://localhost:8000
    response.send({ // we use send(in express js) instead of end(from nodejs)
        status : 1,
        message : 'Home Page API'
    })  // we dont need to do JSON.stringify in express as it convert by default 
}) // '/' this in get method indicates that this route is for homepage


// main thing is that in express js we dont need to make route using if-else just like we did in nodejs.In nodejs we created multiple routes using if-else statement 


app.get('/products' , (request , response) => {  // we can make multiple routes like this , but we have to give it a paticular URL 
    let products = [
        {
            productId: '313810938994',
            productName: 'Tshirt Black'
        },
        {
            productId: '313810938984',
            productName: 'Full Sleeve Shirt'
        }
    ];
    response.send(products)
})


app.get('/products/cart-items', (request , response) => {
    let cartItems = [
        {
            productId: '313810938994',
            productName: 'Tshirt Black',
            quantity: 2,
            price: 500
        },
        {
            productId: '313810938984',
            productName: 'Full Sleeve Shirt',
            quantity: 1,
            price: 800
        }
    ];
    response.send(cartItems);
})


app.post('/login' , (request , response) => {  // post method's API cant run in direct browser like if we run http://localhost:8000/login direct in a browser it wont work bcoz post method's API cant run in direct browser but get method's API can run 
    console.log(request.body);
    response.send({
        status : 1,
        message : 'Log in info' 
    })
    
})

app.listen('8000')