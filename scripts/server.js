const newrelic = require('newrelic')
const express = require('express');
const morgan = require('morgan');
const fs = require('fs')
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 3000;

app.use(express.static("../"));

app.use(express.static('public'));

app.get('/', (req, res) =>{
  let bytes = fs.readFileSync('../index.html').toString();
  res.send(bytes);
});

app.get('/api/quotes/random', (req, res, next) =>{
  const quote = getRandomElement(quotes);
  res.send({quote: quote});
});

app.get('/api/quotes', (req, res, next) =>{
  if(!req.query.person){
    res.send({quotes: quotes});
  } else{
    const filterQuote = quotes.filter(element => element.person === req.query.person);
    res.send({quotes: filterQuote});
  }
});

app.post('/api/quotes', (req, res, next) => {
  if (req.query.quote && req.query.person) {
    const newQuote = {
        quote: req.query.quote, 
        person: req.query.person
    };
    quotes.unshift(newQuote);
    res.send({quote: newQuote});
  }
  else {
    res.status(400).send();
  }
});

app.listen(PORT, () =>{
  console.log('Listening on PORT ' + PORT);
})