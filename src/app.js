const express = require('express');
var urlSlug = require('url-slug');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

// yelp api
'use strict';
const yelp = require('yelp-fusion');
const apiKey = 'Mu3oLmAOPe8cjhcM8c2sXCUUGsEqfk0lNGJKXlEJMOWE6YVS0cxYd8Sh9DoDbUjnJhh2GXwK1HGW-TAyhvz5nSBChK1u0QO_QEFBgLxJcTJgBhBMdx-0jNlWgdRRXHYx';
const client = yelp.client(apiKey);

let events = [];

//utilize API to create list of events
client.eventSearch({
    location: 'new york city, ny', //how do I find those close to my device location?
    limit: 10, //10 search results... can I refresh these?
    radius: 8000 //5 mile radius
}).then(response => {
    events = response.jsonBody.events; //an array of event objects
}).catch(e => {
    console.log(e);
});

app.get('/events', (req, res) => {
    //edit the list items
    var i = 0;
    const new_events = [];
    for (i = 0; i < 10; i++){
      let e = {};
      e.name = events[i].name;
      e.location = events[i].location.display_address[0] + ", " + events[i].location.display_address[1];
      e.slug = urlSlug(events[i].id);

      var timeStart = new Date(events[i].time_start);
      e.time = timeStart.toGMTString();

      if(events[i].cost){
        e.cost = "$" + events[i].cost;
      }
      else{
        e.cost = "free!";
      }
      new_events.push(e);
    }
    res.render('list', {event: new_events});
});

app.get('/:slug', (req,res) => {
  client.eventSearch({
    id: req.params.slug
  }).then(response => {
    found = response.jsonBody.events[0]; //the event clicked on
    res.render('event', {event: found});
  }).catch(e => {
    console.log('ERROR ON EVENT FIND');
    res.render('event',  {message: 'ERROR'});
  });
});

//TODO:
//  if I wanted to refresh the results, via clicking an arrow to see more, how would I do that?
//  how do I determine which events are closer to me?


app.listen(3000, '127.0.0.1');