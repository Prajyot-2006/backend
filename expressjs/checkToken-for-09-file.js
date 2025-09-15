// const myToken = '12345'  we used this logic for learning 09-route-level-middleWare.js
const myToken = process.env.MyToken
let checkToken = (request , response , next) => {  
    console.log('Welcome')  

    if(request.query.token === "" || request.query.token === undefined){
        console.log(request.query.token);  

        return response.send(
            {
                status : 0,
                msg : 'Please Fill the Token, do u know how to fill it?   just type token=1234 after quextion mark(?) in the URL'
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

module.exports = { checkToken }