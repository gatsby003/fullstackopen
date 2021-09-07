import React from "react";
import { useDispatch } from "react-redux";
import { addQuote } from "../reducers/anecdoteReducer";


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const add = (content) => {
        dispatch(addQuote(content))
    }

    const addNote = (event) => {
        event.preventDefault();
        const content = event.target.note.value
        event.target.note.value = ''
        add(content)
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