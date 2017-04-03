var express = require('express');
var handlebars = require('express-handlebars');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');


var app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.engine('handlebars', handlebars({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

var db;

MongoClient.connect('mongodb:/@ds145370.mlab.com:45370/hangman', function(err, database){
  if (err) return console.log(err);
  db = database;
  app.listen(process.env.PORT || 3000);
});


app.get('/', function(req,res){
    db.collection('words').find().toArray(function(err, result){
      res.render('home', {test: result});

    });
  });

  app.get('/hi', function(req,res){
      db.collection('words').aggregate([ { $sample: { size: 1 } } ]).toArray(function(err, result){
        res.render('home', {test: result});
      });
    });
