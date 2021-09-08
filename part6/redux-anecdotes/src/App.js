import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { castVote, addQuote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import FilterForm from './components/FilterForm'

const App = () => {

  return (
    <div>
      <Notification/>
      <FilterForm/>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App