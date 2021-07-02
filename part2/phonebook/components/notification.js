import React from 'react'

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

export default Notification