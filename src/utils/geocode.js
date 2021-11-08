/**
 * Geocoding service
 * https://www.mapbox.com/
 * @publicdefaulttoken pk.eyJ1IjoiYW5kcmV3Ym95bGUiLCJhIjoiY2t2b2hmbzRmM2xhcTJ2bWw2YnhrdDI4YyJ9.W8UiHb4jF-u6K5jKX710Rw
 * /geocoding/v5/{endpoint}/{search_text}.json
 * endpoint = mapbox.places
 *  example request: https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYW5kcmV3Ym95bGUiLCJhIjoiY2t2b2hmbzRmM2xhcTJ2bWw2YnhrdDI4YyJ9.W8UiHb4jF-u6K5jKX710Rw&limit=1
 * 
 * @documentation https://docs.mapbox.com/api/search/geocoding/
 * set limit to 1 to avoid extra hits.  
 */

const request = require('request');

const geocode = (location, callback) => {
   const rootURL = 'https://api.mapbox.com/geocoding/v5/';
   const endPoint = 'mapbox.places';
   const geoToken = 'pk.eyJ1IjoiYW5kcmV3Ym95bGUiLCJhIjoiY2t2b2hmbzRmM2xhcTJ2bWw2YnhrdDI4YyJ9.W8UiHb4jF-u6K5jKX710Rw';
   const limit = 1;  // number of features to return in array
   const url = `${rootURL}${endPoint}/${encodeURIComponent(location)}.json?access_token=${geoToken}&limit=${limit}`

   // note deconstruct response into {body} as thats the only property needed.
   request({url, json: true}, (error, {body}) => {
      if (error) {
         callback('Unable to connect to geocoding service.');
      } else if(body.message === 'Not Found') {
         callback('Unable to retrieve geocode. Check credentials and/or API syntax.')
      } else if (body.features.length === 0) {
         callback('Unable to retrieve geocode.  Try another location.')
      } else {
         callback(undefined, {
            placeName: body.features[0].place_name,
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0]
         });
      }
   })

}

module.exports = geocode;