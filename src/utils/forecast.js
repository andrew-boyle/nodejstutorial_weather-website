/**
 * Dark Sky is no longer available, and weatherstack limits to 250 calls and I've run out.  
 * So I'm switching to openweathermap.org.    
 * 
 * @api https://openweathermap.org/
 * @key e15ca4378bd449b1a4770091b44ef365
 * @exampleurl https://api.openweathermap.org/data/2.5/weather?appid=e15ca4378bd449b1a4770091b44ef365&units=imperial&lat=35&lon=139
 * @documentation https://openweathermap.org/current
 * @username andrew-boyle
 * @email andrew.boyle@live.com
 * 
 */

const request = require("request");

const forecast = (latitude, longitude, callback) => {
   const rootURL = 'https://api.openweathermap.org/data/2.5/weather?appid=e15ca4378bd449b1a4770091b44ef365';
   const units = 'imperial';
   const url = `${rootURL}&units=${units}&lat=${latitude}&lon=${longitude}`;
      
   // note deconstruct response into {body} as thats the only property needed.
   request({ url, json: true }, (error, {body}) => {
      if(error) {
         callback('Unable to connect to weather service.')
      } else if (body.message) {
         callback(`Forecast Server Error: ${body.message}`)
      } else {
         callback(undefined, {
            temp: Math.round(body.main.temp),
            feelsLike: Math.round(body.main.feels_like),
            humidity: body.main.humidity,
            description: body.weather[0].description
         })
      }
   });
}

module.exports = forecast;