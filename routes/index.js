var express = require('express');
var router = express.Router();
var path = require('path');

var app = express(); //express juttumme
app.use(express.static(path.join(__dirname, 'public')));

//to render, tässä on mun API taulukkoon tiedot
let data = {};
var otsikko = [];
var urli = [];
var paivays = [];
var kuva = [];
data = { otsikko, urli, paivays, kuva };

//NY times API
const request = require('request');

function execute() {
  const options = {
    "url": "https://api.nytimes.com/svc/mostpopular/v2/viewed/30.json?api-key=tjdZEwcQu7yR4jJTxF2JYT9Iw7PaoPVq",
    "method": "GET",
    "headers": {
      "Accept": "application/json"
    }
  };
  request(options, function (err, res, body) {
    if (err) {
      console.error(err);
    }
    else {
      var json = JSON.parse(body);
      for (var i = 0; i < json.results.length; i++) {
        otsikko.push(
          json.results[i].title
        );
        urli.push(
          json.results[i].url
        );
        paivays.push(
          json.results[i].published_date
        );
        /*kuva.push(
          json.results[i].media[0]["media-metadata"][2].url
        );*/
      }
      console.log(data);
    }
  });
}

execute(); //Aloittaa ja Päättää mun API

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', data);
});

module.exports = router;
