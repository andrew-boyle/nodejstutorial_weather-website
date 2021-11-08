/**
 * Dark Sky is no longer available, so Andrew suggests using weatherstack.  
 * 
 * @api https://weatherstack.com/
 * @key e32a515b79cfff0c8560949ee428e697
 * @baseurl http://api.weatherstack.com/
 * @documentation https://weatherstack.com/documentation
 * 
 */

const request = require("request");

const forecast = (latitude, longitude, callback) => {
   const rootURL = 'http://api.weatherstack.com/current?access_key=e32a515b79cfff0c8560949ee428e697&query=';
   // units parameter  m: metric; s: scientific; f: fahrenheit(imperial)
   const units = 'f';
   const url = `${rootURL}${latitude},${longitude}&units=${units}`;
      
   // note deconstruct response into {body} as thats the only property needed.
   request({ url, json: true }, (error, {body}) => {
      if(error) {
         callback('Unable to connect to weather service.')
      } else if (body.error) {
         callback(`Forecast Server Error: ${body.error.info}`)
      } else {
         callback(undefined, {
            temp: body.current.temperature,
            feelsLike: body.current.feelslike,
            description:body.current.weather_descriptions[0]
         })
      }
   });
}

module.exports = forecast;