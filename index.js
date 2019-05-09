const express = require('express');
const app = express();
const request = require('request');
const path = require('path');
const ejs = require('ejs');
const bodyParser=require('body-parser');

let url = 'https://api.chucknorris.io/jokes/random';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');
__dirname = path.resolve();
app.set('views', (__dirname+'/views'));

app.get('/', (req, res) => {
  res.render('index', { joke: null, error: null });
});

app.post('/', (err, res, body) => {

  request(url, (err, response, body) => {
    let jokeText=JSON.parse(body);
    if (err) {
      res.render('index', { joke: null, error: "Please try again" });
    }
    else {

      res.render('index', { joke: jokeText.value, error: null });
    }
  });
});

const PORT=process.env.PORT||3000;
app.listen(PORT);
console.log('Listening on port:',PORT);
