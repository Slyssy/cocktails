'use strict';
require('dotenv').config();
console.log(process.env);

const apiKey = process.env.API_KEY;

module.exports = { apiKey };
