
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

const aws = require('aws-sdk');
aws.config.region = 'us-west-1';
const S3_BUCKET = process.env.S3_BUCKET;

var index = require('./routes/index');
var myClasses = require('./routes/myClasses');
var classPage = require('./routes/class');
var profilePage = require('./routes/profile');
var searchPage = require('./routes/search');
var addClassPage = require('./routes/addClass');
var testUploadPage = require('./routes/testUpload');

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

// Pages
app.get('/', index.view);
app.get('/myClasses', myClasses.view);
app.get('/class/:name', classPage.viewClass);
app.get('/class/:name/textbooks', classPage.viewClassTextbooks);
app.get('/class/:name/classnotes', classPage.viewClassNotes);
app.get('/class/:name/practiceexams', classPage.viewClassPracticeExams);
app.get('/profile', profilePage.viewProfile);
app.get('/search', searchPage.viewSearch);
app.get('/addClass', addClassPage.addClass);
app.get('/testUploadPage', testUploadPage.upload);

// DB
app.get('/queryAllClasses', getAllClasses);
app.get('/queryMyClasses', getMyClasses);
app.post('/addClassDB', addClassDB);
app.post('/removeClassDB', removeClassDB);

/*
 * Respond to GET requests to /sign-s3.
 * Upon request, return JSON containing the temporarily-signed S3 request and
 * the anticipated URL of the image.
 * https://github.com/willwebberley/NodeDirectUploader/blob/master/app.js
 */
// S3
app.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    console.log(returnData);
    res.write(JSON.stringify(returnData));
    res.end();
  });
});

/*
 * Respond to POST requests to /submit_form.
 * This function needs to be completed to handle the information in
 * a way that suits your application.
 */
app.post('/save-details', (req, res) => {
  // TODO: Read POSTed form data and do something useful
});

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
