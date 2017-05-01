// server.js
// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.set('views', './views')
app.set('view engine', 'ejs')

app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

//Database setup
// var football = require('./models/football');
var Footballs = [{
    "id": 0,
    "team": "Barcelona",
    "play": 3,
    "win": 1,
    "drew": 1,
    "lose": 1,
    "point": 4
    
  },
  {
   "id": 1,
    "team": "Real Madrid",
    "play": 3,
    "win": 1,
    "drew": 1,
    "lose": 1,
    "point": 4
    
  },
  {
      "id": 2,
    "team": "Atletico Madrid",
    "play": 3,
    "win": 1,
    "drew": 1,
    "lose": 1,
    "point": 4
    
  },

];

var sum = 0;
var footballIndex = 3;
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('Football is update.');
  next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({
    message: 'Hi!'
  });
});

// more routes for our API will happen here
// on routes that end in /football

// get all the football (accessed at GET http://localhost:8080/api/football)
router.route('/footballs')
  .get(function(req, res) {
    // res.json(football.findAll());
    res.json(Footballs);
  });

// create a bear (accessed at POST http://localhost:8080/api/football)
router.route('/footballs')
  .post(function(req, res) {
    var football = {};
    football.id = footballIndex++;
    football.team = req.body.team;
   
    football.win = req.body.win;
    football.drew = req.body.drew;
    football.lose = req.body.lose;
    football.point = req.body.point;
    //football.save(bear);
    Footballs.push(football);
    res.json({
      message: 'Football created!'
    });
  });

// on routes that end in /football/:football_id
router.route('/footballs/:football_id')

  // get the bear with that id (accessed at GET http://localhost:8080/api/football/:football_id)
  .get(function(req, res) {
    res.json(Footballs[req.params.football_id]);
  })

  // update the bear with this id (accessed at PUT http://localhost:8080/api/football/:football_id)
  .put(function(req, res) {
    // use our bear model to find the bear we want
    Footballs[req.params.football_id].team = req.body.team; // update the football info

    Footballs[req.params.football_id].win = req.body.win; // update the football info
    Footballs[req.params.football_id].drew  = req.body.drew; // update the football info
    Footballs[req.params.football_id].lose = req.body.lose; // update the football info
    Footballs[req.params.football_id].point = req.body.point; // update the football info

    res.json({
      message: 'Football updated!'
    });
  })

  // delete the bear with this id (accessed at DELETE http://localhost:8080/api/football/:football_id)
  .delete(function(req, res) {
    delete Footballs[req.params.football_id]
    res.json({
      message: 'Football deleted!'
    });
  })




  var Basketballs = [{
    "id": 0,
    "team": "Cleveland Cavaliers",
    "play": 3,
    "win": 1,
    "lose": 1,
    "point": 1
    
  },
  {
   "id": 1,
    "team": "Boston Celtics",
    "play": 3,
    "win": 1,
    "lose": 1,
    "point": 1
    
  },
  {
      "id": 2,
    "team": "Toronto Raptors",
    "play": 3,
    "win": 1,
    "lose": 1,
    "point": 1
    
  },

];
var sum = 0;
var basketballIndex = 3;
// ROUTES FOR OUR API
// =============================================================================
//var router = express.Router(); // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('Basketball is update.');
  next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({
    message: 'Hi!'
  });
});

// more routes for our API will happen here
// on routes that end in /basketball

// get all the basketball (accessed at GET http://localhost:8080/api/basketball)
router.route('/basketballs')
  .get(function(req, res) {
    // res.json(basketball.findAll());
    res.json(Basketballs);
  });

// create a bear (accessed at POST http://localhost:8080/api/basketball)
router.route('/basketballs')
  .post(function(req, res) {
    var basketball = {};
    basketball.id = basketballIndex++;
    basketball.team = req.body.team;
   
    basketball.win = req.body.win;

    basketball.lose = req.body.lose;
    basketball.point = req.body.point;
    //basketball.save(bear);
    Basketballs.push(basketball);
    res.json({
      message: 'Basketball created!'
    });
  });

// on routes that end in /basketball/:basketball_id
router.route('/basketballs/:basketball_id')

  // get the bear with that id (accessed at GET http://localhost:8080/api/basketball/:basketball_id)
  .get(function(req, res) {
    res.json(Basketballs[req.params.basketball_id]);
  })

  // update the bear with this id (accessed at PUT http://localhost:8080/api/basketball/:basketball_id)
  .put(function(req, res) {
    // use our bear model to find the bear we want
    Basketballs[req.params.basketball_id].team = req.body.team; // update the basketball info
    Basketballs[req.params.basketball_id].win = req.body.win; // update the basketball info
    Basketballs[req.params.basketball_id].lose = req.body.lose; // update the basketball info
    Basketballs[req.params.basketball_id].point  = req.body.point; // update the basketball info
    res.json({
      message: 'Basketball updated!'
    });
  })

  // delete the bear with this id (accessed at DELETE http://localhost:8080/api/basketball/:basketball_id)
  .delete(function(req, res) {
    delete Basketballs[req.params.basketball_id]
    res.json({
      message: 'Basketball deleted!'
    });
  })



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);



app.get('/home',  function(req,res){
  // res.cookie('home',books);
   res.render('home', {Footballs: Footballs});
 });

  app.get('/pageone',  function(req,res){
  // res.cookie('home',books);
   res.render('pageone', {Footballs: Footballs});
 });

   app.get('/pagetwo',  function(req,res){
  // res.cookie('home',books);
   res.render('pagetwo', {Footballs: Footballs});
 });

    app.get('/pagethree',  function(req,res){
  // res.cookie('home',books);
   res.render('pagethree', {Footballs: Footballs});
 });
 
//static directory
app.use(express.static('public'))

// use the router and 401 anything falling through
app.use("*", function(req, res) {
  res.status(404).send('404 Not found');
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
