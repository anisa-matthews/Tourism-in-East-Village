# Tourism-in-East-Village
Frontend coding challenge for STIT. App for displaying nearby events via Yelp Fusion API.

## Install NPM Packages:
```
$ npm install yelp-fusion --save
$ npm install hbs
$ npm install express
$ npm install url-slugs
$ npm install @google/maps
```

## Quick Start: 
run node in terminal, then open a new window and go to 'localhost:3000/events'
```
$ node src/app.js
```

## Self Evaluation:

Although I did not finish this in one sitting, I would say I took 4+ hours to finish this. I feel that I spent too much time trying to figure out each API, between Yelp Fusion and Google Maps. In hindsight, I think utilizing handlebars was not the best idea, as it was confusing trying to incorporate Google Maps into the hbs templates. Furthermore, I did not include the location of the device, as I felt I was taking too much time, but I would've utilized HTML5's 'Geolocation'. My 'TODOs' and comments in app.js kind of explain the thinking behind what I was doing in that regard, as well as what I'd like to fix about this code.


### Sources:
https://github.com/googlemaps/google-maps-services-js
https://github.com/tonybadguy/yelp-fusion/blob/master/README.md
