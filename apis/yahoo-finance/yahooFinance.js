const yahooFinance = require('yahoo-finance');

const price = async (symbol) => {
    const result = await yahooFinance.quote(symbol, ['price']);
    return [result['price'].symbol, result['price'].regularMarketPrice];
}

module.exports = price;
