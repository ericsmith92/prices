const fetch = require('node-fetch');

const prices = () =>{
    fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(json => console.log(json))
    .then(json => console.log(json));
}

module.exports = prices;
