const inquirer = require('inquirer');
const request = require('request-promise');

function getConversionRates(base) {
  return request({
    uri: 'https://api.exchangeratesapi.io/latest',
    qs: {
      base
    },
    json: true
  })
};

function converter(fromCurrency, amount, toCurrency) {
  return getConversionRates(fromCurrency)
    .then((res) => {
      const rate = res.rates[toCurrency]
      console.log(amount * rate)
    })
    .catch((err) => {
      console.log(err)
    })
};

const rates = [ "USD", "JPY",	" BGN", "CZK", "DKK", "GBP", "HUF", "PLN", "RON", "SEK", "CHF", "ISK", "NOK", "HRK", "RUB", 
"TRY", "AUD", "BRL", "CAD", "CNY", "HKD", "IDR", "ILS", "INR", "KRW", "MXN", "MYR", "NZD", "PHP", "SGD", "THB", "ZAR" ]

// questions for the inquirer prompt
const questionOne = {
  type: "list",
  name: "fromCurrency",
  message: "What currency are you converting from?",
  choices: rates
};

const questionTwo = {
  type: "list",
  name: "toCurrency",
  message: "What currency are you converting to?",
  choices: rates
};

const questionThree = {
  type: "number",
  name: "amount",
  message: "What is the amount you would like to convert?"
};

const questions = [questionOne, questionTwo, questionThree];

// inquirer library prompt
inquirer.prompt(questions).then((answers) => {
  const fromCurrency = answers["fromCurrency"]
  const toCurrency = answers["toCurrency"]
  const amount = answers["amount"]
  return converter(fromCurrency, amount, toCurrency)
});







