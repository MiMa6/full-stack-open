import { useState } from 'react'


const Person = ({ person }) => {
  return (
    <div>
      <p>{person.name} {person.number}</p>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

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
      setPersons(persons.concat(personObject))
      console.log('New person added:', personObject.name)
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
      filter shown with<input
        type="search"
        value={newSearch}
        onChange={handleSearchedPersonChange}
      ></input>
      <h2>add a new</h2>
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
      <div>
        <button onClick={addPerson}>
          add
        </button>
      </div>
      <h2>Numbers</h2>
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

export default App