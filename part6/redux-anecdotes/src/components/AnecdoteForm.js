import React from "react";
import { useDispatch } from "react-redux";
import { addQuote } from "../reducers/anecdoteReducer";
import noteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addNote = async (event) => {
        event.preventDefault();
        const content = event.target.note.value
        event.target.note.value = ''
        dispatch(addQuote(content))
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


export default AnecdoteForm