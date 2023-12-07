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
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
      {persons.map(person =>
        <Person key={person.name} person={person} />
      )}
    </div>
  )
}

export default App