import { useState } from 'react';
import './App.css';

import Background from './Background.jsx';

const api = {
  key: "d4744f06320cac9209450a88b6ad5926",
  base: "https://api.openweathermap.org/data/2.5/"
}
let bgVideo;

function App() {

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})



  const search = e => {
    if (e.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
        .then(result => {
          if (result.cod == 404) {
            document.querySelector(".location").textContent = 'Location'
            document.querySelector(".temp").textContent = ''
            document.querySelector(".weather").textContent = 'City not found'
            return;
          }

          if (result.main.temp >= 25) {
            document.querySelector(".app").classList.remove("cold")
            document.querySelector(".app").classList.add("warm")
            bgVideo = 'https://cdn.videvo.net/videvo_files/video/free/2014-06/large_watermarked/Blue_Sky_and_Clouds_Timelapse_0892__Videvo_preview.mp4'
          } else {
            document.querySelector(".app").classList.remove("warm")
            document.querySelector(".app").classList.add("cold")
            bgVideo = 'https://cdn.videvo.net/videvo_files/video/free/2021-01/large_watermarked/210108_01_Snowy%20Woods_4k_012_preview.mp4';
          }

          setWeather(result)
          setQuery('')
          console.log(result)
        })
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className="app">
      <Background video={bgVideo} />
      <main>
        <div className="search-box">
          <input
            type="text"
            placeholder='Search...'
            className="search-bar"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        <div className="location-box">
          <div className="location">
            {weather.name ? weather.name : 'Location'}
          </div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temp">
            {weather.main ? Math.round(weather.main.temp) + '°c' : ''}
          </div>
          <div className="weather">
            {weather.weather ? weather.weather[0].main : ''}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
