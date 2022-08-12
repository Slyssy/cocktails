require('dotenv').config();
console.log(process.env);

const apiKey = process.env.apiKey;
const url = `https://api.ers.usda.gov/data/arms/state?api_key=${apiKey}`;

module.exports = { apiKey };
