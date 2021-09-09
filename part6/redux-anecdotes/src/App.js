import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { castVote, addQuote, initAnec } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import FilterForm from './components/FilterForm'
import anecdoteService from './services/anecdotes'
import { useEffect } from 'react'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initAnec())
  }, [dispatch])

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