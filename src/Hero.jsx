
import './sheet.css'
import icon from './assets/weather.webp'
import rain from './assets/rain.webp'
import sun from './assets/sun.webp'
import weath from './assets/weather.webp'
import React,{ useState, useEffect, useRef } from 'react'


const Hero = () => {

  const [weather,setWeather] = useState(true)
  
    
  

    const search = async (city)=>{
      try {
        
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

        const res = await fetch(url)
        const data = await res.json()

        setWeather({
          location: data.name,
          temperature: Math.floor(data.main.temp),
          windSpeed: data.wind.speed,
          humidity: data.main.humidity,
        })

      } catch (error) {
        
      }
    }

    useEffect(()=>{
          search("Accra")
      
    },[])

    const inputRef = useRef(null)

   
    

   const handleInput = (event) => {
  if (event.key === "Enter") {
    const city = inputRef.current.value.trim();
    if (city) {
      search(city);
      inputRef.current.value = "";
    }
  }
}


  return (
    <div className='app'>
        
        <div className="con">
          <div className="main">
            <input ref={inputRef} type="text" placeholder='Enter City Name' className='searchBox'   onKeyDown={handleInput}/>
            
            <img src={weather.temperature >= 30 ? sun : (weather.temperature >= 20 ? weath : rain)} alt="" className="icon" />
            <h1>{weather.temperature}°C </h1>
            <h2>{weather.location}</h2>
          </div>

          <div className="sub">
            <div className="hum">
            <h1>{weather.humidity}%</h1>
            <p>Humidity</p>
            </div>
            <div className="speed">
              <h1>{weather.windSpeed} km/h</h1>
              <p>WindSpeed</p>
            </div>
          </div >

        </div>
    </div>
  )
}

export default Hero
