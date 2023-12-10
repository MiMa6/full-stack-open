import { useState, useEffect } from 'react'
import countryService from './services/countries'
import weatherService from './services/weather'

const Filter = ({ value, onChange }) => {
  return (
    <div>
      find countries
      <input
        type="search"
        value={value}
        onChange={onChange}
      ></input>
    </div>
  )
}

const Countries = ({ countries, handleShowCountry, getWeatherhandler, weather }) => {

  if (countries.length === 1) {
    return (
      <div>
        <CountrySpecificMain
          country={countries[0]}
        />
        <CountrySpecificWeather
          country={countries[0]}
          getWeatherhandler={getWeatherhandler}
          weather={weather}
        />

      </div>
    )
  } else if (countries.length < 10) {
    return (
      <div>
        {countries
          .map(country =>
            <CountryList
              key={country.name.common}
              country={country}
              handleShowCountry={handleShowCountry}
            />
          )}
      </div>
    )
  } else {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }

}

const CountryList = ({ country, handleShowCountry }) => {
  return (
    <div>
      <p>{country.name.common}
        <button onClick={() => handleShowCountry(country.name.common)}>
          show
        </button>
      </p>
    </div>
  )
}

const CountrySpecificMain = ({ country }) => {

  return (
    <div>
      <h1>{country.name.common}</h1>

      <p>capital {country.capital}</p>
      <p>area {country.area}</p>

      <b>languages:</b>

      <ul>
        {Object.values(country.languages).map(language =>
          <li key={language}>{language}</li>
        )}
      </ul>

      <img src={country.flags.png} alt="flag" width="200" height="100"></img>

    </div>
  )
}

const CountrySpecificWeather = ({ country, getWeatherhandler, weather }) => {


  useEffect(() => {
    getWeatherhandler(country.capital);
  }, [country]);

  if (weather.temp === 0 && weather.speed === 0 && weather.img === '') {
    return (
      <div>
        <h2>No weather data available</h2>
      </div>
    )
  } else {
    return (
      <div>
        <h2>Weather in {country.capital}</h2>
        <p>temperature {weather.temp} Celcius</p>
        <img src={`https://openweathermap.org/img/wn/${weather.img}@2x.png`} alt="weather icon" width="100" height="100"></img>
        <p>wind {weather.speed}m/s</p>
      </div>
    )
  }



}

function App() {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const [countryToShow, setCountryToShow] = useState('')
  const [weather, setWeather] = useState({
    temp: 0,
    speed: 0,
    img: '',
  })

  useEffect(() => {
    console.log('Initial effect')
    countryService
      .getAll()
      .then(initialCountries => {
        console.log('promise fulfilled')
        setCountries(initialCountries)
      })
  }, [])

  const handleSearchedCountryChange = (event) => {
    setNewSearch(event.target.value)
    setCountryToShow('')
    setWeather({
      temp: 0,
      speed: 0,
      img: '',
    })
  }

  const handleShowCountry = (countryName) => {
    console.log(`Add country to show ${countryName}`)
    setCountryToShow(countryName)
  }

  const getWeatherhandler = (city) => {
    weatherService
      .getGeoByCity(city)
      .then(geoData => {
        console.log("geoData found")
        console.log(geoData)
        let lat = geoData[0].lat.toFixed(2)
        let lon = geoData[0].lon.toFixed(2)
        weatherService
          .getWeatherByGeo(lat, lon)
          .then(weatherData => {
            console.log("weatherData found")
            console.log(weatherData)
            setWeather({
              temp: (weatherData.main.temp).toFixed(2),
              speed: (weatherData.wind.speed).toFixed(2),
              img: (weatherData.weather[0].icon),
            })
          })
          .catch(error => {
            console.log('Failed to get weather data')
            console.log(error)
          })
      })
      .catch(error => {
        console.log('Failed to get geo data')
        console.log(error)
      })
  }


  var filteredCountries = countries.filter(country => {
    return country.name.common.toLowerCase().includes(newSearch.toLowerCase())
  })

  if (countryToShow != '') {
    filteredCountries = filteredCountries.filter(country => {
      return country.name.common === countryToShow
    })
  }
  
  return (

    <div>

      <Filter
        value={newSearch}
        onChange={handleSearchedCountryChange}
      />

      <Countries
        countries={filteredCountries}
        newSearch={newSearch}
        handleShowCountry={handleShowCountry}
        getWeatherhandler={getWeatherhandler}
        weather={weather}
      />

    </div>
  )
}

export default App
