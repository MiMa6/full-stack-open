import { useState, useEffect } from 'react'
import countryService from './services/countries'

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

const Countries = ({ countries, handleShowCountry }) => {

  if (countries.length === 1) {
    return (
      <div>
        <CountrySpecific country={countries[0]} />
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

const CountrySpecific = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>

      <p>capital {country.capital}</p>
      <p>area {country.area}</p>

      <h2>languages:</h2>

      <ul>
        {Object.values(country.languages).map(language =>
          <li key={language}>{language}</li>
        )}
      </ul>

      <img src={country.flags.png} alt="flag" width="200" height="100"></img>

    </div>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [countryToShow, setCountryToShow] = useState('')
  const [newSearch, setNewSearch] = useState('')

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
    console.log(event.target.value)
    setNewSearch(event.target.value)
    setCountryToShow('')
  }
  
  const handleShowCountry = (name) => {
    console.log(`Add country to show ${name}`)
    setCountryToShow(name)
  }

  var filteredCountries = countries.filter(country => {
    return country.name.common.toLowerCase().includes(newSearch.toLowerCase())
  })

  if (countryToShow != '') {
    filteredCountries = filteredCountries.filter(country => {
      return country.name.common === countryToShow
    })
  }

  console.log(`Countries found: ${filteredCountries.length}`)

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
      />

    </div>
  )
}

export default App
