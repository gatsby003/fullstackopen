import React from "react";
import { addQuote } from "../reducers/anecdoteReducer";
import { connect } from "react-redux";

const AnecdoteForm = (props) => {
    const addNote = async (event) => {
        event.preventDefault();
        const content = event.target.note.value
        event.target.note.value = ''
        props.addQuote(content)
    } 
    

    return (
        <form onSubmit={addNote}>
        <div>
          <input name="note" />
        </div>
        <button type="submit">
          create
        </button>
      </form>
    )
}

const mapDispatchToProps = {
  addQuote
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm