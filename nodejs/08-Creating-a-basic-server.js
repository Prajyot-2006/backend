
let http = require('http') 

let server = http.createServer((request , respnose) => {  // as we know request is the frontend code, we give request to the backend 
// requests such as GET , POST , PUT , DELETE , just remember we did like axios.get('http://localhost:4000/cart-items'); in the react   

    if(request.url == '/products'){  // http://localhost:4000/products , request.url will checks whats after this http://localhost:4000/ ?  
// if request.url == '/products' then backend should responds with  products data 
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
        respnose.end(JSON.stringify(products));
    }

    if(request.url == '/products/cart-items'){ // http://localhost:4000/products/cart-items , // if request.url == '/products/cart-items' then backend should responds with  cart-items data 
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
        respnose.end(JSON.stringify(cartItems));
    }

    if(request.url == '/'){ // http://localhost:4000/
        respnose.end('Hello World, Server is running');
    }
} )
server.listen('4000'); 
