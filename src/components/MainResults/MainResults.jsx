import React from 'react'
import { WiStrongWind, WiMoonFull } from "react-icons/wi";
import './MainResults.css';

function MainResults(props) {

    const sunrise = props.weather.current.sunrise;
    const sunset = props.weather.current.sunset;

    const sunPosition = () => {
        // Inicijalne vrednosti
        let current = props.weather.current.dt;
        let sunrise = props.weather.current.sunrise;
        let sunset = props.weather.current.sunset

        // Kalkulacija ugla 
        let procenat = 1 - ( (sunset-current) / (sunset-sunrise) )
        let ugao = 140 * procenat

        // Izbaci rezultat pozicije 
        let rezultat = '';
        if (current > sunrise && current < sunset){
            rezultat = Math.round(-70 + ugao);
        }

        else if (current < sunrise ){
            rezultat = -75;
        }

        else if (current > sunset ){
            rezultat = 70;
        }

        return rezultat;
    }
    
    const Time = (date) => {
        let sec = date;
        let date_c = new Date(sec * 1000);
        let timestr = date_c.toLocaleTimeString([], {timeStyle: 'short'});;

        return timestr;
    }

    
    return (
        <main>
            {/* Today's weather */}
            <div className="main__temperature">
                <div className="main__temperature-side">
                    <img height="50" src={'http://openweathermap.org/img/wn/' + props.weather.current.weather[0].icon + '@2x.png'} alt=""/>
                    <div>{props.weather.current.weather[0].main}</div>
                </div>
                <div className="main__temperature-temp">
                    {/*{props.weather.current.temp} */}
                    {Math.round(props.weather.current.temp)}&#176;C
                </div>
                <div className="main__temperature-side">
                    <WiStrongWind />
                    <div>{props.weather.current.wind_speed} m/s</div>
                </div>
            </div>

            {/* 3 day forecast */}
            <div className="main__forecast">
                <div>
                    <div className="d-flex align-items-center">
                        <img height="50" src={'http://openweathermap.org/img/wn/' + props.weather.daily[0].weather[0].icon + '@2x.png'} alt=""/>
                        <span className="ml-3">Today</span>
                    </div>
                    <div>
                        {Math.round(props.weather.daily[0].temp.max)}&#176;C / {Math.round(props.weather.daily[0].temp.min)}&#176;C
                    </div>
                </div>

                <div>
                    <div className="d-flex align-items-center">
                        <img height="50" src={'http://openweathermap.org/img/wn/' + props.weather.daily[1].weather[0].icon + '@2x.png'} alt=""/>
                        <span className="ml-3">Tommorow</span>
                    </div>
                    <div>
                        {Math.round(props.weather.daily[1].temp.max)}&#176;C / {Math.round(props.weather.daily[1].temp.min)}&#176;C
                    </div>
                </div>

                <div>
                    <div className="d-flex align-items-center">
                        <img height="50" src={'http://openweathermap.org/img/wn/' + props.weather.daily[2].weather[0].icon + '@2x.png'} alt=""/>
                        <span className="ml-3">{props.dateBuilder('prekosutra')}</span>
                    </div>
                    <div>
                    <div>
                        {Math.round(props.weather.daily[2].temp.max)}&#176;C / {Math.round(props.weather.daily[2].temp.min)}&#176;C
                    </div>
                    </div>
                </div>
            </div>

            {/* Sun position */}
            <div className="main_sunposition">
                <div className="main_sunposition-sunmoon">
                    <div className="sun-times">
                        <div className="sun-path">
                            <div className="sun-animation"></div>
                        </div>
                        <div className="sun-symbol-path" style={{transform: `rotateZ(${sunPosition()}deg)`}}>
                            <span className="symbol"><WiMoonFull/></span>
                        </div>
                    </div>
                    <div className="legend">
                        <div className="sunrise">{Time(sunrise)}</div>
                        <div className="sunset">{Time(sunset)}</div>
                    </div>
                </div>

                <div className="main_detaildata">
                    <div className="text-center">
                        <header>Wind Speed</header>
                        <div>{props.weather.current.wind_speed} m/s</div>
                    </div>

                    <div className="text-center">
                        <header>Pressure</header>
                        <div>{props.weather.current.pressure} hPa</div>
                    </div>

                    <div className="text-center">
                        <header>Real feel</header>
                        <div>{Math.round(props.weather.current.feels_like)}&#176;C</div>
                    </div>
                </div>
            </div>

        </main>
    )
}

export default MainResults
