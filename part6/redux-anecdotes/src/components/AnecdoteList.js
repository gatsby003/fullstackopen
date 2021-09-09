import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { castVote } from "../reducers/anecdoteReducer";
import {notifyVoteCast} from "../reducers/notifyReducer"

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if (state.filter === ''){
            return state.anecdotes
        }
        console.log(state.filter)
        const newstate = state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter.query));
        console.log(newstate)
        return newstate
    })
    console.log("here bro", anecdotes);
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(castVote(id))
        dispatch(notifyVoteCast(id, 5000))
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                {anecdote.content}
                </div>
                <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
            </div>
            )}
        </div>
    )



}

export default AnecdoteList