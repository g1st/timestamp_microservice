/*
 *
 *   Server for simple Timestamp Microservice API
 *
*/

'use strict';

/* ====================== SETUP =========================== */

const express = require('express'),
      app = express(),

      path = require('path'),
      // PORT = (process.ENV.PORT || 3000);
      PORT = 3000;

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* ====================== ROUTES ========================== */

// homepage
app.get('/', function(req, res) {
  res.send('Welcome to Timestamp Microservice Hompepage!');
});

// listening to all queries
app.get('*/:q', function(req, res) {
  const q = req.params.q;
  const json_date = parseQuery(q);
  res.send(json_date);
});

/* ====================== RUN APP ========================= */
app.listen(PORT, function(){
  console.log(`app is listening on port ${PORT}`);
});

/* ====================== FUNCTIONS ======================= */

function parseQuery(q) {
  let result = {
    unix: null,
    natural: null
  };

  // query is a number
  if (Number(q)) {
    // const date = new Date(parseInt(q)),
    //       month_day = date.toLocaleString('en-US', {month: 'long', day: 'numeric'}),
    //       year = date.toLocaleString('en-US', {year: 'numeric'}),
    //
    //       natural_date = month_day + ', ' + year;

    result.unix = parseInt(q);
    result.natural = unixtonatural(parseInt(q));
    return result;
  }

  // query is a date string
  if (Date.parse(q)) {
    result.unix = Date.parse(q);
    result.natural = unixtonatural(Date.parse(q));
    return result;
  }

  // INVALID query
  return result;
}

function unixtonatural(unix) {
  const date = new Date(unix),
        month_day = date.toLocaleString('en-US', {month: 'long', day: 'numeric'}),
        year = date.toLocaleString('en-US', {year: 'numeric'});

        return month_day + ', ' + year;
}
