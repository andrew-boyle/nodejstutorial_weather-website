// using express web framework with hbs (handlebars)
// more detail: https://expressjs.com/

const path = require('path');
const express = require('express');
const hbs = require('hbs')
// require geocode and forecast modules built in previous lessons
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// initialize express
const app = express();
// Port from Heroku (or 3000 if local host)
const port = process.env.PORT || 3000

// node.js path
// https://nodejs.org/dist/latest-v17.x/docs/api/path.html
// Set paths for Express config and hbs
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// setup handlebars, set views, partials directories
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory (public)
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
   res.render('index', {
      title: 'Weather',
      name: 'Andrew Boyle'
   })
})

app.get('/about', (req, res) => {
   res.render('about', {
      title: 'About Me',
      name: 'Andrew Boyle'
   })
})

app.get('/help', (req, res) => {
   res.render('help', {
      title: 'Help',
      name: 'Andrew Boyle',
      message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo laboriosam sunt fuga, eligendi nam quo minima quae, animi, dolorem optio possimus officiis omnis officia saepe?'
   })
})

// Use get for weather specifically, rather than using the .html files in public.
app.get('/weather', (req, res) => {
   address = req.query.address
   // require address in url
   if (!address) {
      return res.send({error: 'Include an address'})
   } 

   // Geocode API, with result input to forecast API, output JSON results
   geocode(address, (error, {latitude, longitude, placeName} = {}) => {
      if (error) {
         return res.send({error});
      }
      forecast(latitude, longitude, (error, {description, temp, feelsLike, humidity} = {}) => {
         if (error) {
            return res.send({error});
         }
         res.send({
            address,
            latitude,
            longitude,
            placeName,
            description,
            temp,
            feelsLike,
            humidity,
            currentWeather: 'Weather for ' + placeName + ':',
            currentWeatherText: `Currently ${description} at ${temp}°F and ${humidity}% humidity. It feels like ${feelsLike}°F.`
         })
       })
   });
})


app.get('/products', (req, res) => {
   // make sure search value pair is included in url
   if (!req.query.search) {
      // use return so that the res.send isn't called twice (can't do that)
      return res.send({error: 'Include a search term'})
   }

   res.send({
      products: []
   })
});

app.get('/help/*', (req,res) => {
   res.render('notfound', {
      title:'help file not found',
      errorMsg: 'Help file not found',
      image: '/img/library.jpg'
   })
})

// express wildcard * = any other page requested.
// express walks through app.get one by one to match when a url is requested.
app.get('*', (req, res) => {
   res.render('notfound', {
      title: '404: file not found',
      errorMsg: '404: file not found',
      image: '/img/404error.jpg'
   })
})


// start server
app.listen(port, () => {
   console.log(`Server is up on port ${port}.`);
});