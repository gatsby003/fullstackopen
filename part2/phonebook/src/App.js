import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newQuery, setNewQuery ] = useState('')
  const [ newSearch, setNewSearch ] = useState([])
  const [ newError, setNewError ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(inititalPersons => {
        setPersons(inititalPersons)
      })
  }, [])

  const checkDuplicates = (name) => {
    const arr = []
    persons.forEach(person => arr.push(person.name))
    return arr.includes(name.name)
  }


  const handleSubmit = (event) => {
    event.preventDefault()
    const nameObject = {
      name : newName,
      number : newNumber,
    }

    if (checkDuplicates(nameObject)){
      const duplicate = persons.find(person => person.name === newName)
      console.log(duplicate.id);
      nameObject.id = duplicate.id
      const newArray = persons.filter(person => person.name !== newName)
      newArray.push(nameObject)
      console.log(newArray)
      personService
          .update(nameObject)
          .then(returnedPerson => {
            setPersons(newArray)
            setNewName('')
            setNewNumber('')
            setNewError(`${newName} updated to phonebook.`)
          })
    } else {
      personService
          .create(nameObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            setNewError(`${newName} added to phonebook.`)
          })
    }
  }

  const handleDelete = (id) => {
    if (window.confirm("you wanna delete this contact?")){
      personService
      .deletePerson(id)
      .then(console.log("yo"))
      personService.getAll().then(inititalPersons => {
        setPersons(inititalPersons)
        setNewError(`Deleted Successfully`)
      })
    }
  }


  const handleInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    event.preventDefault()
    const query = event.target.value
    setNewQuery(event.target.value)
    setNewSearch([])
    const result = []
    persons.forEach(person => {
      if (person.name.toLocaleLowerCase().includes(query)){
        result.push(person)
      }
    })
    console.log(result)
    setNewSearch(result)
  }

  const Contacts = ({deletePerson}) => {
    const content = []
    persons.forEach(person => content.push(
      <div key={person.name}>
      <ul>
      <li>
        {person.name} : {person.number} 
      </li>
      <button onClick={() => handleDelete(person.id)}>delete</button>
      </ul>
      </div>
    ))
    return (content)
  }

  const SearchResult = () => {
    if (newSearch === []){
      return <></>
    }
    const content = []
    newSearch.forEach(person => content.push(
      <h4 key={person.name + 1}>
        {person.name} : {person.number}
      </h4>
    ))
    return (content)
  }

  const Numbers = ({service}) => {
    if (newSearch.length === 0) {
      return <Contacts z={service}/>
    }
    return <SearchResult />
  }

  const Notification = ({newError,setNewError}) => {
    const style = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16,
        border: 5,
      }

      setTimeout(() => {
        setNewError('')
      }, 5000)
      
    return(
      <div style={style}>
        <h1>{newError}</h1>
      </div>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with : <input onChange={handleSearch} value={newQuery} ></input>
      <Notification newError={newError} setNewError={setNewError}/>
      <form onSubmit={handleSubmit}>
        <h1>Add a new</h1>
        <div>
          name: <input onChange={handleInput} value={newName}/>
        </div>
        <div>
          number: <input onChange={handleNumber} value={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <Numbers service={handleDelete}/>
      </div>
    </div>

  )
}

export default App