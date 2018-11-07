// app.js

"use strict";

const express = require('express');
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false }); // create application/x-www-form-urlencoded parser
var port = process.env.PORT || 3030;
var app = express();

console.log(`${__dirname}/public`);

app.set('view engine', 'ejs');

app.use('/assets', express.static(`${__dirname}/public`));  // define static assets location

app.use('/', function(request, response, next) {
    console.log(`Request URI: ${request.url}`);
    next();
});

app.get('/', handleGetRoot);

app.get('/index', handleGetRoot);

app.get('/contact', handleContact);

app.get('/services', handleServices);

app.get('/about', handleAbout);

app.get('/faq', handleFaq);

app.post('/contact', urlencodedParser, handleContactSubmission);

function handleGetRoot(request, response) {
    // response that uses static asset
    response.render('index');
}

function handleContact(request, response) {
    response.render('contact');
}

function handleContactSubmission(request, response) {
    console.log(`Form Submitted With Email: ${request.body.email}`);
    console.log(`Form Message: ${request.body.message}`);
    response.render('message_ack');
}

function handleServices(request, response) {
    response.render('services');
}

function handleAbout(request, response) {
    response.render('about');   
}

function handleFaq(request, response) { 
    response.render('faq'); 
}

app.listen(port, function() {
    console.log(`Margolly Application started on port ${port}`);
});