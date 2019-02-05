const express = require('express');
var urlSlug = require('url-slug');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
var Handlebars = require("handlebars");
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
    location: 'New York City, NY', //how do I find those close to my device location?
    limit: 10, //10 search results... can I refresh these?
    radius: 8000 //5 mile radius
    //how do I find times that are in the future and not the past?
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

Handlebars.registerHelper('json',function(obj) {
  return new Handlebars.SafeString(JSON.stringify(obj))
})

app.get('/:slug', (req,res) => {
    var found = findEvent(req.params.slug);//the event clicked on
    res.render('event', {event: found});
});

function findEvent(id){
  for(let i =0; i < events.length; i++){
    if(id == events[i].id){
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
      return e;
    }
  }
  return null;
}

//TODO:
//  if I wanted to refresh the results, via clicking an arrow to see more, how would I do that?
//  how do I determine which events are closer to me?
//  how do I filter on which events have dates in the future rather than those that've already happened?


app.listen(3000, '127.0.0.1');