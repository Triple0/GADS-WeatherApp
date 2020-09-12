const api = {
    key:"2a19837585d8b4f78620f88aba78c7c5",
    base:"https://api.openweathermap.org/data/2.5/"

}

const searchbox = document.querySelector('[name="search-location"]');
searchbox.addEventListener('keypress', setQuery);

function setQuery(event) {
    if (event.keyCode == 13 ) {
        getResults(searchbox.value);
        //console.log(searchbox.value);
    }
}

function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
    
    let city = document.querySelector('.location .city');
    
    city1 = `${weather.name}, ${weather.sys.country}`;
    if(typeof(Storage !== "undefined")){
        // Store
        localStorage.setItem("city-location", city1);
        //Retrieve
        city.innerText = localStorage.getItem("city-location");

    } else {
        city.innerHTML = "Sorry, your browser does not support Web Storage...";
    }
    
    let now = new Date();
    let date = document.querySelector('.location .date');
    
    date1 = dateBuilder(now);
    // Store
    localStorage.setItem("location-date", date1);
    //Retrieve
    date.innerText = localStorage.getItem("location-date");

    let temperature = document.querySelector('.current .temp');
    temperature1 = `${Math.round(weather.main.temp)}<span>&deg;C</span>`;
    // Store
    localStorage.setItem("location-temp", temperature1);
    //Retrieve
    temperature.innerHTML = localStorage.getItem("location-temp");
    

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.current .hi-low');
    hilow.innerHTML = `${Math.round(weather.main.temp_min)}<span>&degC/</span>${Math.round(weather.main.temp_max)}<span>&degC</span>`;
}

function dateBuilder (dateVal) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    let day = days[dateVal.getDay()];
    let date = dateVal.getDate();
    let month = months[dateVal.getMonth()];
    let year = dateVal.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
}

// if ("serviceWorker" in navigator) {
//     window.addEventListener("load", function() {
//       navigator.serviceWorker
//         .register("/serviceWorker.js")
//         .then(res => console.log("service worker registered"))
//         .catch(err => console.log("service worker not registered", err));
//     });
//   }

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceWorker.js')
    .then(function(registration) {
      registration.addEventListener('updatefound', function() {
        // If updatefound is fired, it means that there's
        // a new service worker being installed.
        var installingWorker = registration.installing;
        console.log('A new service worker is being installed:',
          installingWorker);
  
        // You can listen for changes to the installing service worker's
        // state via installingWorker.onstatechange
      });
    })
    .catch(function(error) {
      console.log('Service worker registration failed:', error);
    });
  } else {
    console.log('Service workers are not supported.');
  }

