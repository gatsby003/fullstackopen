import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all/')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const Search = (props) => {
    const [query, setQuery] = useState('')
    const [result, setResult] = useState('')
    const data = props.data
    const Result = ({result}) => {
      if (result.length > 10){
        return (
          <h1>specify more precise filter</h1>
        )
      } else if (result.length === 0){
        return (
          <></>
        )
      } else if (result.length === 1){
        const cont = result[0]
        const languages = []
        cont.languages.forEach(lang => {
          languages.push(<><ul key={lang}>{lang.name}</ul></>)
        })
        console.log(languages);
        return (
          <>
          <h1 key={cont.name}>{cont.name}</h1>
          <p key={cont.capital}>Capital {cont.capital}</p>
          <p key={cont.population}>Population {cont.population}</p>
            Languages  {languages}
          <img height="70" width="150"src={cont.flag}></img>
          </>
        )
      }
      const resultlist = []
      result.forEach(element => {
        resultlist.push(
          <li key={element.name}><>{element.name}<button onClick={() => {setResult([element])}}>show</button></></li>
        )
      })
      console.log(result)
      return (
        <ul>
          {resultlist}
        </ul>
      )
    }
    const handleSearch = (event) => {
      event.preventDefault()
      setQuery(event.target.value)
      setResult([])
      const result = []
      data.forEach(country => {
        if (country.name.toLocaleLowerCase().includes(query)){
          result.push(country)
        }
      })
      setResult(result)
    }

    return (
      <>
      <input onChange={handleSearch}>
      </input>
      <Result result={result}/>
      </>
    )
  }

  return(
    <div>
      <Search data={countries}/>
    </div>
  )
}






export default App;
