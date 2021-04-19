import React, { useState, useEffect } from 'react'

import './App.css';
import Header from './components/Header';
import MainResults from './components/MainResults/MainResults';
import background from './img/background.svg';


function App() {

    

    const [weather, setWeather] = useState({})

    const dateBuilder = (datum) => {
        let d = new Date();
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
        // Ukoliko funkciju zovemo za prekosutra
        if (datum === 'prekosutra'){
          let two_days = d.getDay() + 2;
          if (two_days > 6){
            two_days = two_days - 7;
          }
          return days[two_days];
        }
        // Ukoliko zovemo za danasnji dan [pun datum]
        else {
          return `${day} ${date} ${month} ${year}`
        }
        
      }

    const searchPlace = (query) => {
        console.log(query)
    }

    useEffect(()=>{
        const apiData = {
            url_base: 'https://api.openweathermap.org/data/2.5/',
            api_key: 'ee904c31314aba2f5970ff012d68fb56',
            latitude: '',
            longitude: '',
            locationStatus: '',
            weather: ''
        };
        const successCallback = (position) => {
            apiData.latitude = position.coords.latitude;
            apiData.longitude = position.coords.longitude;
            // Pozovi funkciju api
            fetch(`${apiData.url_base}onecall?lat=${apiData.latitude}&lon=${apiData.longitude}&units=metric&appid=${apiData.api_key}`)
              .then(res => {
                return res.json();
              }).then((results) => {setWeather(results)})
          }
          const errorCallback = (error) => {
            console.log(error)
            apiData.locationStatus = 'block'
          }
          navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    },[])


    return (
        <div id="holder_app" style={{ backgroundImage: `url(${background})` }}>
            { typeof weather.current !== 'undefined' && (
                <>
                    <Header weather={weather} dateBuilder={dateBuilder} searchPlace={searchPlace}/>
                    <MainResults  weather={weather} dateBuilder={dateBuilder}/>
                </>
            )}
            
        </div>
    )
}

export default App
