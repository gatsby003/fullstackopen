
import React from 'react'
import {useSelector} from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const anecdotes = useSelector(state => state.anecdotes)
  const toshow = notification !== null ? anecdotes.find(anecdote => anecdote.id === notification.id) : null
  console.log(notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  return (
    notification === null ? <div/> 
    : <div style={style}>
        <h3>you voted for </h3> {toshow.content}!
      </div>
  )
}


export default Notification