// Client-side script for index.html.
// Here we pull from the API we already set up.
// Therefore, this isn't node.js it's javascript for a browser.

// fetch('https://puzzle.mead.io/puzzle')
//    .then((response) => {
//       response.json().then((data) => {
//          console.log(data)})
//    })
//    .catch((err) => {console.log(err)});


// DOM
const weatherForm = document.querySelector('form');
const locationInput = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// Event listeners
weatherForm.addEventListener('submit', (e) => {
   const location = locationInput.value;
   const url = `/weather?address=${location}`
   
   messageOne.innerHTML = 'Loading Results...'
   messageTwo.innerHTML = ''

   fetch(url)
      .then((response) => {
         response.json().then((data) => {
            if (data.error) {
               messageOne.innerHTML = data.error
               locationInput.value = ''
            } else {
               messageOne.innerHTML = data.currentWeather
               messageTwo.innerHTML = data.currentWeatherText
               locationInput.value = ''
            }
         })
      })
      .catch((err) => {console.log(err)})
   
   e.preventDefault();
})
