
import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  return (
    props.toshow === null ? <div/> 
    : <div style={style}>
        <h3>you voted for </h3> {props.toshow.content}!
      </div>
  )
}



const mapStateToProps = (state) => {
  const notification = state.notification
  const anecdotes = state.anecdotes
  const toshow = notification !== null ? anecdotes.find(anecdote => anecdote.id === notification.id) : null
  return {toshow}

}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification