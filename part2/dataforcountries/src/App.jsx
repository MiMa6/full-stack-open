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

const Countries = ({ countries, newSearch }) => {

  const filteredCountries = countries.filter(country => {
    return country.name.common.toLowerCase().includes(newSearch.toLowerCase())
  })
  console.log(filteredCountries.length)
  if (filteredCountries.length === 1) {
    return (
      <div>
        <CountrySpecific country={filteredCountries[0]} />
      </div>
    )
  } else if (filteredCountries.length < 10) {
    return (
      <div>
        {filteredCountries
          .map(country =>
            <CountryList key={country.name} country={country} />
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

const CountryList = ({ country }) => {
  return (
    <div>
      <p>{country.name.common}</p>
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
  }


  return (
    <div>

      <Filter
        value={newSearch}
        onChange={handleSearchedCountryChange}
      />

      <Countries
        countries={countries}
        newSearch={newSearch}
      />

    </div>
  )
}

export default App
