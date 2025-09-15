// we gonna import named export module in this file 

const { updateQtyt, deleteQtyt, setQtyt, name } = require("./05-named-module-exports");  // we use curly brackets for named module , this curly brackets shows that we are using named module 

console.log(updateQtyt());
console.log(deleteQtyt());
console.log(setQtyt());
console.log(name);