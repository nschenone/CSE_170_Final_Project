
/**
 * Module dependencies.
 */

var express = require('express');
var dotenv = require('dotenv');
dotenv.config();
var http = require('http');
var path = require('path');
const { Client } = require('pg');
var handlebars = require('express3-handlebars');

var index = require('./routes/index');
var myClasses = require('./routes/myClasses');
var classPage = require('./routes/class');
var profilePage = require('./routes/profile');
var searchPage = require('./routes/search');
var addClassPage = require('./routes/addClass');

var app = express();


// Postgres connection
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to database");
});
global.db = client;

// Postgres query functions
const getAllClasses = (request, response) => {
  db.query('SELECT * FROM all_classes;', (err, resp) => {
    if (err) throw err;
    response.status(200).json(JSON.stringify({ "classes": resp.rows }));
  });
}

const getMyClasses = (request, response) => {
  db.query('SELECT * FROM my_classes;', (err, resp) => {
    if (err) throw err;
    response.status(200).json(JSON.stringify({ "classes": resp.rows }));
  });
}

const addClassDB = (request, response) => {
  const { name, professor } = request.body

  // Check if class already in DB
  db.query('SELECT * FROM all_classes WHERE name=$1 AND professor=$2;', [name, professor], (err, resp) => {
    if (err) throw err;

    // If class not in DB
    if (resp.rows.length > 0) {

      // Insert into my_classes from all_classes
      db.query('INSERT INTO my_classes (name, description, professor, quarter) SELECT name, description, professor, quarter FROM all_classes WHERE name=$1 AND professor=$2;', [name, professor], (err, resp) => {
        if (err) throw err;
        response.status(201).send(resp.rows);
      });

    } else {
      response.status(304).send("Class already exists");
    }

  });
}

const removeClassDB = (request, response) => {
  const { name, professor } = request.body

  // Check if class already in DB
  db.query('SELECT * FROM my_classes WHERE name=$1 AND professor=$2;', [name, professor], (err, resp) => {
    if (err) throw err;

    // If class not in DB
    if (resp.rows.length > 0) {

      // Insert into my_classes from all_classes
      db.query('DELETE FROM my_classes WHERE name=$1 AND professor=$2;', [name, professor], (err, resp) => {
        if (err) throw err;
        response.status(201).send(resp.rows);
      });

    } else {
      response.status(304).send("Class already exists");
    }

  });
}

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', index.view);
app.get('/myClasses', myClasses.view);
app.get('/class/:name', classPage.viewClass);
app.get('/profile', profilePage.viewProfile);
app.get('/search', searchPage.viewSearch);
app.get('/addClass', addClassPage.addClass);
app.get('/queryAllClasses', getAllClasses);
app.get('/queryMyClasses', getMyClasses);
app.post('/addClassDB', addClassDB);
app.post('/removeClassDB', removeClassDB);
// Example route`
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
