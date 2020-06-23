/*
const fetch = require('node-fetch');

const prices = () =>{
    fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(json => console.log(json))
    .then(json => console.log(json));
}
*/

const yahooFinance = require('yahoo-finance');

const price = async () => {
    const result = await yahooFinance.quote('VUN.TO', ['price']);
    return [result['price'].symbol, result['price'].regularMarketPrice];
}

module.exports = price;
