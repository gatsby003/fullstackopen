import React from 'react'

export const SearchResult = ({newSearch}) => {
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