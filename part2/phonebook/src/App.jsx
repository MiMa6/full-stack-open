import { useState, useEffect} from 'react'
import personService from './services/persons'

const PersonForm = ({ addPerson,
  newName,
  newNumber,
  handePersonNameChange,
  handePersonNumberChange
}) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        name: <input
          value={newName}
          onChange={handePersonNameChange}
        />
      </form>
      <form onSubmit={addPerson}>
        number: <input
          value={newNumber}
          onChange={handePersonNumberChange}
        />
      </form>
    </div>
  )
}

const Filter = ({ value, onChange }) => {
  return (
    <div>
      filter shown with
      <input
        type="search"
        value={value}
        onChange={onChange}
      ></input>
    </div>
  )
}

const Persons = ({ persons, newSearch }) => {
  return (
    <div>
      {persons.filter(
        person => {
          return person.name.toLowerCase().includes(newSearch.toLowerCase())
        }
      ).map(person =>
        <Person key={person.name} person={person} />
      )}
    </div>
  )
}

const Person = ({ person }) => {
  return (
    <div>
      <p>{person.name} {person.number}</p>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const checkPersonName = persons.some(person =>
      person.name === newName
    )
    if (checkPersonName) {
      window.alert(`${personObject.name} is already added to phonebook`)
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          console.log(`New person added: ${returnedPerson.name}`)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleSearchedPersonChange = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  const handePersonNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handePersonNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        value={newSearch}
        onChange={handleSearchedPersonChange}
      />

      <h2>add a new</h2>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handePersonNameChange={handePersonNameChange}
        handePersonNumberChange={handePersonNumberChange}
      />

      <h2>Numbers</h2>

      <Persons
        persons={persons}
        newSearch={newSearch}
      />

    </div>
  )
}

export default App