// sending data using params

let myServer = require('express');  // as we know require is just like import 

let app = myServer();
app.use(myServer.json())  // puri app ke pehle ye chal raha hoga , its like int main() function of C-prog , we should use this 


app.get('/news' , (request , response) => {  // post method's API cant run in direct browser like if we run http://localhost:8000/news direct in a browser it wont work bcoz post method's API cant run in direct browser but get method's API can run 
    response.send('This is NEWS API')
})

app.get('/news/:id' , (request , response) => {
    let currentId = request.params.id;
    response.send('News Detail API, ID:' +  currentId)
})

app.listen('8000')
// now in http://localhost:8000/news just type any number after news/ like news/12 so 12 will be stored in currentId or reuqest.params.id

// params ka parameter dynamic API se milta hai 