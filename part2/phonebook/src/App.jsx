import { useState } from 'react'


const Person = ({ person }) => {
  return (
    <div>
      <b>{person.name}</b>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
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
  }

  const handePersonCHange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        name: <input
          value={newName}
          onChange={handePersonCHange}
        />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <Person key={person.name} person={person} />
      )}
    </div>
  )
}

export default App