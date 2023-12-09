import { useState, useEffect} from 'react'
import personService from './services/persons'
import './index.css'

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
      <button onClick={addPerson}>
        add
      </button>

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

const Persons = ({ persons, newSearch, delPersonClick }) => {
  return (
    <div>
      {persons.filter(
        person => {
          return person.name.toLowerCase().includes(newSearch.toLowerCase())
        }
      ).map(person =>
        <Person key={person.name} person={person} delPersonClick={delPersonClick} />
      )}
    </div>
  )
}

const Person = ({ person, delPersonClick }) => {
  return (
    <div>
      <p>{person.name} {person.number}</p>
      <button onClick={() => delPersonClick(person.name, person.id)}>
      delete {person.id}
      </button>
    </div>
  )
}

const SuccessfulNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='successful'>
      {message}
    </div>
  )
}

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [successfulMessage, setSuccessfulMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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

    const checkPersonName = persons.find(person =>
      person.name === newName
    )
    if (checkPersonName != undefined) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)) {
        personService
          .updatePerson(checkPersonName.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person =>
              person.name !== newName
                ? person
                : returnedPerson
            ))
            setSuccessfulMessage(`Number of ${returnedPerson.name} updated`)
            setTimeout(() => {setSuccessfulMessage(null)}, 5000)
            console.log(`Person: ${returnedPerson.name} number updated`)
          })
          .catch(error => {
            setErrorMessage(
              `Person '${newName}' was already removed from server`
            )
            setTimeout(() => {setErrorMessage(null)}, 5000)
            console.log('failed to update person')
            console.log(error)
          })
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setSuccessfulMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {setSuccessfulMessage(null)}, 5000)
          console.log(`New person added: ${returnedPerson.name}`)
        })
        .catch(error => {
          console.log('failed to add person')
          console.log(error)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const delPersonClick = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(returnedPerson => {
          setPersons(persons.filter(person => person.id !== id))
          console.log(`Person deleted: ${name}`)
        })
        .catch(error => {
          console.log('failed to delete person')
          console.log(error)
        })
    }
    console.log(`Person deletion cancelled`)
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

      <SuccessfulNotification message={successfulMessage} />
      <ErrorNotification message={errorMessage} />

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
        delPersonClick={delPersonClick}
      />

    </div>
  )
}

export default App