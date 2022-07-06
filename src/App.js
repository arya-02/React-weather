import React, {useState} from 'react';
import { Button } from 'react-bootstrap';
const apiKey = '32b6c02e7e8cd2946756478b626e0292';

function App() {
  const [city,setCity] = useState('');
  const [weather,setWeather] = useState({});

  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  const onSearch=()=>{
    fetch(url)
      .then(res=>res.json())
      .then(result=>{
        setWeather(result);
        setCity('');
      });
  }

  const onKey=(evt)=>{
    if(evt.key === 'Enter'){
      onSearch();
    }
  }

  const dt = new Date(weather.dt * 1000);
  const dayCal=(dt)=>{
    const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    let d = days[dt.getDay()-1];
    return `${d}`;
  }
  
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className='search-box'>
          <input
          className='search-bar'
          type='text'
          placeholder='Search'
          value={city}
          onChange={e=>setCity(e.target.value)}
          onKeyDown={onKey}/>
        </div>
        <div className='text-center'>
        <Button variant="primary" size="lg" active onClick={() => onSearch()}>
          Search
        </Button>{' '}
        </div>
        {(typeof weather.main != 'undefined')?(
          <div>
            <div className='location-box'>
              <div className='location'>{weather.name},{weather.sys.country}</div>
              <div className='date'>{dt.getDate()}/{dt.getMonth()}/{dt.getFullYear()}
              <p>{dayCal(dt)},{dt.getHours()}:{dt.getMinutes()}:{dt.getSeconds()}</p></div>
            </div>
            <div className='weather-box'>
              <div className='temp'>
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="weather">{weather.weather[0].description.toUpperCase()}
              <p>Humidity : {weather.main.humidity}%</p>
              </div>
            </div>
          </div>
        ):('')}
      </main>
    </div>
  );
}

export default App;
